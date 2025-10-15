-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830


-- AdGo BE Pack v1 (Events ingest, Aggregations, Pacing) — for Supabase
-- Run AFTER the core DB pack.

-- Extensions
create extension if not exists pgcrypto;
create extension if not exists pg_stat_statements;
create extension if not exists pg_cron;

set search_path = adgo, public;

-- Secrets (per org HMAC)
create table if not exists adgo.org_secrets (
  org_id uuid primary key references adgo.orgs(id) on delete cascade,
  hmac_secret text not null, -- store a random 32+ char hex; rotate via admin UI later
  created_at timestamptz default now()
);
alter table adgo.org_secrets enable row level security;
-- service role only
drop policy if exists org_secrets_rw on adgo.org_secrets;
create policy org_secrets_rw on adgo.org_secrets
  for all using (false) with check (false);

-- Idempotency keys (global)
create table if not exists adgo.event_dedupe (
  key text primary key,
  created_at timestamptz not null default now()
);
-- keep small by cleanup job (cron below)

-- Raw events (append-only; service role writes)
create table if not exists adgo.events_raw (
  id bigserial primary key,
  event_type text not null check (event_type in ('impression','click')),
  org_id uuid not null references adgo.orgs(id) on delete cascade,
  campaign_id uuid not null references adgo.campaigns(id) on delete cascade,
  creative_id uuid references adgo.creatives(id) on delete set null,
  device_id text,
  remote_ip inet,
  user_agent text,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now()
);
create index if not exists idx_events_org_time on adgo.events_raw(org_id, occurred_at);
create index if not exists idx_events_campaign_time on adgo.events_raw(campaign_id, occurred_at);
alter table adgo.events_raw enable row level security;
-- Read via views only (below). No direct selects for anon/auth users.
drop policy if exists events_raw_rw on adgo.events_raw;
create policy events_raw_rw on adgo.events_raw for all using (false) with check (false);

-- Materialized views (spend is derived from campaign pricing at time of aggregation)
create materialized view if not exists adgo.metrics_hourly as
select
  c.org_id,
  e.campaign_id,
  date_trunc('hour', e.occurred_at) as ts_hour,
  sum(case when e.event_type='impression' then 1 else 0 end) as impressions,
  sum(case when e.event_type='click' then 1 else 0 end) as clicks,
  -- spend cents (Note: CPM: impressions/1000 * cpm; CPC: clicks * cpc)
  sum(
    case c.pricing_mode
      when 'CPM' then (case when e.event_type='impression' then c.cpm_cents else 0 end) / 1000.0
      when 'CPC' then (case when e.event_type='click' then c.cpc_cents else 0 end)
      else 0
    end
  )::bigint as spend_cents_est
from adgo.events_raw e
join adgo.campaigns c on c.id = e.campaign_id
group by 1,2,3;
create unique index if not exists uq_metrics_hourly on adgo.metrics_hourly (org_id, campaign_id, ts_hour);

create materialized view if not exists adgo.metrics_daily as
select
  org_id,
  campaign_id,
  date_trunc('day', ts_hour) as ts_day,
  sum(impressions) as impressions,
  sum(clicks) as clicks,
  sum(spend_cents_est)::bigint as spend_cents_est
from adgo.metrics_hourly
group by 1,2,3;
create unique index if not exists uq_metrics_daily on adgo.metrics_daily (org_id, campaign_id, ts_day);

-- Views for FE (RLS via campaigns/org membership)
create or replace view adgo.v_metrics_hourly as
select m.*
from adgo.metrics_hourly m
join adgo.campaigns c on c.id = m.campaign_id
where adgo.is_org_member(auth.uid(), c.org_id);
alter view adgo.v_metrics_hourly set (security_invoker = on);

create or replace view adgo.v_metrics_daily as
select m.*
from adgo.metrics_daily m
join adgo.campaigns c on c.id = m.campaign_id
where adgo.is_org_member(auth.uid(), c.org_id);
alter view adgo.v_metrics_daily set (security_invoker = on);

-- Refresh helpers
create or replace function adgo.refresh_metrics_hourly() returns void language sql as $$
  refresh materialized view concurrently adgo.metrics_hourly;
$$;

create or replace function adgo.refresh_metrics_daily() returns void language sql as $$
  refresh materialized view concurrently adgo.metrics_daily;
$$;

-- Cron jobs (UTC on server; adjust BYTIME as needed)
-- Hourly refresh at minute 5
select cron.schedule('adgo_refresh_hourly', '5 * * * *', $$select adgo.refresh_metrics_hourly();$$);
-- Daily refresh at 00:15
select cron.schedule('adgo_refresh_daily', '15 0 * * *', $$select adgo.refresh_metrics_daily();$$);
-- Dedupe table cleanup (delete keys older than 24h) at 01:00
create or replace function adgo.cleanup_dedupe() returns void language sql as $$
  delete from adgo.event_dedupe where created_at < now() - interval '24 hours';
$$;
select cron.schedule('adgo_cleanup_dedupe', '0 1 * * *', $$select adgo.cleanup_dedupe();$$);

-- Budget/pacing guards
create or replace function adgo.can_serve(campaign uuid, at_time timestamptz default now())
returns boolean language sql stable as $$
  with c as (
    select *
    from adgo.campaigns
    where id = campaign
  ), window_ok as (
    select exists (
      select 1 from adgo.flight_windows f
      where f.campaign_id = campaign
        and f.start_at <= at_time and f.end_at > at_time
    ) as ok
  ), spent as (
    select
      coalesce(
        (select sum(spend_cents_est) from adgo.metrics_daily d where d.campaign_id = campaign), 0
      ) as total_spend,
      coalesce(
        (select spend_cents_est from adgo.metrics_daily d where d.campaign_id = campaign and d.ts_day = date_trunc('day', at_time)), 0
      ) as today_spend
  )
  select
    (select status from c) = 'active'
    and (select ok from window_ok)
    and (
      -- total budget
      (select budget_total_cents from c) is null
      or (select total_spend from spent) < (select budget_total_cents from c)
    )
    and (
      -- daily cap
      (select daily_cap_cents from c) is null
      or (select today_spend from spent) < (select daily_cap_cents from c)
    );
$$;

-- Nightly reconciliation summary (roll into a simple table for quick reads)
create table if not exists adgo.campaign_spend_cache (
  campaign_id uuid primary key references adgo.campaigns(id) on delete cascade,
  last_reconciled_at timestamptz,
  total_spend_cents bigint not null default 0
);
create or replace function adgo.reconcile_spend_daily() returns void language plpgsql as $$
begin
  insert into adgo.campaign_spend_cache (campaign_id, last_reconciled_at, total_spend_cents)
  select c.id, now(), coalesce(sum(d.spend_cents_est),0)
  from adgo.campaigns c
  left join adgo.metrics_daily d on d.campaign_id = c.id
  group by c.id
  on conflict (campaign_id) do update set
    last_reconciled_at = excluded.last_reconciled_at,
    total_spend_cents = excluded.total_spend_cents;
end;
$$;
-- Nightly at 00:30
select cron.schedule('adgo_reconcile_daily', '30 0 * * *', $$select adgo.reconcile_spend_daily();$$);
