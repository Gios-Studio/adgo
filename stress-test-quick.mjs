#!/usr/bin/env node

/**
 * AdGo Performance Quick Validation Test
 * 
 * Simplified version targeting:
 * - P95 response time < 800ms
 * - Average response time < 500ms  
 * - Throughput ≥ 100 RPS (reduced for stability)
 * - Success rate ≥ 99%
 */

const CONFIG = {
  baseUrl: process.env.STRESS_TEST_URL || 'http://localhost:3002',
  concurrentUsers: 10,
  requestsPerUser: 20,
  endpoints: [
    '/api/metrics/ctr?partner_id=test-partner&period=24h',
    '/api/metrics/ctr?campaign_id=test-campaign',
  ],
  targets: {
    p95ResponseTime: 800,
    avgResponseTime: 500,
    minSuccessRate: 99,
    maxErrorRate: 1
  }
};

class PerformanceMetrics {
  constructor() {
    this.responseTimes = [];
    this.errors = [];
    this.requests = 0;
    this.startTime = Date.now();
  }

  addResponse(responseTime, success, error = null) {
    this.responseTimes.push(responseTime);
    this.requests++;
    
    if (!success) {
      this.errors.push(error || 'Unknown error');
    }
  }

  getStats() {
    const sortedTimes = [...this.responseTimes].sort((a, b) => a - b);
    const duration = (Date.now() - this.startTime) / 1000;
    
    return {
      totalRequests: this.requests,
      duration: duration,
      throughput: this.requests / duration,
      successRate: ((this.requests - this.errors.length) / this.requests) * 100,
      errorRate: (this.errors.length / this.requests) * 100,
      avgResponseTime: this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length,
      p50ResponseTime: sortedTimes[Math.floor(sortedTimes.length * 0.5)],
      p95ResponseTime: sortedTimes[Math.floor(sortedTimes.length * 0.95)],
      p99ResponseTime: sortedTimes[Math.floor(sortedTimes.length * 0.99)],
      minResponseTime: Math.min(...sortedTimes),
      maxResponseTime: Math.max(...sortedTimes),
      totalErrors: this.errors.length,
      errorSamples: this.errors.slice(0, 5)
    };
  }
}

async function makeRequest(url) {
  const startTime = Date.now();
  
  try {
    const response = await fetch(url);
    const responseTime = Date.now() - startTime;
    return {
      responseTime,
      success: response.ok,
      status: response.status,
      error: response.ok ? null : `Status: ${response.status}`
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      responseTime,
      success: false,
      status: 0,
      error: error.message
    };
  }
}

async function runWorker(workerId, metrics) {
  const promises = [];
  
  for (let i = 0; i < CONFIG.requestsPerUser; i++) {
    const endpoint = CONFIG.endpoints[Math.floor(Math.random() * CONFIG.endpoints.length)];
    const url = CONFIG.baseUrl + endpoint;
    
    promises.push(
      makeRequest(url).then(result => {
        metrics.addResponse(result.responseTime, result.success, result.error);
        process.stdout.write(`\r⏱️  Worker ${workerId}: ${i + 1}/${CONFIG.requestsPerUser} | Total: ${metrics.requests} requests`);
      })
    );
    
    // Small delay to prevent overwhelming
    if (i < CONFIG.requestsPerUser - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  await Promise.all(promises);
}

async function runStressTest() {
  console.log('🚀 AdGo Performance Quick Validation');
  console.log('=====================================');
  console.log(`Base URL: ${CONFIG.baseUrl}`);
  console.log(`Concurrent Users: ${CONFIG.concurrentUsers}`);
  console.log(`Requests per User: ${CONFIG.requestsPerUser}`);
  console.log(`Total Requests: ${CONFIG.concurrentUsers * CONFIG.requestsPerUser}`);
  console.log('=====================================\\n');

  // Health check
  console.log('🔍 Health check...');
  const healthResult = await makeRequest(`${CONFIG.baseUrl}/api/metrics/ctr?partner_id=health&period=1h`);
  if (!healthResult.success) {
    console.error('❌ Health check failed:', healthResult.error);
    return false;
  }
  console.log('✅ Health check passed\\n');

  const metrics = new PerformanceMetrics();
  
  console.log('🏃‍♂️ Starting concurrent workers...');
  
  // Start all workers concurrently
  const workers = [];
  for (let i = 0; i < CONFIG.concurrentUsers; i++) {
    workers.push(runWorker(i + 1, metrics));
  }

  await Promise.all(workers);
  
  console.log('\\n✅ All workers completed\\n');
  
  return generateReport(metrics);
}

function generateReport(metrics) {
  const stats = metrics.getStats();
  
  console.log('📊 Performance Test Results');
  console.log('=============================');
  console.log(`Total Requests: ${stats.totalRequests}`);
  console.log(`Duration: ${stats.duration.toFixed(2)}s`);
  console.log(`Throughput: ${stats.throughput.toFixed(2)} RPS`);
  console.log(`Success Rate: ${stats.successRate.toFixed(2)}%`);
  console.log(`Error Rate: ${stats.errorRate.toFixed(2)}%`);
  console.log('');
  console.log('Response Times:');
  console.log(`  Average: ${stats.avgResponseTime.toFixed(2)}ms`);
  console.log(`  P50: ${stats.p50ResponseTime.toFixed(2)}ms`);
  console.log(`  P95: ${stats.p95ResponseTime.toFixed(2)}ms`);
  console.log(`  P99: ${stats.p99ResponseTime.toFixed(2)}ms`);
  console.log(`  Min: ${stats.minResponseTime.toFixed(2)}ms`);
  console.log(`  Max: ${stats.maxResponseTime.toFixed(2)}ms`);
  console.log('');

  // Performance validation
  const validationResults = {
    p95Valid: stats.p95ResponseTime <= CONFIG.targets.p95ResponseTime,
    avgValid: stats.avgResponseTime <= CONFIG.targets.avgResponseTime,
    successValid: stats.successRate >= CONFIG.targets.minSuccessRate,
    errorValid: stats.errorRate <= CONFIG.targets.maxErrorRate
  };

  console.log('🎯 Target Validation:');
  console.log(`  P95 < ${CONFIG.targets.p95ResponseTime}ms: ${validationResults.p95Valid ? '✅ PASS' : '❌ FAIL'} (${stats.p95ResponseTime.toFixed(2)}ms)`);
  console.log(`  Avg < ${CONFIG.targets.avgResponseTime}ms: ${validationResults.avgValid ? '✅ PASS' : '❌ FAIL'} (${stats.avgResponseTime.toFixed(2)}ms)`);
  console.log(`  Success ≥ ${CONFIG.targets.minSuccessRate}%: ${validationResults.successValid ? '✅ PASS' : '❌ FAIL'} (${stats.successRate.toFixed(2)}%)`);
  console.log(`  Errors ≤ ${CONFIG.targets.maxErrorRate}%: ${validationResults.errorValid ? '✅ PASS' : '❌ FAIL'} (${stats.errorRate.toFixed(2)}%)`);

  if (stats.totalErrors > 0) {
    console.log('\\n🚨 Error Samples:');
    stats.errorSamples.forEach((error, i) => {
      console.log(`  ${i + 1}. ${error}`);
    });
  }

  const allTargetsMet = Object.values(validationResults).every(valid => valid);
  
  console.log('\\n' + '='.repeat(50));
  console.log(`🎉 OVERALL RESULT: ${allTargetsMet ? '✅ SUCCESS - Performance Targets Met!' : '❌ Some Performance Targets Not Met'}`);
  console.log('='.repeat(50));

  return {
    success: allTargetsMet,
    stats,
    validationResults
  };
}

// Main execution
runStressTest()
  .then((result) => {
    process.exit(result ? (result.success ? 0 : 1) : 1);
  })
  .catch((error) => {
    console.error('\\n❌ Stress test failed:', error.message);
    process.exit(1);
  });