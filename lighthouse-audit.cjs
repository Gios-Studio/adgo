#!/usr/bin/env node

/**
 * Simple Lighthouse Audit Script for AdGo Production Build
 * Runs performance, accessibility, and SEO audits
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  console.log('🚀 Starting Lighthouse audit for AdGo...\n');
  
  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
  });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'seo'],
    port: chrome.port,
  };

  const config = {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      },
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      }
    }
  };

  try {
    // Run audit on homepage
    console.log('📊 Auditing homepage...');
    const runnerResult = await lighthouse('http://localhost:3000', options, config);

    // Extract scores
    const { lhr } = runnerResult;
    const scores = {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      seo: Math.round(lhr.categories.seo.score * 100)
    };

    // Display results
    console.log('\n✅ LIGHTHOUSE AUDIT RESULTS:');
    console.log('================================');
    console.log(`🏃 Performance:   ${scores.performance}%${scores.performance >= 90 ? ' ✅' : ' ❌'}`);
    console.log(`♿ Accessibility: ${scores.accessibility}%${scores.accessibility >= 95 ? ' ✅' : ' ❌'}`);
    console.log(`🔍 SEO:           ${scores.seo}%${scores.seo >= 90 ? ' ✅' : ' ❌'}`);
    
    // Task 9 requirements check
    console.log('\n📋 TASK 9 REQUIREMENTS CHECK:');
    console.log('==============================');
    console.log(`Performance ≥90:     ${scores.performance >= 90 ? '✅ PASS' : '❌ FAIL'} (${scores.performance}%)`);
    console.log(`Accessibility ≥95:   ${scores.accessibility >= 95 ? '✅ PASS' : '❌ FAIL'} (${scores.accessibility}%)`);
    console.log(`SEO ≥90:            ${scores.seo >= 90 ? '✅ PASS' : '❌ FAIL'} (${scores.seo}%)`);
    
    const allPassed = scores.performance >= 90 && scores.accessibility >= 95 && scores.seo >= 90;
    console.log(`\n🎯 Overall Status: ${allPassed ? '✅ ALL REQUIREMENTS MET!' : '❌ Some requirements need attention'}`);

    // Save detailed report
    const reportPath = path.join(process.cwd(), 'lighthouse-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);

    // Performance insights
    console.log('\n🔍 KEY PERFORMANCE INSIGHTS:');
    console.log('============================');
    
    if (lhr.audits['first-contentful-paint']) {
      console.log(`First Contentful Paint: ${Math.round(lhr.audits['first-contentful-paint'].numericValue)}ms`);
    }
    
    if (lhr.audits['largest-contentful-paint']) {
      console.log(`Largest Contentful Paint: ${Math.round(lhr.audits['largest-contentful-paint'].numericValue)}ms`);
    }
    
    if (lhr.audits['total-blocking-time']) {
      console.log(`Total Blocking Time: ${Math.round(lhr.audits['total-blocking-time'].numericValue)}ms`);
    }
    
    if (lhr.audits['speed-index']) {
      console.log(`Speed Index: ${Math.round(lhr.audits['speed-index'].numericValue)}ms`);
    }

    // Recommendations
    console.log('\n💡 IMPROVEMENT RECOMMENDATIONS:');
    console.log('===============================');
    
    const failingAudits = Object.values(lhr.audits)
      .filter(audit => audit.score !== null && audit.score < 0.9)
      .slice(0, 5)
      .map(audit => ({
        title: audit.title,
        description: audit.description,
        score: Math.round(audit.score * 100)
      }));

    if (failingAudits.length > 0) {
      failingAudits.forEach((audit, index) => {
        console.log(`${index + 1}. ${audit.title} (${audit.score}%)`);
        console.log(`   ${audit.description}`);
      });
    } else {
      console.log('🎉 No major issues found! Your site is well optimized.');
    }

    console.log('\n🏁 Audit completed successfully!');
    
    // Exit code based on results
    process.exit(allPassed ? 0 : 1);

  } catch (error) {
    console.error('❌ Error running Lighthouse audit:', error.message);
    process.exit(1);
  } finally {
    await chrome.kill();
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Server is not running on http://localhost:3000');
    console.log('Please run: npm start');
    process.exit(1);
  }
  
  await runAudit();
})();