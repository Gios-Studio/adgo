// src/pages/MyAds.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Ad = { id: string; title: string | null; status: string | null; created_at: string };

export default function MyAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const { data: sess } = await supabase!.auth.getSession();
        const uid = sess.session?.user.id;
        if (!uid) throw new Error("Not signed in.");

        const { data, error } = await supabase!
          .from("ads")
          .select("id, title, status, created_at")
          .eq("owner_id", uid)
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) throw error;
        if (!mounted) return;
        setAds(data || []);
      } catch (e: any) {
        if (!mounted) return;
        setErr(e.message ?? "Failed to load ads.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-6">Loading ads…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Ads</h1>
        <a href="/ad-upload" className="border rounded px-3 py-2">Upload Ad</a>
      </header>

      {ads.length === 0 ? (
        <div className="text-neutral-600">No ads yet. Click “Upload Ad”.</div>
      ) : (
        <div className="border rounded-lg divide-y">
          {ads.map(a => (
            <div key={a.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{a.title || "Untitled"}</div>
                <div className="text-xs text-neutral-500">Created {new Date(a.created_at).toLocaleString()}</div>
              </div>
              <div className="text-sm">{a.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}