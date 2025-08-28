-- ============= Enums =============
create type public.task_status as enum ('pending','approved','in_progress','blocked','done','archived');
create type public.output_type as enum (
  'email_pack','sme_starter_pack','kpi_sheet','pr_draft','driver_copy',
  'contract_draft','risk_report','sprint_plan','other'
);

-- ============= Tables =============
create table public.copilot_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status task_status not null default 'pending',
  priority smallint not null default 3,         -- 1=highest, 5=lowest
  owner uuid not null references auth.users (id) on delete cascade,
  created_by uuid references auth.users (id),
  due_date timestamptz,
  city text,                                     -- e.g., 'Nairobi'
  tags text[] default '{}',
  kpi_targets jsonb,                             -- e.g., {"ctr":"1.5-3.5%","ecpm_premium":"+20%"}
  roi_tag jsonb,                                 -- e.g., {"est_rev_usd": 1200, "margin": 0.42}
  approved boolean not null default false,       -- human gate
  external_links jsonb,                          -- {"crm":"...","doc":"..."}
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.copilot_outputs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references public.copilot_tasks (id) on delete set null,
  type output_type not null,
  title text,
  content text,                 -- longform text (emails, PR, driver copy)
  data jsonb,                   -- structured payloads, e.g., rows for CSV
  file_url text,                -- storage link if you export a file
  created_by uuid references auth.users (id),
  approved boolean not null default false,   -- separate approval if needed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============= Indexes =============
create index on public.copilot_tasks (owner, status);
create index on public.copilot_tasks (city);
create index on public.copilot_outputs (task_id, type);

-- ============= Triggers: touch updated_at =============
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger _touch_tasks_updated_at
before update on public.copilot_tasks
for each row execute procedure public.touch_updated_at();

create trigger _touch_outputs_updated_at
before update on public.copilot_outputs
for each row execute procedure public.touch_updated_at();

-- ============= RLS =============
alter table public.copilot_tasks enable row level security;
alter table public.copilot_outputs enable row level security;

-- Policies: Owners can read/write their own rows; created_by also has access.
-- NOTE: Service key bypasses RLS when used server-side.

-- SELECT
create policy "tasks_select_owner_or_creator"
on public.copilot_tasks for select
using ( owner = auth.uid() or created_by = auth.uid() );

create policy "outputs_select_owner_task_or_creator"
on public.copilot_outputs for select
using (
  created_by = auth.uid()
  or task_id in (
    select id from public.copilot_tasks where owner = auth.uid()
  )
);

-- INSERT
create policy "tasks_insert_self_owner"
on public.copilot_tasks for insert
with check ( owner = auth.uid() );

create policy "outputs_insert_creator"
on public.copilot_outputs for insert
with check ( created_by = auth.uid() );

-- UPDATE
create policy "tasks_update_owner_or_creator"
on public.copilot_tasks for update
using ( owner = auth.uid() or created_by = auth.uid() )
with check ( owner = auth.uid() or created_by = auth.uid() );

create policy "outputs_update_creator"
on public.copilot_outputs for update
using ( created_by = auth.uid() )
with check ( created_by = auth.uid() );

-- (Optional) DELETE for owner/creator
create policy "tasks_delete_owner_or_creator"
on public.copilot_tasks for delete
using ( owner = auth.uid() or created_by = auth.uid() );

create policy "outputs_delete_creator"
on public.copilot_outputs for delete
using ( created_by = auth.uid() );

-- Tip: Keep admin/service ops server-side with the service role key.
