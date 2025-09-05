Goal: Create working, minimal pages with defensive data fetching and empty states. No design polish needed; just functional, compile-clean TSX.

Repo assumptions
	•	Frontend: Vite + React + TS
	•	Path alias: @ → src
	•	Existing files: src/lib/supabaseClient.ts, src/hooks/useAuth.tsx, src/components/{ProtectedRoute.tsx,RequireAnon.tsx,AuthForm.tsx}, src/pages/Home.tsx, src/App.tsx

Acceptance criteria
	•	New pages compile, load behind ProtectedRoute, and never hard-crash if data is empty.
	•	Each page has a visible header and at least one real query to Supabase (or a TODO comment if not applicable).
	•	Routing wired in src/App.tsx with links in a minimal top nav.
	•	No duplicate createClient calls (only import { supabase } from @/lib/supabaseClient).

Create these files
	1.	src/pages/Dashboard.tsx
	•	Shows welcome (“Welcome, {email}”) and 3 stat cards with placeholders: Active Campaigns, Total Spend (KES), Impressions (7d).
	•	Fetch current user email via supabase.auth.getUser().
	2.	src/pages/MyAds.tsx
	•	Query ads for owner_id = auth.uid() → list: title, status, created_at (desc).
	•	Empty state message if 0 rows.
	•	“Upload Ad” button linking to /ad-upload (page may be TODO).
	3.	src/pages/CampaignCalendar.tsx
	•	Stub page with heading and a short TODO paragraph (no calendar lib required yet).
	4.	src/pages/Analytics.tsx
	•	Query last 20 analytics_events for the signed-in owner: join not required; just show event_type, ad_id, occurred_at.
	•	Empty state message if 0 rows.
	5.	Optional (if not present): src/components/TopNav.tsx
	•	Simple links: /dashboard, /my-ads, /calendar, /wallet, /analytics, and a “Sign out” button that calls supabase.auth.signOut() and hard redirects to /.

Update routing (idempotent edits)

	In src/App.tsx, ensure routes exist:

    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/my-ads" element={<ProtectedRoute><MyAds /></ProtectedRoute>} />
<Route path="/calendar" element={<ProtectedRoute><CampaignCalendar /></ProtectedRoute>} />
<Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

	•	Include <TopNav /> above <Routes> if added, and keep public /auth wrapped with <RequireAnon>.

Code style
	•	TypeScript strict-ish, no any if possible.
	•	Defensive: if (!supabase) return error UI.
	•	No new dependencies.

Deliverable
	•	Single PR titled: feat(ui): scaffold dashboard, my-ads, calendar, analytics with protected routes
	•	Checklist in PR body: pages exist, routes wired, no duplicate createClient, compiles locally.

    Notes & Guardrails for the Agent
	•	Never add another createClient() anywhere in src/. Only import { supabase } from @/lib/supabaseClient.
	•	Keep all inserts idempotent (on conflict do nothing, unique keys).
	•	Don’t modify RLS in these tasks.
	•	Don’t touch .env.local contents (humans own secrets).
	•	All code must compile with npm run dev and be warn-clean in console.
