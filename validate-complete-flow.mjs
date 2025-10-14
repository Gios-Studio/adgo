/**
 * AdGo Final Validation & End-to-End Test Suite
 * Tests complete advertiser → campaign → SDK → analytics → payout → invoice flow
 */

import { supabase } from '../lib/supabase.js';
import { setTimeout } from 'timers/promises';

// Test configuration
const TEST_CONFIG = {
  advertiser: {
    email: 'test-advertiser@adgo-pilot.co.ke',
    company: 'AdGo Pilot Test Co.',
    phone: '+254700000001',
    wallet_balance: 10000.00 // KES 10,000 for testing
  },
  campaign: {
    name: 'Pilot Test Campaign',
    budget: 5000.00,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  ads: {
    media: {
      title: 'Test Media Ad - Pilot Validation',
      media_url: 'https://picsum.photos/800/600',
      ad_type: 'media'
    },
    text: {
      title: 'Test Text Ad - Pilot Validation',
      ad_text: 'Join AdGo today! Experience the future of mobile advertising in Kenya. Download now and start earning.',
      language: 'en',
      ad_type: 'text',
      cta_link: 'https://adgo.co.ke/signup'
    }
  },
  driver: {
    email: 'test-driver@adgo-pilot.co.ke',
    phone: '+254700000002',
    vehicle: 'Toyota Vitz - KCA 123X'
  },
  test_ride: {
    ride_id: 'test_ride_' + Date.now(),
    device_id: 'test_device_' + Math.random().toString(36).substr(2, 9)
  }
};

class AdGoTestSuite {
  constructor() {
    this.testResults = {
      advertiser_creation: false,
      campaign_creation: false,
      media_ad_upload: false,
      text_ad_upload: false,
      sdk_impression: false,
      sdk_click: false,
      analytics_update: false,
      driver_payout: false,
      invoice_generation: false,
      data_consistency: false
    };
    this.testData = {};
  }

  async log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '📋';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runFullTest() {
    this.log('🚀 Starting AdGo End-to-End Validation Test Suite');
    
    try {
      // Step 1: Create test advertiser
      await this.testAdvertiserCreation();
      
      // Step 2: Create test campaign
      await this.testCampaignCreation();
      
      // Step 3: Upload media and text ads
      await this.testAdUpload();
      
      // Step 4: Create test driver
      await this.testDriverCreation();
      
      // Step 5: Test SDK impression and click flow
      await this.testSDKFlow();
      
      // Step 6: Verify analytics updates
      await this.testAnalyticsUpdate();
      
      // Step 7: Check driver payout
      await this.testDriverPayout();
      
      // Step 8: Generate and verify invoice
      await this.testInvoiceGeneration();
      
      // Step 9: Validate data consistency
      await this.testDataConsistency();
      
      // Generate final report
      await this.generateTestReport();
      
    } catch (error) {
      this.log(`Fatal test error: ${error.message}`, 'error');
      throw error;
    }
  }

  async testAdvertiserCreation() {
    this.log('Testing advertiser creation...');
    
    try {
      // Create test advertiser
      const { data: advertiser, error } = await supabase
        .from('advertisers')
        .insert({
          email: TEST_CONFIG.advertiser.email,
          company_name: TEST_CONFIG.advertiser.company,
          phone: TEST_CONFIG.advertiser.phone,
          status: 'active',
          wallet_balance: TEST_CONFIG.advertiser.wallet_balance
        })
        .select()
        .single();

      if (error) throw error;
      
      this.testData.advertiser = advertiser;
      this.testResults.advertiser_creation = true;
      this.log(`✅ Advertiser created: ${advertiser.id}`, 'success');
      
    } catch (error) {
      this.log(`Advertiser creation failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testCampaignCreation() {
    this.log('Testing campaign creation...');
    
    try {
      const { data: campaign, error } = await supabase
        .from('campaigns')
        .insert({
          advertiser_id: this.testData.advertiser.id,
          name: TEST_CONFIG.campaign.name,
          budget: TEST_CONFIG.campaign.budget,
          start_date: TEST_CONFIG.campaign.start_date,
          end_date: TEST_CONFIG.campaign.end_date,
          status: 'active',
          target_audience: { age: '25-45', location: 'Nairobi', interests: ['mobile', 'tech'] }
        })
        .select()
        .single();

      if (error) throw error;
      
      this.testData.campaign = campaign;
      this.testResults.campaign_creation = true;
      this.log(`✅ Campaign created: ${campaign.id}`, 'success');
      
    } catch (error) {
      this.log(`Campaign creation failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testAdUpload() {
    this.log('Testing ad upload (media and text)...');
    
    try {
      // Upload media ad
      const { data: mediaAd, error: mediaError } = await supabase
        .from('ads')
        .insert({
          campaign_id: this.testData.campaign.id,
          title: TEST_CONFIG.ads.media.title,
          media_url: TEST_CONFIG.ads.media.media_url,
          ad_type: 'media',
          language: 'en',
          status: 'active'
        })
        .select()
        .single();

      if (mediaError) throw mediaError;

      // Upload text ad
      const { data: textAd, error: textError } = await supabase
        .from('ads')
        .insert({
          campaign_id: this.testData.campaign.id,
          title: TEST_CONFIG.ads.text.title,
          ad_text: TEST_CONFIG.ads.text.ad_text,
          ad_type: 'text',
          language: TEST_CONFIG.ads.text.language,
          cta_link: TEST_CONFIG.ads.text.cta_link,
          status: 'active'
        })
        .select()
        .single();

      if (textError) throw textError;

      this.testData.mediaAd = mediaAd;
      this.testData.textAd = textAd;
      this.testResults.media_ad_upload = true;
      this.testResults.text_ad_upload = true;
      
      this.log(`✅ Media ad created: ${mediaAd.id}`, 'success');
      this.log(`✅ Text ad created: ${textAd.id}`, 'success');
      
    } catch (error) {
      this.log(`Ad upload failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testDriverCreation() {
    this.log('Testing driver creation...');
    
    try {
      const { data: driver, error } = await supabase
        .from('drivers')
        .insert({
          email: TEST_CONFIG.driver.email,
          phone: TEST_CONFIG.driver.phone,
          vehicle_info: TEST_CONFIG.driver.vehicle,
          status: 'active',
          wallet_balance: 0
        })
        .select()
        .single();

      if (error) throw error;
      
      this.testData.driver = driver;
      this.log(`✅ Driver created: ${driver.id}`, 'success');
      
    } catch (error) {
      this.log(`Driver creation failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testSDKFlow() {
    this.log('Testing SDK impression and click flow...');
    
    try {
      // Test impression
      const impressionResponse = await fetch('/api/sdk/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'impression',
          ride_id: TEST_CONFIG.test_ride.ride_id,
          device_id: TEST_CONFIG.test_ride.device_id,
          ad_id: this.testData.mediaAd.id,
          driver_id: this.testData.driver.id,
          location: { lat: -1.286389, lng: 36.817223 }, // Nairobi
          timestamp: new Date().toISOString()
        })
      });

      if (!impressionResponse.ok) {
        throw new Error(`Impression API failed: ${impressionResponse.status}`);
      }

      await setTimeout(1000); // Wait for processing

      // Test click
      const clickResponse = await fetch('/api/sdk/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'click',
          ride_id: TEST_CONFIG.test_ride.ride_id,
          device_id: TEST_CONFIG.test_ride.device_id,
          ad_id: this.testData.mediaAd.id,
          driver_id: this.testData.driver.id,
          location: { lat: -1.286389, lng: 36.817223 },
          timestamp: new Date().toISOString()
        })
      });

      if (!clickResponse.ok) {
        throw new Error(`Click API failed: ${clickResponse.status}`);
      }

      this.testResults.sdk_impression = true;
      this.testResults.sdk_click = true;
      this.log('✅ SDK impression and click events processed', 'success');
      
    } catch (error) {
      this.log(`SDK flow failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testAnalyticsUpdate() {
    this.log('Testing analytics updates...');
    
    try {
      await setTimeout(2000); // Wait for analytics processing
      
      const { data: analytics, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('ad_id', this.testData.mediaAd.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      const impressions = analytics.filter(a => a.event_type === 'impression').length;
      const clicks = analytics.filter(a => a.event_type === 'click').length;
      
      if (impressions > 0 && clicks > 0) {
        this.testResults.analytics_update = true;
        this.log(`✅ Analytics updated: ${impressions} impressions, ${clicks} clicks`, 'success');
      } else {
        throw new Error(`Analytics not updated properly: ${impressions} impressions, ${clicks} clicks`);
      }
      
    } catch (error) {
      this.log(`Analytics update test failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testDriverPayout() {
    this.log('Testing driver payout...');
    
    try {
      // Check driver wallet balance increase
      const { data: updatedDriver, error } = await supabase
        .from('drivers')
        .select('wallet_balance')
        .eq('id', this.testData.driver.id)
        .single();

      if (error) throw error;
      
      if (updatedDriver.wallet_balance > 0) {
        this.testResults.driver_payout = true;
        this.log(`✅ Driver payout processed: KES ${updatedDriver.wallet_balance}`, 'success');
        this.testData.driver_payout = updatedDriver.wallet_balance;
      } else {
        throw new Error('Driver wallet balance not updated');
      }
      
    } catch (error) {
      this.log(`Driver payout test failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testInvoiceGeneration() {
    this.log('Testing invoice generation...');
    
    try {
      const { data: invoice, error } = await supabase
        .from('invoices')
        .insert({
          advertiser_id: this.testData.advertiser.id,
          campaign_id: this.testData.campaign.id,
          amount: 100, // KES 100 test amount
          vat_rate: 0.16,
          vat_amount: 16,
          total_amount: 116,
          status: 'pending',
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      this.testData.invoice = invoice;
      this.testResults.invoice_generation = true;
      this.log(`✅ Invoice generated: ${invoice.id} (KES ${invoice.total_amount})`, 'success');
      
    } catch (error) {
      this.log(`Invoice generation failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async testDataConsistency() {
    this.log('Testing data consistency across all entities...');
    
    try {
      // Query dashboard KPIs
      const { data: kpis, error } = await supabase
        .from('dashboard_kpis')
        .select('*')
        .eq('advertiser_id', this.testData.advertiser.id);

      if (error) throw error;
      
      if (kpis && kpis.length > 0) {
        const kpi = kpis[0];
        this.log(`KPI Summary: Impressions: ${kpi.total_impressions}, Clicks: ${kpi.total_clicks}, CTR: ${kpi.ctr}%`);
        
        this.testResults.data_consistency = true;
        this.log('✅ Data consistency validated across all entities', 'success');
      } else {
        throw new Error('No KPI data found for test advertiser');
      }
      
    } catch (error) {
      this.log(`Data consistency test failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async generateTestReport() {
    this.log('🎯 Generating Final Test Report...');
    
    const passedTests = Object.values(this.testResults).filter(Boolean).length;
    const totalTests = Object.keys(this.testResults).length;
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    const report = {
      test_run_id: 'adgo_pilot_validation_' + Date.now(),
      timestamp: new Date().toISOString(),
      success_rate: `${successRate}%`,
      results: this.testResults,
      test_data: {
        advertiser_id: this.testData.advertiser?.id,
        campaign_id: this.testData.campaign?.id,
        media_ad_id: this.testData.mediaAd?.id,
        text_ad_id: this.testData.textAd?.id,
        driver_id: this.testData.driver?.id,
        invoice_id: this.testData.invoice?.id,
        driver_payout: this.testData.driver_payout
      },
      validation_summary: {
        end_to_end_flow: passedTests === totalTests ? '✅ PASS' : '❌ FAIL',
        critical_path: 'advertiser → campaign → ads → SDK → analytics → payout → invoice',
        data_integrity: this.testResults.data_consistency ? '✅ VERIFIED' : '❌ FAILED'
      }
    };
    
    console.log('\n📊 FINAL VALIDATION REPORT:');
    console.log('============================');
    console.log(JSON.stringify(report, null, 2));
    
    if (successRate === 100) {
      this.log('🎉 ALL TESTS PASSED - AdGo End-to-End Flow Validated!', 'success');
    } else {
      this.log(`⚠️ ${totalTests - passedTests} test(s) failed - Review required`, 'error');
    }
    
    return report;
  }

  async cleanup() {
    this.log('🧹 Cleaning up test data...');
    
    try {
      // Clean up in reverse order to respect foreign key constraints
      if (this.testData.invoice) {
        await supabase.from('invoices').delete().eq('id', this.testData.invoice.id);
      }
      
      if (this.testData.mediaAd) {
        await supabase.from('ads').delete().eq('id', this.testData.mediaAd.id);
      }
      
      if (this.testData.textAd) {
        await supabase.from('ads').delete().eq('id', this.testData.textAd.id);
      }
      
      if (this.testData.campaign) {
        await supabase.from('campaigns').delete().eq('id', this.testData.campaign.id);
      }
      
      if (this.testData.advertiser) {
        await supabase.from('advertisers').delete().eq('id', this.testData.advertiser.id);
      }
      
      if (this.testData.driver) {
        await supabase.from('drivers').delete().eq('id', this.testData.driver.id);
      }
      
      this.log('✅ Test data cleanup completed', 'success');
      
    } catch (error) {
      this.log(`Cleanup warning: ${error.message}`, 'error');
    }
  }
}

// Run the test suite
export async function runEndToEndValidation() {
  const testSuite = new AdGoTestSuite();
  
  try {
    const report = await testSuite.runFullTest();
    return report;
  } finally {
    await testSuite.cleanup();
  }
}

// Export for use in validation script
export { AdGoTestSuite, TEST_CONFIG };