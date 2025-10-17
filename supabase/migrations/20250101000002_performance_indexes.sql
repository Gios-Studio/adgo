-- Performance Optimizations and Indexes
-- Migration: 20250101000002_performance_indexes.sql

set search_path = adgo, public;

-- Additional performance indexes
create index if not exists idx_campaigns_dates on adgo.campaigns(start_date, end_date);
create index if not exists idx_campaigns_pricing on adgo.campaigns(pricing_mode, status);
create index if not exists idx_events_device on adgo.events_raw(device_id) where device_id is not null;
create index if not exists idx_events_type_time on adgo.events_raw(event_type, occurred_at);

-- Partial indexes for active campaigns
create index if not exists idx_campaigns_active on adgo.campaigns(org_id, status) where status = 'active';
create index if not exists idx_creatives_active on adgo.creatives(campaign_id, status) where status = 'active';

-- Campaign metrics view for dashboard
create or replace view adgo.v_campaign_metrics as
select 
  c.id as campaign_id,
  c.name as campaign_name,
  c.org_id,
  c.status,
  c.pricing_mode,
  coalesce(sum(m.impressions), 0) as total_impressions,
  coalesce(sum(m.clicks), 0) as total_clicks,
  coalesce(sum(m.spend_cents_est), 0) as total_spend_cents,
  case 
    when sum(m.impressions) > 0 then (sum(m.clicks)::float / sum(m.impressions)) * 100
    else 0
  end as ctr_percent
from adgo.campaigns c
left join adgo.metrics_daily m on m.campaign_id = c.id
where adgo.is_org_member(auth.uid(), c.org_id)
group by c.id, c.name, c.org_id, c.status, c.pricing_mode;

-- Cleanup function for old deduplication records
create or replace function adgo.cleanup_old_dedupe_records()
returns void as $$
begin
  delete from adgo.event_dedupe 
  where created_at < now() - interval '7 days';
end;
$$ language plpgsql security definer;

-- Schedule cleanup job (if pg_cron is available)
select cron.schedule('cleanup-dedupe', '0 2 * * *', 'select adgo.cleanup_old_dedupe_records();');