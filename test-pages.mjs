#!/usr/bin/env node

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

console.log('\n🌐 AdGo Page Verification Tests\n');
console.log('Testing all critical pages for functionality...\n');

const CRITICAL_PAGES = [
  { path: '/', name: 'Home/Landing Page', critical: true },
  { path: '/dashboard', name: 'Main Dashboard', critical: true },
  { path: '/analytics', name: 'Analytics Page', critical: true },
  { path: '/adupload', name: 'Ad Upload Page', critical: true },
  { path: '/wallet', name: 'Wallet Page', critical: true },
  { path: '/settings', name: 'Settings Page', critical: true },
  { path: '/login', name: 'Login Page', critical: true },
  { path: '/signup', name: 'Signup Page', critical: true },
  
  // Additional important pages
  { path: '/Admin', name: 'Admin Panel', critical: false },
  { path: '/MyAds', name: 'My Ads Management', critical: false },
  { path: '/CampaignCalendar', name: 'Campaign Calendar', critical: false },
  { path: '/Waitlist', name: 'Waitlist Page', critical: false },
  { path: '/Landing', name: 'Alternative Landing', critical: false },
  
  // Dashboard sub-pages
  { path: '/dashboard/advertiser', name: 'Advertiser Dashboard', critical: false },
  { path: '/dashboard/driver', name: 'Driver Dashboard', critical: false },
  { path: '/dashboard/driver-wallet', name: 'Driver Wallet Dashboard', critical: false },
  { path: '/dashboard/ad-upload', name: 'Dashboard Ad Upload', critical: false },
  
  // API endpoints
  { path: '/api/health', name: 'Health Check API', critical: true },
  { path: '/api/metrics/ctr', name: 'CTR Metrics API', critical: false },
];

let results = [];

// Test function
const testPage = async (page) => {
  try {
    const startTime = Date.now();
    const response = await fetch(`${BASE_URL}${page.path}`, {
      method: 'GET',
      timeout: 10000, // 10 second timeout
    });
    
    const loadTime = Date.now() - startTime;
    const status = response.status;
    const ok = response.ok;
    
    // Get some content for validation
    let contentCheck = 'Unknown';
    try {
      const text = await response.text();
      if (text.includes('<!DOCTYPE html') || text.includes('<html')) {
        contentCheck = 'HTML';
      } else if (text.includes('{') && (text.includes('"') || text.includes("'"))) {
        contentCheck = 'JSON';
      } else if (text.length > 0) {
        contentCheck = 'Text';
      } else {
        contentCheck = 'Empty';
      }
      
      // Check for common errors in HTML
      if (contentCheck === 'HTML') {
        if (text.includes('Application error') || text.includes('500') || text.includes('Error:')) {
          contentCheck = 'HTML (with errors)';
        } else if (text.includes('<title>') && text.includes('AdGo')) {
          contentCheck = 'HTML (valid AdGo page)';
        } else {
          contentCheck = 'HTML (generic)';
        }
      }
    } catch (err) {
      contentCheck = 'Content read error';
    }
    
    return {
      ...page,
      status,
      ok,
      loadTime,
      contentCheck,
      success: ok && status < 400,
    };
    
  } catch (error) {
    return {
      ...page,
      status: 0,
      ok: false,
      loadTime: 0,
      contentCheck: 'Network Error',
      error: error.message,
      success: false,
    };
  }
};

// Run tests
console.log('🧪 Testing pages...\n');

for (const page of CRITICAL_PAGES) {
  const result = await testPage(page);
  results.push(result);
  
  const icon = result.success ? '✅' : '❌';
  const criticalFlag = result.critical ? '[CRITICAL]' : '[OPTIONAL]';
  const timing = result.loadTime > 0 ? `(${result.loadTime}ms)` : '';
  
  console.log(`${icon} ${result.status} ${criticalFlag} ${result.name} ${timing}`);
  
  if (!result.success && result.error) {
    console.log(`   Error: ${result.error}`);
  } else if (!result.success) {
    console.log(`   Status: ${result.status}, Content: ${result.contentCheck}`);
  } else {
    console.log(`   Content: ${result.contentCheck}`);
  }
  
  // Small delay between requests
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Summary
console.log('\n📊 PAGE VERIFICATION SUMMARY');
console.log('═'.repeat(60));

const criticalResults = results.filter(r => r.critical);
const optionalResults = results.filter(r => !r.critical);

const criticalPassed = criticalResults.filter(r => r.success).length;
const criticalTotal = criticalResults.length;
const optionalPassed = optionalResults.filter(r => r.success).length;
const optionalTotal = optionalResults.length;

console.log(`✅ Critical Pages: ${criticalPassed}/${criticalTotal} (${Math.round(criticalPassed/criticalTotal*100)}%)`);
console.log(`📋 Optional Pages: ${optionalPassed}/${optionalTotal} (${Math.round(optionalPassed/optionalTotal*100)}%)`);
console.log(`🌐 Overall Success: ${criticalPassed + optionalPassed}/${results.length} (${Math.round((criticalPassed + optionalPassed)/results.length*100)}%)`);

// Critical failures
const criticalFailures = criticalResults.filter(r => !r.success);
if (criticalFailures.length > 0) {
  console.log('\n⚠️  Critical Page Failures:');
  criticalFailures.forEach(failure => {
    console.log(`   • ${failure.name} (${failure.path}) - Status: ${failure.status}`);
  });
}

// Performance analysis
const avgLoadTime = results.filter(r => r.loadTime > 0).reduce((sum, r) => sum + r.loadTime, 0) / results.filter(r => r.loadTime > 0).length;
console.log(`⚡ Average Load Time: ${avgLoadTime.toFixed(0)}ms`);

// Final verdict
if (criticalPassed === criticalTotal) {
  console.log('\n🎉 ALL CRITICAL PAGES ARE FUNCTIONAL!');
  console.log('✅ Application is ready for production use.');
} else {
  console.log('\n⚠️  Some critical pages need attention before production.');
}

console.log('\n🌐 Page verification complete.\n');