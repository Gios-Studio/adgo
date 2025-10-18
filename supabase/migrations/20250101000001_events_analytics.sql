-- Events and Analytics Schema
-- Migration: 20250101000001_events_analytics.sql

set search_path = adgo, public;

-- Org secrets for HMAC validation
create table if not exists adgo.org_secrets (
  org_id uuid primary key references adgo.orgs(id) on delete cascade,
  hmac_secret text not null,
  created_at timestamptz default now()
);
alter table adgo.org_secrets enable row level security;
drop policy if exists org_secrets_rw on adgo.org_secrets;
create policy org_secrets_rw on adgo.org_secrets
  for all using (false) with check (false);

-- Event deduplication
create table if not exists adgo.event_dedupe (
  key text primary key,
  created_at timestamptz not null default now()
);

-- Raw events table
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

-- Indexes for events
create index if not exists idx_events_org_time on adgo.events_raw(org_id, occurred_at);
create index if not exists idx_events_campaign_time on adgo.events_raw(campaign_id, occurred_at);

-- Enable RLS for events
alter table adgo.events_raw enable row level security;
drop policy if exists events_raw_rw on adgo.events_raw;
create policy events_raw_rw on adgo.events_raw for all using (false) with check (false);

-- Materialized views for metrics
create materialized view if not exists adgo.metrics_hourly as
select
  c.org_id,
  e.campaign_id,
  date_trunc('hour', e.occurred_at) as ts_hour,
  sum(case when e.event_type='impression' then 1 else 0 end) as impressions,
  sum(case when e.event_type='click' then 1 else 0 end) as clicks,
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

-- Daily metrics rollup
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

-- Views with RLS
create or replace view adgo.v_metrics_hourly as
select m.*
from adgo.metrics_hourly m
join adgo.campaigns c on c.id = m.campaign_id
where adgo.is_org_member(auth.uid(), c.org_id);

create or replace view adgo.v_metrics_daily as
select m.*
from adgo.metrics_daily m
join adgo.campaigns c on c.id = m.campaign_id
where adgo.is_org_member(auth.uid(), c.org_id);