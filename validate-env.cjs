#!/usr/bin/env node

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Simple environment validation and server test
console.log("AdGo Environment Validation");
console.log("==========================");

// Check required environment variables
const requiredEnvs = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let envOk = true;
requiredEnvs.forEach(env => {
  const exists = !!process.env[env];
  console.log(`${env}: ${exists ? '✓' : '✗'}`);
  if (!exists) envOk = false;
});

if (!envOk) {
  console.log("\n❌ Missing required environment variables");
  process.exit(1);
}

console.log("\n✅ Environment variables OK");
console.log("\n🚀 Run 'npm run dev' to start the development server");
console.log("🔍 Test with: curl http://localhost:3000/api/health");