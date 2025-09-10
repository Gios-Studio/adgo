
-- AdGo Supabase Schema - 0001_init.sql
-- Created: 2025-09-09T13:51:37.917304

-- Enable extensions
create extension if not exists postgis;
create extension if not exists pgcrypto;

-- Tenancy & auth
create table if not exists tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create type user_role as enum ('admin','advertiser','analyst');

create table if not exists users (
  id uuid primary key,
  tenant_id uuid not null references tenants(id) on delete cascade,
  email text not null unique,
  role user_role not null default 'advertiser',
  created_at timestamptz not null default now()
);

-- Advertisers & campaigns
create table if not exists advertisers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  contact_email text,
  created_at timestamptz not null default now()
);

create type goal_type as enum ('awareness','ctr','redemption');

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  advertiser_id uuid not null references advertisers(id) on delete cascade,
  name text not null,
  status text not null default 'draft', -- draft/active/paused/completed
  time_window tstzrange,               -- start/end window
  goal goal_type not null default 'awareness',
  cap_daily integer default 0,         -- 0 = no cap
  budget_total numeric(14,2) not null default 0,
  currency char(3) not null default 'KES',
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

-- Creatives
create table if not exists creatives (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  campaign_id uuid not null references campaigns(id) on delete cascade,
  kind text not null,                  -- image/video/text
  storage_url text not null,
  width int,
  height int,
  duration_ms int,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Targets (geo/poi/time/etc.)
create table if not exists targets (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  campaign_id uuid not null references campaigns(id) on delete cascade,
  geo_polygon geometry(Polygon,4326),  -- optional constraint area
  poi_ids uuid[],                      -- references places(id)
  time_of_day int4range[],             -- e.g., [360,660] for 6:00-11:00
  days_of_week int[],                  -- 0-6 (Sun-Sat)
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Ad slots (ride, pickup, dropoff)
create type ad_slot_enum as enum ('ride','pickup','dropoff');
create table if not exists ad_slots (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  slot ad_slot_enum not null,
  created_at timestamptz not null default now()
);

-- Rides (context carrier; minimal PII)
create table if not exists rides (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  provider text not null,              -- Uber/Bolt/Little/Yego/etc.
  pickup_point geometry(Point,4326),
  dropoff_point geometry(Point,4326),
  pickup_time timestamptz,
  dropoff_eta timestamptz,
  device_hash text,                    -- hashed phone/device id
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Places (POIs)
create table if not exists places (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  category text not null,              -- coffee,mall,venue,airport,etc.
  location geometry(Point,4326) not null,
  address text,
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Moments & signals
create table if not exists moments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  name text not null,
  category text not null,              -- 'coffee_near_drop', 'event_nearby', etc.
  rule jsonb not null,                 -- declarative rule config
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists context_signals (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  ride_id uuid not null references rides(id) on delete cascade,
  payload jsonb not null,              -- resolved signals: ETA, daypart, nearest_poi, etc.
  created_at timestamptz not null default now()
);

-- Deliveries (outbound messages) & queues
create type delivery_status as enum ('queued','sending','sent','failed','blocked','capped');
create table if not exists deliveries (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  campaign_id uuid not null references campaigns(id) on delete cascade,
  creative_id uuid references creatives(id),
  ride_id uuid references rides(id),
  channel text not null default 'sms',
  to_hash text not null,               -- hashed phone/device
  message text not null,
  status delivery_status not null default 'queued',
  provider_id text,                    -- provider message id
  attempts int not null default 0,
  last_error text,
  decided_by_moment uuid references moments(id),
  decided_because text,
  created_at timestamptz not null default now()
);

-- Events (view/click/redemption)
create type event_kind as enum ('view','click','redemption');
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  campaign_id uuid not null references campaigns(id) on delete cascade,
  creative_id uuid references creatives(id),
  delivery_id uuid references deliveries(id),
  kind event_kind not null,
  at timestamptz not null default now(),
  meta jsonb
);

-- Shortlinks & promo codes
create table if not exists shortlinks (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  slug text unique not null,
  destination text not null,
  utm jsonb,
  created_at timestamptz not null default now()
);

create table if not exists promo_codes (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  campaign_id uuid references campaigns(id) on delete cascade,
  code text not null,
  discount_percent int,
  valid_range tstzrange,
  usage_count int not null default 0,
  created_at timestamptz not null default now()
);

-- Billing
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  advertiser_id uuid not null references advertisers(id) on delete cascade,
  amount numeric(14,2) not null,
  currency char(3) not null default 'KES',
  period tstzrange not null,
  status text not null default 'draft', -- draft/sent/paid/void
  meta jsonb,
  created_at timestamptz not null default now()
);

-- Queues
create table if not exists webhooks_queue (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  target_url text not null,
  payload jsonb not null,
  attempts int not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  created_at timestamptz not null default now()
);

create table if not exists sms_queue (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants(id) on delete cascade,
  delivery_id uuid not null references deliveries(id) on delete cascade,
  provider text not null,              -- africa's talking, twilio, etc.
  payload jsonb not null,
  attempts int not null default 0,
  next_attempt_at timestamptz not null default now(),
  last_error text,
  created_at timestamptz not null default now()
);

-- Feature flags & audit
create table if not exists feature_flags (
  key text primary key,
  value boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists audit_log (
  id bigserial primary key,
  tenant_id uuid not null,
  actor_user uuid,
  action text not null,
  entity text,
  entity_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_users_tenant on users(tenant_id);
create index if not exists idx_adv_tenant on advertisers(tenant_id);
create index if not exists idx_campaigns_tenant on campaigns(tenant_id, created_at);
create index if not exists idx_creatives_campaign on creatives(campaign_id);
create index if not exists idx_targets_campaign on targets(campaign_id);
create index if not exists idx_rides_tenant on rides(tenant_id, created_at);
create index if not exists idx_places_geo on places using gist (location);
create index if not exists idx_deliveries_campaign on deliveries(campaign_id, status);
create index if not exists idx_events_campaign on events(campaign_id, kind);
create index if not exists idx_shortlinks_slug on shortlinks(slug);
create index if not exists idx_promo_codes_campaign on promo_codes(campaign_id);

-- Materialized views (skeletons)
create materialized view if not exists mv_campaign_stats_daily as
select
  campaign_id,
  date_trunc('day', at) as day,
  count(*) filter (where kind='view') as views,
  count(*) filter (where kind='click') as clicks,
  count(*) filter (where kind='redemption') as redemptions
from events
group by 1,2;
