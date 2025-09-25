import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface FraudLog {
  id: string;
  ride_id: string;
  reason: string;
  detected_at: string;
}

interface Wallet {
  id: string;
  driver_id: string;
  balance: number;
  updated_at: string;
}

interface VatReceipt {
  id: string;
  org_id: string;
  amount: number;
  vat_amount: number;
  issued_at: string;
}

export default function AuditDashboard() {
  const [fraudLogs, setFraudLogs] = useState<FraudLog[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [vatReceipts, setVatReceipts] = useState<VatReceipt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fraud } = await supabase.from("fraud_logs").select("*").order("detected_at", { ascending: false });
      const { data: wallet } = await supabase.from("wallets").select("*").order("updated_at", { ascending: false });
      const { data: receipts } = await supabase.from("vat_receipts").select("*").order("issued_at", { ascending: false });

      if (fraud) setFraudLogs(fraud as FraudLog[]);
      if (wallet) setWallets(wallet as Wallet[]);
      if (receipts) setVatReceipts(receipts as VatReceipt[]);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Audit Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold">Fraud Logs</h2>
        <ul className="space-y-2">
          {fraudLogs.map((log) => (
            <li key={log.id} className="border p-2 rounded">
              <p><strong>Ride:</strong> {log.ride_id}</p>
              <p><strong>Reason:</strong> {log.reason}</p>
              <p className="text-sm text-gray-500">Detected: {new Date(log.detected_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Wallets</h2>
        <ul className="space-y-2">
          {wallets.map((w) => (
            <li key={w.id} className="border p-2 rounded">
              <p><strong>Driver:</strong> {w.driver_id}</p>
              <p><strong>Balance:</strong> ${w.balance}</p>
              <p className="text-sm text-gray-500">Updated: {new Date(w.updated_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">VAT Receipts</h2>
        <ul className="space-y-2">
          {vatReceipts.map((r) => (
            <li key={r.id} className="border p-2 rounded">
              <p><strong>Org:</strong> {r.org_id}</p>
              <p><strong>Amount:</strong> ${r.amount}</p>
              <p><strong>VAT:</strong> ${r.vat_amount}</p>
              <p className="text-sm text-gray-500">Issued: {new Date(r.issued_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}