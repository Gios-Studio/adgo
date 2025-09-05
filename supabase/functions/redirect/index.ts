// supabase/functions/redirect/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    if (!slug) return new Response("Missing slug", { status: 400 });

    // 👇 Use adgo schema
    const { data: sl, error: slErr } = await supabase
      .schema("adgo")
      .from("shortlinks")
      .select("id, org_id, campaign_id, target_url")
      .eq("slug", slug)
      .single();

    if (slErr || !sl) return new Response("Not found", { status: 404 });

    const deviceId = req.headers.get("x-device-id") ?? null;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const ua = req.headers.get("user-agent") ?? "";

    // 👇 Insert into adgo.conversions
    const { error: convErr } = await supabase
      .schema("adgo")
      .from("conversions")
      .insert({
        org_id: sl.org_id,
        campaign_id: sl.campaign_id,
        shortlink_id: sl.id,
        device_id: deviceId,
        remote_ip: ip || null,
        user_agent: ua || null,
      });

    if (convErr) {
      return new Response(`Insert error: ${convErr.message}`, { status: 500 });
    }

    return new Response(null, { status: 302, headers: { Location: sl.target_url } });
  } catch (e) {
    return new Response("Server error: " + String(e), { status: 500 });
  }
});