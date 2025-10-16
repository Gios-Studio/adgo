/**
 * AdGo Platform - Quick SDK Fixes Script (CommonJS)
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function ensureTestData() {
  console.log('🔧 Ensuring test data exists...');
  
  try {
    // 1. Create test partner
    const { error: partnerError } = await supabase
      .from('profiles')
      .upsert({
        id: '123e4567-e89b-12d3-a456-426614174099',
        full_name: 'SDK Test Partner',
        email: 'sdk-test@adgosolutions.com',
        role: 'partner'
      }, {
        onConflict: 'id'
      });
    
    if (partnerError && !partnerError.message.includes('duplicate')) {
      console.error('Partner error:', partnerError);
    } else {
      console.log('✅ Test partner created/updated');
    }
    
    // 2. Create test campaign
    const { error: campaignError } = await supabase
      .from('campaigns')
      .upsert({
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'SDK Test Campaign',
        partner_id: '123e4567-e89b-12d3-a456-426614174099',
        status: 'active',
        budget_cents: 100000
      }, {
        onConflict: 'id'
      });
    
    if (campaignError && !campaignError.message.includes('duplicate')) {
      console.error('Campaign error:', campaignError);
    } else {
      console.log('✅ Test campaign created/updated');
    }
    
    // 3. Create test ad
    const { error: adError } = await supabase
      .from('ads')
      .upsert({
        id: '123e4567-e89b-12d3-a456-426614174001',
        campaign_id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Test Ad',
        status: 'active',
        media_url: 'https://via.placeholder.com/300x200'
      }, {
        onConflict: 'id'
      });
    
    if (adError && !adError.message.includes('duplicate')) {
      console.error('Ad error:', adError);
    } else {
      console.log('✅ Test ad created/updated');
    }
    
    console.log('🎉 Test data setup complete!');
    
  } catch (error) {
    console.error('❌ Error setting up test data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  ensureTestData()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = ensureTestData;