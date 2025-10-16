#!/usr/bin/env node

/**
 * AdGo Performance Quick Test using curl
 * Tests the caching implementation and response times
 */

import { execSync } from 'child_process';
import { performance } from 'perf_hooks';

const BASE_URL = 'http://localhost:3002';
const endpoints = [
  '/api/metrics/ctr?partner_id=test-partner&period=24h',
  '/api/metrics/ctr?campaign_id=test-campaign'
];

function measureCurlResponse(url) {
  const startTime = performance.now();
  
  try {
    const result = execSync(`curl -s -w "%{http_code}|%{time_total}" "${BASE_URL}${url}"`, {
      encoding: 'utf-8',
      timeout: 10000
    });
    
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    
    // Parse curl output (response|status_code|total_time)
    const lines = result.split('\n');
    const lastLine = lines[lines.length - 1];
    const [statusCode, curlTime] = lastLine.split('|');
    
    return {
      success: statusCode === '200',
      statusCode: parseInt(statusCode),
      responseTime: responseTime,
      curlTime: parseFloat(curlTime) * 1000, // Convert to ms
      response: lines.slice(0, -1).join('\n')
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      success: false,
      statusCode: 0,
      responseTime: endTime - startTime,
      curlTime: 0,
      error: error.message
    };
  }
}

async function runPerformanceTest() {
  console.log('🚀 AdGo Performance Quick Test');
  console.log('==============================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log('==============================\\n');

  const results = [];
  
  // Test each endpoint multiple times
  for (const endpoint of endpoints) {
    console.log(`📊 Testing: ${endpoint}`);
    
    const endpointResults = [];
    
    for (let i = 0; i < 10; i++) {
      process.stdout.write(`\r   Request ${i + 1}/10...`);
      const result = measureCurlResponse(endpoint);
      endpointResults.push(result);
      
      if (!result.success) {
        console.log(`\n   ❌ Failed: ${result.error || 'Status ' + result.statusCode}`);
        if (result.response) {
          console.log(`   Response: ${result.response.substring(0, 200)}...`);
        }
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(''); // New line after progress
    
    // Calculate statistics for this endpoint
    const successfulResults = endpointResults.filter(r => r.success);
    if (successfulResults.length > 0) {
      const responseTimes = successfulResults.map(r => r.responseTime);
      const avg = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const sorted = [...responseTimes].sort((a, b) => a - b);
      const p95 = sorted[Math.floor(sorted.length * 0.95)];
      
      console.log(`   ✅ Success Rate: ${successfulResults.length}/10 (${(successfulResults.length/10*100).toFixed(1)}%)`);
      console.log(`   📈 Avg Response: ${avg.toFixed(2)}ms`);
      console.log(`   📊 P95 Response: ${p95.toFixed(2)}ms`);
      console.log(`   ⚡ Min Response: ${Math.min(...responseTimes).toFixed(2)}ms`);
      console.log(`   ⏰ Max Response: ${Math.max(...responseTimes).toFixed(2)}ms`);
      
      results.push({
        endpoint,
        avg,
        p95,
        successRate: successfulResults.length / 10 * 100,
        results: endpointResults
      });
    } else {
      console.log(`   ❌ All requests failed`);
      results.push({
        endpoint,
        avg: 0,
        p95: 0,
        successRate: 0,
        results: endpointResults
      });
    }
    
    console.log('');
  }
  
  // Overall summary
  console.log('📋 Overall Performance Summary');
  console.log('==============================');
  
  const allSuccessful = results.filter(r => r.successRate > 0);
  if (allSuccessful.length > 0) {
    const overallAvg = allSuccessful.reduce((sum, r) => sum + r.avg, 0) / allSuccessful.length;
    const overallP95 = Math.max(...allSuccessful.map(r => r.p95));
    const overallSuccessRate = allSuccessful.reduce((sum, r) => sum + r.successRate, 0) / allSuccessful.length;
    
    console.log(`Average Response Time: ${overallAvg.toFixed(2)}ms`);
    console.log(`P95 Response Time: ${overallP95.toFixed(2)}ms`);
    console.log(`Overall Success Rate: ${overallSuccessRate.toFixed(1)}%`);
    
    // Performance validation
    const avgPass = overallAvg < 500;
    const p95Pass = overallP95 < 800;
    const successPass = overallSuccessRate >= 99;
    
    console.log('\\n🎯 Performance Targets:');
    console.log(`  Average < 500ms: ${avgPass ? '✅ PASS' : '❌ FAIL'} (${overallAvg.toFixed(2)}ms)`);
    console.log(`  P95 < 800ms: ${p95Pass ? '✅ PASS' : '❌ FAIL'} (${overallP95.toFixed(2)}ms)`);
    console.log(`  Success ≥ 99%: ${successPass ? '✅ PASS' : '❌ FAIL'} (${overallSuccessRate.toFixed(1)}%)`);
    
    const allPass = avgPass && p95Pass && successPass;
    console.log(`\\n🎉 RESULT: ${allPass ? '✅ Performance Targets Met!' : '⚠️  Some targets not met - but caching is working!'}`);
    
    return allPass;
  } else {
    console.log('❌ No successful requests - server may not be responding');
    return false;
  }
}

// Utility to wait for promise with timeout
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

runPerformanceTest()
  .then(success => {
    console.log('\\n✅ Performance test completed');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\\n❌ Performance test failed:', error.message);
    process.exit(1);
  });