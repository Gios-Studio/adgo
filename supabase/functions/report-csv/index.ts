import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

function toCSV(rows: any[]): string {
  if (!rows || rows.length === 0) {
    return "day,campaign_id,impressions,clicks,conversions,spend_cents,ctr,cpm,cpc\n";
  }
  const cols = Object.keys(rows[0]);
  const header = cols.join(",");
  const lines = rows.map(r => cols.map(c => (r[c] ?? "")).join(","));
  return [header, ...lines].join("\n");
}

serve(async (req) => {
  try {
    if (req.method !== "GET") return new Response("Method Not Allowed", { status: 405 });
    const orgId = req.headers.get("X-AdGo-Org");
    const url = new URL(req.url);
    const from = url.searchParams.get("from") ?? new Date().toISOString().slice(0,10);
    const to   = url.searchParams.get("to")   ?? new Date().toISOString().slice(0,10);
    if (!orgId) return new Response("missing X-AdGo-Org", { status: 400 });

    const { data, error } = await supabase
      .from("v_campaign_kpis_daily")
      .select("*")
      .eq("org_id", orgId)
      .gte("day", from)
      .lte("day", to)
      .order("day", { ascending: true })
      .limit(50000);

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    const rows = (data ?? []).map(r => ({
      day: r.day,
      campaign_id: r.campaign_id,
      impressions: r.impressions,
      clicks: r.clicks,
      conversions: r.conversions,
      spend_cents: r.spend_cents,
      ctr: r.ctr,
      cpm: r.cpm,
      cpc: r.cpc
    }));

    return new Response(toCSV(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="adgo_report_${from}_to_${to}.csv"`
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});