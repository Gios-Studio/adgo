import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // AD REQUEST - Serve ad with frequency cap check
      return await serveAd(req, res);
    } else if (req.method === "POST") {
      // EVENT TRACKING - Record impression/click
      return await recordEvent(req, res);
    } else {
      return res.status(405).json({ error: "method_not_allowed" });
    }
  } catch (e: any) {
    console.error('SDK API Error:', e);
    res.status(500).json({ error: e.message });
  }
}

async function serveAd(req: NextApiRequest, res: NextApiResponse) {
  const { ride_id, device_id, zone = "post-ride" } = req.query;
  
  if (!ride_id) {
    return res.status(400).json({ error: "missing_ride_id" });
  }
  
  try {
    // Check frequency cap - only 1 ad per ride_id
    const { data: existingAds, error: checkError } = await supabase
      .from('analytics_events')
      .select('id')
      .eq('ride_id', ride_id)
      .limit(1);
    
    if (checkError) throw checkError;
    
    if (existingAds && existingAds.length > 0) {
      return res.status(200).json({ 
        ad: null, 
        message: "frequency_cap_reached",
        ride_id 
      });
    }
    
    // Get active campaign with available budget
    const { data: campaigns, error: campaignError } = await supabase
      .from('campaigns')
      .select(`
        id, name, budget_cents, status,
        ads (id, title, media_url, status)
      `)
      .eq('status', 'active')
      .gt('budget_cents', 0)
      .limit(1);
    
    if (campaignError) throw campaignError;
    
    if (!campaigns || campaigns.length === 0) {
      return res.status(200).json({ 
        ad: null, 
        message: "no_available_campaigns" 
      });
    }
    
    const campaign = campaigns[0];
    const activeAds = campaign.ads?.filter((ad: any) => ad.status === 'active') || [];
    
    if (activeAds.length === 0) {
      return res.status(200).json({ 
        ad: null, 
        message: "no_active_ads" 
      });
    }
    
    // Select random ad
    const selectedAd = activeAds[Math.floor(Math.random() * activeAds.length)];
    
    // Return ad with tracking info
    return res.status(200).json({
      ad: {
        id: selectedAd.id,
        campaign_id: campaign.id,
        title: selectedAd.title,
        media_url: selectedAd.media_url,
        tracking_pixel: `/api/sdk/events?event_type=impression&campaign_id=${campaign.id}&ad_id=${selectedAd.id}&ride_id=${ride_id}`,
        click_url: `/api/sdk/events?event_type=click&campaign_id=${campaign.id}&ad_id=${selectedAd.id}&ride_id=${ride_id}`
      },
      ride_id,
      zone
    });
    
  } catch (error) {
    console.error('Serve ad error:', error);
    return res.status(500).json({ error: 'Failed to serve ad' });
  }
}

async function recordEvent(req: NextApiRequest, res: NextApiResponse) {
  const { 
    campaign_id, 
    ad_id, 
    ride_id, 
    device_id = null, 
    zone = "post-ride", 
    event_type, 
    meta = {} 
  } = req.body || {};
  
  if (!ride_id || !event_type || !campaign_id || !ad_id) {
    return res.status(400).json({ error: "missing_required_fields" });
  }
  
  try {
    // Record event
    const { data: eventData, error: eventError } = await supabase
      .from('analytics_events')
      .insert({
        campaign_id,
        ad_id,
        event_type,
        device_id,
        region: zone,
        ride_id,
        meta
      })
      .select()
      .single();
    
    if (eventError) throw eventError;
    
    // If it's a click, trigger driver payout
    if (event_type === 'click') {
      await triggerDriverPayout(ride_id, campaign_id, ad_id);
    }
    
    res.status(200).json({ 
      success: true,
      event_id: eventData.id,
      ride_id,
      event_type 
    });
    
  } catch (error) {
    console.error('Record event error:', error);
    return res.status(500).json({ error: 'Failed to record event' });
  }
}

async function triggerDriverPayout(ride_id: string, campaign_id: string, ad_id: string) {
  try {
    // Simple payout logic - 0.10 KES per click
    const payoutAmount = 10; // 10 cents = 0.10 KES
    
    // Find driver wallet (simplified - in production would link via ride data)
    const { data: driverWallet, error: walletError } = await supabase
      .from('wallets')
      .select('id, balance_cents')
      .not('driver_id', 'is', null)
      .limit(1)
      .single();
    
    if (walletError || !driverWallet) {
      console.log('No driver wallet found for payout');
      return;
    }
    
    // Credit driver wallet
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        wallet_id: driverWallet.id,
        type: 'credit',
        amount_cents: payoutAmount,
        ref: `click_payout_${ride_id}`,
        memo: `Click payout for ride ${ride_id}`
      });
    
    if (txError) throw txError;
    
    // Update wallet balance
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ 
        balance_cents: driverWallet.balance_cents + payoutAmount 
      })
      .eq('id', driverWallet.id);
    
    if (updateError) throw updateError;
    
    console.log(`💰 Driver payout: ${payoutAmount} cents for ride ${ride_id}`);
    
  } catch (error) {
    console.error('Driver payout error:', error);
  }
}