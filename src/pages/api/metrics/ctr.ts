/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:36 UTC
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { campaign_id, period = '24h', partner_id } = req.query;
    
    // If no specific campaign, return overall metrics
    if (!campaign_id && !partner_id) {
      return await getOverallMetrics(req, res, period as string);
    }
    
    // If campaign_id provided, return campaign-specific metrics
    if (campaign_id) {
      return await getCampaignMetrics(req, res, campaign_id as string);
    }
    
    // If partner_id provided, return partner-specific metrics
    if (partner_id) {
      return await getPartnerMetrics(req, res, partner_id as string, period as string);
    }
    
    return res.status(400).json({ error: "missing_required_parameters" });
  } catch (error: any) {
    console.error('Metrics API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// Get overall platform metrics
async function getOverallMetrics(req: NextApiRequest, res: NextApiResponse, period: string) {
  try {
    // Calculate date range based on period
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '1h':
        startDate.setHours(now.getHours() - 1);
        break;
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      default:
        startDate.setDate(now.getDate() - 1);
    }
    
    // Get analytics events for the period
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('event_type, created_at')
      .gte('created_at', startDate.toISOString());
    
    if (error) throw error;
    
    const impressions = events?.filter(e => e.event_type === 'impression').length || 0;
    const clicks = events?.filter(e => e.event_type === 'click').length || 0;
    const conversions = events?.filter(e => e.event_type === 'conversion').length || 0;
    const ctr = impressions > 0 ? ((clicks / impressions) * 100) : 0;
    const conversionRate = clicks > 0 ? ((conversions / clicks) * 100) : 0;
    
    return res.status(200).json({
      period,
      impressions,
      clicks,
      conversions,
      ctr: Number(ctr.toFixed(2)),
      conversionRate: Number(conversionRate.toFixed(2)),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Overall metrics error:', error);
    return res.status(500).json({ error: 'Failed to get overall metrics' });
  }
}

// Get campaign-specific metrics
async function getCampaignMetrics(req: NextApiRequest, res: NextApiResponse, campaign_id: string) {
  try {
    const { data, error } = await supabase
      .from("campaign_ctr")
      .select("*")
      .eq("campaign_id", campaign_id)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    // If no data in campaign_ctr table, calculate from analytics_events
    if (!data) {
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('event_type')
        .eq('campaign_id', campaign_id);
      
      if (eventsError) throw eventsError;
      
      const impressions = events?.filter(e => e.event_type === 'impression').length || 0;
      const clicks = events?.filter(e => e.event_type === 'click').length || 0;
      const ctr = impressions > 0 ? ((clicks / impressions) * 100) : 0;
      
      return res.status(200).json({
        campaign_id,
        impressions,
        clicks,
        ctr: Number(ctr.toFixed(2)),
        calculated: true
      });
    }
    
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Campaign metrics error:', error);
    return res.status(500).json({ error: 'Failed to get campaign metrics' });
  }
}

// Get partner-specific metrics
async function getPartnerMetrics(req: NextApiRequest, res: NextApiResponse, partner_id: string, period: string) {
  try {
    // Get partner campaigns
    const { data: campaigns, error: campaignError } = await supabase
      .from('campaigns')
      .select('id')
      .eq('partner_id', partner_id);
    
    if (campaignError) throw campaignError;
    
    if (!campaigns || campaigns.length === 0) {
      return res.status(200).json({
        partner_id,
        period,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        campaigns: 0
      });
    }
    
    const campaignIds = campaigns.map(c => c.id);
    
    // Get events for partner campaigns
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('event_type, campaign_id')
      .in('campaign_id', campaignIds);
    
    if (eventsError) throw eventsError;
    
    const impressions = events?.filter(e => e.event_type === 'impression').length || 0;
    const clicks = events?.filter(e => e.event_type === 'click').length || 0;
    const ctr = impressions > 0 ? ((clicks / impressions) * 100) : 0;
    
    return res.status(200).json({
      partner_id,
      period,
      impressions,
      clicks,
      ctr: Number(ctr.toFixed(2)),
      campaigns: campaigns.length
    });
  } catch (error: any) {
    console.error('Partner metrics error:', error);
    return res.status(500).json({ error: 'Failed to get partner metrics' });
  }
}