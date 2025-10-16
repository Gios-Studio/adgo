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

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Layout from "../../components/Layout"; // ✅ ensures top navigation everywhere

export default function Analytics() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("🔄 Fetching analytics data...");
        const { data: rpcData, error: rpcError } = await supabase.rpc("rpc_campaign_summary_30d");

        if (rpcError) throw rpcError;
        console.log("✅ RPC Data:", rpcData);

        setData(rpcData || []);
      } catch (err: any) {
        console.error("❌ RPC Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-2">Campaign Analytics</h1>

        {loading && <p className="text-gray-500">Loading analytics...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <p className="text-gray-400 text-sm mb-6">
              Last updated:{" "}
              {data?.[0]?.last_updated
                ? new Date(data[0].last_updated).toLocaleString()
                : "—"}
            </p>

            {data.length === 0 ? (
              <p className="text-gray-500 italic">No campaigns found.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="py-3 px-4 text-left">Campaign</th>
                      <th className="py-3 px-4 text-right">Impressions</th>
                      <th className="py-3 px-4 text-right">Clicks</th>
                      <th className="py-3 px-4 text-right">CTR (%)</th>
                      <th className="py-3 px-4 text-right">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr
                        key={row.campaign_id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {row.campaign_name}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {row.total_impressions}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {row.total_clicks}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {parseFloat(row.ctr).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {parseFloat(row.roi).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}