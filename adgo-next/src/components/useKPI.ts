import useSWR from 'swr';
import { supabase } from '@/lib/supabaseClient';

export function useKPI() {
  return useSWR('kpi', async () => {
    const { data } = await supabase.from('sme_dashboard_metrics').select('impressions,clicks,ctr,spend,roi');
    return data?.[0] || {};
  }, { refreshInterval: 5000 });
}