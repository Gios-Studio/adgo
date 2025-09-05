Goal: Insert minimal but realistic data so pages show something. Inserts must be idempotent and owned by the signed-in user’s profile.

Pre-req inputs (ask user or read from config)
	•	OWNER_EMAIL (the email used to sign in during dev)
	•	Currency: KES (default)

    Create a SQL seed script supabase/sql/seed_minimal.sql:

    -- Seed minimal data for the developer’s account.
-- Replace OWNER_EMAIL before running (or parametrize via CLI env).
with me as (select id from profiles where email = 'OWNER_EMAIL')

-- Wallet (KES 2,500)
insert into wallets (owner_id, currency, balance_cents)
select id, 'KES', 250000 from me
on conflict (owner_id, currency) do nothing;

-- One ad
insert into ads (id, owner_id, title, status)
select gen_random_uuid(), id, 'Welcome Ad', 'active' from me
on conflict do nothing;

-- One running campaign (now-2d → now+5d)
insert into campaigns (id, owner_id, name, status, start_at, end_at, budget_cents)
select gen_random_uuid(), id, 'Launch Campaign', 'running',
       now() - interval '2 days', now() + interval '5 days', 500000
from me
on conflict do nothing;

-- Credit transaction (KES 1,500)
insert into transactions (id, wallet_id, created_by, type, amount_cents, ref, memo)
select gen_random_uuid(), w.id, w.owner_id, 'credit', 150000, 'SEED-001', 'Initial top-up'
from wallets w join me on me.id = w.owner_id and w.currency='KES'
on conflict do nothing;

-- Two simple analytics events
insert into analytics_events (campaign_id, ad_id, event_type, region)
select c.id, a.id, 'impression', 'Nairobi'
from campaigns c join ads a on a.owner_id = c.owner_id join me on me.id = c.owner_id
limit 1;

insert into analytics_events (campaign_id, ad_id, event_type, region)
select c.id, a.id, 'click', 'Nairobi'
from campaigns c join ads a on a.owner_id = c.owner_id join me on me.id = c.owner_id
limit 1;

Add npm scripts (idempotent):
	•	In package.json scripts, ensure:

    "supabase:link": "supabase link --project-ref ykqsavtoqrhrimvwjubz",
"db:seed": "supabase db execute --file supabase/sql/seed_minimal.sql"

Run order (agent)
	1.	Replace OWNER_EMAIL token in seed_minimal.sql with the provided email.
	2.	Run npm run supabase:link (only if not linked).
	3.	Run npm run db:seed.
	4.	Output the created wallet_id for curl tests (optional: query wallets by owner).

Verification steps (agent)
	•	Query counts: select count(*) from ads/campaigns/transactions/analytics_events where owner_id = (select id from profiles where email='OWNER_EMAIL');
	•	Sanity check in UI: /dashboard, /wallet, /my-ads show non-empty states.

Deliverable
	•	PR titled: chore(seed): minimal data for dev pages
	•	PR includes the SQL file and updated package.json scripts.


Notes & Guardrails for the Agent
	•	Never add another createClient() anywhere in src/. Only import { supabase } from @/lib/supabaseClient.
	•	Keep all inserts idempotent (on conflict do nothing, unique keys).
	•	Don’t modify RLS in these tasks.
	•	Don’t touch .env.local contents (humans own secrets).
	•	All code must compile with npm run dev and be warn-clean in console.