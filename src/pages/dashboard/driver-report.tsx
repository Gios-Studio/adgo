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

// pages/dashboard/driver-report.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DriverReport() {
  const [txns, setTxns] = useState<any[]>([]);
  const [vat, setVat] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: txnData } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      const { data: vatData } = await supabase
        .from("tax_receipts")
        .select("*")
        .order("issued_at", { ascending: false })
        .limit(5);

      setTxns(txnData || []);
      setVat(vatData || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Driver Reporting</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Ref</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((t, i) => (
              <tr key={i}>
                <td className="p-2">{t.type}</td>
                <td className="p-2">{t.amount_cents / 100}</td>
                <td className="p-2">{t.ref}</td>
                <td className="p-2">{new Date(t.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">VAT Receipts</h2>
        <ul className="list-disc pl-6">
          {vat.map((v, i) => (
            <li key={i}>
              Receipt #{v.id} — {v.amount} {v.currency} on{" "}
              {new Date(v.issued_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}