import { createClient } from "@supabase/supabase-js";

const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

if (!rawUrl || !serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL. " +
      "Check .env.local and restart dev."
  );
}

export const supabaseAdmin = createClient(rawUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});