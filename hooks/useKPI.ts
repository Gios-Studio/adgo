import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useKPI = () => {
  const [data, setData] = useState({
    impressions: 0,
    clicks: 0,
    ctr: 0,
    roi: 0,
    spend: 0,
    earnings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchKPI = async () => {
      try {
        // Use analytics_events table instead of separate impressions/clicks tables
        const { data: eventsData, error: eventsError } = await supabase
          .from("analytics_events")
          .select("event_type, campaign_id");

        if (eventsError) throw eventsError;

        // Get wallet data for earnings
        const { data: walletsData, error: walletsError } = await supabase
          .from("wallets")
          .select("balance_cents");

        if (walletsError) throw walletsError;

        const impressions = eventsData?.filter(e => e.event_type === 'impression').length || 0;
        const clicks = eventsData?.filter(e => e.event_type === 'click').length || 0;
        const totalEarnings = walletsData?.reduce((sum, w) => sum + (w.balance_cents || 0), 0) || 0;

        const ctrValue = impressions > 0 ? (clicks / impressions) * 100 : 0;
        const roiValue = ctrValue * 1.5; // temporary formula
        const spend = impressions * 0.5; // 0.5 KES per impression

        setData({
          impressions,
          clicks,
          ctr: ctrValue,
          roi: roiValue,
          spend,
          earnings: totalEarnings / 100, // Convert cents to KES
        });
      } catch (err: any) {
        console.error("KPI Fetch Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchKPI();

    // Set up real-time subscriptions
    const channel = supabase
      .channel('kpi-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'analytics_events'
      }, (payload) => {
        console.log('📊 New analytics event:', payload.new);
        fetchKPI(); // Refresh KPIs when new events come in
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'wallets'
      }, (payload) => {
        console.log('💰 Wallet updated:', payload.new);
        fetchKPI(); // Refresh when wallet balances change
      })
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      console.log('🧹 Cleaning up KPI subscriptions');
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading, error };
};