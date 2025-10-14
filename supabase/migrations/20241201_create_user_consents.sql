-- Create user_consents table for GDPR/Kenya DPA compliance
create table if not exists public.user_consents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  consents jsonb not null default '{
    "necessary": true,
    "functional": false,
    "analytics": false,
    "marketing": false
  }'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster lookups
create index if not exists user_consents_user_id_idx on public.user_consents(user_id);
create index if not exists user_consents_created_at_idx on public.user_consents(created_at desc);

-- Enable RLS
alter table public.user_consents enable row level security;

-- RLS Policies
-- Users can only see/modify their own consent records
create policy "Users can view own consent records" on public.user_consents
  for select using (auth.uid() = user_id);

create policy "Users can insert own consent records" on public.user_consents
  for insert with check (auth.uid() = user_id);

create policy "Users can update own consent records" on public.user_consents
  for update using (auth.uid() = user_id);

create policy "Users can delete own consent records" on public.user_consents
  for delete using (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger handle_user_consents_updated_at
  before update on public.user_consents
  for each row execute function public.handle_updated_at();

-- Grant permissions
grant all on public.user_consents to authenticated;
grant all on public.user_consents to service_role;