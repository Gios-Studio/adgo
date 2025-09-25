// supabase/functions/partner-report/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const url = new URL(req.url);
  const partnerId = url.searchParams.get("partner_id");
  if (!partnerId) {
    return new Response(JSON.stringify({ error: "partner_id required" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("rides")
    .select("id, driver_id, campaign_id, started_at, ended_at")
    .eq("partner_id", partnerId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ rides: data }), {
    headers: { "Content-Type": "application/json" }
  });
});