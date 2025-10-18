# AdGo Supabase Database Migration Guide

## Overview
The AdGo platform uses Supabase as its primary database with automated migrations via GitHub Actions. This guide covers the complete setup and troubleshooting process.

## 🏗️ Architecture

### Database Schema
- **Organizations**: Multi-tenant organization management
- **Campaigns**: Advertising campaign configuration
- **Creatives**: Ad creative assets and metadata
- **Events**: Real-time tracking events (impressions, clicks)
- **Analytics**: Aggregated metrics and reporting data

### Migration Structure
```
supabase/
├── config.toml              # Supabase project configuration
├── migrations/              # Versioned migration files
│   ├── 20250101000000_initial_schema.sql
│   ├── 20250101000001_events_analytics.sql
│   └── 20250101000002_performance_indexes.sql
└── seed.sql                 # Development seed data
```

## 🚀 GitHub Action Workflow

### Trigger
- Runs automatically on every push to `main` branch
- Can be triggered manually via workflow_dispatch

### Process
1. **Environment Setup**: Node.js 20 + direct Supabase CLI binary download
2. **Migration Execution**: Apply all pending migrations to production database
3. **Verification**: Validate schema and migration status
4. **Success Logging**: Comprehensive deployment confirmation

### Required Secrets
- `SUPABASE_DB_URL_PROD`: Full production database connection URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations

## 🧪 Local Testing

### Prerequisites
```bash
export SUPABASE_DB_URL="postgresql://postgres:[password]@[host]:5432/postgres"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### GitHub Secrets Setup
Repository secrets must be configured:
- `SUPABASE_DB_URL_PROD`: Production database connection URL
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key with admin privileges

### Run Local Test
```bash
./scripts/test-supabase-migration.sh
```

This script will:
- ✅ Validate environment variables
- ✅ Download and install Supabase CLI
- ✅ Test database connectivity
- ✅ Run migration dry-run
- ✅ Verify migration status

## 📊 Migration Files

### Initial Schema (20250101000000)
- Core tables: orgs, campaigns, creatives
- RLS policies and helper functions
- Basic indexes and constraints

### Events & Analytics (20250101000001)
- Event tracking infrastructure
- Materialized views for metrics
- Deduplication and HMAC validation

### Performance Indexes (20250101000002)
- Optimized indexes for queries
- Campaign metrics views
- Automated cleanup jobs

## 🔧 Troubleshooting

### Common Issues

**1. Migration Push Failed**
```bash
# Check database connectivity
supabase db remote commit --db-url "${SUPABASE_DB_URL}"

# Verify migration files syntax
psql "${SUPABASE_DB_URL}" -f supabase/migrations/file.sql
```

**2. Permission Errors**
- Ensure `SUPABASE_SERVICE_ROLE_KEY` has admin privileges
- Verify database URL includes correct credentials

**3. Schema Conflicts**
- Check for existing tables/functions
- Review migration order dependencies
- Use `DROP IF EXISTS` for idempotent migrations

### Debug Commands
```bash
# Check migration status
supabase db remote commit --db-url "${SUPABASE_DB_URL}"

# List applied migrations
supabase migration list

# Reset local migrations (development only)
supabase db reset
```

## 🔒 Security Considerations

### RLS Policies
- All tables have Row Level Security enabled
- Organization-based access control
- Service role bypasses RLS for migrations

### HMAC Validation
- Event ingestion uses HMAC signatures
- Per-organization secret keys
- Automatic secret rotation capability

### Connection Security
- TLS-encrypted database connections
- Service role key rotation
- IP allowlisting in production

## 🚀 Production Deployment

### Status Verification
After migration completion, verify:
- ✅ All tables created with proper constraints
- ✅ RLS policies applied correctly
- ✅ Indexes created for performance
- ✅ Materialized views refreshed
- ✅ Cron jobs scheduled

### Monitoring
- GitHub Action logs for migration status
- Supabase dashboard for database health
- Application logs for RLS policy effectiveness

---

**Build**: AdGo v1.0.0  
**Last Updated**: October 17, 2025  
**Status**: ✅ Production Ready