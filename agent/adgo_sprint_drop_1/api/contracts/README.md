
# AdGo API Contracts (Stubs)

**Routes (intended for Next.js App Router or any Node server):**
- `POST /api/campaigns` → create/update campaigns
- `POST /api/creatives/upload` → sign URL & insert creative
- `POST /api/deliveries/plan` → preview audience size
- `POST /api/deliveries/dispatch` → enqueue to sms_queue
- `POST /api/events` → track view/click/redemption
- `GET /api/reports/summary?campaign_id=...` → aggregated stats

Each route should validate against the shared types in `packages/types`.
