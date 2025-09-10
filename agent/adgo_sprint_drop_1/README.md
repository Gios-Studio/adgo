
# AdGo Sprint Drop 1

This bundle includes:
- Supabase schema & RLS (multi-tenant)
- Seed data for Nairobi pilot
- Shared TS types for FE/BE
- API contract stubs & examples
- Feature flags

## Usage

1) Apply schema & RLS
```
psql $DATABASE_URL -f supabase/migrations/0001_init.sql
psql $DATABASE_URL -f supabase/migrations/0002_rls.sql
```

2) Seed demo data
```
psql $DATABASE_URL -f supabase/seed/seed.sql
```

3) Use `packages/types` in FE/BE to keep contracts in sync.

4) Implement routes conforming to `api/contracts` and refer to `api/examples/routes.ts` for flow.

## Notes
- All times & caps should use Africa/Nairobi timezone for pacing.
- PII: prefer hashing device/phone; avoid storing raw phone numbers in `deliveries`/`events`.
- Add provider drivers (Africa's Talking, Twilio) behind a simple interface in the orchestrator.
