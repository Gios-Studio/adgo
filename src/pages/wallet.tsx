import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "@/lib/supabaseClient";

type Wallet = {
  id: string;
  currency: string;
  balance_cents: number;
};

type Txn = {
  id: string;
  type: "credit" | "debit";
  amount_cents: number;
  ref: string | null;
  memo: string | null;
  created_at: string;
};

function fmtKES(cents: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export default function WalletPage() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [txns, setTxns] = useState<Txn[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setErr(null);
      setLoading(true);
      try {
        if (!supabase) {
          setErr("Supabase client not initialized. Check your env vars.");
          return;
        }
        const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr) throw sessionErr;
        const uid = sessionData.session?.user.id;
        if (!uid) {
          setErr("Not signed in.");
          return;
        }

        // 1) fetch wallet (KES) owned by you
        const { data: walletRows, error: wErr } = await supabase
          .from("wallets")
          .select("id, currency, balance_cents")
          .eq("owner_id", uid)
          .eq("currency", "KES")
          .limit(1)
          .maybeSingle();

        if (wErr) throw wErr;

        if (!walletRows) {
          setWallet(null);
          setTxns([]);
          return;
        }
        setWallet(walletRows as Wallet);

        // 2) fetch recent transactions for that wallet
        const { data: txnRows, error: tErr } = await supabase
          .from("transactions")
          .select("id, type, amount_cents, ref, memo, created_at")
          .eq("wallet_id", (walletRows as Wallet).id)
          .order("created_at", { ascending: false })
          .limit(20);

        if (tErr) throw tErr;

        setTxns((txnRows ?? []) as Txn[]);
      } catch (e: any) {
        console.error("Wallet fetch error →", e);
        setErr(e.message ?? "Failed to load wallet.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Layout><div>Loading wallet…</div></Layout>;
  if (err) return <Layout><div className="text-red-600">Error: {err}</div></Layout>;

  if (!wallet) {
    return (
      <Layout>
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Wallet</h1>
          <p>No KES wallet found yet.</p>
          <p className="text-sm text-neutral-600">
            Use the SQL snippet I gave you to create a wallet and a seed transaction, then refresh this page.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex items-baseline justify-between">
          <h1 className="text-2xl font-semibold">Wallet ({wallet.currency})</h1>
          <div className="text-2xl">{fmtKES(wallet.balance_cents)}</div>
        </header>

        <section>
          <h2 className="text-lg font-medium mb-2">Recent transactions</h2>
          {txns.length === 0 ? (
            <div className="text-sm text-neutral-600">No transactions yet.</div>
          ) : (
            <div className="border rounded-lg divide-y">
              {txns.map((t) => (
                <div key={t.id} className="p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">{t.type === "credit" ? "Credit" : "Debit"} — {t.ref ?? "—"}</div>
                    <div className="text-xs text-neutral-600">{new Date(t.created_at).toLocaleString()}</div>
                    {t.memo && <div className="text-xs text-neutral-700">{t.memo}</div>}
                  </div>
                  <div className={`font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {t.type === "credit" ? "+" : "-"}{fmtKES(t.amount_cents)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}