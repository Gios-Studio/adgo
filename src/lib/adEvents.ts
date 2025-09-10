// src/lib/adEvents.ts
import { supabase } from "@/lib/supabaseClient";

type EventType = "impression" | "click" | "conversion";

export async function recordEvent(e: {
  ride_id: string;
  event_type: EventType;
  app_id?: string | null;
  campaign_id?: string | null;
  ad_id?: string | null;
  device_id?: string | null;
  zone?: string | null;
  meta?: any;
}) {
  const { data, error } = await supabase.rpc("record_ad_event", {
    p_app_id: e.app_id ?? null,
    p_campaign_id: e.campaign_id ?? null,
    p_ad_id: e.ad_id ?? null,
    p_ride_id: e.ride_id,
    p_device_id: e.device_id ?? null,
    p_zone: e.zone ?? null,
    p_event_type: e.event_type,
    p_meta: e.meta ?? {},
  });
  if (error) throw error;
  return data as string; // the inserted id
}