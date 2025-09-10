
-- ops/feature_flags.sql
-- easy toggles in prod without redeploy
insert into feature_flags(key, value) values ('enable_sms_dispatch', false) on conflict (key) do nothing;
insert into feature_flags(key, value) values ('enable_geo_rules', true) on conflict (key) do nothing;
