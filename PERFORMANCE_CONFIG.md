# AdGo v1.0.0 Performance Configuration Guide

## Database Connection Pool (pgBouncer) Settings

### Recommended Supabase Configuration

For optimal performance with AdGo's batch processing and high-throughput requirements:

```toml
# Supabase pgBouncer Configuration
# Configure via Supabase Dashboard > Settings > Database

[database]
# Connection Pool Settings
pool_mode = "transaction"
max_client_conn = 100
default_pool_size = 50
min_pool_size = 10

# Performance Tuning
server_reset_query = "DISCARD ALL"
server_check_delay = 30
server_check_query = "SELECT 1"

# Timeouts (in seconds)
server_connect_timeout = 15
server_login_retry = 1
server_idle_timeout = 600
server_lifetime = 3600
client_idle_timeout = 0

# Prepared Statement Settings
max_prepared_statements = 100
prepared_statements_cache = true
```

### Application-Level Settings

**Connection String Format:**
```
postgresql://postgres:[password]@[project-ref].supabase.co:6543/postgres?pgbouncer=true
```

**Environment Variables:**
```bash
# Use pgBouncer port 6543 instead of direct PostgreSQL port 5432
DATABASE_URL=postgresql://postgres:[password]@rkonwkggxaohpmxmzmfn.supabase.co:6543/postgres?pgbouncer=true

# Connection pool settings for Supabase client
SUPABASE_DB_POOL_SIZE=50
SUPABASE_DB_MAX_CONNECTIONS=100
```

### Performance Optimizations Applied

#### 1. Batch Insert Reliability
- **Implementation**: Promise.allSettled() for safe concurrent operations
- **Duplicate Handling**: Skip duplicates after 2 retry attempts
- **Retry Logic**: Exponential backoff with jitter (75-1500ms)
- **Batch Size**: Maximum 50 events per batch

#### 2. Enhanced Pagination
- **Default Limit**: 50 records (maximum 100)
- **Fallback**: OFFSET/LIMIT → cursor-based pagination
- **Caching**: 30-second TTL for query results
- **Error Handling**: Graceful handling of empty pages

#### 3. Materialized View Optimization
- **Refresh Interval**: 5 minutes with CONCURRENTLY keyword
- **Indexes**: Composite indexes for CTR calculations
- **Performance**: Pre-calculated metrics for 1h, 24h, 7d periods

#### 4. API Caching Enhancements
- **CTR Metrics Cache**: Increased from 30s to 60s TTL
- **Compression**: Enabled in Next.js config
- **Headers**: Cache control headers for optimal browser caching

### Monitoring and Health Checks

#### Database Connection Monitoring
```sql
-- Check active connections
SELECT COUNT(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';

-- Monitor pgBouncer pool stats
SHOW POOLS;
SHOW CLIENTS;
```

#### Performance Metrics Targets
- **Average Response Time**: < 500ms
- **Success Rate**: > 95%
- **P95 Response Time**: < 800ms  
- **Batch Processing**: < 2000ms for 50 events
- **Pagination Response**: < 300ms

### Troubleshooting

#### Common Issues and Solutions

**1. Connection Pool Exhaustion**
```bash
# Symptoms: "too many connections" errors
# Solution: Increase max_client_conn or optimize connection usage
```

**2. Slow Materialized View Refresh**
```sql
-- Check refresh progress
SELECT schemaname, matviewname, ispopulated 
FROM pg_matviews 
WHERE matviewname = 'campaign_metrics';

-- Manual refresh if needed
REFRESH MATERIALIZED VIEW CONCURRENTLY campaign_metrics;
```

**3. High Cache Miss Rate**
```javascript
// Check cache statistics
const stats = performanceCache.getStats();
console.log('Cache hit rate:', stats.hitRate);
```

### Production Deployment Checklist

- [ ] pgBouncer connection pooling enabled
- [ ] Database indexes created (`performance-schema-optimization.sql`)
- [ ] Materialized view refresh scheduled (5-minute interval)
- [ ] API compression enabled in Next.js config
- [ ] Cache TTL set to 60 seconds for CTR metrics
- [ ] Performance monitoring dashboards configured
- [ ] Load testing completed with >95% success rate

### Contact Information

For technical support regarding performance optimizations:
- **Engineering**: engineering@adgosolutions.com
- **DevOps**: devops@adgosolutions.com
- **Documentation**: This configuration was implemented for AdGo v1.0.0

---

*Last Updated: October 16, 2025*  
*AdGo Platform v1.0.0 - Performance Optimized*