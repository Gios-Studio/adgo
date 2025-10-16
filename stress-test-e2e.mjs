#!/usr/bin/env node

/**
 * AdGo E2E Stress Test - Enterprise Production Validation
 * 
 * Comprehensive stress testing with 1000+ concurrent users,
 * fault injection, and performance validation for enterprise readiness.
 */

import { createClient } from '@supabase/supabase-js';
import { performance } from 'perf_hooks';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Stress test configuration
const STRESS_CONFIG = {
  CONCURRENT_USERS: 1000,
  TEST_DURATION_MS: 60000, // 1 minute
  MAX_REQUESTS_PER_USER: 10,
  FAULT_INJECTION_RATE: 0.05, // 5% fault injection
  PERFORMANCE_THRESHOLDS: {
    avg_response_time: 500,   // <500ms average
    p95_response_time: 1000,  // <1s 95th percentile
    error_rate: 0.01,         // <1% error rate
    throughput_rps: 100,      // >100 requests/second
    success_rate: 0.99        // >99% success rate
  }
};

class E2EStressTest {
  constructor() {
    this.results = {
      total_requests: 0,
      successful_requests: 0,
      failed_requests: 0,
      response_times: [],
      errors: [],
      start_time: null,
      end_time: null,
      fault_injections: 0,
      throughput_rps: 0,
      avg_response_time: 0,
      p95_response_time: 0,
      p99_response_time: 0,
      error_rate: 0,
      success_rate: 0
    };
    
    this.testData = {
      campaigns: [],
      ads: [],
      users: []
    };
  }

  // Initialize test data
  async initializeTestData() {
    console.log('📊 Initializing test data...');
    
    try {
      // Get available campaigns and ads for testing
      const { data: campaigns, error: campaignError } = await supabase
        .from('campaigns')
        .select('id, name')
        .eq('status', 'active')
        .limit(5);
        
      if (campaignError) throw campaignError;
      
      const { data: ads, error: adError } = await supabase
        .from('ads')
        .select('id, title')
        .eq('status', 'active') 
        .limit(5);
        
      if (adError) throw adError;
      
      this.testData.campaigns = campaigns || [];
      this.testData.ads = ads || [];
      
      console.log(`   ✅ Loaded ${campaigns?.length || 0} campaigns, ${ads?.length || 0} ads`);
      
    } catch (error) {
      console.error('   ❌ Failed to initialize test data:', error.message);
      throw error;
    }
  }

  // Generate random test event
  generateTestEvent() {
    const eventTypes = ['impression', 'click', 'conversion'];
    const zones = ['pre-ride', 'post-ride', 'in-ride'];
    
    const campaign = this.testData.campaigns[Math.floor(Math.random() * this.testData.campaigns.length)];
    const ad = this.testData.ads[Math.floor(Math.random() * this.testData.ads.length)];
    
    if (!campaign || !ad) {
      // Fallback to known IDs if no test data available
      return {
        campaign_id: 'ace29fa0-5765-4ce0-b856-074b3abad5e7',
        ad_id: 'eb75abdd-2301-4800-b976-98cd0e419d6b',
        ride_id: `stress-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        device_id: `device-${Math.random().toString(36).substring(7)}`,
        event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        zone: zones[Math.floor(Math.random() * zones.length)]
      };
    }
    
    return {
      campaign_id: campaign.id,
      ad_id: ad.id, 
      ride_id: `stress-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      device_id: `device-${Math.random().toString(36).substring(7)}`,
      event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      zone: zones[Math.floor(Math.random() * zones.length)]
    };
  }

  // Simulate single user behavior  
  async simulateUser(userId) {
    const userRequests = [];
    const requestCount = Math.floor(Math.random() * STRESS_CONFIG.MAX_REQUESTS_PER_USER) + 1;
    
    for (let i = 0; i < requestCount; i++) {
      const requestPromise = this.executeRequest(userId, i);
      userRequests.push(requestPromise);
      
      // Random delay between requests (simulate human behavior)
      await this.sleep(Math.random() * 1000 + 100); // 100-1100ms delay
    }
    
    return Promise.all(userRequests);
  }

  // Execute individual API request with fault injection
  async executeRequest(userId, requestIndex) {
    const startTime = performance.now();
    const requestId = `${userId}-${requestIndex}`;
    
    try {
      // Fault injection - randomly introduce errors
      if (Math.random() < STRESS_CONFIG.FAULT_INJECTION_RATE) {
        this.results.fault_injections++;
        throw new Error('Simulated fault injection');
      }
      
      // Generate request payload
      const eventData = this.generateTestEvent();
      
      // Make API request
      const response = await fetch('http://localhost:3000/api/sdk/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      });
      
      const responseTime = performance.now() - startTime;
      this.results.response_times.push(responseTime);
      this.results.total_requests++;
      
      if (response.ok) {
        this.results.successful_requests++;
        return { success: true, requestId, responseTime, status: response.status };
      } else {
        this.results.failed_requests++;
        const error = `HTTP ${response.status}`;
        this.results.errors.push({ requestId, error, responseTime });
        return { success: false, requestId, responseTime, error };
      }
      
    } catch (error) {
      const responseTime = performance.now() - startTime;
      this.results.response_times.push(responseTime);
      this.results.total_requests++;
      this.results.failed_requests++;
      this.results.errors.push({ requestId, error: error.message, responseTime });
      
      return { success: false, requestId, responseTime, error: error.message };
    }
  }

  // Calculate performance metrics
  calculateMetrics() {
    const duration = (this.results.end_time - this.results.start_time) / 1000;
    this.results.throughput_rps = this.results.total_requests / duration;
    
    if (this.results.response_times.length > 0) {
      this.results.avg_response_time = 
        this.results.response_times.reduce((sum, time) => sum + time, 0) / 
        this.results.response_times.length;
      
      const sorted = [...this.results.response_times].sort((a, b) => a - b);
      const p95Index = Math.floor(sorted.length * 0.95);
      const p99Index = Math.floor(sorted.length * 0.99);
      
      this.results.p95_response_time = sorted[p95Index] || 0;
      this.results.p99_response_time = sorted[p99Index] || 0;
    }
    
    this.results.error_rate = this.results.failed_requests / this.results.total_requests;
    this.results.success_rate = this.results.successful_requests / this.results.total_requests;
  }

  // Check if performance meets thresholds
  validateThresholds() {
    const thresholds = STRESS_CONFIG.PERFORMANCE_THRESHOLDS;
    const results = [];
    
    results.push({
      metric: 'Average Response Time',
      value: `${Math.round(this.results.avg_response_time)}ms`,
      threshold: `<${thresholds.avg_response_time}ms`,
      passed: this.results.avg_response_time < thresholds.avg_response_time
    });
    
    results.push({
      metric: 'P95 Response Time',
      value: `${Math.round(this.results.p95_response_time)}ms`,
      threshold: `<${thresholds.p95_response_time}ms`,
      passed: this.results.p95_response_time < thresholds.p95_response_time
    });
    
    results.push({
      metric: 'Throughput',
      value: `${Math.round(this.results.throughput_rps)} RPS`,
      threshold: `>${thresholds.throughput_rps} RPS`,
      passed: this.results.throughput_rps > thresholds.throughput_rps
    });
    
    results.push({
      metric: 'Success Rate',
      value: `${Math.round(this.results.success_rate * 100)}%`,
      threshold: `>${Math.round(thresholds.success_rate * 100)}%`,
      passed: this.results.success_rate > thresholds.success_rate
    });
    
    results.push({
      metric: 'Error Rate',
      value: `${Math.round(this.results.error_rate * 100)}%`,
      threshold: `<${Math.round(thresholds.error_rate * 100)}%`,
      passed: this.results.error_rate < thresholds.error_rate
    });
    
    return results;
  }

  // Run the complete stress test
  async runStressTest() {
    console.log('🚀 AdGo E2E Stress Test - Enterprise Validation');
    console.log('================================================');
    console.log(`🎯 Target: ${STRESS_CONFIG.CONCURRENT_USERS} concurrent users`);
    console.log(`⏱️  Duration: ${STRESS_CONFIG.TEST_DURATION_MS / 1000}s`);
    console.log(`💥 Fault injection: ${STRESS_CONFIG.FAULT_INJECTION_RATE * 100}%`);
    console.log('');
    
    try {
      // Initialize test data
      await this.initializeTestData();
      
      console.log('🔥 Starting concurrent user simulation...');
      this.results.start_time = performance.now();
      
      // Create concurrent user promises
      const userPromises = [];
      for (let i = 0; i < STRESS_CONFIG.CONCURRENT_USERS; i++) {
        userPromises.push(this.simulateUser(i));
        
        // Progressive ramp-up to avoid overwhelming the server immediately
        if (i % 100 === 0 && i > 0) {
          await this.sleep(50); // 50ms delay every 100 users
        }
      }
      
      // Execute all users concurrently with timeout
      const timeoutPromise = this.sleep(STRESS_CONFIG.TEST_DURATION_MS);
      await Promise.race([
        Promise.all(userPromises),
        timeoutPromise
      ]);
      
      this.results.end_time = performance.now();
      
      console.log('✅ Stress test completed, calculating metrics...');
      this.calculateMetrics();
      this.printResults();
      
    } catch (error) {
      console.error('❌ Stress test failed:', error.message);
      throw error;
    }
  }

  // Print comprehensive results
  printResults() {
    console.log('');
    console.log('=' .repeat(60));
    console.log('📊 E2E STRESS TEST RESULTS - ENTERPRISE VALIDATION');
    console.log('=' .repeat(60));
    
    const duration = (this.results.end_time - this.results.start_time) / 1000;
    
    console.log(`🕐 Test Duration: ${duration.toFixed(2)}s`);
    console.log(`👥 Concurrent Users: ${STRESS_CONFIG.CONCURRENT_USERS}`);
    console.log(`📊 Total Requests: ${this.results.total_requests}`);
    console.log(`✅ Successful: ${this.results.successful_requests}`);
    console.log(`❌ Failed: ${this.results.failed_requests}`);
    console.log(`💥 Fault Injections: ${this.results.fault_injections}`);
    console.log('');
    
    console.log('🎯 PERFORMANCE METRICS:');
    console.log('========================');
    console.log(`⚡ Throughput: ${Math.round(this.results.throughput_rps)} RPS`);
    console.log(`📈 Avg Response Time: ${Math.round(this.results.avg_response_time)}ms`);
    console.log(`📊 P95 Response Time: ${Math.round(this.results.p95_response_time)}ms`);
    console.log(`📊 P99 Response Time: ${Math.round(this.results.p99_response_time)}ms`);
    console.log(`✅ Success Rate: ${Math.round(this.results.success_rate * 100)}%`);
    console.log(`❌ Error Rate: ${Math.round(this.results.error_rate * 100)}%`);
    console.log('');
    
    console.log('🏆 THRESHOLD VALIDATION:');
    console.log('=========================');
    
    const validationResults = this.validateThresholds();
    let passedCount = 0;
    
    validationResults.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${result.metric}: ${result.value} (target: ${result.threshold})`);
      if (result.passed) passedCount++;
    });
    
    const overallScore = Math.round((passedCount / validationResults.length) * 100);
    console.log('');
    console.log(`🎯 Overall Score: ${overallScore}% (${passedCount}/${validationResults.length} metrics passed)`);
    
    if (overallScore >= 80) {
      console.log('🚀 ENTERPRISE READINESS: ✅ VALIDATED');
      console.log('🏆 AdGo is ready for enterprise production deployment!');
    } else {
      console.log('⚠️  ENTERPRISE READINESS: ❌ NEEDS IMPROVEMENT');
      console.log('🔧 Performance optimizations required before production');
    }
    
    console.log('');
    
    if (this.results.errors.length > 0) {
      console.log('🔍 ERROR ANALYSIS:');
      console.log('==================');
      
      // Group errors by type
      const errorGroups = {};
      this.results.errors.forEach(error => {
        const errorType = error.error.substring(0, 50);
        if (!errorGroups[errorType]) {
          errorGroups[errorType] = [];
        }
        errorGroups[errorType].push(error);
      });
      
      Object.entries(errorGroups).forEach(([errorType, errors]) => {
        console.log(`• ${errorType}: ${errors.length} occurrences`);
      });
    }
    
    console.log('');
    console.log('=' .repeat(60));
    console.log('✅ E2E Stress Test Complete - Enterprise Validation Finished');
    console.log('=' .repeat(60));
  }

  // Utility: sleep function
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Execute stress test if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const stressTest = new E2EStressTest();
  
  stressTest.runStressTest()
    .then(() => {
      console.log('🎉 Stress test completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Stress test failed:', error);
      process.exit(1);
    });
}

export default E2EStressTest;