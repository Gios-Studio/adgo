-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830

-- =======================
-- Analytics: views & RPC
-- =======================

-- Spend by day (KES cents) from transactions (debits == spend)
create or replace view v_spend_by_day as
select
  w.owner_id,
  date_trunc('day', t.created_at) as day,
  sum(case when t.type='debit' then t.amount_cents else 0 end)::bigint as spend_cents
from transactions t
join wallets w on w.id = t.wallet_id
group by w.owner_id, 1
order by 2 desc;

-- Impressions & clicks by day (from analytics_events)
create or replace view v_events_by_day as
select
  e.campaign_id,
  e.ad_id,
  date_trunc('day', e.occurred_at) as day,
  count(*) filter (where e.event_type='impression')::bigint as impressions,
  count(*) filter (where e.event_type='click')::bigint as clicks
from analytics_events e
group by 1,2,3
order by 3 desc;

-- CTR by ad/day
create or replace view v_ctr_by_ad_day as
select
  ad_id,
  day,
  impressions,
  clicks,
  case when impressions>0 then round(clicks::numeric*100/impressions, 2) else 0 end as ctr_pct
from v_events_by_day;

-- Campaign performance summary (last 30 days)
create or replace view v_campaign_summary_30d as
with ev as (
  select * from v_events_by_day where day >= now() - interval '30 days'
),
sp as (
  select owner_id, day, spend_cents from v_spend_by_day where day >= now() - interval '30 days'
),
cmp as (
  select c.id, c.owner_id, c.name from campaigns c
)
select
  cmp.id as campaign_id,
  cmp.name,
  coalesce(sum(ev.impressions),0)::bigint as impressions,
  coalesce(sum(ev.clicks),0)::bigint as clicks,
  case when coalesce(sum(ev.impressions),0)>0
       then round(sum(ev.clicks)::numeric*100/sum(ev.impressions),2) else 0 end as ctr_pct,
  coalesce(sum(sp.spend_cents),0)::bigint as spend_cents
from cmp
left join ev on ev.campaign_id = cmp.id
left join sp on sp.owner_id    = cmp.owner_id and sp.day = ev.day
group by 1,2
order by spend_cents desc nulls last, impressions desc;

-- Top creatives (ads) last 30 days by CTR with minimum volume
create or replace view v_top_ads_30d as
with a as (
  select ad_id,
         sum(impressions)::bigint as impressions,
         sum(clicks)::bigint as clicks
  from v_events_by_day
  where day >= now() - interval '30 days'
  group by 1
)
select
  ad_id,
  impressions,
  clicks,
  case when impressions>0 then round(clicks::numeric*100/impressions, 2) else 0 end as ctr_pct
from a
where impressions >= 100
order by ctr_pct desc, impressions desc
limit 50;

-- Convenient RPCs (RLS-safe) – filter results to current user unless admin
create or replace function rpc_campaign_summary_30d()
returns setof v_campaign_summary_30d
language sql security definer set search_path=public as $$
  select cs.*
  from v_campaign_summary_30d cs
  join campaigns c on c.id = cs.campaign_id
  where (c.owner_id = auth.uid() or is_admin());
$$;

create or replace function rpc_top_ads_30d()
returns setof v_top_ads_30d
language sql security definer set search_path=public as $$
  select ta.*
  from v_top_ads_30d ta
  join ads a on a.id = ta.ad_id
  where (a.owner_id = auth.uid() or is_admin());
$$;