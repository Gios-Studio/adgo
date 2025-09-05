/** Process Creative — validate, checksum, (webhook or FE), thumbnail, metadata writeback
 * Modes:
 *  A) FE call (what you already had):
 *     Body: { org_id, campaign_id, creative_id, bucket, path, max_mb? }
 *  B) Storage Webhook (INSERT):
 *     Body: { type: "INSERT", record: { bucket_id, name, ... } }
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Image } from "https://esm.sh/imagescript@1";
import { sha256Hex } from "../_shared/verify.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const ALLOWED = new Set([
  "image/jpeg","image/png","image/webp",
  "video/mp4","video/webm"
]);

serve(async (req) => {
  try {
    const body = await req.json().catch(() => null) as any;

    // Detect mode
    const isStorageWebhook = body && body.type && body.record && body.record.bucket_id && body.record.name;
    const isFeCall = body && body.org_id && body.campaign_id && body.creative_id && body.bucket && body.path;

    if (!isStorageWebhook && !isFeCall) {
      return json({ error: "bad_payload" }, 400);
    }

    // Normalize inputs
    const org_id       = isFeCall ? body.org_id       : body.record.org_id ?? null;
    const campaign_id  = isFeCall ? body.campaign_id  : body.record.campaign_id ?? null;
    const creative_id  = isFeCall ? body.creative_id  : body.record.creative_id ?? null;
    const bucket       = isFeCall ? body.bucket       : body.record.bucket_id;
    const path         = isFeCall ? body.path         : body.record.name;
    const max_mb       = isFeCall ? (body.max_mb ?? 30) : 30; // limit for FE calls; webhooks assume same

    // Download object
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error || !data) return json({ error: "download_failed", details: error?.message }, 400);

    // Size limit (only enforce strictly for images; videos may be larger—adjust if you want)
    const buf = new Uint8Array(await data.arrayBuffer());
    const sizeMB = buf.byteLength / (1024 * 1024);

    // MIME detect (fallback by extension if Storage doesn’t return type)
    const mime = (data.type && data.type !== "") ? data.type : guessMime(path);

    if (isFeCall && sizeMB > max_mb && mime.startsWith("image/")) {
      await safeUpdateCreative(creative_id, { status: "rejected", rejection_reason: `File too large: ${sizeMB.toFixed(1)}MB > ${max_mb}MB` });
      return json({ error: "too_large" }, 413);
    }

    if (!ALLOWED.has(mime)) {
      await safeUpdateCreative(creative_id, { status: "rejected", rejection_reason: `Unsupported MIME: ${mime}` });
      return json({ error: "bad_mime", mime }, 415);
    }

    // Compute checksum
    const checksum = await sha256Hex(buf);

    // Thumbnail (images only)
    let thumb_path: string | null = null;
    let width: number | null = null;
    let height: number | null = null;

    if (mime.startsWith("image/")) {
      try {
        const img = await Image.decode(buf);
        width = img.width;
        height = img.height;

        const resized = img.resize(512, Image.RESIZE_AUTO);
        const thumbBytes = await resized.encodeJPEG(80);
        thumb_path = path.replace(/(\.[a-zA-Z0-9]+)$/, "_thumb.jpg");

        const { error: upErr } = await supabase.storage.from(bucket).upload(thumb_path, thumbBytes, {
          contentType: "image/jpeg",
          upsert: true,
        });
        if (upErr) {
          console.log("thumbnail upload error:", upErr.message);
          thumb_path = null; // don’t fail the whole request on thumbnail failure
        }
      } catch (e) {
        console.log("thumbnail decode/resize failed:", String(e));
      }
    }

    // Build metadata
    const meta = {
      checksum,
      mime_type: mime,
      bytes: buf.byteLength,
      width,
      height,
      thumb_path,
      processed_at: new Date().toISOString(),
      source: isStorageWebhook ? "storage_webhook" : "fe_call",
    };

    // Write metadata to your creatives table
    // NOTE: you currently use `creatives` (public?). If your canonical table is in adgo schema, change to adgo.creatives.
    if (creative_id) {
      const { error: upErr } = await supabase
        .from("creatives")
        .update({
          checksum: meta.checksum,
          mime_type: meta.mime_type,
          status: "approved",
          rejection_reason: null,
          meta // requires a jsonb column named "meta" OR remove this line if you don’t have it
        })
        .eq("id", creative_id)
        .maybeSingle();

      if (upErr) {
        console.log("DB update error:", upErr.message);
        // Don’t hard-fail on webhook path when creatives table may be locked/elsewhere
        if (isFeCall) return json({ error: "db_update_failed", details: upErr.message }, 500);
      }
    }

    return json({ status: "ok", ...meta }, 200);
  } catch (e) {
    return json({ error: "server_error", details: String(e) }, 500);
  }
});

// Helpers
function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function guessMime(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  return "application/octet-stream";
}

async function safeUpdateCreative(creative_id: string | null, patch: Record<string, unknown>) {
  if (!creative_id) return;
  const { error } = await supabase.from("creatives").update(patch).eq("id", creative_id).maybeSingle();
  if (error) console.log("safeUpdateCreative error:", error.message);
}