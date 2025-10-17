-- Initial AdGo Database Schema
-- Migration: 20250101000000_initial_schema.sql

-- Enable required extensions
create extension if not exists pgcrypto;
create extension if not exists pg_stat_statements;
create extension if not exists pg_cron;

-- Create the adgo schema
create schema if not exists adgo;
set search_path = adgo, public;

-- Organizations table
create table if not exists adgo.orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text,
  status text not null default 'active' check (status in ('active', 'suspended', 'deleted')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Org members table
create table if not exists adgo.org_members (
  org_id uuid not null references adgo.orgs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member', 'viewer')),
  created_at timestamptz default now(),
  primary key (org_id, user_id)
);

-- Campaigns table
create table if not exists adgo.campaigns (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references adgo.orgs(id) on delete cascade,
  name text not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed')),
  pricing_mode text not null default 'CPM' check (pricing_mode in ('CPM', 'CPC')),
  cpm_cents integer,
  cpc_cents integer,
  budget_cents integer,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Creatives table
create table if not exists adgo.creatives (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references adgo.campaigns(id) on delete cascade,
  name text not null,
  creative_type text not null default 'banner' check (creative_type in ('banner', 'video', 'native')),
  creative_url text,
  creative_data jsonb,
  status text not null default 'active' check (status in ('active', 'paused', 'rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes
create index if not exists idx_orgs_domain on adgo.orgs(domain);
create index if not exists idx_org_members_user on adgo.org_members(user_id);
create index if not exists idx_campaigns_org on adgo.campaigns(org_id);
create index if not exists idx_campaigns_status on adgo.campaigns(status);
create index if not exists idx_creatives_campaign on adgo.creatives(campaign_id);

-- RLS helper function
create or replace function adgo.is_org_member(user_id uuid, org_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from adgo.org_members 
    where org_members.user_id = is_org_member.user_id 
    and org_members.org_id = is_org_member.org_id
  );
end;
$$ language plpgsql security definer;

-- Enable RLS
alter table adgo.orgs enable row level security;
alter table adgo.org_members enable row level security;
alter table adgo.campaigns enable row level security;
alter table adgo.creatives enable row level security;

-- RLS policies
create policy orgs_policy on adgo.orgs
  for all using (adgo.is_org_member(auth.uid(), id));

create policy org_members_policy on adgo.org_members
  for all using (adgo.is_org_member(auth.uid(), org_id));

create policy campaigns_policy on adgo.campaigns
  for all using (adgo.is_org_member(auth.uid(), org_id));

create policy creatives_policy on adgo.creatives
  using (adgo.is_org_member(auth.uid(), (select org_id from adgo.campaigns where id = campaign_id)));