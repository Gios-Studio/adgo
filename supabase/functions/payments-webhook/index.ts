// supabase/functions/payments-webhook/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1) Verify shared secret (configure a header like x-webhook-secret)
    const secret = req.headers.get("x-webhook-secret");
    if (secret !== Deno.env.get("WEBHOOK_SECRET")) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 2) Parse payload
    const body = await req.json(); // adapt parsing per provider

    // Example fields you’d extract/normalize
    const intentId = body.intent_id ?? body.checkout_request_id ?? body.session_id;
    const status   = body.status ?? (body.success ? "succeeded" : "failed");
    const receipt  = body.receipt ?? body.provider_receipt ?? null;
    const errorCode = body.error_code ?? null;
    const errorMsg  = body.error_message ?? null;

    if (!intentId) {
      return new Response("Missing intent id", { status: 400 });
    }

    // 3) Update intent
    const { error } = await supabase
      .from("payment_intents")
      .update({
        status,
        external_txn_id: receipt,
        error_code: errorCode,
        error_message: errorMsg,
        metadata: body, // store raw payload for audit
      })
      .eq("id", intentId);

    if (error) {
      console.error("Update payment_intents failed:", error);
      return new Response("DB error", { status: 500 });
    }

    // NOTE: if status == 'succeeded', your DB trigger credits the wallet automatically
    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Server error", { status: 500 });
  }
});