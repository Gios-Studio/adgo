import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });
  try {
    const { app_id=null, campaign_id=null, ad_id=null, ride_id, device_id=null, zone="post-ride", event_type, meta={} } = req.body || {};
    if (!ride_id || !event_type) return res.status(400).json({ error: "missing_fields" });

    const { data, error } = await supabase.rpc("record_ad_event", {
      p_app_id: app_id, p_campaign_id: campaign_id, p_ad_id: ad_id,
      p_ride_id: ride_id, p_device_id: device_id, p_zone: zone,
      p_event_type: event_type, p_meta: meta
    });
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ id: data });
  } catch (e:any) { res.status(500).json({ error: e.message }); }
}