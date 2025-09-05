
/** AdGo Events Ingest (impression / click) — Deno Edge Function
 * Endpoint: /impression and /click (deploy as two functions using same file if preferred)
 * Headers:
 *   - X-AdGo-Org: <org_id>
 *   - X-AdGo-Signature: <hex HMAC-SHA256 over raw body>
 *   - Idempotency-Key: <unique key per event>
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { adminClient } from "../_shared/db.ts";
import { hmacVerify } from "../_shared/verify.ts";

const supabase = adminClient();

type EventBody = {
  campaign_id: string;
  creative_id?: string;
  device_id?: string;
  occurred_at?: string; // ISO string; defaults to now
};

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname.toLowerCase();
    const event_type = path.includes("click") ? "click" : "impression";

    const org_id = req.headers.get("x-adgo-org") ?? "";
    const signature = req.headers.get("x-adgo-signature") ?? "";
    const idemKey = req.headers.get("idempotency-key") ?? "";

    const raw = await req.text();
    if (!raw) return new Response(JSON.stringify({ error: "empty body" }), { status: 400 });

    // Look up org secret
    const { data: secretRow, error: secretErr } = await supabase
      .from("org_secrets")
      .select("hmac_secret")
      .eq("org_id", org_id)
      .single();
    if (secretErr || !secretRow) return new Response(JSON.stringify({ error: "org not found" }), { status: 401 });

    // Verify signature
    const ok = await hmacVerify(raw, signature, secretRow.hmac_secret);
    if (!ok) return new Response(JSON.stringify({ error: "bad signature" }), { status: 401 });

    // Idempotency
    if (!idemKey) return new Response(JSON.stringify({ error: "missing Idempotency-Key" }), { status: 400 });
    const dedupe = await supabase.from("event_dedupe").insert({ key: idemKey }).select("key").single();
    if (dedupe.error) {
      // duplicate → return 200 to be idempotent
      return new Response(JSON.stringify({ status: "duplicate_ignored" }), { headers: { "Content-Type": "application/json" } });
    }

    // Parse body
    let body: EventBody;
    try { body = JSON.parse(raw); } catch {
      return new Response(JSON.stringify({ error: "invalid JSON" }), { status: 400 });
    }
    if (!body.campaign_id) return new Response(JSON.stringify({ error: "campaign_id required" }), { status: 400 });

    const occurred_at = body.occurred_at ? new Date(body.occurred_at) : new Date();
    if (Number.isNaN(occurred_at.getTime())) return new Response(JSON.stringify({ error: "bad occurred_at" }), { status: 400 });

    // Capture request meta
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const ua = req.headers.get("user-agent") ?? "";

    // Insert raw event
    const { error: insErr } = await supabase.from("events_raw").insert({
      event_type,
      org_id,
      campaign_id: body.campaign_id,
      creative_id: body.creative_id ?? null,
      device_id: body.device_id ?? null,
      remote_ip: ip || null,
      user_agent: ua || null,
      occurred_at: occurred_at.toISOString(),
    });

    if (insErr) {
      return new Response(JSON.stringify({ error: "db_insert_failed", details: insErr.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ status: "ok" }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "server_error", details: String(e) }), { status: 500 });
  }
});
