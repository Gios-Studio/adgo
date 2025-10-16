#!/usr/bin/env node

/**
 * AdGo Platform - SDK Data Sync Verification Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * Comprehensive testing suite for SDK endpoint validation,
 * real-time data synchronization, and API compatibility
 */

const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rkonwkggxaohpmxmzmfn.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

class SDKValidator {
  constructor(baseUrl = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  // Test API health endpoint
  async testHealthEndpoint() {
    const startTime = Date.now();
    try {
      const response = await axios.get(`${this.baseUrl}/api/health`, {
        timeout: 5000
      });
      
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: '/api/health',
        method: 'GET',
        status: response.status === 200 ? 'PASS' : 'FAIL',
        responseTime,
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        endpoint: '/api/health',
        method: 'GET',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Test SDK events endpoint - GET (ad serving)
  async testAdServing() {
    const startTime = Date.now();
    const { v4: uuidv4 } = require('uuid');
    const validRideId = '10614cf7-4002-455f-af25-918c0b97641e';
    
    try {
      const response = await axios.get(`${this.baseUrl}/api/sdk/events`, {
        params: {
          ride_id: validRideId,
          device_id: 'test_device_001',
          zone: 'post-ride'
        },
        timeout: 5000
      });
      
      const responseTime = Date.now() - startTime;
      const hasValidStructure = response.data && (response.data.ad || response.data.message);
      
      return {
        endpoint: '/api/sdk/events',
        method: 'GET',
        status: response.status === 200 && hasValidStructure ? 'PASS' : 'WARNING',
        responseTime,
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        endpoint: '/api/sdk/events',
        method: 'GET',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Test SDK events endpoint - POST (event tracking)
  async testEventTracking() {
    const startTime = Date.now();
    const { v4: uuidv4 } = require('uuid');
    
    try {
      const response = await axios.post(`${this.baseUrl}/api/sdk/events`, {
        campaign_id: 'ace29fa0-5765-4ce0-b856-074b3abad5e7',
        ad_id: '88c0a93e-493c-499a-8a0a-eaa2cdba6a2c',
        ride_id: '10614cf7-4002-455f-af25-918c0b97641e',
        device_id: 'test_device_001',
        zone: 'post-ride',
        event_type: 'click',
        meta: { test: true }
      }, {
        timeout: 5000,
        headers: { 'Content-Type': 'application/json' }
      });
      
      const responseTime = Date.now() - startTime;
      const hasValidResponse = response.data && response.data.success;
      
      return {
        endpoint: '/api/sdk/events',
        method: 'POST',
        status: response.status === 200 && hasValidResponse ? 'PASS' : 'WARNING',
        responseTime,
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        endpoint: '/api/sdk/events',
        method: 'POST',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Test metrics endpoint
  async testMetricsEndpoint() {
    const startTime = Date.now();
    
    try {
      const response = await axios.get(`${this.baseUrl}/api/metrics/ctr`, {
        timeout: 5000
      });
      
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: '/api/metrics/ctr',
        method: 'GET',
        status: response.status === 200 ? 'PASS' : 'FAIL',
        responseTime,
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        endpoint: '/api/metrics/ctr',
        method: 'GET',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Test driver wallet endpoint
  async testDriverWallet() {
    const startTime = Date.now();
    
    try {
      const response = await axios.get(`${this.baseUrl}/api/driver/wallet`, {
        params: { driver_id: 'test_driver_001' },
        timeout: 5000
      });
      
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: '/api/driver/wallet',
        method: 'GET',
        status: response.status === 200 ? 'PASS' : 'WARNING',
        responseTime,
        statusCode: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        endpoint: '/api/driver/wallet',
        method: 'GET',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Test database connectivity and data consistency
  async testDatabaseSync() {
    const startTime = Date.now();
    
    try {
      // Test campaigns table
      const { data: campaigns, error: campaignError } = await supabase
        .from('campaigns')
        .select('id, name, status, budget_cents')
        .limit(5);
      
      if (campaignError) throw campaignError;
      
      // Test analytics_events table
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('id, campaign_id, event_type, created_at')
        .limit(5);
      
      if (eventsError) throw eventsError;
      
      // Test profiles table
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, role, created_at')
        .limit(5);
      
      if (profilesError) throw profilesError;
      
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: 'Database Sync',
        method: 'QUERY',
        status: 'PASS',
        responseTime,
        data: {
          campaigns: campaigns?.length || 0,
          events: events?.length || 0,
          profiles: profiles?.length || 0
        }
      };
    } catch (error) {
      return {
        endpoint: 'Database Sync',
        method: 'QUERY',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Test real-time event processing
  async testRealtimeEvents() {
    const startTime = Date.now();
    
    try {
      // Use proper UUID format for test
      const { v4: uuidv4 } = require('uuid');
      const testDeviceId = `test_realtime_${Date.now()}`;
      const validRideId = '10614cf7-4002-455f-af25-918c0b97641e';
      
      // Insert test event (using 'impression' as it's an allowed event type)
      const { data: insertResult, error: insertError } = await supabase
        .from('analytics_events')
        .insert({
          campaign_id: 'ace29fa0-5765-4ce0-b856-074b3abad5e7',
          ad_id: '88c0a93e-493c-499a-8a0a-eaa2cdba6a2c',
          event_type: 'impression',
          device_id: testDeviceId,
          ride_id: validRideId,
          meta: { sync_test: true }
        })
        .select();
      
      if (insertError) throw insertError;
      
      // Verify event was recorded
      const { data: verifyResult, error: verifyError } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('device_id', testDeviceId)
        .single();
      
      if (verifyError) throw verifyError;
      
      // Cleanup test data
      await supabase
        .from('analytics_events')
        .delete()
        .eq('device_id', testDeviceId);
      
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: 'Realtime Events',
        method: 'INSERT/VERIFY',
        status: verifyResult ? 'PASS' : 'FAIL',
        responseTime,
        data: { eventRecorded: !!verifyResult }
      };
    } catch (error) {
      return {
        endpoint: 'Realtime Events',
        method: 'INSERT/VERIFY',
        status: 'FAIL',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  // Run complete validation suite
  async runValidation() {
    console.log('� Starting SDK Data Sync Verification...');
    
    const tests = [
      this.testHealthEndpoint(),
      this.testAdServing(),
      this.testEventTracking(),
      this.testMetricsEndpoint(),
      this.testDriverWallet(),
      this.testDatabaseSync(),
      this.testRealtimeEvents()
    ];
    
    this.results = await Promise.all(tests);
    
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const warnings = this.results.filter(r => r.status === 'WARNING').length;
    
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: this.results.length,
      passed,
      failed,
      warnings,
      results: this.results,
      summary: {
        apiHealth: this.results.find(r => r.endpoint === '/api/health')?.status === 'PASS',
        dataSync: this.results.find(r => r.endpoint === 'Database Sync')?.status === 'PASS',
        realTimeEvents: this.results.find(r => r.endpoint === 'Realtime Events')?.status === 'PASS',
        payoutSystem: this.results.find(r => r.endpoint === '/api/driver/wallet')?.status !== 'FAIL'
      }
    };
    
    this.printReport(report);
    return report;
  }

  // Print formatted report
  printReport(report) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 SDK DATA SYNC VERIFICATION REPORT');
    console.log('='.repeat(60));
    console.log(`🕐 Timestamp: ${report.timestamp}`);
    console.log(`📈 Total Tests: ${report.totalTests}`);
    console.log(`✅ Passed: ${report.passed}`);
    console.log(`❌ Failed: ${report.failed}`);
    console.log(`⚠️  Warnings: ${report.warnings}`);
    console.log('');
    
    // Summary status
    console.log('🎯 SYSTEM SUMMARY:');
    console.log(`   API Health: ${report.summary.apiHealth ? '✅ OPERATIONAL' : '❌ DOWN'}`);
    console.log(`   Data Sync: ${report.summary.dataSync ? '✅ SYNCHRONIZED' : '❌ ISSUES'}`);
    console.log(`   Real-time Events: ${report.summary.realTimeEvents ? '✅ WORKING' : '❌ BROKEN'}`);
    console.log(`   Payout System: ${report.summary.payoutSystem ? '✅ FUNCTIONAL' : '❌ OFFLINE'}`);
    console.log('');
    
    // Detailed results
    console.log('📋 DETAILED RESULTS:');
    report.results.forEach((result, index) => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
      console.log(`${index + 1}. ${icon} ${result.method} ${result.endpoint}`);
      console.log(`   Status: ${result.status} | Response: ${result.responseTime}ms`);
      
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      if (result.data && typeof result.data === 'object') {
        console.log(`   Data: ${JSON.stringify(result.data).substring(0, 100)}...`);
      }
      console.log('');
    });
    
    const overallHealth = (report.passed / report.totalTests) * 100;
    console.log(`🏆 OVERALL SDK HEALTH: ${overallHealth.toFixed(1)}%`);
    
    if (overallHealth >= 85) {
      console.log('🎉 SDK is ready for production deployment!');
    } else if (overallHealth >= 70) {
      console.log('⚠️  SDK has minor issues that should be addressed');
    } else {
      console.log('❌ SDK has critical issues requiring immediate attention');
    }
    
    console.log('='.repeat(60));
  }
}

// CLI execution
if (require.main === module) {
  const validator = new SDKValidator();
  validator.runValidation()
    .then((report) => {
      const overallHealth = (report.passed / report.totalTests) * 100;
      process.exit(overallHealth >= 70 ? 0 : 1);
    })
    .catch((error) => {
      console.error('❌ SDK validation failed:', error);
      process.exit(1);
    });
}

module.exports = SDKValidator;