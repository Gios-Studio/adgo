-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830

-- Admin-only views
create or replace view v_admin_users as
select p.id as user_id, p.email, p.full_name, p.role, w.balance_cents
from profiles p
left join wallets w on w.owner_id = p.id and w.currency='KES';

create or replace view v_admin_payments as
select pi.*, w.owner_id
from payment_intents pi
join wallets w on w.id = pi.wallet_id;

-- RLS for admin views (select allowed only for admins)
alter view v_admin_users set (security_invoker = false);
alter view v_admin_payments set (security_invoker = false);

-- Wrap in definer RPCs that only return if admin
create or replace function rpc_admin_users()
returns setof v_admin_users
language sql security definer set search_path=public as $$
  select * from v_admin_users where is_admin();
$$;

create or replace function rpc_admin_payments()
returns setof v_admin_payments
language sql security definer set search_path=public as $$
  select * from v_admin_payments where is_admin();
$$;