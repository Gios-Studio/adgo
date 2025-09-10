
-- AdGo Supabase Schema - 0002_rls.sql
alter table tenants enable row level security;
alter table users enable row level security;
alter table advertisers enable row level security;
alter table campaigns enable row level security;
alter table creatives enable row level security;
alter table targets enable row level security;
alter table ad_slots enable row level security;
alter table rides enable row level security;
alter table places enable row level security;
alter table moments enable row level security;
alter table context_signals enable row level security;
alter table deliveries enable row level security;
alter table events enable row level security;
alter table shortlinks enable row level security;
alter table promo_codes enable row level security;
alter table invoices enable row level security;
alter table webhooks_queue enable row level security;
alter table sms_queue enable row level security;
alter table audit_log enable row level security;

-- Helper function: current user's tenant
create or replace function auth.tenant_id() returns uuid language sql stable as $$
  select (auth.jwt() ->> 'tenant_id')::uuid;
$$;

-- Generic tenant isolation policy
do $$
declare t record;
begin
  for t in
    select 'users' as tbl union all
    select 'advertisers' union all
    select 'campaigns' union all
    select 'creatives' union all
    select 'targets' union all
    select 'ad_slots' union all
    select 'rides' union all
    select 'places' union all
    select 'moments' union all
    select 'context_signals' union all
    select 'deliveries' union all
    select 'events' union all
    select 'shortlinks' union all
    select 'promo_codes' union all
    select 'invoices' union all
    select 'webhooks_queue' union all
    select 'sms_queue' union all
    select 'audit_log'
  loop
    execute format($fp$
      create policy %I_isolation_select on %I
        for select using (tenant_id() = %I.tenant_id);
    $fp$, t.tbl, t.tbl, t.tbl);
    execute format($fp$
      create policy %I_isolation_mod on %I
        for all using (tenant_id() = %I.tenant_id)
        with check (tenant_id() = %I.tenant_id);
    $fp$, t.tbl, t.tbl, t.tbl, t.tbl);
  end loop;
end $$;

-- Admin bypass (assumes role in JWT)
create or replace function auth.is_admin() returns boolean language sql stable as $$
  select coalesce(auth.jwt()->>'role','') = 'admin';
$$;

-- Allow admins full access
do $$
declare t record;
begin
  for t in
    select 'users' as tbl union all
    select 'advertisers' union all
    select 'campaigns' union all
    select 'creatives' union all
    select 'targets' union all
    select 'ad_slots' union all
    select 'rides' union all
    select 'places' union all
    select 'moments' union all
    select 'context_signals' union all
    select 'deliveries' union all
    select 'events' union all
    select 'shortlinks' union all
    select 'promo_codes' union all
    select 'invoices' union all
    select 'webhooks_queue' union all
    select 'sms_queue' union all
    select 'audit_log'
  loop
    execute format($fp$
      create policy %I_admin_all on %I
        for all using (auth.is_admin());
    $fp$, t.tbl, t.tbl);
  end loop;
end $$;
