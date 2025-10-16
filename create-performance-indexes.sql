-- Performance optimization indexes for SDK v1.0.0-sdk-verified
-- Add indexes for commonly queried columns to improve response times

-- Index for analytics_events.created_at (used in time-based queries and ordering)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_created_at 
ON analytics_events (created_at DESC);

-- Index for campaigns.updated_at (used in delta sync and campaign queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_campaigns_updated_at 
ON campaigns (updated_at DESC);

-- Composite index for analytics_events ride_id + created_at (common query pattern)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_ride_created 
ON analytics_events (ride_id, created_at DESC);

-- Index for analytics_events event_type (used in metrics calculations)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_event_type 
ON analytics_events (event_type, created_at DESC);

-- Index for campaigns status (active campaigns filtering)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_campaigns_status 
ON campaigns (status) WHERE status = 'active';

-- Composite index for device_id + created_at (user activity queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_device_created
ON analytics_events (device_id, created_at DESC);

-- Index for campaign_id in analytics_events (metrics rollup queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_campaign_id
ON analytics_events (campaign_id, created_at DESC);