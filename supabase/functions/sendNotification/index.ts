// supabase/functions/sendNotification/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { ride_id, ad_message } = await req.json();

  // Forward to production webhook or 3rd-party push API
  await fetch("https://your-production-endpoint.com/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ride_id, ad_message, ts: new Date().toISOString() }),
  });

  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
});