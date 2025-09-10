import { useEffect, useState } from "react";

type Wallet = { weekEarnings: number; adEarnings: number; pendingPayout: number; lastPayoutAt: string };

export default function DriverWalletCard() {
  const [data, setData] = useState<Wallet | null>(null);
  useEffect(() => {
    fetch("/api/driver/wallet").then(r => r.json()).then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <div className="border p-3 rounded">Loading wallet…</div>;

  return (
    <div className="border p-4 rounded-md">
      <h3 className="font-semibold mb-2">Driver Wallet</h3>
      <div className="grid grid-cols-2 gap-2">
        <div><div className="text-sm opacity-70">Week earnings</div><div>KES {data.weekEarnings}</div></div>
        <div><div className="text-sm opacity-70">Ad earnings</div><div>KES {data.adEarnings}</div></div>
        <div><div className="text-sm opacity-70">Pending payout</div><div>KES {data.pendingPayout}</div></div>
        <div><div className="text-sm opacity-70">Last payout</div><div>{new Date(data.lastPayoutAt).toLocaleString()}</div></div>
      </div>
      <button className="mt-3 border rounded px-3 py-2" disabled>Request Payout (soon)</button>
    </div>
  );
}