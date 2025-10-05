import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useKPI() {
  const [kpi, setKPI] = useState({ impressions: 0, clicks: 0, ctr: 0 });

  useEffect(() => {
    async function fetchKPI() {
      const { data: impressions } = await supabase.from("impressions").select("*");
      const { data: clicks } = await supabase.from("clicks").select("*");

      const impressionsCount = impressions?.length || 0;
      const clicksCount = clicks?.length || 0;
      const ctr = impressionsCount ? (clicksCount / impressionsCount) * 100 : 0;

      setKPI({ impressions: impressionsCount, clicks: clicksCount, ctr });
    }
    fetchKPI();
  }, []);

  return kpi;
}