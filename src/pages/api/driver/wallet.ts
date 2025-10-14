import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Placeholder values – swap to Supabase query later
  res.status(200).json({
    weekEarnings: 4350,   // KES
    adEarnings: 310,      // KES
    pendingPayout: 620,   // KES
    lastPayoutAt: "2025-08-31T16:00:00Z"
  });
}