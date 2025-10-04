import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Wallet = { id: string; ad_earnings: number };
type Transaction = { id: string; amount_cents: number; created_at: string };

export default function DriverWallet({ driverId }: { driverId: string }) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      const { data } = await supabase.from("driver_wallet").select("*").eq("driver_id", driverId).single();
      setWallet(data);
      setLoading(false);
    };
    fetchWallet();
    const sub = supabase
      .channel("wallet")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "driver_wallet" }, fetchWallet)
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, [driverId]);

  useEffect(() => {
    if (!wallet?.id) return;
    supabase.from("transactions").select("*").eq("wallet_id", wallet.id).order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setTransactions(data || []));
  }, [wallet]);

  if (loading) return <div>Loading...</div>;
  if (!wallet) return <div>No wallet found.</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold mb-2">Driver Earnings</h2>
      <div className="text-2xl mb-4">KES {wallet.ad_earnings}</div>
      <h3 className="font-semibold mb-1">Last 5 Transactions</h3>
      <ul className="text-sm">
        {transactions.map(tx => (
          <li key={tx.id}>{tx.amount_cents / 100} KES - {tx.created_at}</li>
        ))}
      </ul>
    </div>
  );
}