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
 * Generated: 2025-10-15 04:38:36 UTC
 */

import { NextRequest, NextResponse } from "next/server";

// Edge Runtime Configuration
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default function handler(req: NextRequest) {
  // Placeholder values – swap to Supabase query later
  const data = {
    weekEarnings: 4350, // KES
    adEarnings: 310, // KES
    pendingPayout: 620, // KES
    lastPayoutAt: "2025-08-31T16:00:00Z",
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=120",
      "X-Edge-Cache": "MISS",
    },
  });
}
