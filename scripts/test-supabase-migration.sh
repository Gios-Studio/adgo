#!/bin/bash

# Local Supabase Migration Test Script
# Test the migration workflow locally before GitHub Action

set -e

echo "🧪 Testing Supabase Migration Workflow Locally..."

# Check if required environment variables exist
if [ -z "$SUPABASE_DB_URL" ]; then
    echo "❌ SUPABASE_DB_URL environment variable not set"
    echo "Set it with: export SUPABASE_DB_URL='your-database-url'"
    exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ SUPABASE_SERVICE_ROLE_KEY environment variable not set" 
    echo "Set it with: export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'"
    exit 1
fi

# Download Supabase CLI if not already installed
if ! command -v supabase &> /dev/null; then
    echo "📥 Downloading Supabase CLI..."
    mkdir -p _cli_tmp
    cd _cli_tmp
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_darwin_amd64.tar.gz -o supabase.tar.gz
    else
        # Linux
        curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz -o supabase.tar.gz
    fi
    
    tar -xzf supabase.tar.gz
    chmod +x supabase
    sudo mv supabase /usr/local/bin/supabase
    cd ..
    rm -rf _cli_tmp
    echo "✅ Supabase CLI installed"
fi

echo "📊 Supabase CLI Version:"
supabase --version

echo "🔄 Testing database connection..."
echo "Database URL: ${SUPABASE_DB_URL:0:30}..."

# Test connection by running a simple query
echo "🧪 Testing database connectivity..."
supabase db remote commit --db-url "${SUPABASE_DB_URL}" || {
    echo "❌ Failed to connect to database"
    exit 1
}

echo "✅ Database connection successful"

# Check if migrations directory exists
if [ ! -d "supabase/migrations" ]; then
    echo "❌ Migrations directory not found at supabase/migrations"
    exit 1
fi

echo "📁 Migration files found:"
ls -la supabase/migrations/

echo "🚀 Running database migration push..."
supabase db push --db-url "${SUPABASE_DB_URL}" || {
    echo "❌ Migration push failed"
    exit 1
}

echo "✅ Migration push successful"

echo "🔍 Verifying migration status..."
supabase db remote commit --db-url "${SUPABASE_DB_URL}"

echo "🎉 Local Supabase migration test completed successfully!"
echo "✅ Ready for GitHub Action workflow"