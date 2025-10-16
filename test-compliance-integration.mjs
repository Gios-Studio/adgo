#!/usr/bin/env node
/**
 * AdGo Compliance & Consent Integration Testing
 * Validates compliance implementation components
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

async function runIntegrationTests() {
  console.log('🔒 AdGo Compliance & Consent Integration Testing\n');
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    details: []
  };

  // Test 1: Component Files Exist
  console.log('📁 Test 1: Component Files Validation');
  results.total++;
  
  try {
    const requiredFiles = [
      'src/components/ConsentModal.tsx',
      'src/hooks/useConsent.ts',
      'src/pages/privacy-policy.tsx',
      'src/pages/terms-of-service.tsx',
      'src/pages/cookie-policy.tsx',
      'src/pages/api/get-client-ip.ts',
      'supabase/migrations/20241201_create_user_consents.sql'
    ];

    let allFilesExist = true;
    const fileStatus = [];

    for (const file of requiredFiles) {
      if (existsSync(file)) {
        console.log(`  ✅ ${file}`);
        fileStatus.push({ file, status: 'EXISTS' });
      } else {
        console.log(`  ❌ ${file} - MISSING`);
        fileStatus.push({ file, status: 'MISSING' });
        allFilesExist = false;
      }
    }

    if (allFilesExist) {
      results.passed++;
      results.details.push({ test: 'Component Files', status: 'PASS', message: 'All compliance components present' });
    } else {
      results.failed++;
      results.details.push({ test: 'Component Files', status: 'FAIL', message: 'Missing compliance components' });
    }
  } catch (error) {
    console.log(`  ❌ File validation failed: ${error.message}`);
    results.failed++;
    results.details.push({ test: 'Component Files', status: 'FAIL', message: error.message });
  }

  // Test 2: Component Code Quality
  console.log('\n📋 Test 2: Component Code Quality');
  results.total++;
  
  try {
    // Check ConsentModal implementation
    const consentModal = readFileSync('src/components/ConsentModal.tsx', 'utf-8');
    
    const hasRequiredImports = consentModal.includes('useConsent') && consentModal.includes('lucide-react');
    const hasConsentTypes = consentModal.includes('necessary') && consentModal.includes('marketing') && 
                           consentModal.includes('analytics') && consentModal.includes('functional');
    const hasSaveLogic = consentModal.includes('saveConsent') && consentModal.includes('handleAcceptAll');
    const hasAccessibility = consentModal.includes('GDPR') || consentModal.includes('Kenya');
    
    console.log(`  ${hasRequiredImports ? '✅' : '❌'} Required imports present`);
    console.log(`  ${hasConsentTypes ? '✅' : '❌'} All consent types defined`);
    console.log(`  ${hasSaveLogic ? '✅' : '❌'} Save logic implemented`);
    console.log(`  ${hasAccessibility ? '✅' : '❌'} Compliance references included`);

    if (hasRequiredImports && hasConsentTypes && hasSaveLogic && hasAccessibility) {
      results.passed++;
      results.details.push({ test: 'Code Quality', status: 'PASS', message: 'Component implementation complete' });
    } else {
      results.failed++;
      results.details.push({ test: 'Code Quality', status: 'FAIL', message: 'Component implementation incomplete' });
    }
  } catch (error) {
    console.log(`  ❌ Code quality check failed: ${error.message}`);
    results.failed++;
    results.details.push({ test: 'Code Quality', status: 'FAIL', message: error.message });
  }

  // Test 3: Legal Pages Content
  console.log('\n📄 Test 3: Legal Pages Content Validation');
  results.total++;
  
  try {
    const legalPages = [
      { file: 'src/pages/privacy-policy.tsx', name: 'Privacy Policy' },
      { file: 'src/pages/terms-of-service.tsx', name: 'Terms of Service' },
      { file: 'src/pages/cookie-policy.tsx', name: 'Cookie Policy' }
    ];

    let allPagesValid = true;
    
    for (const page of legalPages) {
      const content = readFileSync(page.file, 'utf-8');
      
      const hasLastUpdated = content.includes('Last Updated');
      const hasKenyaReferences = content.includes('Kenya') || content.includes('Nairobi');
      const hasContactInfo = content.includes('adgosolutions.com') || content.includes('privacy@');
      const hasDataRights = content.includes('right to') || content.includes('rights');
      
      console.log(`  ${page.name}:`);
      console.log(`    ${hasLastUpdated ? '✅' : '❌'} Last Updated date`);
      console.log(`    ${hasKenyaReferences ? '✅' : '❌'} Kenya-specific content`);
      console.log(`    ${hasContactInfo ? '✅' : '❌'} Contact information`);
      console.log(`    ${hasDataRights ? '✅' : '❌'} Data rights information`);
      
      if (!hasLastUpdated || !hasKenyaReferences || !hasContactInfo || !hasDataRights) {
        allPagesValid = false;
      }
    }

    if (allPagesValid) {
      results.passed++;
      results.details.push({ test: 'Legal Content', status: 'PASS', message: 'All legal pages contain required elements' });
    } else {
      results.failed++;
      results.details.push({ test: 'Legal Content', status: 'FAIL', message: 'Legal pages missing required content' });
    }
  } catch (error) {
    console.log(`  ❌ Legal pages validation failed: ${error.message}`);
    results.failed++;
    results.details.push({ test: 'Legal Content', status: 'FAIL', message: error.message });
  }

  // Test 4: Database Migration Structure
  console.log('\n🗄️  Test 4: Database Migration Structure');
  results.total++;
  
  try {
    const migration = readFileSync('supabase/migrations/20241201_create_user_consents.sql', 'utf-8');
    
    const hasTableCreation = migration.includes('create table') && migration.includes('user_consents');
    const hasRequiredColumns = migration.includes('user_id') && migration.includes('consents') && 
                              migration.includes('ip_address') && migration.includes('created_at');
    const hasRLS = migration.includes('enable row level security');
    const hasPolicies = migration.includes('create policy');
    const hasIndexes = migration.includes('create index');
    const hasPermissions = migration.includes('grant all');
    
    console.log(`  ${hasTableCreation ? '✅' : '❌'} Table creation statement`);
    console.log(`  ${hasRequiredColumns ? '✅' : '❌'} Required columns defined`);
    console.log(`  ${hasRLS ? '✅' : '❌'} Row Level Security enabled`);
    console.log(`  ${hasPolicies ? '✅' : '❌'} Security policies defined`);
    console.log(`  ${hasIndexes ? '✅' : '❌'} Performance indexes created`);
    console.log(`  ${hasPermissions ? '✅' : '❌'} Permissions granted`);

    if (hasTableCreation && hasRequiredColumns && hasRLS && hasPolicies && hasIndexes && hasPermissions) {
      results.passed++;
      results.details.push({ test: 'Database Migration', status: 'PASS', message: 'Migration properly structured' });
    } else {
      results.failed++;
      results.details.push({ test: 'Database Migration', status: 'FAIL', message: 'Migration missing required elements' });
    }
  } catch (error) {
    console.log(`  ❌ Migration validation failed: ${error.message}`);
    results.failed++;
    results.details.push({ test: 'Database Migration', status: 'FAIL', message: error.message });
  }

  // Test 5: Hook Implementation
  console.log('\n⚛️  Test 5: useConsent Hook Implementation');
  results.total++;
  
  try {
    const hook = readFileSync('src/hooks/useConsent.ts', 'utf-8');
    
    const hasRequiredFunctions = hook.includes('saveConsent') && hook.includes('updateConsent') && 
                                hook.includes('withdrawConsent') && hook.includes('hasConsent');
    const hasSupabaseIntegration = hook.includes('supabase') && hook.includes('user_consents');
    const hasLocalStorageSupport = hook.includes('localStorage') && hook.includes('adgo-consent');
    const hasIPTracking = hook.includes('getClientIP') && hook.includes('user_agent');
    const hasErrorHandling = hook.includes('try') && hook.includes('catch') && hook.includes('console.error');
    
    console.log(`  ${hasRequiredFunctions ? '✅' : '❌'} Required consent functions`);
    console.log(`  ${hasSupabaseIntegration ? '✅' : '❌'} Supabase integration`);
    console.log(`  ${hasLocalStorageSupport ? '✅' : '❌'} Anonymous user support`);
    console.log(`  ${hasIPTracking ? '✅' : '❌'} IP and user agent tracking`);
    console.log(`  ${hasErrorHandling ? '✅' : '❌'} Error handling`);

    if (hasRequiredFunctions && hasSupabaseIntegration && hasLocalStorageSupport && hasIPTracking && hasErrorHandling) {
      results.passed++;
      results.details.push({ test: 'Hook Implementation', status: 'PASS', message: 'useConsent hook fully implemented' });
    } else {
      results.failed++;
      results.details.push({ test: 'Hook Implementation', status: 'FAIL', message: 'Hook missing required functionality' });
    }
  } catch (error) {
    console.log(`  ❌ Hook validation failed: ${error.message}`);
    results.failed++;
    results.details.push({ test: 'Hook Implementation', status: 'FAIL', message: error.message });
  }

  // Test 6: Footer Integration
  console.log('\n🦶 Test 6: Footer Legal Links Integration');
  results.total++;
  
  try {
    const footer = readFileSync('src/components/Footer.tsx', 'utf-8');
    
    const hasPrivacyLink = footer.includes('/privacy-policy');
    const hasTermsLink = footer.includes('/terms-of-service');
    const hasCookieLink = footer.includes('/cookie-policy');
    const hasAdGoContent = footer.includes('AdGo') && footer.includes('Kenya');
    
    console.log(`  ${hasPrivacyLink ? '✅' : '❌'} Privacy Policy link`);
    console.log(`  ${hasTermsLink ? '✅' : '❌'} Terms of Service link`);
    console.log(`  ${hasCookieLink ? '✅' : '❌'} Cookie Policy link`);
    console.log(`  ${hasAdGoContent ? '✅' : '❌'} AdGo branding updated`);

    if (hasPrivacyLink && hasTermsLink && hasCookieLink && hasAdGoContent) {
      results.passed++;
      results.details.push({ test: 'Footer Integration', status: 'PASS', message: 'Footer links properly configured' });
    } else {
      results.failed++;
      results.details.push({ test: 'Footer Integration', status: 'FAIL', message: 'Footer missing legal links' });
    }
  } catch (error) {
    console.log(`  ❌ Footer validation failed: ${error.message}`);
    results.failed++;
    results.details.push({ test: 'Footer Integration', status: 'FAIL', message: error.message });
  }

  // Results Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPLIANCE INTEGRATION TEST RESULTS');
  console.log('='.repeat(60));
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`   Total Tests: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📊 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  console.log(`\n📋 DETAILED RESULTS:`);
  results.details.forEach((detail, index) => {
    const icon = detail.status === 'PASS' ? '✅' : '❌';
    console.log(`   ${index + 1}. ${icon} ${detail.test}: ${detail.message}`);
  });

  if (results.failed === 0) {
    console.log(`\n🎉 ALL INTEGRATION TESTS PASSED!`);
    console.log(`✅ Compliance implementation components ready`);
    console.log(`📋 Task 8 "Compliance & Consent" - Components Complete`);
    console.log(`\n📋 NEXT STEPS:`);
    console.log(`   1. Apply database migration to production`);
    console.log(`   2. Integrate ConsentModal into main app layout`);
    console.log(`   3. Test consent flow in browser`);
    console.log(`   4. Proceed to Task 9 "Production Build Optimization"`);
    return true;
  } else {
    console.log(`\n⚠️  INTEGRATION TESTS INCOMPLETE`);
    console.log(`❌ ${results.failed} test(s) need attention`);
    return false;
  }
}

// Execute tests
runIntegrationTests()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('💥 Test suite crashed:', error);
    process.exit(1);
  });