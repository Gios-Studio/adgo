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