// supabase/functions/webhook-dispatch/index.ts

// Handles webhook dispatch AND ride attribution inserts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DISPATCH_TOKEN = Deno.env.get("WEBHOOK_DISPATCH_TOKEN") || ""; // optional

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

/**
 * Webhook HMAC signature generator
 */
async function hmacHex(keyHex: string, body: string) {
  const key = new Uint8Array(keyHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function nextBackoff(attempts: number): number {
  const mins = Math.min(60, Math.max(1, 2 ** Math.min(6, attempts)));
  return mins * 60 * 1000;
}

/**
 * Main handler
 */
serve(async (req) => {
  try {
    const url = new URL(req.url);

    // ────────────────────────────────
    // Endpoint 1: Webhook Dispatch
    // ────────────────────────────────
    if (url.pathname === "/dispatch") {
      if (DISPATCH_TOKEN) {
        const auth = req.headers.get("authorization") || "";
        if (auth !== `Bearer ${DISPATCH_TOKEN}`) {
          return new Response("Unauthorized", { status: 401 });
        }
      }

      const { data: due, error } = await supabase
        .from("webhook_outbox")
        .select("*")
        .is("delivered_at", null)
        .lte("next_attempt_at", new Date().toISOString())
        .order("id", { ascending: true })
        .limit(100);

      if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      if (!due || due.length === 0)
        return new Response(JSON.stringify({ status: "idle" }), { headers: { "Content-Type": "application/json" } });

      let okCount = 0,
        failCount = 0;

      for (const row of due) {
        const body = JSON.stringify(row.payload);
        const sig = await hmacHex(row.secret_hex, body);
        try {
          const resp = await fetch(row.endpoint_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-AdGo-Event": row.event_type,
              "X-AdGo-Org": row.org_id,
              "X-AdGo-Signature": sig,
              "Idempotency-Key": String(row.id),
            },
            body,
          });
          if (resp.ok) {
            await supabase.from("webhook_outbox")
              .update({ delivered_at: new Date().toISOString(), attempts: row.attempts + 1, last_error: null })
              .eq("id", row.id);
            okCount++;
          } else {
            const now = Date.now();
            await supabase.from("webhook_outbox")
              .update({
                attempts: row.attempts + 1,
                last_error: `HTTP ${resp.status}`,
                next_attempt_at: new Date(now + nextBackoff(row.attempts + 1)).toISOString(),
              })
              .eq("id", row.id);
            failCount++;
          }
        } catch (e) {
          const now = Date.now();
          await supabase.from("webhook_outbox")
            .update({
              attempts: row.attempts + 1,
              last_error: String(e),
              next_attempt_at: new Date(now + nextBackoff(row.attempts + 1)).toISOString(),
            })
            .eq("id", row.id);
          failCount++;
        }
      }

      return new Response(JSON.stringify({ status: "ok", delivered: okCount, failed: failCount }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // ────────────────────────────────
    // Endpoint 2: Ride Attribution
    // ────────────────────────────────
    if (url.pathname === "/ride-finished" && req.method === "POST") {
      const body = await req.json();
      const { driver_id, partner_id, campaign_id } = body;

      const { error } = await supabase.from("rides").insert([
        { driver_id, partner_id, campaign_id, ended_at: new Date().toISOString() },
      ]);

      if (error) return new Response(JSON.stringify(error), { status: 400 });

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Default 404
    return new Response("Not found", { status: 404 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});