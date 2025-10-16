-- AdGo Performance Schema Optimization with Materialized View Enhancement
-- Add missing ride_ref column, performance indexes, and optimized materialized views

BEGIN;

-- 1. Add ride_ref column to analytics_events (nullable TEXT)
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS ride_ref TEXT;

-- 2. Create performance indexes for analytics_events
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_ride_ref ON analytics_events (ride_ref);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_campaign_created ON analytics_events (campaign_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_ride_created ON analytics_events (ride_id, created_at DESC);

-- 3. Critical index for CTR calculations - composite index for better performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_ctr_calculation ON analytics_events (campaign_id, event_type, created_at DESC);

-- 4. Create optimized indexes for campaigns and wallets
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns (status);
CREATE INDEX IF NOT EXISTS idx_campaigns_updated_at ON campaigns (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets (user_id);
CREATE INDEX IF NOT EXISTS idx_wallets_driver_id ON wallets (driver_id) WHERE driver_id IS NOT NULL;

-- 5. Drop existing materialized view if it exists
DROP MATERIALIZED VIEW IF EXISTS campaign_metrics;

-- 6. Create optimized materialized view for CTR metrics with better performance
CREATE MATERIALIZED VIEW campaign_metrics AS
WITH campaign_stats AS (
    SELECT 
        ae.campaign_id,
        COUNT(CASE WHEN ae.event_type = 'impression' THEN 1 END) as impressions,
        COUNT(CASE WHEN ae.event_type = 'click' THEN 1 END) as clicks,
        COUNT(CASE WHEN ae.event_type = 'conversion' THEN 1 END) as conversions,
        
        -- 1 hour metrics
        COUNT(CASE WHEN ae.event_type = 'impression' AND ae.created_at >= NOW() - INTERVAL '1 hour' THEN 1 END) as impressions_1h,
        COUNT(CASE WHEN ae.event_type = 'click' AND ae.created_at >= NOW() - INTERVAL '1 hour' THEN 1 END) as clicks_1h,
        COUNT(CASE WHEN ae.event_type = 'conversion' AND ae.created_at >= NOW() - INTERVAL '1 hour' THEN 1 END) as conversions_1h,
        
        -- 24 hour metrics
        COUNT(CASE WHEN ae.event_type = 'impression' AND ae.created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as impressions_24h,
        COUNT(CASE WHEN ae.event_type = 'click' AND ae.created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as clicks_24h,
        COUNT(CASE WHEN ae.event_type = 'conversion' AND ae.created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) as conversions_24h,
        
        -- 7 day metrics
        COUNT(CASE WHEN ae.event_type = 'impression' AND ae.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as impressions_7d,
        COUNT(CASE WHEN ae.event_type = 'click' AND ae.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as clicks_7d,
        COUNT(CASE WHEN ae.event_type = 'conversion' AND ae.created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as conversions_7d,
        
        MAX(ae.created_at) as last_event_at
    FROM analytics_events ae
    WHERE ae.created_at >= NOW() - INTERVAL '30 days' -- Only keep recent data for performance
    GROUP BY ae.campaign_id
)
SELECT 
    cs.campaign_id,
    c.name as campaign_name,
    c.status as campaign_status,
    
    -- All-time metrics
    cs.impressions,
    cs.clicks,
    cs.conversions,
    CASE WHEN cs.impressions > 0 THEN ROUND((cs.clicks::DECIMAL / cs.impressions * 100), 2) ELSE 0 END as ctr,
    CASE WHEN cs.clicks > 0 THEN ROUND((cs.conversions::DECIMAL / cs.clicks * 100), 2) ELSE 0 END as conversion_rate,
    
    -- 1 hour metrics
    cs.impressions_1h,
    cs.clicks_1h,
    cs.conversions_1h,
    CASE WHEN cs.impressions_1h > 0 THEN ROUND((cs.clicks_1h::DECIMAL / cs.impressions_1h * 100), 2) ELSE 0 END as ctr_1h,
    
    -- 24 hour metrics  
    cs.impressions_24h,
    cs.clicks_24h,
    cs.conversions_24h,
    CASE WHEN cs.impressions_24h > 0 THEN ROUND((cs.clicks_24h::DECIMAL / cs.impressions_24h * 100), 2) ELSE 0 END as ctr_24h,
    
    -- 7 day metrics
    cs.impressions_7d,
    cs.clicks_7d,
    cs.conversions_7d,
    CASE WHEN cs.impressions_7d > 0 THEN ROUND((cs.clicks_7d::DECIMAL / cs.impressions_7d * 100), 2) ELSE 0 END as ctr_7d,
    
    cs.last_event_at,
    NOW() as calculated_at
FROM campaign_stats cs
LEFT JOIN campaigns c ON c.id = cs.campaign_id
ORDER BY cs.impressions_24h DESC;

-- 7. Create index on materialized view for fast lookups
CREATE UNIQUE INDEX idx_campaign_metrics_campaign_id ON campaign_metrics (campaign_id);
CREATE INDEX idx_campaign_metrics_status ON campaign_metrics (campaign_status);
CREATE INDEX idx_campaign_metrics_calculated_at ON campaign_metrics (calculated_at DESC);

-- 8. Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_campaign_metrics()
RETURNS void AS $$
BEGIN
    -- Use CONCURRENTLY to avoid locks during refresh
    REFRESH MATERIALIZED VIEW CONCURRENTLY campaign_metrics;
    
    -- Log the refresh for monitoring
    INSERT INTO refresh_log (view_name, refreshed_at) 
    VALUES ('campaign_metrics', NOW())
    ON CONFLICT (view_name) DO UPDATE SET refreshed_at = NOW();
    
EXCEPTION
    WHEN OTHERS THEN
        -- If concurrent refresh fails, fall back to regular refresh
        REFRESH MATERIALIZED VIEW campaign_metrics;
END;
$$ LANGUAGE plpgsql;

-- 9. Create refresh log table if it doesn't exist
CREATE TABLE IF NOT EXISTS refresh_log (
    view_name VARCHAR(100) PRIMARY KEY,
    refreshed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    refresh_duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 10. Set up automated refresh schedule (every 5 minutes)
-- Note: This would typically be done via cron or pg_cron extension
-- For now, we'll create a helper function that can be called by the application

CREATE OR REPLACE FUNCTION schedule_metrics_refresh()
RETURNS void AS $$
BEGIN
    -- This function can be called every 5 minutes by the application
    PERFORM refresh_campaign_metrics();
END;
$$ LANGUAGE plpgsql;

-- 11. Initial refresh of the materialized view
REFRESH MATERIALIZED VIEW campaign_metrics;

-- 12. Insert initial refresh log entry
INSERT INTO refresh_log (view_name, refreshed_at) 
VALUES ('campaign_metrics', NOW())
ON CONFLICT (view_name) DO UPDATE SET refreshed_at = NOW();

COMMIT;