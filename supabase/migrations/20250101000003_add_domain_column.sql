-- Add missing domain column to orgs table
-- Migration: 20250101000003_add_domain_column.sql

-- Add domain column to orgs table if it doesn't exist
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_schema = 'adgo' 
    and table_name = 'orgs' 
    and column_name = 'domain'
  ) then
    alter table adgo.orgs add column domain text;
  end if;
end $$;

-- Create the domain index
create index if not exists idx_orgs_domain on adgo.orgs(domain);