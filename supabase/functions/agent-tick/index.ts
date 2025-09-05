// supabase/functions/agent-tick/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (_req) => {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sb = createClient(url, key, { auth: { persistSession: false } });

  // 1) Time-based campaign transitions
  await sb.rpc("transition_campaigns_by_clock", { now_ts: new Date().toISOString() });

  // 2) Reconcile stale payment_intents (>30 min)
  await sb.rpc("reconcile_stale_payment_intents", { max_age_minutes: 30 });

  // 3) Roll up last 24h analytics into daily summaries (idempotent)
  await sb.rpc("rollup_analytics_24h");

  return new Response(JSON.stringify({ ok: true, ranAt: new Date().toISOString() }), {
    headers: { "content-type": "application/json" },
  });
});