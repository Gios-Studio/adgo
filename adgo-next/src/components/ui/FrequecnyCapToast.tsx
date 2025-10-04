// components/FrequencyCapToast.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export function FrequencyCapToast({ ride_id, ad_id }: { ride_id: string, ad_id: string }) {
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    supabase.from("analytics_events")
      .select("id")
      .eq("ride_id", ride_id)
      .eq("ad_id", ad_id)
      .eq("event_type", "impression")
      .then(({ data }) => setBlocked((data?.length ?? 0) > 0));
  }, [ride_id, ad_id]);
  if (!blocked) return null;
  return <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded">Ad blocked: 1 per ride</div>;
}