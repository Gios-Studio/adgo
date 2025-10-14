import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rkonwkggxaohpmxmzmfn.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo";

console.log("🔍 Initializing Supabase client with:");
console.log("   URL:", SUPABASE_URL);
console.log("   KEY (first 6):", SUPABASE_KEY.slice(0, 6));

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);