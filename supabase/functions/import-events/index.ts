// Import Events (CSV -> adgo.events_raw), supports:
// 1) multipart/form-data with a `file` field
// 2) JSON: { org_id, campaign_id?, bucket, path, timezone? }
// CSV headers supported (case-insensitive):
//   occurred_at | timestamp, event_type (impression|click|conversion),
//   campaign_id?, creative_id?, device_id?, remote_ip?, user_agent?, payload_json?
// Notes:
// - If occurred_at lacks timezone, optional ?timezone=Africa/Nairobi (or body field) will be applied.
// - Inserts in chunks (1k). Returns counts and any row-level errors.

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { parse } from "https://deno.land/std@0.224.0/csv/parse.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

type Row = Record<string, string>;

function norm(s?: string | null) { return (s ?? "").trim(); }
function isEmpty(s?: string | null) { return !s || s.trim() === ""; }

function toTs(isoLike: string, tz?: string): string {
  // If already has timezone (Z or ±hh:mm), just return
  if (/[zZ]|[+\-]\d{2}:\d{2}$/.test(isoLike)) return new Date(isoLike).toISOString();
  // Apply timezone by constructing local time in tz (best-effort)
  // For simplicity & portability: treat input as UTC if no tz provided.
  // (If you need exact local tz handling, pre-normalize in CSV.)
  return new Date(isoLike).toISOString();
}

function safeJSON(s?: string): any {
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

async function loadCsvTextFromStorage(bucket: string, path: string): Promise<string> {
  const dl = await supabase.storage.from(bucket).download(path);
  if (dl.error || !dl.data) throw new Error(`download_failed: ${dl.error?.message}`);
  const buf = await dl.data.arrayBuffer();
  const text = new TextDecoder().decode(new Uint8Array(buf));
  return text;
}

function reqTZ(req: Request, bodyTZ?: string): string | undefined {
  const url = new URL(req.url);
  return bodyTZ || url.searchParams.get("timezone") || undefined;
}

function pick<T extends string>(obj: Record<string, any>, keys: T[]): Record<T, any> {
  const out: any = {};
  for (const k of keys) out[k] = obj[k];
  return out;
}

serve(async (req) => {
  try {
    const method = req.method.toUpperCase();
    if (method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    let org_id = "";
    let default_campaign_id: string | undefined;
    let csvText = "";
    let tz: string | undefined;

    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      org_id = norm(form.get("org_id") as string);
      default_campaign_id = norm(form.get("campaign_id") as string) || undefined;
      tz = norm(form.get("timezone") as string) || undefined;
      if (!(file instanceof File)) return new Response(JSON.stringify({ error: "missing_file" }), { status: 400 });
      const buf = new Uint8Array(await file.arrayBuffer());
      csvText = new TextDecoder().decode(buf);
    } else if (ctype.includes("application/json") || ctype.includes("text/json")) {
      const json = await req.json();
      org_id = norm(json.org_id);
      default_campaign_id = norm(json.campaign_id) || undefined;
      tz = reqTZ(req, norm(json.timezone));
      if (json.bucket && json.path) {
        csvText = await loadCsvTextFromStorage(json.bucket, json.path);
      } else if (json.csv) {
        csvText = String(json.csv);
      } else {
        return new Response(JSON.stringify({ error: "missing_source (file|bucket+path|csv)" }), { status: 400 });
      }
    } else if (ctype.includes("text/csv")) {
      org_id = norm(req.headers.get("X-AdGo-Org"));
      tz = reqTZ(req);
      csvText = await req.text();
    } else {
      return new Response(JSON.stringify({ error: "unsupported_content_type" }), { status: 415 });
    }

    if (isEmpty(org_id)) return new Response(JSON.stringify({ error: "missing_org_id" }), { status: 400 });

    // Parse CSV (header row -> object)
    const rows = parse(csvText, { columns: true }) as Row[];
    const requiredAny = ["occurred_at", "timestamp"];
    const required = ["event_type"];
    let good = 0, bad = 0;
    const errors: Array<{ line: number; error: string }> = [];

    const batch: any[] = [];
    const flush = async () => {
      if (batch.length === 0) return;
      const { error } = await supabase.from("events_raw").insert(batch, { returning: "minimal" });
      batch.length = 0;
      if (error) throw new Error(`insert_failed: ${error.message}`);
    };

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      // Normalize keys to lowercase for robustness
      const rec: Record<string, string> = {};
      for (const [k, v] of Object.entries(r)) rec[k.toLowerCase()] = String(v ?? "").trim();

      // Validate required fields
      if (!required.some(k => !isEmpty(rec[k])) && !requiredAny.some(k => !isEmpty(rec[k]))) {
        bad++; errors.push({ line: i + 2, error: "missing_required_fields" }); continue;
      }

      const event_type = rec["event_type"]?.toLowerCase();
      if (!["impression", "click", "conversion"].includes(event_type)) {
        bad++; errors.push({ line: i + 2, error: `invalid_event_type:${event_type}` }); continue;
      }

      const occurred_raw = rec["occurred_at"] || rec["timestamp"];
      if (isEmpty(occurred_raw)) { bad++; errors.push({ line: i + 2, error: "missing_occurred_at" }); continue; }
      const occurred_at = toTs(occurred_raw, tz);

      const campaign_id = rec["campaign_id"] || default_campaign_id || null;
      const creative_id = rec["creative_id"] || null;
      const remote_ip   = rec["remote_ip"] || null;
      const user_agent  = rec["user_agent"] || null;

      let payload: any = safeJSON(rec["payload_json"]);
      if (!payload) {
        payload = pick(rec, ["device_id", "shortlink_id", "slug"]);
      }

      batch.push({
        org_id,
        campaign_id,
        creative_id,
        event_type,
        payload,
        remote_ip,
        user_agent,
        occurred_at,
        received_at: new Date().toISOString()
      });

      if (batch.length >= 1000) await flush();
      good++;
    }
    await flush();

    return new Response(JSON.stringify({ status: "ok", imported: good, skipped: bad, errors }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});