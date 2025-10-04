import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  try {
    const { advertiser_id, campaign_id, amount_cents, vat_rate } = await req.json();
    const { data, error } = await supabase
      .from("invoices")
      .insert({ advertiser_id, campaign_id, amount_cents, vat_rate })
      .select("id, amount_cents, vat_rate, status")
      .single();
    if (error) throw error;
    return new Response(JSON.stringify({
      invoice_id: data.id,
      total_amount: data.amount_cents,
      status: data.status,
    }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
});