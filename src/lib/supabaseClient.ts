import { createClient } from "@supabase/supabase-js";

const rawUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

console.log("Supabase envs →", { hasUrl: !!rawUrl, keyLen: rawKey.length });

if (!rawUrl || !rawKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
    "Check .env.local at project root and restart dev."
  );
}

try {
  new URL(rawUrl);
} catch {
  throw new Error(`Invalid VITE_SUPABASE_URL: "${rawUrl}"`);
}

export const supabase = createClient(rawUrl, rawKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});