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
import { supabase } from "@/lib/supabaseClient";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const u = await supabase.rpc("rpc_admin_users");
      const p = await supabase.rpc("rpc_admin_payments");
      if (u.error) setError(u.error.message);
      if (p.error) setError(p.error.message);
      setUsers(u.data ?? []);
      setPayments(p.data ?? []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">Loading admin…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-10">
      <section>
        <h2 className="text-lg font-semibold mb-3">Users</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-right">KES Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} className="border-t">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.full_name ?? "—"}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 text-right">{((u.balance_cents ?? 0)/100).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Payment Intents</h2>
        <div className="overflow-auto">
          <table className="min-w-[900px] border">
            <thead>
              <tr>
                <th className="p-2 text-left">Intent</th>
                <th className="p-2 text-left">Provider</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-right">Amount (KES)</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Receipt</th>
                <th className="p-2 text-left">Error</th>
                <th className="p-2 text-left">At</th>
              </tr>
            </thead>
            <tbody>
              {payments?.slice(0, 50).map((p: any) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.provider}</td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2 text-right">{((p.amount_cents ?? 0)/100).toLocaleString()}</td>
                  <td className="p-2">{p.phone_e164 ?? "—"}</td>
                  <td className="p-2">{p.external_txn_id ?? "—"}</td>
                  <td className="p-2">{p.error_code ? `${p.error_code}: ${p.error_message}` : "—"}</td>
                  <td className="p-2">{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}