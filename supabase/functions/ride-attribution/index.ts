// supabase/functions/ride-attribution/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  const { driver_id, partner_id, campaign_id, fare_cents } = await req.json();
  const { data, error } = await supabase
    .from("rides")
    .insert([{ driver_id, partner_id, campaign_id, fare_cents }])
    .select();
  if (error) return new Response(JSON.stringify({ error }), { status: 400 });
  return new Response(JSON.stringify({ ok: true, ride: data }), { headers: { "Content-Type": "application/json" } });
});