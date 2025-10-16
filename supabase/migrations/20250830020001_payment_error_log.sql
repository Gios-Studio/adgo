-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830

create table if not exists payment_errors (
  id bigserial primary key,
  intent_id uuid references payment_intents(id) on delete set null,
  provider payment_provider,
  error_code text,
  error_message text,
  created_at timestamptz not null default now()
);

-- On any update that sets error_code or error_message, keep a row
create or replace function log_payment_error()
returns trigger language plpgsql as $$
begin
  if (new.error_code is not null and (old.error_code is distinct from new.error_code))
     or (new.error_message is not null and (old.error_message is distinct from new.error_message)) then
    insert into payment_errors(intent_id, provider, error_code, error_message)
    values (new.id, new.provider, new.error_code, new.error_message);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_payment_error_log on payment_intents;
create trigger trg_payment_error_log
after update on payment_intents
for each row execute function log_payment_error();