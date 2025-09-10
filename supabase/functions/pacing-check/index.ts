// supabase/functions/pacing-check/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
    const orgId = req.headers.get("X-AdGo-Org");
    if (!orgId) return new Response(JSON.stringify({ error: "missing_org" }), { status: 400 });

    const { campaign_id } = await req.json();
    if (!campaign_id) return new Response(JSON.stringify({ error: "missing_campaign" }), { status: 400 });

    const { data, error } = await supabase.rpc("pacing_check", { p_campaign: campaign_id });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    // data is an array of one row
    const row = Array.isArray(data) ? data[0] : data;
    return new Response(JSON.stringify(row ?? { allowed: false, reason: "unknown" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});