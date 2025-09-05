// adgo-upload.ts
// Usage (React): await uploadCreative(file, { orgId, campaignId, creativeId })
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const API_BASE = import.meta.env.VITE_ADGO_PROXY_BASE || "http://localhost:3001"; // your Express proxy base
const BUCKET = "creatives";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function uploadCreative(
  file: File,
  { orgId, campaignId, creativeId }: { orgId: string; campaignId: string; creativeId: string }
) {
  // 1) upload to storage path: creatives/<org>/<campaign>/<filename>
  const path = `${orgId}/${campaignId}/${Date.now()}_${file.name}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (upErr) throw new Error(`upload failed: ${upErr.message}`);

  // 2) call process-creative via your proxy (no HMAC needed)
  const r = await fetch(`${API_BASE}/api/adgo?op=process-creative`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      org_id: orgId,
      campaign_id: campaignId,
      creative_id: creativeId,
      bucket: BUCKET,
      path: `creatives/${path}`, // server expects bucket-relative "creatives/<...>"
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`process-creative failed: ${r.status} ${JSON.stringify(data)}`);
  return { ok: true, path: `creatives/${path}`, meta: data };
}