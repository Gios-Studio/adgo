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
 * Generated: 2025-10-15 04:38:34 UTC
 */

// components/SMEReport.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SMEReport({ advertiserId }: { advertiserId: string }) {
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("campaign_metrics")
      .select("impressions, clicks, conversions, payouts")
      .eq("tenant_id", advertiserId)
      .then(({ data }) => setReport(data || []));
  }, [advertiserId]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-bold">SME Report</h2>
      {report.map((r, i) => (
        <p key={i}>Impressions: {r.impressions} | Clicks: {r.clicks} | Conversions: {r.conversions} | Payouts: {r.payouts}</p>
      ))}
    </div>
  );
}