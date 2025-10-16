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

// src/pages/dashboard/driver-wallet.tsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount_cents: number;
  memo: string;
  created_at: string;
}

export default function DriverWallet() {
  const [txs, setTxs] = useState<Transaction[]>([]);

  useEffect(() => {
    supabase.from("transactions").select("*").then(({ data }) => {
      if (data) setTxs(data as Transaction[]);
    });
  }, []);

  return (
    <div className="p-6">
      <h1>Driver Wallet</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Date</th><th>Type</th><th>Amount</th><th>Memo</th>
          </tr>
        </thead>
        <tbody>
          {txs.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.created_at).toLocaleDateString()}</td>
              <td>{t.type}</td>
              <td>KES {(t.amount_cents / 100).toFixed(2)}</td>
              <td>{t.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}