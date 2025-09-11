import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Wallet } from "@/types/wallets";
import { Transaction } from "@/types/transactions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DriverDashboard() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    supabase.from("wallets").select("*").then(({ data }) => {
      if (data) setWallets(data as Wallet[]);
    });

    supabase.from("transactions").select("*").then(({ data }) => {
      if (data) setTransactions(data as Transaction[]);
    });
  }, []);

  return (
    <div className="p-6">
      <h1>Driver Wallet & Payouts</h1>
      <pre>{JSON.stringify({ wallets, transactions }, null, 2)}</pre>
    </div>
  );
}