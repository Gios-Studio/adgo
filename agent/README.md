# AdGo Agent

This folder holds briefs and logs for the AdGo automation agent.

- `prompts/` → task briefs the agent should execute (scaffolding, seeding, etc.)
- `logs/` → optional agent run logs
- Agent runtime lives in Supabase Edge Functions (see `supabase/functions/agent-tick`).
- Schedules configured in Supabase Dashboard → Edge Functions → Schedules.
