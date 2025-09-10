// Dequeues pending rows from adgo.webhook_outbox, POSTs to endpoint_url,
// HMAC (sha256) = hex(secret_hex) over raw body, header: X-AdGo-Signature.
// Idempotency-Key: outbox id. Exponential backoff (min 1m, max 60m).

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DISPATCH_TOKEN = Deno.env.get("WEBHOOK_DISPATCH_TOKEN") || ""; // optional

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

async function hmacHex(keyHex: string, body: string) {
  const key = new Uint8Array(keyHex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));
  const cryptoKey = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(body));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function nextBackoff(attempts: number): number {
  const mins = Math.min(60, Math.max(1, 2 ** Math.min(6, attempts))); // 1,2,4,8,16,32,64->cap60
  return mins * 60 * 1000;
}

serve(async (req) => {
  try {
    // Optional protection: require Bearer token if set
    if (DISPATCH_TOKEN) {
      const auth = req.headers.get("authorization") || "";
      if (auth !== `Bearer ${DISPATCH_TOKEN}`) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    // Fetch up to 100 due items
    const { data: due, error } = await supabase
      .from("webhook_outbox")
      .select("*")
      .is("delivered_at", null)
      .lte("next_attempt_at", new Date().toISOString())
      .order("id", { ascending: true })
      .limit(100);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    if (!due || due.length === 0) return new Response(JSON.stringify({ status: "idle" }), { headers: { "Content-Type": "application/json" } });

    let okCount = 0, failCount = 0;
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
            "Idempotency-Key": String(row.id)
          },
          body
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
              next_attempt_at: new Date(now + nextBackoff(row.attempts + 1)).toISOString()
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
            next_attempt_at: new Date(now + nextBackoff(row.attempts + 1)).toISOString()
          })
          .eq("id", row.id);
        failCount++;
      }
    }

    return new Response(JSON.stringify({ status: "ok", delivered: okCount, failed: failCount }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});