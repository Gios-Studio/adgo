import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  try {
    const { invoice_id } = await req.json();
    const { data, error } = await supabase
      .from("invoices")
      .update({ status: "paid" })
      .eq("id", invoice_id)
      .select()
      .single();
    if (error) throw error;
    return new Response(JSON.stringify({
      message: "Invoice marked as paid",
      invoice: data,
    }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
});