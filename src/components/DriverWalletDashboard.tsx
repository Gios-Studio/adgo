"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Wallet {
  id: string;
  balance_cents: number;
  currency: string;
}

interface Ledger {
  id: string;
  debit: number;
  credit: number;
  balance_after: number;
  created_at: string;
}

interface Refund {
  id: string;
  amount_cents: number;
  created_at: string;
}

export default function DriverWalletDashboard({ driverId }: { driverId: string }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [ledger, setLedger] = useState<Ledger[]>([]);
  const [refunds, setRefunds] = useState<Refund[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: wallets } = await supabase
        .from("wallets")
        .select("*")
        .eq("owner_id", driverId)
        .limit(1);

      if (wallets && wallets.length > 0) setWallet(wallets[0]);

      const { data: ledgerRows } = await supabase
        .from("ledger")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (ledgerRows) setLedger(ledgerRows);

      const { data: refundRows } = await supabase
        .from("refunds")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (refundRows) setRefunds(refundRows);
    }

    fetchData();
  }, [driverId]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Driver Wallet</h1>
      {wallet && (
        <p>
          Balance: {(wallet.balance_cents / 100).toFixed(2)} {wallet.currency}
        </p>
      )}

      <div>
        <h2 className="text-lg font-semibold">Recent Ledger</h2>
        <ul>
          {ledger.map((l) => (
            <li key={l.id}>
              {l.created_at}: +{l.credit / 100} / -{l.debit / 100} → Balance {l.balance_after / 100}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Refunds</h2>
        <ul>
          {refunds.map((r) => (
            <li key={r.id}>
              {r.created_at}: Refund {(r.amount_cents / 100).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}