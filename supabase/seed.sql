-- Seed data for AdGo Platform
-- Development and testing data

set search_path = adgo, public;

-- Insert test organization
insert into adgo.orgs (id, name, domain, status) 
values (
  '550e8400-e29b-41d4-a716-446655440000',
  'AdGo Demo Organization',
  'demo.adgo.dev',
  'active'
) on conflict (id) do nothing;

-- Insert test campaigns
insert into adgo.campaigns (id, org_id, name, status, pricing_mode, cpm_cents, budget_cents, start_date, end_date)
values 
  (
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440000',
    'Summer Campaign 2025',
    'active',
    'CPM',
    500,
    100000,
    now() - interval '30 days',
    now() + interval '30 days'
  ),
  (
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440000',
    'Performance Drive',
    'active',
    'CPC',
    null,
    50000,
    now() - interval '15 days',
    now() + interval '45 days'
  )
on conflict (id) do nothing;

-- Insert test creatives
insert into adgo.creatives (id, campaign_id, name, creative_type, creative_url, status)
values
  (
    '770e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    'Summer Banner 728x90',
    'banner',
    'https://cdn.adgo.dev/creative/summer-banner.jpg',
    'active'
  ),
  (
    '770e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440002',
    'Performance Video 30s',
    'video',
    'https://cdn.adgo.dev/creative/perf-video.mp4',
    'active'
  )
on conflict (id) do nothing;

-- Insert HMAC secrets for test org
insert into adgo.org_secrets (org_id, hmac_secret)
values (
  '550e8400-e29b-41d4-a716-446655440000',
  encode(gen_random_bytes(32), 'hex')
) on conflict (org_id) do nothing;