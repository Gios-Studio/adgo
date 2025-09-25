import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RideAuditDashboard() {
  const [fraudLogs, setFraudLogs] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [vatReceipts, setVatReceipts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("fraud_logs").select("*").then(({ data }) => setFraudLogs(data || []));
    supabase.from("wallets").select("*").then(({ data }) => setWallets(data || []));
    supabase.from("tax_receipts").select("*").then(({ data }) => setVatReceipts(data || []));
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Audit Dashboard</h1>

      <section>
        <h2 className="font-semibold">Fraud Logs</h2>
        <pre>{JSON.stringify(fraudLogs, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold">Wallets</h2>
        <pre>{JSON.stringify(wallets, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold">VAT Receipts</h2>
        <pre>{JSON.stringify(vatReceipts, null, 2)}</pre>
      </section>
    </div>
  );
}