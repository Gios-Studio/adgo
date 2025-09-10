
-- Seed minimal tenant, user, advertiser, campaign, places, a ride, and a moment

-- Tenant & user
insert into tenants (id, name) values ('00000000-0000-0000-0000-000000000001','AdGo Demo') on conflict do nothing;

insert into users (id, tenant_id, email, role)
values ('00000000-0000-0000-0000-0000000000aa','00000000-0000-0000-0000-000000000001','demo@adgo.solutions','admin')
on conflict do nothing;

-- Advertiser
insert into advertisers (id, tenant_id, name, contact_email)
values ('00000000-0000-0000-0000-0000000000ab','00000000-0000-0000-0000-000000000001','ArtCafé','hello@artcafe.co.ke')
on conflict do nothing;

-- Campaign
insert into campaigns (id, tenant_id, advertiser_id, name, status, time_window, goal, cap_daily, budget_total, currency, created_by)
values (
  '00000000-0000-0000-0000-0000000000ac',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-0000000000ab',
  'Morning Coffee Push',
  'active',
  tstzrange(now() - interval '1 day', now() + interval '7 days', '[)'),
  'redemption',
  500,
  100000,
  'KES',
  '00000000-0000-0000-0000-0000000000aa'
) on conflict do nothing;

-- Places (POIs in Nairobi; sample coords)
insert into places (tenant_id, name, category, location, address)
values 
('00000000-0000-0000-0000-000000000001','ArtCafé Village Market','coffee', ST_SetSRID(ST_MakePoint(36.80219,-1.23058),4326),'Village Market, Nairobi'),
('00000000-0000-0000-0000-000000000001','ArtCafé Westgate','coffee', ST_SetSRID(ST_MakePoint(36.79982,-1.26457),4326),'Westgate Mall, Nairobi'),
('00000000-0000-0000-0000-000000000001','LC Waikiki Two Rivers','retail', ST_SetSRID(ST_MakePoint(36.83815,-1.21016),4326),'Two Rivers Mall, Nairobi');

-- Targets (morning coffee near dropoff)
insert into targets (tenant_id, campaign_id, time_of_day, days_of_week, meta)
values (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-0000000000ac',
  array[ int4range(6*60, 11*60) ],
  array[1,2,3,4,5],
  jsonb_build_object('radius_m', 500)
);

-- A sample ride
insert into rides (tenant_id, provider, pickup_point, dropoff_point, pickup_time, dropoff_eta, device_hash)
values (
  '00000000-0000-0000-0000-000000000001',
  'Little',
  ST_SetSRID(ST_MakePoint(36.8219,-1.2921),4326),
  ST_SetSRID(ST_MakePoint(36.80219,-1.23058),4326),
  now()- interval '10 minutes',
  now()+ interval '5 minutes',
  encode(digest('254700000000','sha256'),'hex')
);

-- A default moment rule
insert into moments (tenant_id, name, category, rule)
values (
  '00000000-0000-0000-0000-000000000001',
  'Coffee near dropoff (AM)',
  'coffee_near_drop',
  jsonb_build_object(
    'when', jsonb_build_object('daypart','morning','radius_m',500),
    'poi_category','coffee'
  )
);

-- Feature flags
insert into feature_flags(key, value) values ('enable_sms_dispatch', false)
on conflict (key) do update set value=excluded.value, updated_at=now();

insert into feature_flags(key, value) values ('enable_geo_rules', true)
on conflict (key) do update set value=excluded.value, updated_at=now();
