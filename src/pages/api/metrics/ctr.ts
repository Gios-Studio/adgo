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

import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const campaign_id = req.query.campaign_id as string | undefined;
  if (!campaign_id) return res.status(400).json({ error: "missing_campaign_id" });
  const { data, error } = await supabase.from("campaign_ctr").select("*").eq("campaign_id", campaign_id).maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data ?? { campaign_id, impressions: 0, clicks: 0, ctr: 0 });
}