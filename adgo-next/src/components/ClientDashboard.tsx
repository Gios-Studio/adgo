"use client";

"use client";
// Migrated ClientDashboard from old repo
type Campaign = { id: string; name: string };
type Ad = { id: string; title: string; campaign_id: string };

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '../lib/supabaseClient';

// (removed duplicate type declarations)
type Metrics = { impressions: number; clicks: number; ctr: number; total_spend: number; roi: number; revenue?: number };

const ClientDashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({ impressions: 0, clicks: 0, ctr: 0, total_spend: 0, roi: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Fetch metrics from sme_dashboard_metrics view
  const fetchDashboard = async () => {
    setLoading(true);
  const { data: campaignsData } = await supabase.from('campaigns').select('*');
  const { data: adsData } = await supabase.from('ads').select('*');
  const { data: metricsData } = await supabase.from('sme_dashboard_metrics').select('*');
  setCampaigns(campaignsData || []);
  setAds(adsData || []);
  if (metricsData && metricsData.length > 0) setMetrics(metricsData[0]);
  setLoading(false);
  };


  if (loading) return <div>Loading dashboard...</div>;

  // Dedupe campaigns
  const _uniqueCampaigns = Array.from(new Map(campaigns.map(c => [c.name, c])).values());

  // Group ads by campaign
  const adsByCampaign: { [key: string]: Ad[] } = {};
  ads.forEach(ad => {
    if (!adsByCampaign[ad.campaign_id]) adsByCampaign[ad.campaign_id] = [];
    adsByCampaign[ad.campaign_id].push(ad);
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6">
      <h1 className="text-4xl font-bold mb-2">Welcome to Your App</h1>
      <p className="text-lg text-gray-500 mb-8">Hover over the sidebar to see the beautiful progressive animation in action!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1,2,3,4,5,6].map((i) => (
          <Card key={i} className="border rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Card {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">This is a sample card to demonstrate the layout with the animated sidebar. The sidebar will smoothly expand when you hover over it.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50 border-0">
        <CardHeader>
          <CardTitle>Animation Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 text-gray-600 text-base">
            <li>Sidebar collapsed by default (64px width)</li>
            <li>Smooth width expansion to 256px on hover</li>
            <li>Progressive text animation with staggered delays</li>
            <li>Fluid collapse animation on mouse leave</li>
            <li>Beautiful cubic-bezier easing for natural motion</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
