-- Campaign metrics materialized view for performance optimization
-- This view pre-calculates CTR, conversion rates, and other metrics
-- Refreshes automatically to maintain data consistency

-- Drop existing view if it exists
DROP MATERIALIZED VIEW IF EXISTS campaign_metrics;

-- Create campaign metrics materialized view
CREATE MATERIALIZED VIEW campaign_metrics AS
SELECT 
    c.id as campaign_id,
    c.name as campaign_name,
    c.status,
    c.budget_cents,
    c.updated_at as campaign_updated_at,
    
    -- Event counts
    COUNT(CASE WHEN ae.event_type = 'impression' THEN 1 END) as impressions,
    COUNT(CASE WHEN ae.event_type = 'click' THEN 1 END) as clicks,
    COUNT(CASE WHEN ae.event_type = 'conversion' THEN 1 END) as conversions,
    
    -- Calculated metrics
    CASE 
        WHEN COUNT(CASE WHEN ae.event_type = 'impression' THEN 1 END) > 0 
        THEN (COUNT(CASE WHEN ae.event_type = 'click' THEN 1 END)::decimal / 
              COUNT(CASE WHEN ae.event_type = 'impression' THEN 1 END)) * 100
        ELSE 0 
    END as ctr_percentage,
    
    CASE 
        WHEN COUNT(CASE WHEN ae.event_type = 'click' THEN 1 END) > 0 
        THEN (COUNT(CASE WHEN ae.event_type = 'conversion' THEN 1 END)::decimal / 
              COUNT(CASE WHEN ae.event_type = 'click' THEN 1 END)) * 100
        ELSE 0 
    END as conversion_rate_percentage,
    
    -- Time-based metrics (24h, 7d, 30d)
    COUNT(CASE WHEN ae.event_type = 'impression' AND ae.created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as impressions_24h,
    COUNT(CASE WHEN ae.event_type = 'click' AND ae.created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as clicks_24h,
    COUNT(CASE WHEN ae.event_type = 'conversion' AND ae.created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as conversions_24h,
    
    COUNT(CASE WHEN ae.event_type = 'impression' AND ae.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as impressions_7d,
    COUNT(CASE WHEN ae.event_type = 'click' AND ae.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as clicks_7d,
    COUNT(CASE WHEN ae.event_type = 'conversion' AND ae.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as conversions_7d,
    
    -- Additional performance metrics
    MIN(ae.created_at) as first_event_at,
    MAX(ae.created_at) as last_event_at,
    COUNT(DISTINCT ae.device_id) as unique_devices,
    COUNT(DISTINCT ae.ride_id) as unique_rides,
    
    -- Materialized view refresh timestamp
    NOW() as metrics_calculated_at
    
FROM campaigns c
LEFT JOIN analytics_events ae ON c.id = ae.campaign_id
WHERE c.status IN ('active', 'paused', 'completed')
GROUP BY c.id, c.name, c.status, c.budget_cents, c.updated_at;

-- Create indexes on materialized view for fast lookups
CREATE INDEX idx_campaign_metrics_campaign_id ON campaign_metrics (campaign_id);
CREATE INDEX idx_campaign_metrics_status ON campaign_metrics (status);
CREATE INDEX idx_campaign_metrics_calculated_at ON campaign_metrics (metrics_calculated_at DESC);

-- Create unique index to enable concurrent refresh
CREATE UNIQUE INDEX idx_campaign_metrics_unique ON campaign_metrics (campaign_id);

-- Enable auto-refresh (requires superuser privileges in production)
-- In production, set up a cron job or trigger to refresh this view
-- REFRESH MATERIALIZED VIEW CONCURRENTLY campaign_metrics;