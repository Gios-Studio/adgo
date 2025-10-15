-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830

-- Add text-only ad support and language options to ads table
-- This migration adds support for text-based advertisements with multi-language capabilities

-- Add new columns for text ads and language support
alter table public.ads 
add column if not exists ad_text text,
add column if not exists language text default 'en',
add column if not exists ad_type text default 'media' check (ad_type in ('media', 'text')),
add column if not exists cta_link text,
add column if not exists text_style jsonb default '{"backgroundColor": "#ffffff", "textColor": "#000000", "fontSize": "16px", "fontWeight": "normal"}'::jsonb;

-- Add comments for documentation
comment on column public.ads.ad_text is 'Text content for text-only advertisements (max 180 characters)';
comment on column public.ads.language is 'Language code (en, sw, fr, ar) for localized ads';
comment on column public.ads.ad_type is 'Type of advertisement: media (image/video) or text';
comment on column public.ads.cta_link is 'Optional call-to-action link for text ads';
comment on column public.ads.text_style is 'JSON styling options for text ads (colors, fonts, etc.)';

-- Create index for language-based queries
create index if not exists ads_language_idx on public.ads(language);
create index if not exists ads_type_idx on public.ads(ad_type);
create index if not exists ads_language_type_idx on public.ads(language, ad_type);

-- Add constraint to ensure text ads have ad_text
alter table public.ads 
add constraint check_text_ad_content 
check (
  (ad_type = 'media' and media_url is not null) or 
  (ad_type = 'text' and ad_text is not null and length(ad_text) <= 180)
);

-- Create function to validate ad content based on type
create or replace function public.validate_ad_content()
returns trigger as $$
begin
  -- Validate text ads have content and are within character limit
  if new.ad_type = 'text' then
    if new.ad_text is null or length(trim(new.ad_text)) = 0 then
      raise exception 'Text ads must have ad_text content';
    end if;
    
    if length(new.ad_text) > 180 then
      raise exception 'Text ads cannot exceed 180 characters';
    end if;
    
    -- Validate CTA link format if provided
    if new.cta_link is not null and new.cta_link != '' then
      if not (new.cta_link ~* '^https?://') then
        raise exception 'CTA link must be a valid URL starting with http:// or https://';
      end if;
    end if;
  end if;
  
  -- Validate media ads have media_url
  if new.ad_type = 'media' then
    if new.media_url is null or length(trim(new.media_url)) = 0 then
      raise exception 'Media ads must have media_url';
    end if;
  end if;
  
  -- Validate language code
  if new.language not in ('en', 'sw', 'fr', 'ar') then
    raise exception 'Language must be one of: en, sw, fr, ar';
  end if;
  
  return new;
end;
$$ language plpgsql;

-- Create trigger for ad content validation
drop trigger if exists validate_ad_content_trigger on public.ads;
create trigger validate_ad_content_trigger
  before insert or update on public.ads
  for each row execute function public.validate_ad_content();

-- Create view for text ads analytics
create or replace view public.text_ads_analytics as
select 
  language,
  count(*) as total_text_ads,
  count(case when status = 'active' then 1 end) as active_text_ads,
  avg(length(ad_text)) as avg_text_length,
  count(case when cta_link is not null then 1 end) as ads_with_cta
from public.ads 
where ad_type = 'text'
group by language;

-- Grant permissions for text ads view
grant select on public.text_ads_analytics to authenticated;
grant select on public.text_ads_analytics to service_role;

-- Update RLS policies to include new columns
-- (Existing RLS policies will automatically apply to new columns)

-- Create function to get localized ad content
create or replace function public.get_localized_ads(
  p_language text default 'en',
  p_ad_type text default null,
  p_limit integer default 10
)
returns table (
  id uuid,
  title text,
  ad_text text,
  media_url text,
  language text,
  ad_type text,
  cta_link text,
  text_style jsonb,
  created_at timestamptz
) as $$
begin
  return query
  select 
    a.id,
    a.title,
    a.ad_text,
    a.media_url,
    a.language,
    a.ad_type,
    a.cta_link,
    a.text_style,
    a.created_at
  from public.ads a
  where 
    a.status = 'active'
    and a.language = p_language
    and (p_ad_type is null or a.ad_type = p_ad_type)
  order by a.created_at desc
  limit p_limit;
end;
$$ language plpgsql;

-- Grant execute permissions
grant execute on function public.get_localized_ads to authenticated;
grant execute on function public.get_localized_ads to service_role;

-- Add sample text ads for testing (optional)
insert into public.ads (
  id,
  title,
  ad_text,
  language,
  ad_type,
  status,
  user_id,
  campaign_id,
  cta_link
) values 
-- English text ad
(
  gen_random_uuid(),
  'Sample English Text Ad',
  'Experience the future of mobile advertising in Kenya. Join thousands of drivers earning extra income with AdGo!',
  'en',
  'text',
  'active',
  (select id from auth.users limit 1),
  null,
  'https://adgosolutions.com/signup'
),
-- Swahili text ad
(
  gen_random_uuid(),
  'Tangazo la Kiswahili',
  'Jiunge na AdGo leo na uanze kupata pesa za ziada kama dereva. Huduma mpya ya matangazo Kenya!',
  'sw',
  'text',
  'active',
  (select id from auth.users limit 1),
  null,
  'https://adgosolutions.com/jiunge'
)
on conflict do nothing;