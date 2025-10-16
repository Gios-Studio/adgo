/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rkonwkggxaohpmxmzmfn.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo";

console.log("🔍 Initializing Supabase client with:");
console.log("   URL:", SUPABASE_URL);
console.log("   KEY (first 6):", SUPABASE_KEY.slice(0, 6));

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);