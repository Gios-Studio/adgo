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

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FraudLog { id: string; ride_id: string; reason: string; detected_at: string; }
interface Transaction { id: string; wallet_id: string; type: string; amount_cents: number; created_at: string; }
interface TaxReceipt { id: string; transaction_id: string; vat_amount: number; issued_at: string; }

export default function AuditDashboard() {
  const [fraudLogs, setFraudLogs] = useState<FraudLog[]>([]);
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [receipts, setReceipts] = useState<TaxReceipt[]>([]);

  useEffect(() => {
    supabase.from("fraud_logs").select("*").then(({ data }) => data && setFraudLogs(data));
    supabase.from("transactions").select("*").then(({ data }) => data && setTxns(data));
    supabase.from("tax_receipts").select("*").then(({ data }) => data && setReceipts(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Audit Dashboard</h1>

      <section>
        <h2 className="text-xl mb-2">Fraud Logs</h2>
        <pre>{JSON.stringify(fraudLogs, null, 2)}</pre>
      </section>

      <section>
        <h2 className="text-xl mb-2">Transactions</h2>
        <pre>{JSON.stringify(txns, null, 2)}</pre>
      </section>

      <section>
        <h2 className="text-xl mb-2">VAT Receipts</h2>
        <pre>{JSON.stringify(receipts, null, 2)}</pre>
      </section>
    </div>
  );
}