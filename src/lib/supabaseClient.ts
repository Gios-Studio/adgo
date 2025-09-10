import { createClient } from "@supabase/supabase-js";

const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const rawKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

if (!rawUrl || !rawKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Check .env.local at project root and restart dev."
  );
}

export const supabase = createClient(rawUrl, rawKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});