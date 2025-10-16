-- AdGo Performance Schema Optimization
-- Add missing ride_ref column and performance indexes

BEGIN;

-- 1. Add ride_ref column to analytics_events (nullable TEXT)
ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS ride_ref TEXT;

-- 2. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns (status);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets (user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_ride_ref ON analytics_events (ride_ref);

-- 3. Additional performance indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_campaign_created ON analytics_events (campaign_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_ride_created ON analytics_events (ride_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_updated_at ON campaigns (updated_at DESC);

-- 4. Index for driver wallet lookups
CREATE INDEX IF NOT EXISTS idx_wallets_driver_id ON wallets (driver_id) WHERE driver_id IS NOT NULL;

COMMIT;