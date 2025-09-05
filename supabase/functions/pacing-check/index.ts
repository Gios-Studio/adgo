
/** Pacing Check — ask DB if a campaign can serve at this moment
 * GET ?campaign_id=<uuid>
 * Returns: { canServe: boolean }
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const campaign = url.searchParams.get("campaign_id");
    if (!campaign) return new Response(JSON.stringify({ error: "campaign_id required" }), { status: 400 });

    const { data, error } = await supabase.rpc("can_serve", { campaign });
    if (error) return new Response(JSON.stringify({ error: "db_error", details: error.message }), { status: 500 });

    return new Response(JSON.stringify({ canServe: !!data }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "server_error", details: String(e) }), { status: 500 });
  }
});
