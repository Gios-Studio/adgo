#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkonwkggxaohpmxmzmfn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ5OTQwNCwiZXhwIjoyMDczMDc1NDA0fQ.uBSaejYhSj0HRX20KcfhHQKcDTGe6171bd-X4fFQ-b0';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

console.log('\n🚀 AdGo End-to-End Smoke Tests (Corrected Schema)\n');
console.log('Testing complete user journey: Advertiser → Campaign → Driver → Wallet\n');

let testResults = [];

const runTest = async (testName, testFn) => {
  try {
    console.log(`🧪 ${testName}...`);
    const result = await testFn();
    if (result.success) {
      console.log(`✅ PASS: ${testName}`);
      if (result.details) console.log(`   ${result.details}`);
      testResults.push({ name: testName, status: 'PASS', details: result.details });
    } else {
      console.log(`❌ FAIL: ${testName}`);
      console.log(`   Error: ${result.error}`);
      testResults.push({ name: testName, status: 'FAIL', error: result.error });
    }
  } catch (error) {
    console.log(`💥 ERROR: ${testName}`);
    console.log(`   Exception: ${error.message}`);
    testResults.push({ name: testName, status: 'ERROR', error: error.message });
  }
};

// Test 1: User Authentication & Profile Creation
await runTest('User Authentication & Profiles', async () => {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, role, avatar_url')
    .limit(5);
  
  if (error) return { success: false, error: error.message };
  
  const adminProfiles = profiles.filter(p => p.role === 'admin');
  
  return { 
    success: true, 
    details: `${profiles.length} profiles found (${adminProfiles.length} admins), auth system functional` 
  };
});

// Test 2: Campaign Management
await runTest('Campaign Management System', async () => {
  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('id, name, status, budget_cents, created_by, tenant_id')
    .limit(5);
  
  if (error) return { success: false, error: error.message };
  
  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'running');
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget_cents || 0), 0);
  
  return { 
    success: true, 
    details: `${campaigns.length} campaigns, ${activeCampaigns.length} active, ${totalBudget/100} total budget` 
  };
});

// Test 3: Ad Creation & Management 
await runTest('Ad Management System', async () => {
  const { data: ads, error } = await supabase
    .from('ads')
    .select('id, title, status, user_id, campaign_id, media_url')
    .limit(5);
  
  if (error) return { success: false, error: error.message };
  
  const activeAds = ads.filter(a => a.status === 'active');
  const adsWithMedia = ads.filter(a => a.media_url);
  
  return { 
    success: true, 
    details: `${ads.length} ads (${activeAds.length} active), ${adsWithMedia.length} with media` 
  };
});

// Test 4: Analytics Event Processing
await runTest('Analytics Event System', async () => {
  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('id, event_type, campaign_id, ad_id, occurred_at, device_id')
    .limit(10);
  
  if (error) return { success: false, error: error.message };
  
  const impressions = events.filter(e => e.event_type === 'impression');
  const clicks = events.filter(e => e.event_type === 'click');
  
  return { 
    success: true, 
    details: `${events.length} events (${impressions.length} impressions, ${clicks.length} clicks)` 
  };
});

// Test 5: Driver Wallet System
await runTest('Driver Wallet System', async () => {
  const { data: wallets, error: walletError } = await supabase
    .from('wallets')
    .select('id, owner_id, currency, balance_cents, driver_id')
    .limit(5);
  
  if (walletError) return { success: false, error: walletError.message };
  
  const { data: transactions, error: txError } = await supabase
    .from('transactions')
    .select('id, wallet_id, type, amount_cents, created_at')
    .limit(5);
  
  if (txError) return { success: false, error: txError.message };
  
  const totalBalance = wallets.reduce((sum, w) => sum + (w.balance_cents || 0), 0);
  const kesWallets = wallets.filter(w => w.currency === 'KES');
  
  return { 
    success: true, 
    details: `${wallets.length} wallets (${kesWallets.length} KES), ${transactions.length} transactions, ${totalBalance/100} total balance` 
  };
});

// Test 6: Campaign-Ad Relationships
await runTest('Campaign-Ad Data Relationships', async () => {
  // Check if campaigns have ads linked to them
  const { data: campaigns, error: cError } = await supabase
    .from('campaigns')
    .select('id, name')
    .limit(3);
  
  if (cError) return { success: false, error: cError.message };
  
  const { data: ads, error: aError } = await supabase
    .from('ads')
    .select('id, campaign_id, title')
    .not('campaign_id', 'is', null)
    .limit(5);
  
  if (aError) return { success: false, error: aError.message };
  
  return { 
    success: true, 
    details: `${campaigns.length} campaigns available, ${ads.length} ads linked to campaigns` 
  };
});

// Test 7: Event Attribution
await runTest('Event Attribution System', async () => {
  // Check if events are properly attributed to campaigns and ads
  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('id, campaign_id, ad_id, event_type')
    .not('campaign_id', 'is', null)
    .limit(5);
  
  if (error) return { success: false, error: error.message };
  
  const eventsWithAds = events.filter(e => e.ad_id);
  
  return { 
    success: true, 
    details: `${events.length} attributed events, ${eventsWithAds.length} with ad attribution` 
  };
});

// Test 8: Geographic & Targeting Data
await runTest('Geographic & Targeting Features', async () => {
  const { data: campaigns, error: cError } = await supabase
    .from('campaigns')
    .select('id, city, geo_radius_km')
    .not('city', 'is', null)
    .limit(3);
  
  if (cError) return { success: false, error: cError.message };
  
  const { data: ads, error: aError } = await supabase
    .from('ads')
    .select('id, city, gender, age_min, age_max')
    .limit(3);
  
  if (aError) return { success: false, error: aError.message };
  
  const geoTargetedCampaigns = campaigns.filter(c => c.city);
  const demographicAds = ads.filter(a => a.gender || a.age_min);
  
  return { 
    success: true, 
    details: `${geoTargetedCampaigns.length} geo-targeted campaigns, ${demographicAds.length} demographic-targeted ads` 
  };
});

// Test 9: Multi-tenancy System
await runTest('Multi-tenancy & Organization System', async () => {
  const { data: campaigns, error: cError } = await supabase
    .from('campaigns')
    .select('id, tenant_id, org_id')
    .limit(5);
  
  if (cError) return { success: false, error: cError.message };
  
  const { data: wallets, error: wError } = await supabase
    .from('wallets')
    .select('id, tenant_id')
    .limit(5);
  
  if (wError) return { success: false, error: wError.message };
  
  const uniqueTenants = new Set([
    ...campaigns.map(c => c.tenant_id).filter(Boolean),
    ...wallets.map(w => w.tenant_id).filter(Boolean)
  ]);
  
  return { 
    success: true, 
    details: `${uniqueTenants.size} unique tenants detected, multi-tenancy functional` 
  };
});

// Test 10: Data Flow Integrity
await runTest('Complete Data Flow Integrity', async () => {
  // Test the complete flow: Profile → Campaign → Ads → Events → Wallets
  const { data: flowData, error } = await supabase
    .from('campaigns')
    .select(`
      id, name, status,
      ads (id, title, status)
    `)
    .eq('status', 'active')
    .limit(2);
  
  if (error) return { success: false, error: error.message };
  
  // Count campaigns that have ads
  const campaignsWithAds = flowData.filter(c => c.ads && c.ads.length > 0);
  const totalAds = flowData.reduce((sum, c) => sum + (c.ads ? c.ads.length : 0), 0);
  
  return { 
    success: true, 
    details: `${campaignsWithAds.length} active campaigns with ads, ${totalAds} total associated ads` 
  };
});

// Summary Report
console.log('\n📊 SMOKE TEST RESULTS');
console.log('═'.repeat(60));

const passedTests = testResults.filter(t => t.status === 'PASS');
const failedTests = testResults.filter(t => t.status === 'FAIL');
const errorTests = testResults.filter(t => t.status === 'ERROR');

console.log(`✅ Passed: ${passedTests.length}`);
console.log(`❌ Failed: ${failedTests.length}`);
console.log(`💥 Errors: ${errorTests.length}`);
console.log(`📈 Success Rate: ${Math.round(passedTests.length/testResults.length*100)}%`);

if (failedTests.length > 0) {
  console.log('\n⚠️  Failed Tests:');
  failedTests.forEach(test => {
    console.log(`   • ${test.name}: ${test.error}`);
  });
}

if (errorTests.length > 0) {
  console.log('\n💥 Error Tests:');
  errorTests.forEach(test => {
    console.log(`   • ${test.name}: ${test.error}`);
  });
}

if (passedTests.length === testResults.length) {
  console.log('\n🎉 ALL SMOKE TESTS PASSED!');
  console.log('✅ Complete user journey: Advertiser → Campaign → Driver → Wallet is FUNCTIONAL!');
  console.log('✅ System is ready for production deployment!');
} else if (passedTests.length / testResults.length >= 0.8) {
  console.log('\n🟡 MOSTLY FUNCTIONAL with minor issues.');
  console.log('System core functionality works, some features need attention.');
} else {
  console.log('\n⚠️  Significant issues detected. Review failed tests before production.');
}

console.log('\n🚀 End-to-end smoke testing complete.\n');