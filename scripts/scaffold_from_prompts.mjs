// scripts/scaffold_from_prompts.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pagesDir = path.join(root, "src", "pages");
const compDir = path.join(root, "src", "components");
const promptsDir = path.join(root, "agent", "prompts");

// Helpers
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function writeIfMissing(file, content) {
  if (fs.existsSync(file)) return false;
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content.trimStart() + "\n");
  return true;
}
function hasMarker(appTsx, marker) {
  return appTsx.includes(marker);
}
function insertRoutes(appPath) {
  if (!fs.existsSync(appPath)) return { changed: false, reason: "App.tsx missing" };
  let src = fs.readFileSync(appPath, "utf8");
  const importsMarker = "// <<agent:imports>>";
  const routesMarker  = "{/* <<agent:routes>> */}";
  let changed = false;

  // Ensure markers exist (idempotent). If not, add them once.
  if (!hasMarker(src, importsMarker)) {
    src = src.replace(/(import .+\n)+/m, (m) => m + `${importsMarker}\n`);
    changed = true;
  }
  if (!hasMarker(src, routesMarker)) {
    src = src.replace(/<Routes>[\s\S]*?<\/Routes>/m, (m) => m.replace("</Routes>", `  ${routesMarker}\n</Routes>`));
    changed = true;
  }

  // Add imports
  if (!src.includes(`import Dashboard from "@/pages/Dashboard";`)) {
    src = src.replace(importsMarker, `${importsMarker}
import Dashboard from "@/pages/Dashboard";
import MyAds from "@/pages/MyAds";
import CampaignCalendar from "@/pages/CampaignCalendar";
import Analytics from "@/pages/Analytics";`);
    changed = true;
  }

  // Add routes into marker
  if (!src.includes(`<Route path="/dashboard"`)) {
    src = src.replace(routesMarker, `{/* <<agent:routes>> */}
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/my-ads" element={<ProtectedRoute><MyAds /></ProtectedRoute>} />
<Route path="/calendar" element={<ProtectedRoute><CampaignCalendar /></ProtectedRoute>} />
<Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />`);
    changed = true;
  }

  if (changed) fs.writeFileSync(appPath, src);
  return { changed, reason: "ok" };
}

function readPrompts() {
  if (!fs.existsSync(promptsDir)) return [];
  return fs.readdirSync(promptsDir).filter(f => f.endsWith(".md"));
}

// Page templates (simple, defensive)
const DashboardTSX = `
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let on = true;
    supabase?.auth.getUser().then(({ data }) => {
      if (!on) return;
      setEmail(data.user?.email || "you");
    });
    return () => { on = false; };
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {email}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Active Campaigns" value="—" />
        <Card title="Total Spend (KES)" value="—" />
        <Card title="Impressions (7d)" value="—" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string; }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
`;

const MyAdsTSX = `
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Ad = { id: string; title: string | null; status: string | null; created_at: string };

export default function MyAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
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
        if (on) setAds(data || []);
      } catch (e: any) {
        if (on) setErr(e.message ?? "Failed to load ads.");
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
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
`;

const CalendarTSX = `
export default function CampaignCalendar() {
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Campaign Calendar</h1>
      <p className="text-neutral-600">
        Coming soon: schedule campaigns, set flight dates, frequency caps, and preview screen allocations.
      </p>
    </div>
  );
}
`;

const AnalyticsTSX = `
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Row = { id: number; event_type: string; ad_id: string | null; occurred_at: string };

export default function Analytics() {
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    (async () => {
      setLoading(true); setErr(null);
      try {
        const { data, error } = await supabase!
          .from("analytics_events")
          .select("id, event_type, ad_id, occurred_at")
          .order("occurred_at", { ascending: false })
          .limit(20);
        if (error) throw error;
        if (on) setRows(data || []);
      } catch (e: any) {
        if (on) setErr(e.message ?? "Failed to load analytics.");
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, []);

  if (loading) return <div className="p-6">Loading analytics…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Analytics (latest 20)</h1>
      {rows.length === 0 ? (
        <div className="text-neutral-600">No events yet.</div>
      ) : (
        <div className="border rounded-lg divide-y">
          {rows.map(r => (
            <div key={r.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{r.event_type}</div>
                <div className="text-xs text-neutral-500">{new Date(r.occurred_at).toLocaleString()}</div>
              </div>
              <div className="text-sm">{r.ad_id ?? "—"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;

function main() {
  // Only act if at least one prompt exists (simple signal)
  const prompts = readPrompts();
  if (prompts.length === 0) {
    console.log("No prompts found—skipping.");
    return;
  }

  ensureDir(pagesDir);
  ensureDir(compDir);

  const created = [];
  if (writeIfMissing(path.join(pagesDir, "Dashboard.tsx"), DashboardTSX)) created.push("Dashboard.tsx");
  if (writeIfMissing(path.join(pagesDir, "MyAds.tsx"), MyAdsTSX)) created.push("MyAds.tsx");
  if (writeIfMissing(path.join(pagesDir, "CampaignCalendar.tsx"), CalendarTSX)) created.push("CampaignCalendar.tsx");
  if (writeIfMissing(path.join(pagesDir, "Analytics.tsx"), AnalyticsTSX)) created.push("Analytics.tsx");

  // Try to insert imports+routes via markers in App.tsx
  const appPath = path.join(root, "src", "App.tsx");
  const changed = insertRoutes(appPath);

  console.log(JSON.stringify({ created, routesMutated: changed }, null, 2));
}

main();