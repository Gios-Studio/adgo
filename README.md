
# AdGo BE Pack v1 (Supabase)

## What you get
- SQL (`adgo_be.sql`): events ingest tables, HMAC secret store, idempotency table, materialized views, pg_cron jobs, pacing function.
- Edge functions:
  - `impression/` and `click/`: HMAC + Idempotency ingest.
  - `process-creative/`: validate + checksum + approve/reject creative.
  - `pacing-check/`: RPC to DB `can_serve` for pre-serve guard.

## One-time setup
1. Run SQL: open Supabase → SQL Editor → run `adgo_be.sql`.
2. In **Project Settings → API**, note `SUPABASE_URL` and **Service Role** key.
3. Create edge function env vars for each function:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Insert an org secret:
```sql
insert into adgo.org_secrets (org_id, hmac_secret)
values ('<your-org-uuid>', '<random 64-char hex>');
```

## Deploy functions
```bash
supabase functions deploy impression --no-verify-jwt
supabase functions deploy click --no-verify-jwt
supabase functions deploy process-creative --no-verify-jwt
supabase functions deploy pacing-check --no-verify-jwt
```
(We use `--no-verify-jwt` because we authenticate via HMAC/org secret for ingest and server role for pacing.)

## Call examples

### Impression
```bash
BODY='{"campaign_id":"<uuid>","creative_id":"<uuid>","device_id":"abc123"}'
SIG=$(node -e "const c=require('crypto');const key=Buffer.from(process.argv[1],'hex');const b=Buffer.from(process.argv[2]);console.log(c.createHmac('sha256',key).update(b).digest('hex'));"
  <hex_secret> "$BODY")
curl -s -X POST "https://<project>.functions.supabase.co/impression"   -H "Content-Type: application/json"   -H "X-AdGo-Org: <org_uuid>"   -H "X-AdGo-Signature: $SIG"   -H "Idempotency-Key: $(uuidgen)"   -d "$BODY"
```

### Process Creative
```bash
curl -s -X POST "https://<project>.functions.supabase.co/process-creative"   -H "Content-Type: application/json"   -d '{"org_id":"<org>","campaign_id":"<camp>","creative_id":"<cr>","bucket":"creatives","path":"<filePath>"}'
```

### Pacing Check
```bash
curl -s "https://<project>.functions.supabase.co/pacing-check?campaign_id=<uuid>"
```

## Notes
- Aggregations refresh **hourly** + **daily** via pg_cron; change schedules if needed.
- Dedupe keys auto-clean after 24h.
- `process-creative` intentionally keeps dimension/duration null to keep it lightweight. We can add image/video probes later.
# redeploy
