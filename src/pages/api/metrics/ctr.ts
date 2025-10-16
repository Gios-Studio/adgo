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
import { z } from 'zod';
import { performanceCache } from '@/lib/performanceCache';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Zod schemas for parameter validation
const MetricsQuerySchema = z.object({
  campaign_id: z.string().uuid().optional(),
  partner_id: z.string().uuid().optional(), 
  period: z.enum(['1h', '24h', '7d', '30d']).default('24h'),
  format: z.enum(['json', 'csv']).default('json').optional()
});

// Enhanced metrics response schema
const MetricsResponseSchema = z.object({
  period: z.string(),
  impressions: z.number().int().min(0),
  clicks: z.number().int().min(0),
  conversions: z.number().int().min(0).optional(),
  ctr: z.number().min(0).max(100),
  conversionRate: z.number().min(0).max(100).optional(),
  timestamp: z.string().datetime()
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate query parameters with Zod
    const validationResult = MetricsQuerySchema.safeParse(req.query);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: "invalid_parameters",
        details: validationResult.error.issues 
      });
    }
    
    const { campaign_id, period, partner_id, format } = validationResult.data;
    
    // Check cache first (30-second TTL)
    const cacheKey = `metrics|${campaign_id || 'all'}|${partner_id || 'all'}|${period}|${format || 'json'}`;
    const cachedResult = performanceCache.get(cacheKey);
    
    if (cachedResult) {
      // Add cache hit header for monitoring
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Key', cacheKey);
      return res.status(200).json(cachedResult);
    }
    
    // Cache miss - proceed with database query
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Cache-Key', cacheKey);
    
    // If no specific campaign, return overall metrics
    if (!campaign_id && !partner_id) {
      return await getOverallMetrics(req, res, period, format);
    }
    
    // If campaign_id provided, return campaign-specific metrics
    if (campaign_id) {
      return await getCampaignMetrics(req, res, campaign_id, format);
    }
    
    // If partner_id provided, return partner-specific metrics
    if (partner_id) {
      return await getPartnerMetrics(req, res, partner_id, period, format);
    }
    
    return res.status(400).json({ error: "missing_required_parameters" });
  } catch (error: any) {
    console.error('Metrics API Error:', error);
    return res.status(500).json({ 
      error: "internal_server_error", 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Get overall platform metrics
async function getOverallMetrics(req: NextApiRequest, res: NextApiResponse, period: string, format?: string) {
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
    
    // Try to use materialized view for better performance
    let impressions = 0, clicks = 0, conversions = 0;
    
    try {
      // Select appropriate time-based columns from materialized view
      let selectColumns = 'impressions, clicks, conversions';
      if (period === '24h') {
        selectColumns = 'impressions_24h, clicks_24h, conversions_24h';
      } else if (period === '7d') {
        selectColumns = 'impressions_7d, clicks_7d, conversions_7d';  
      }
      
      const { data: aggregated, error: viewError } = await supabase
        .from('campaign_metrics')
        .select(selectColumns);
      
      if (!viewError && aggregated?.length > 0) {
        // Sum metrics from materialized view
        for (const row of aggregated) {
          if (period === '24h') {
            impressions += (row as any).impressions_24h || 0;
            clicks += (row as any).clicks_24h || 0;
            conversions += (row as any).conversions_24h || 0;
          } else if (period === '7d') {
            impressions += (row as any).impressions_7d || 0;
            clicks += (row as any).clicks_7d || 0;
            conversions += (row as any).conversions_7d || 0;
          } else {
            impressions += (row as any).impressions || 0;
            clicks += (row as any).clicks || 0;
            conversions += (row as any).conversions || 0;
          }
        }
      } else {
        throw new Error('Materialized view not available');
      }
    } catch (fallbackError) {
      // Fallback to direct query if materialized view fails
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('event_type, created_at')
        .gte('created_at', startDate.toISOString());
      
      if (error) throw error;
      
      impressions = events?.filter(e => e.event_type === 'impression').length || 0;
      clicks = events?.filter(e => e.event_type === 'click').length || 0;
      conversions = events?.filter(e => e.event_type === 'conversion').length || 0;
    }
    
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
async function getCampaignMetrics(req: NextApiRequest, res: NextApiResponse, campaign_id: string, format?: string) {
  try {
    // Check cache first
    const cacheKey = `campaign_metrics|${campaign_id}|${format || 'json'}`;
    const cachedResult = performanceCache.get(cacheKey);
    
    if (cachedResult) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Key', cacheKey);
      return res.status(200).json(cachedResult);
    }
    
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Cache-Key', cacheKey);
    
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
      
      const response = {
        campaign_id,
        impressions,
        clicks,
        ctr: Number(ctr.toFixed(2)),
        calculated: true
      };
      
      performanceCache.set(cacheKey, response);
      return res.status(200).json(response);
    }
    
    performanceCache.set(cacheKey, data);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Campaign metrics error:', error);
    return res.status(500).json({ error: 'Failed to get campaign metrics' });
  }
}

// Get partner-specific metrics
async function getPartnerMetrics(req: NextApiRequest, res: NextApiResponse, partner_id: string, period: string, format?: string) {
  try {
    // Check cache first
    const cacheKey = `partner_metrics|${partner_id}|${period}|${format || 'json'}`;
    const cachedResult = performanceCache.get(cacheKey);
    
    if (cachedResult) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Key', cacheKey);
      return res.status(200).json(cachedResult);
    }
    
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Cache-Key', cacheKey);
    
    // Get partner campaigns
    const { data: campaigns, error: campaignError } = await supabase
      .from('campaigns')
      .select('id')
      .eq('partner_id', partner_id);
    
    if (campaignError) throw campaignError;
    
    if (!campaigns || campaigns.length === 0) {
      const response = {
        partner_id,
        period,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        campaigns: 0
      };
      
      performanceCache.set(cacheKey, response);
      return res.status(200).json(response);
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
    
    const response = {
      partner_id,
      period,
      impressions,
      clicks,
      ctr: Number(ctr.toFixed(2)),
      campaigns: campaigns.length
    };
    
    performanceCache.set(cacheKey, response);
    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Partner metrics error:', error);
    return res.status(500).json({ error: 'Failed to get partner metrics' });
  }
}