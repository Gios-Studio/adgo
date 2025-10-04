import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const advertiser_id = url.searchParams.get("advertiser_id");
    let query = supabase.from("invoice_summary").select("*");
    if (advertiser_id) query = query.eq("advertiser_id", advertiser_id);
    const { data, error } = await query;
    if (error) throw error;
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
});