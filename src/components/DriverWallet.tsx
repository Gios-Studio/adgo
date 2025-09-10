// components/DriverWallet.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DriverWallet({ driverId }: { driverId: string }) {
  const [wallet, setWallet] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);

  useEffect(() => {
    supabase.from("drivers")
      .select("wallet_balance")
      .eq("id", driverId)
      .single()
      .then(({ data }) => setWallet(data?.wallet_balance || 0));

    supabase.from("campaign_metrics")
      .select("clicks")
      .eq("tenant_id", driverId)
      .then(({ data }) => {
        const totalClicks = data?.reduce((sum, m) => sum + m.clicks, 0) || 0;
        setBonus(totalClicks > 50 ? 500 : 0); // bonus if >50 clicks
      });
  }, [driverId]);

  const requestPayout = async () => {
    await supabase.from("transactions").insert({
      tenant_id: driverId,
      amount: wallet,
      type: "driver_payout",
    });
    alert("Payout requested!");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold">Driver Wallet</h2>
      <p className="text-2xl">{wallet} KES</p>
      {bonus > 0 && <p className="text-green-600">Bonus: {bonus} KES 🎉</p>}
      <button onClick={requestPayout} className="mt-2 bg-green-600 text-white px-4 py-2 rounded">
        Request Payout
      </button>
    </div>
  );
}