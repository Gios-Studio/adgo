import "server-only";

function must(name: string, v?: string) {
  if (!v || !v.trim()) throw new Error(`Missing env: ${name}`);
  return v.trim();
}

// Public values (still read on server)
export const NEXT_PUBLIC_SUPABASE_URL = must(
  "NEXT_PUBLIC_SUPABASE_URL",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

// Private secrets (server-only)
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
export const ADGO_ORG_SECRET_HEX = must(
  "ADGO_ORG_SECRET_HEX",
  process.env.ADGO_ORG_SECRET_HEX
);