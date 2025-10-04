// components/FrequencyCapBadge.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function FrequencyCapBadge({ ride_id, ad_id }: { ride_id: string, ad_id: string }) {
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
  return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs ml-2">Blocked by Frequency Cap</span>;
}