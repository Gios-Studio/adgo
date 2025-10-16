#!/bin/bash

# AdGo Daily Reports - Production Deployment Script
# Copyright (c) 2025 AdGo Solutions Limited.

set -e

echo "🚀 AdGo Daily Reports - Production Deployment"
echo "============================================="

# Check if running as root
if [ "$EUID" -eq 0 ]; then
  echo "❌ This script should not be run as root"
  exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version 2>/dev/null || echo "not installed")
if [[ ! "$NODE_VERSION" =~ ^v1[8-9] ]] && [[ ! "$NODE_VERSION" =~ ^v[2-9][0-9] ]]; then
  echo "❌ Node.js 18+ required. Current version: $NODE_VERSION"
  echo "📥 Install Node.js: https://nodejs.org/"
  exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
if [ -f package.json ]; then
  npm install --production
  echo "✅ Dependencies installed"
else
  echo "❌ package.json not found"
  exit 1
fi

# Check environment variables
echo ""
echo "🔧 Checking environment variables..."

if [ -f .env ]; then
  source .env
  echo "✅ Environment file loaded"
else
  echo "❌ .env file not found"
  echo "📝 Create .env file with:"
  echo "   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
  echo "   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key"
  exit 1
fi

# Required environment variables
REQUIRED_VARS=("NEXT_PUBLIC_SUPABASE_URL" "SUPABASE_SERVICE_ROLE_KEY")
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing required environment variable: $var"
    exit 1
  fi
done

echo "✅ Environment variables validated"

# Build TypeScript
echo ""
echo "🔨 Building TypeScript..."
npm run build
echo "✅ Build completed"

# Create necessary directories
echo ""
echo "📁 Creating directories..."
mkdir -p reports logs
echo "✅ Directories created"

# Test database connection
echo ""
echo "🔗 Testing Supabase connection..."
node -e "
const { createClient } = require('@supabase/supabase-js');
const client = createClient('$NEXT_PUBLIC_SUPABASE_URL', '$SUPABASE_SERVICE_ROLE_KEY');
client.from('profiles').select('count', { count: 'exact' }).then(r => {
  console.log('✅ Database connection successful');
  process.exit(0);
}).catch(e => {
  console.error('❌ Database connection failed:', e.message);
  process.exit(1);
});
" || exit 1

# Create systemd service (optional)
echo ""
echo "📋 System service setup..."
read -p "Create systemd service for auto-start? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  SERVICE_FILE="/etc/systemd/system/adgo-reports.service"
  sudo tee $SERVICE_FILE > /dev/null <<EOF
[Unit]
Description=AdGo Daily Reports Service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
Environment=NODE_ENV=production
ExecStart=/usr/bin/node dist/scheduler.js
Restart=always
RestartSec=10
StandardOutput=append:/var/log/adgo-reports.log
StandardError=append:/var/log/adgo-reports.error.log

[Install]
WantedBy=multi-user.target
EOF

  sudo systemctl daemon-reload
  sudo systemctl enable adgo-reports
  echo "✅ Systemd service created: adgo-reports"
  echo "📝 Control with:"
  echo "   sudo systemctl start adgo-reports"
  echo "   sudo systemctl stop adgo-reports"
  echo "   sudo systemctl status adgo-reports"
fi

# Setup log rotation
echo ""
echo "📜 Setting up log rotation..."
sudo tee /etc/logrotate.d/adgo-reports > /dev/null <<EOF
/var/log/adgo-reports*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 $USER $USER
    postrotate
        systemctl reload adgo-reports 2>/dev/null || true
    endscript
}
EOF
echo "✅ Log rotation configured"

# Final validation
echo ""
echo "🧪 Running validation test..."
timeout 30 npm run dev > /dev/null 2>&1 &
TEST_PID=$!
sleep 5
if kill -0 $TEST_PID 2>/dev/null; then
  kill $TEST_PID 2>/dev/null || true
  echo "✅ Service validation passed"
else
  echo "❌ Service validation failed"
  exit 1
fi

# Deployment summary
echo ""
echo "🎉 Deployment completed successfully!"
echo "=================================="
echo "📂 Installation: $(pwd)"
echo "📊 Reports output: $(pwd)/reports/"
echo "📜 Logs: /var/log/adgo-reports*.log"
echo ""
echo "🚀 Start the service:"
if [ -f /etc/systemd/system/adgo-reports.service ]; then
  echo "   sudo systemctl start adgo-reports"
else
  echo "   npm start"
fi
echo ""
echo "📈 Monitor reports:"
echo "   tail -f /var/log/adgo-reports.log"
echo ""
echo "✅ AdGo Daily Reports is ready for production!"