import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const driver_id = url.searchParams.get("driver_id");
    if (!driver_id) throw new Error("Missing driver_id");
    const { data, error } = await supabase
      .from("driver_wallets")
      .select("balance, updated_at")
      .eq("driver_id", driver_id)
      .single();
    if (error) throw error;
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
});
