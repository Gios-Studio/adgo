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

import Layout from "../../components/Layout";
import { useKPI } from "../../hooks/useKPI";

export default function Dashboard() {
  const { data, loading, error } = useKPI();

  if (loading) return <Layout><p>Loading metrics...</p></Layout>;
  if (error) return <Layout><p className="text-red-500">Error loading metrics: {error.message}</p></Layout>;

  return (
    <Layout>
      {/* 📊 Metrics Section */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard Metrics</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard label="Impressions" value={data.impressions} icon="👁️" />
        <MetricCard label="Clicks" value={data.clicks} icon="🖱️" />
        <MetricCard label="CTR (%)" value={data.ctr.toFixed(2)} icon="📈" />
        <MetricCard label="ROI" value={data.roi.toFixed(2)} icon="💹" />
        <MetricCard label="Spend (KES)" value={data.spend.toFixed(2)} icon="💸" />
        <MetricCard label="Earnings (KES)" value={data.earnings.toFixed(2)} icon="💰" />
      </div>

      {/* Real-time indicator */}
      <div className="mt-4 flex items-center text-sm text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        Live metrics - updates automatically
      </div>
    </Layout>
  );
}

/* 🧩 Small Metric Display Component */
const MetricCard = ({ label, value, icon }: { label: string; value: number | string; icon?: string }) => (
  <div className="bg-white rounded-lg p-4 shadow text-center hover:shadow-md transition-shadow">
    {icon && <div className="text-2xl mb-2">{icon}</div>}
    <h2 className="text-sm text-gray-500">{label}</h2>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
  </div>
);