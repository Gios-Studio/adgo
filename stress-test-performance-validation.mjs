#!/usr/bin/env node

/**
 * AdGo Performance Validation Stress Test
 * 
 * Targets:
 * - P95 response time < 800ms
 * - Average response time < 500ms  
 * - Throughput ≥ 400 RPS
 * - Success rate ≥ 99%
 * - Error rate ≤ 1%
 */

import { performance } from 'perf_hooks';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  baseUrl: process.env.STRESS_TEST_URL || 'http://localhost:3000',
  concurrentUsers: 50,
  testDurationSeconds: 120, // 2 minutes
  rampUpSeconds: 30,
  endpoints: [
    '/api/metrics/ctr?partner_id=test-partner&period=24h',
    '/api/metrics/ctr?campaign_id=test-campaign',
    '/api/sdk/events',
    '/api/auth/validate'
  ],
  targets: {
    p95ResponseTime: 800,
    avgResponseTime: 500,
    minThroughput: 400,
    minSuccessRate: 99,
    maxErrorRate: 1
  }
};

class PerformanceMetrics {
  constructor() {
    this.responseTimes = [];
    this.errors = [];
    this.requests = 0;
    this.startTime = performance.now();
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
    const duration = (performance.now() - this.startTime) / 1000;
    
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
      errorSamples: this.errors.slice(0, 5) // First 5 errors for debugging
    };
  }
}

// Worker thread for concurrent requests
const workerCode = `
import { parentPort, workerData } from 'worker_threads';
import { performance } from 'perf_hooks';

const { baseUrl, endpoints, duration, workerId } = workerData;

let requests = 0;
let responses = [];

async function makeRequest(endpoint) {
  const startTime = performance.now();
  
  try {
    // Different request types based on endpoint
    let options = { method: 'GET' };
    let url = baseUrl + endpoint;
    
    if (endpoint === '/api/sdk/events') {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'impression',
          campaign_id: 'test-campaign-' + Math.floor(Math.random() * 100),
          user_id: 'user-' + Math.floor(Math.random() * 1000),
          timestamp: new Date().toISOString()
        })
      };
    }
    
    const response = await fetch(url, options);
    const responseTime = performance.now() - startTime;
    const success = response.ok;
    
    parentPort.postMessage({
      type: 'response',
      responseTime,
      success,
      status: response.status,
      endpoint
    });
    
    requests++;
    
    if (!success) {
      const errorText = await response.text();
      parentPort.postMessage({
        type: 'error',
        error: \`\${response.status}: \${errorText}\`,
        endpoint
      });
    }
  } catch (error) {
    const responseTime = performance.now() - startTime;
    parentPort.postMessage({
      type: 'response',
      responseTime,
      success: false,
      status: 0,
      endpoint
    });
    
    parentPort.postMessage({
      type: 'error',
      error: error.message,
      endpoint
    });
  }
}

// Main worker loop
const endTime = Date.now() + (duration * 1000);

async function runWorker() {
  while (Date.now() < endTime) {
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    await makeRequest(endpoint);
    
    // Small delay to prevent overwhelming
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50));
  }
  
  parentPort.postMessage({ type: 'complete', workerId, requests });
}

runWorker().catch(error => {
  parentPort.postMessage({ type: 'error', error: error.message, workerId });
});
`;

class StressTestRunner {
  constructor() {
    this.metrics = new PerformanceMetrics();
    this.workers = [];
    this.completedWorkers = 0;
  }

  async runStressTest() {
    console.log('🚀 Starting AdGo Performance Stress Test');
    console.log('==========================================');
    console.log(`Base URL: ${CONFIG.baseUrl}`);
    console.log(`Concurrent Users: ${CONFIG.concurrentUsers}`);
    console.log(`Test Duration: ${CONFIG.testDurationSeconds}s`);
    console.log(`Target Throughput: ≥${CONFIG.targets.minThroughput} RPS`);
    console.log(`Target P95: <${CONFIG.targets.p95ResponseTime}ms`);
    console.log(`Target Average: <${CONFIG.targets.avgResponseTime}ms`);
    console.log('==========================================\\n');

    // Pre-test health check
    console.log('🔍 Running pre-test health check...');
    const healthOk = await this.healthCheck();
    if (!healthOk) {
      console.error('❌ Health check failed! Aborting stress test.');
      return false;
    }
    console.log('✅ Health check passed\\n');

    // Start workers
    await this.startWorkers();

    // Wait for test completion
    await this.waitForCompletion();

    // Generate results
    return this.generateReport();
  }

  async healthCheck() {
    try {
      const response = await fetch(`${CONFIG.baseUrl}/api/metrics/ctr?partner_id=health-check&period=1h`);
      return response.ok;
    } catch (error) {
      console.error('Health check error:', error.message);
      return false;
    }
  }

  async startWorkers() {
    console.log(`🏃‍♂️ Starting ${CONFIG.concurrentUsers} concurrent workers...`);
    
    return new Promise((resolve) => {
      for (let i = 0; i < CONFIG.concurrentUsers; i++) {
        const worker = new Worker(__filename, {
          workerData: {
            baseUrl: CONFIG.baseUrl,
            endpoints: CONFIG.endpoints,
            duration: CONFIG.testDurationSeconds,
            workerId: i
          }
        });

        worker.on('message', (message) => {
          if (message.type === 'response') {
            this.metrics.addResponse(
              message.responseTime,
              message.success,
              message.error
            );
          } else if (message.type === 'error') {
            // Already handled in response
          } else if (message.type === 'complete') {
            this.completedWorkers++;
            if (this.completedWorkers === CONFIG.concurrentUsers) {
              resolve();
            }
          }
        });

        worker.on('error', (error) => {
          console.error(`Worker ${i} error:`, error);
        });

        this.workers.push(worker);
      }
    });
  }

  async waitForCompletion() {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min((elapsed / CONFIG.testDurationSeconds) * 100, 100);
      process.stdout.write(`\r⏱️  Progress: ${progress.toFixed(1)}% | Requests: ${this.metrics.requests} | Errors: ${this.metrics.errors.length}`);
    }, 1000);

    return new Promise((resolve) => {
      const checkCompletion = () => {
        if (this.completedWorkers >= CONFIG.concurrentUsers) {
          clearInterval(interval);
          console.log('\\n✅ All workers completed');
          resolve();
        } else {
          setTimeout(checkCompletion, 100);
        }
      };
      checkCompletion();
    });
  }

  generateReport() {
    const stats = this.metrics.getStats();
    
    console.log('\\n📊 Performance Test Results');
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
      throughputValid: stats.throughput >= CONFIG.targets.minThroughput,
      successValid: stats.successRate >= CONFIG.targets.minSuccessRate,
      errorValid: stats.errorRate <= CONFIG.targets.maxErrorRate
    };

    console.log('🎯 Target Validation:');
    console.log(`  P95 < ${CONFIG.targets.p95ResponseTime}ms: ${validationResults.p95Valid ? '✅ PASS' : '❌ FAIL'} (${stats.p95ResponseTime.toFixed(2)}ms)`);
    console.log(`  Avg < ${CONFIG.targets.avgResponseTime}ms: ${validationResults.avgValid ? '✅ PASS' : '❌ FAIL'} (${stats.avgResponseTime.toFixed(2)}ms)`);
    console.log(`  Throughput ≥ ${CONFIG.targets.minThroughput} RPS: ${validationResults.throughputValid ? '✅ PASS' : '❌ FAIL'} (${stats.throughput.toFixed(2)} RPS)`);
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
    console.log(`🎉 OVERALL RESULT: ${allTargetsMet ? '✅ SUCCESS' : '❌ PERFORMANCE TARGETS NOT MET'}`);
    console.log('='.repeat(50));

    return {
      success: allTargetsMet,
      stats,
      validationResults
    };
  }
}

// Worker thread execution
if (!isMainThread) {
  eval(workerCode);
} else {
  // Main thread execution
  const runner = new StressTestRunner();
  
  runner.runStressTest()
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Stress test failed:', error);
      process.exit(1);
    });
}