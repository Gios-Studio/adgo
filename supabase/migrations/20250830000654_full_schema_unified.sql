-- =====================================================================
-- AdGo Unified Schema (idempotent; safe to re-run)
-- =====================================================================

---------------------------
-- EXTENSIONS & HELPERS  --
---------------------------
create extension if not exists pgcrypto;

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

-- Generic helper used by copilot tables
create or replace function touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

-- Admin helper (used in policies)
create or replace function is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

----------------
-- ENUM GUARDS --
----------------
do $$ begin
  if not exists (select 1 from pg_type where typname='user_role') then
    create type user_role as enum ('advertiser','admin');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname='ad_status') then
    create type ad_status as enum ('draft','active','paused','archived');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname='campaign_status') then
    create type campaign_status as enum ('draft','scheduled','running','paused','ended');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname='txn_type') then
    create type txn_type as enum ('credit','debit');
  end if;
end $$;

-- Copilot enums
do $$ begin
  if not exists (select 1 from pg_type where typname='task_status') then
    create type public.task_status as enum ('pending','approved','in_progress','blocked','done','archived');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname='output_type') then
    create type public.output_type as enum (
      'email_pack','sme_starter_pack','kpi_sheet','pr_draft','driver_copy',
      'contract_draft','risk_report','sprint_plan','other'
    );
  end if;
end $$;

-- Ensure all intended output_type labels exist (append-only)
do $$ begin
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='email_pack') then
    alter type public.output_type add value 'email_pack';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='sme_starter_pack') then
    alter type public.output_type add value 'sme_starter_pack';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='kpi_sheet') then
    alter type public.output_type add value 'kpi_sheet';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='pr_draft') then
    alter type public.output_type add value 'pr_draft';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='driver_copy') then
    alter type public.output_type add value 'driver_copy';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='contract_draft') then
    alter type public.output_type add value 'contract_draft';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='risk_report') then
    alter type public.output_type add value 'risk_report';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='sprint_plan') then
    alter type public.output_type add value 'sprint_plan';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='output_type' and e.enumlabel='other') then
    alter type public.output_type add value 'other';
  end if;
end $$;

-- Payments enums
do $$ begin
  if not exists (select 1 from pg_type where typname='payment_provider') then
    create type payment_provider as enum ('mpesa','airtel_money','other');
  end if;
end $$;

-- extend payment_provider with common providers
do $$ begin
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='mtn_momo') then
    alter type payment_provider add value 'mtn_momo';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='tigo_pesa') then
    alter type payment_provider add value 'tigo_pesa';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='vodafone_cash') then
    alter type payment_provider add value 'vodafone_cash';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='orange_money') then
    alter type payment_provider add value 'orange_money';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='bkash') then
    alter type payment_provider add value 'bkash';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='gcash') then
    alter type payment_provider add value 'gcash';
  end if;
  if not exists (select 1 from pg_enum e join pg_type t on e.enumtypid=t.oid where t.typname='payment_provider' and e.enumlabel='paytm') then
    alter type payment_provider add value 'paytm';
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname='payment_channel') then
    create type payment_channel as enum ('mobile_money','card','bank');
  end if;
end $$;

-------------------------
-- CORE TABLES (CREATE) --
-------------------------
create table if not exists profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  role user_role not null default 'advertiser',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  description text,
  status ad_status not null default 'draft',
  media_primary uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  ad_id uuid references ads(id) on delete cascade,
  kind text check (kind in ('image','video','html','other')) default 'image',
  url text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  status campaign_status not null default 'draft',
  start_at timestamptz,
  end_at timestamptz,
  targeting jsonb default '{}'::jsonb,
  budget_cents bigint check (budget_cents >= 0) default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaign_ads (
  campaign_id uuid not null references campaigns(id) on delete cascade,
  ad_id uuid not null references ads(id) on delete cascade,
  position int default 0,
  created_at timestamptz not null default now(),
  primary key (campaign_id, ad_id)
);

create table if not exists analytics_events (
  id bigserial primary key,
  campaign_id uuid references campaigns(id) on delete set null,
  ad_id uuid references ads(id) on delete set null,
  event_type text check (event_type in ('impression','click')) not null,
  device_id text,
  region text,
  meta jsonb default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists wallets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  currency text not null default 'KES',
  balance_cents bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, currency)
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references wallets(id) on delete cascade,
  created_by uuid references profiles(id) on delete set null,
  type txn_type not null,
  amount_cents bigint not null check (amount_cents > 0),
  ref text,
  memo text,
  created_at timestamptz not null default now()
);

------------------------------
-- RECONCILE EXISTING SHAPES --
------------------------------
-- profiles: ensure email and index
alter table profiles add column if not exists email text;
update profiles p
set email = u.email
from auth.users u
where p.id = u.id and (p.email is null or p.email = '');
create unique index if not exists idx_profiles_email on profiles (email);

-- ads: ensure required columns exist
do $$ begin
  if not exists (select 1 from information_schema.columns where table_name='ads' and column_name='owner_id') then
    alter table ads add column owner_id uuid;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='ads' and column_name='title') then
    alter table ads add column title text;
    update ads set title = coalesce(title, 'Untitled');
    alter table ads alter column title set default 'Untitled';
    alter table ads alter column title set not null;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='ads' and column_name='description') then
    alter table ads add column description text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='ads' and column_name='status') then
    alter table ads add column status ad_status;
    update ads set status = 'draft' where status is null;
    alter table ads alter column status set default 'draft';
  end if;
  if not exists (select 1 from information_schema.columns where table_name='ads' and column_name='updated_at') then
    alter table ads add column updated_at timestamptz default now();
  end if;
end $$;

-- campaigns: ensure required columns (particularly owner_id) before indexes/FKs
do $$ begin
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='owner_id') then
    alter table campaigns add column owner_id uuid;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='name') then
    alter table campaigns add column name text;
    update campaigns set name = coalesce(name, 'Untitled Campaign');
    alter table campaigns alter column name set default 'Untitled Campaign';
    alter table campaigns alter column name set not null;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='status') then
    alter table campaigns add column status campaign_status;
    update campaigns set status = 'draft' where status is null;
    alter table campaigns alter column status set default 'draft';
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='start_at') then
    alter table campaigns add column start_at timestamptz;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='end_at') then
    alter table campaigns add column end_at timestamptz;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='targeting') then
    alter table campaigns add column targeting jsonb default '{}'::jsonb;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='budget_cents') then
    alter table campaigns add column budget_cents bigint;
    update campaigns set budget_cents = coalesce(budget_cents, 0);
    alter table campaigns alter column budget_cents set default 0;
    do $$ begin
      if not exists (select 1 from pg_constraint where conname='chk_campaigns_budget_nonneg') then
        alter table campaigns add constraint chk_campaigns_budget_nonneg check (budget_cents >= 0);
      end if;
    end $$;
  end if;
  if not exists (select 1 from information_schema.columns where table_name='campaigns' and column_name='updated_at') then
    alter table campaigns add column updated_at timestamptz default now();
  end if;
end $$;

-- FK guarantees
do $$ begin
  if not exists (select 1 from pg_constraint where conname='ads_owner_id_fkey') then
    alter table ads add constraint ads_owner_id_fkey
      foreign key (owner_id) references profiles(id) on delete cascade;
  end if;
  if not exists (select 1 from pg_constraint where conname='campaigns_owner_id_fkey') then
    alter table campaigns add constraint campaigns_owner_id_fkey
      foreign key (owner_id) references profiles(id) on delete cascade;
  end if;
end $$;

----------------
-- INDEXES    --
----------------
create index if not exists idx_ads_owner  on ads (owner_id);
create index if not exists idx_ads_status on ads (status);

create index if not exists idx_media_owner on media_assets (owner_id);
create index if not exists idx_media_ad    on media_assets (ad_id);

create index if not exists idx_campaigns_owner  on campaigns (owner_id);
create index if not exists idx_campaigns_status on campaigns (status);
create index if not exists idx_campaigns_time   on campaigns (start_at, end_at);

create index if not exists idx_campaign_ads_campaign on campaign_ads (campaign_id);
create index if not exists idx_campaign_ads_ad       on campaign_ads (ad_id);

create index if not exists idx_analytics_by_ad       on analytics_events (ad_id, event_type, occurred_at);
create index if not exists idx_analytics_by_campaign on analytics_events (campaign_id, event_type, occurred_at);

create index if not exists idx_wallets_owner on wallets (owner_id);
create index if not exists idx_tx_wallet_time on transactions (wallet_id, created_at desc);

--------------------------
-- UPDATED_AT TRIGGERS  --
--------------------------
drop trigger if exists trg_profiles_updated_at  on profiles;
create trigger trg_profiles_updated_at  before update on profiles  for each row execute function set_updated_at();

drop trigger if exists trg_ads_updated_at       on ads;
create trigger trg_ads_updated_at       before update on ads       for each row execute function set_updated_at();

drop trigger if exists trg_campaigns_updated_at on campaigns;
create trigger trg_campaigns_updated_at before update on campaigns for each row execute function set_updated_at();

drop trigger if exists trg_wallets_updated_at   on wallets;
create trigger trg_wallets_updated_at   before update on wallets   for each row execute function set_updated_at();

----------------------------
-- AUTH SIGNUP AUTO-SEED  --
----------------------------
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  insert into wallets (owner_id, currency)
  values (new.id, 'KES')
  on conflict (owner_id, currency) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function handle_new_user();

-----------------------------
-- RLS + SECURITY POLICIES --
-----------------------------
alter table if exists profiles      enable row level security;
alter table if exists ads           enable row level security;
alter table if exists media_assets  enable row level security;
alter table if exists campaigns     enable row level security;
alter table if exists campaign_ads  enable row level security;
alter table if exists wallets       enable row level security;
alter table if exists transactions  enable row level security;

-- profiles
drop policy if exists "read own profile"   on profiles;
create policy "read own profile"   on profiles for select using (id = auth.uid() or is_admin());

drop policy if exists "update own profile" on profiles;
create policy "update own profile" on profiles for update using (id = auth.uid() or is_admin());

drop policy if exists "no direct insert profiles" on profiles;
create policy "no direct insert profiles" on profiles for insert with check (false);

-- ads
drop policy if exists "select own ads or admin" on ads;
create policy "select own ads or admin" on ads for select using (owner_id = auth.uid() or is_admin());

drop policy if exists "insert own ads" on ads;
create policy "insert own ads" on ads for insert with check (owner_id = auth.uid() or is_admin());

drop policy if exists "update own ads" on ads;
create policy "update own ads" on ads for update using (owner_id = auth.uid() or is_admin());

drop policy if exists "delete own ads" on ads;
create policy "delete own ads" on ads for delete using (owner_id = auth.uid() or is_admin());

-- media_assets
drop policy if exists "select own media or admin" on media_assets;
create policy "select own media or admin" on media_assets for select using (owner_id = auth.uid() or is_admin());

drop policy if exists "insert own media" on media_assets;
create policy "insert own media" on media_assets for insert with check (owner_id = auth.uid() or is_admin());

drop policy if exists "update own media" on media_assets;
create policy "update own media" on media_assets for update using (owner_id = auth.uid() or is_admin());

drop policy if exists "delete own media" on media_assets;
create policy "delete own media" on media_assets for delete using (owner_id = auth.uid() or is_admin());

-- campaigns
drop policy if exists "select own campaigns or admin" on campaigns;
create policy "select own campaigns or admin" on campaigns for select using (owner_id = auth.uid() or is_admin());

drop policy if exists "insert own campaigns" on campaigns;
create policy "insert own campaigns" on campaigns for insert with check (owner_id = auth.uid() or is_admin());

drop policy if exists "update own campaigns" on campaigns;
create policy "update own campaigns" on campaigns for update using (owner_id = auth.uid() or is_admin());

drop policy if exists "delete own campaigns" on campaigns;
create policy "delete own campaigns" on campaigns for delete using (owner_id = auth.uid() or is_admin());

-- campaign_ads (must own both sides or be admin)
drop policy if exists "manage own campaign_ads" on campaign_ads;
create policy "manage own campaign_ads" on campaign_ads
for all
using (
  is_admin()
  or (
    exists (select 1 from campaigns c where c.id = campaign_ads.campaign_id and c.owner_id = auth.uid())
    and exists (select 1 from ads a       where a.id = campaign_ads.ad_id       and a.owner_id = auth.uid())
  )
)
with check (
  is_admin()
  or (
    exists (select 1 from campaigns c where c.id = campaign_ads.campaign_id and c.owner_id = auth.uid())
    and exists (select 1 from ads a       where a.id = campaign_ads.ad_id       and a.owner_id = auth.uid())
  )
);

-- wallets
drop policy if exists "select own wallets or admin" on wallets;
create policy "select own wallets or admin" on wallets for select using (owner_id = auth.uid() or is_admin());

drop policy if exists "insert own wallets" on wallets;
create policy "insert own wallets" on wallets for insert with check (owner_id = auth.uid() or is_admin());

drop policy if exists "update own wallets admin only" on wallets;
create policy "update own wallets admin only" on wallets for update using (is_admin());

-- transactions
drop policy if exists "select wallet transactions" on transactions;
create policy "select wallet transactions" on transactions
for select using (
  is_admin() or exists (select 1 from wallets w where w.id = transactions.wallet_id and w.owner_id = auth.uid())
);

drop policy if exists "insert wallet transactions" on transactions;
create policy "insert wallet transactions" on transactions
for insert with check (
  is_admin() or exists (select 1 from wallets w where w.id = transactions.wallet_id and w.owner_id = auth.uid())
);

---------------------------------
-- MOBILE MONEY / PAYMENTS     --
---------------------------------
create table if not exists payment_intents (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references wallets(id) on delete cascade,
  created_by uuid references profiles(id) on delete set null,
  provider payment_provider not null default 'mpesa',
  channel payment_channel not null default 'mobile_money',
  provider_code text,                  -- e.g. 'mpesa_ke','airtel_ke','mtn_rw'
  country char(2) default 'KE',
  phone_e164 text,                     -- +2547xxxxxxx
  amount_cents bigint not null check (amount_cents > 0),
  currency text not null default 'KES',
  status text not null default 'pending', -- keep text for forward-compat if you prefer; or use payment_status enum if defined
  provider_session_id text,
  provider_checkout_url text,
  external_txn_id text,
  external_receipt text,
  error_code text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payment_events (
  id bigserial primary key,
  intent_id uuid not null references payment_intents(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Constraints/checks
do $$ begin
  if not exists (select 1 from pg_constraint where conname='chk_payment_intents_country_iso2') then
    alter table payment_intents add constraint chk_payment_intents_country_iso2
      check (country ~ '^[A-Z]{2}$');
  end if;
  if not exists (select 1 from pg_constraint where conname='chk_payment_intents_phone_e164') then
    alter table payment_intents add constraint chk_payment_intents_phone_e164
      check (phone_e164 is null or phone_e164 ~ '^\+[1-9][0-9]{6,14}$');
  end if;
end $$;

-- Indexes
create index if not exists idx_pi_wallet_time on payment_intents (wallet_id, created_at desc);
create index if not exists idx_pi_status_time on payment_intents (status, created_at desc);
create index if not exists idx_pi_ext_txn on payment_intents (external_txn_id);
create index if not exists idx_pe_intent_time on payment_events (intent_id, created_at desc);

-- Unique to prevent double-credit across providers
do $$ begin
  if exists (select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
             where c.relname='uniq_pi_wallet_external_txn_id' and n.nspname='public') then
    drop index if exists uniq_pi_wallet_external_txn_id;
  end if;
  if not exists (select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
                 where c.relname='uniq_pi_wallet_provider_external_txn' and n.nspname='public') then
    create unique index uniq_pi_wallet_provider_external_txn
      on payment_intents (wallet_id, provider, external_txn_id)
      where external_txn_id is not null;
  end if;
end $$;

-- updated_at trigger
drop trigger if exists trg_pi_updated_at on payment_intents;
create trigger trg_pi_updated_at
before update on payment_intents
for each row execute function set_updated_at();

-- Credit wallet on first success
create or replace function credit_wallet_on_payment_success()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  if tg_op='UPDATE' and new.status='succeeded' and (old.status is distinct from new.status) then
    insert into transactions (wallet_id, created_by, type, amount_cents, ref, memo)
    values (new.wallet_id, new.created_by, 'credit', new.amount_cents,
            coalesce(new.external_txn_id, new.provider_session_id),
            concat('Top-up via ', new.provider::text))
    on conflict do nothing;

    update wallets
       set balance_cents = balance_cents + new.amount_cents,
           updated_at = now()
     where id = new.wallet_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_pi_credit_on_success on payment_intents;
create trigger trg_pi_credit_on_success
after update on payment_intents
for each row execute function credit_wallet_on_payment_success();

-- RLS for payments
alter table if exists payment_intents enable row level security;
alter table if exists payment_events  enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='payment_intents' and policyname='select own payment_intents') then
    create policy "select own payment_intents" on payment_intents
    for select using (
      exists (select 1 from wallets w where w.id = payment_intents.wallet_id and w.owner_id = auth.uid())
      or payment_intents.created_by = auth.uid()
    );
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='payment_events' and policyname='select own payment_events') then
    create policy "select own payment_events" on payment_events
    for select using (
      exists (
        select 1 from payment_intents pi
        join wallets w on w.id = pi.wallet_id
        where pi.id = payment_events.intent_id and w.owner_id = auth.uid()
      )
    );
  end if;
end $$;

-- Lock writes to service role
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='payment_intents' and policyname='service can write payment_intents') then
    create policy "service can write payment_intents" on payment_intents
    for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='payment_events' and policyname='service can write payment_events') then
    create policy "service can write payment_events" on payment_events
    for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
end $$;

-------------------------
-- COPILOT SUB-SCHEMA  --
-------------------------
-- Minimal example tables; adapt to your actual copilot structure

create table if not exists copilot_projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists copilot_outputs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references copilot_projects(id) on delete cascade,
  owner_id uuid references profiles(id) on delete cascade,
  kind output_type not null,
  title text,
  body jsonb not null default '{}'::jsonb,
  status task_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Triggers (idempotent)
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = '_touch_outputs_updated_at') then
    create trigger _touch_outputs_updated_at
    before update on public.copilot_outputs
    for each row execute procedure public.touch_updated_at();
  end if;
end $$;

-- Basic RLS
alter table if exists copilot_projects enable row level security;
alter table if exists copilot_outputs  enable row level security;

drop policy if exists "select own copilot_projects" on copilot_projects;
create policy "select own copilot_projects" on copilot_projects
for select using (owner_id = auth.uid() or is_admin());

drop policy if exists "write own copilot_projects" on copilot_projects;
create policy "write own copilot_projects" on copilot_projects
for all using (owner_id = auth.uid() or is_admin())
with check (owner_id = auth.uid() or is_admin());

drop policy if exists "select own copilot_outputs" on copilot_outputs;
create policy "select own copilot_outputs" on copilot_outputs
for select using (owner_id = auth.uid() or is_admin());

drop policy if exists "write own copilot_outputs" on copilot_outputs;
create policy "write own copilot_outputs" on copilot_outputs
for all using (owner_id = auth.uid() or is_admin())
with check (owner_id = auth.uid() or is_admin());

-- Done
-- =====================================================================