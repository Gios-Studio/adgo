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


import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdvertiserDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("sme_dashboard_metrics").select("*").then(({ data }) => setStats(data?.[0]));
    supabase.from("invoices").select("*").then(({ data }) => setInvoices(data || []));
  }, []);
  if (!stats) return <div>Loading...</div>;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Advertiser Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>Impressions: {stats.impressions}</div>
        <div>Clicks: {stats.clicks}</div>
        <div>CTR: {stats.ctr}%</div>
        <div>Spend: {(stats.spend_cents/100).toFixed(2)} KES</div>
      </div>
      <h2 className="font-semibold mt-6 mb-2">Invoices</h2>
      <ul>
        {invoices.map(inv => (
          <li key={inv.id}>
            Invoice #{inv.id} - {(inv.amount_cents/100).toFixed(2)} KES - <a href={inv.receipt_pdf_url || "#"}>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}