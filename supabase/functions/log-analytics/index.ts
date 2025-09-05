// supabase/functions/log-analytics/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const body = await req.json();
    const { campaign_id, ad_id, event_type, device_id, region, meta } = body ?? {};
    if (!event_type || !["impression", "click"].includes(event_type)) {
      return new Response("Invalid event_type", { status: 400 });
    }

    const { error } = await supabase.from("analytics_events").insert({
      campaign_id: campaign_id ?? null,
      ad_id: ad_id ?? null,
      event_type,
      device_id: device_id ?? null,
      region: region ?? null,
      meta: meta ?? {},
    });

    if (error) {
      console.error(error);
      return new Response("DB error", { status: 500 });
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
});