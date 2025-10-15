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

// components/DashboardMetrics.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("campaign_metrics")
      .select("impressions, clicks, conversions, ctr, ecpm, payouts")
      .then(({ data }) => setMetrics(data || []));
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="rounded-xl p-4 bg-white shadow">
          <p>Impressions: {m.impressions}</p>
          <p>Clicks: {m.clicks}</p>
          <p>Conversions: {m.conversions}</p>
          <p>CTR: {m.ctr}%</p>
          <p>eCPM: {m.ecpm}</p>
          <p>Payouts: {m.payouts}</p>
        </div>
      ))}
    </div>
  );
}