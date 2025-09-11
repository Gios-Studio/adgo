// src/lib/adgo-upload.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const API_BASE = process.env.NEXT_PUBLIC_ADGO_PROXY_BASE || "http://localhost:3001";
const BUCKET = "creatives";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function uploadCreative(
  file: File,
  { orgId, campaignId, creativeId }: { orgId: string; campaignId: string; creativeId: string }
) {
  // 1) upload to storage
  const path = `${orgId}/${campaignId}/${Date.now()}_${file.name}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (upErr) throw new Error(`upload failed: ${upErr.message}`);

  // 2) call proxy
  const r = await fetch(`${API_BASE}/api/adgo?op=process-creative`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      org_id: orgId,
      campaign_id: campaignId,
      creative_id: creativeId,
      bucket: BUCKET,
      path: `creatives/${path}`,
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`process-creative failed: ${r.status} ${JSON.stringify(data)}`);
  return { ok: true, path: `creatives/${path}`, meta: data };
}