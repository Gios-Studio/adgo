import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  // Helpful console diagnostics without killing the UI
  console.error('Missing Supabase envs', {
    hasUrl: !!url,
    hasAnonKey: !!key,
  });
}

export const supabase = createClient(
  url ?? 'https://example.supabase.co',   // dummy so app can render
  key ?? 'DUMMY_KEY'
);