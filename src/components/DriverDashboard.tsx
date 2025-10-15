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

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DriverDashboard({ driverId }: { driverId: string }) {
  const [wallet, setWallet] = useState<any>(null);
  const [txs, setTxs] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("wallets").select("*").eq("owner_id", driverId).single().then(({ data }) => setWallet(data));
    supabase.from("transactions").select("*").eq("wallet_id", wallet?.id).order("created_at", { ascending: false }).then(({ data }) => setTxs(data || []));
  }, [driverId, wallet?.id]);
  if (!wallet) return <div>Loading...</div>;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Driver Wallet</h1>
      <div className="text-2xl mb-2">Balance: {(wallet.balance_cents/100).toFixed(2)} KES</div>
      <h2 className="font-semibold mt-6 mb-2">Transactions</h2>
      <ul>
        {txs.map(tx => (
          <li key={tx.id}>{tx.type} - {(tx.amount_cents/100).toFixed(2)} KES - {tx.created_at}</li>
        ))}
      </ul>
    </div>
  );
}
``