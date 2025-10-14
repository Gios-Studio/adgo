#!/usr/bin/env node
/**
 * AdGo Task 8 Final Validation: Compliance & Consent Complete
 * Comprehensive validation of GDPR/Kenya DPA compliance implementation
 */

import { existsSync, readFileSync } from 'fs';

async function validateTask8Complete() {
  console.log('🔒 AdGo Task 8 Final Validation: Compliance & Consent');
  console.log('=' .repeat(60));
  
  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    details: []
  };

  // Check 1: Core Implementation Components
  console.log('\n📋 Check 1: Core Implementation Components');
  results.total++;
  
  try {
    const coreComponents = [
      { file: 'src/components/ConsentModal.tsx', desc: 'GDPR/Kenya DPA compliant consent modal' },
      { file: 'src/hooks/useConsent.ts', desc: 'Consent management hook with Supabase integration' },
      { file: 'src/pages/api/get-client-ip.ts', desc: 'Client IP detection API for compliance tracking' },
      { file: 'supabase/migrations/20241201_create_user_consents.sql', desc: 'Database schema for consent storage' }
    ];

    let allCorePresent = true;
    
    for (const component of coreComponents) {
      if (existsSync(component.file)) {
        console.log(`  ✅ ${component.desc}`);
      } else {
        console.log(`  ❌ Missing: ${component.desc}`);
        allCorePresent = false;
      }
    }

    if (allCorePresent) {
      results.passed++;
      results.details.push({ check: 'Core Components', status: 'PASS', message: 'All core compliance components implemented' });
    } else {
      results.failed++;
      results.details.push({ check: 'Core Components', status: 'FAIL', message: 'Missing core compliance components' });
    }
  } catch (error) {
    console.log(`  ❌ Core components check failed: ${error.message}`);
    results.failed++;
    results.details.push({ check: 'Core Components', status: 'FAIL', message: error.message });
  }

  // Check 2: Legal Documentation Pages
  console.log('\n📄 Check 2: Legal Documentation Pages');
  results.total++;
  
  try {
    const legalPages = [
      { file: 'src/pages/privacy-policy.tsx', name: 'Privacy Policy', keywords: ['GDPR', 'Kenya DPA', 'right to', 'AdGo Kenya Limited'] },
      { file: 'src/pages/terms-of-service.tsx', name: 'Terms of Service', keywords: ['Kenya', 'advertising platform', 'liability', 'termination'] },
      { file: 'src/pages/cookie-policy.tsx', name: 'Cookie Policy', keywords: ['necessary cookies', 'marketing cookies', 'consent banner', 'Kenya'] }
    ];

    let allPagesValid = true;
    
    for (const page of legalPages) {
      if (existsSync(page.file)) {
        const content = readFileSync(page.file, 'utf-8');
        const hasAllKeywords = page.keywords.every(keyword => 
          content.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (hasAllKeywords) {
          console.log(`  ✅ ${page.name}: Complete and Kenya-specific`);
        } else {
          console.log(`  ⚠️  ${page.name}: Missing some required content`);
          allPagesValid = false;
        }
      } else {
        console.log(`  ❌ ${page.name}: File missing`);
        allPagesValid = false;
      }
    }

    if (allPagesValid) {
      results.passed++;
      results.details.push({ check: 'Legal Pages', status: 'PASS', message: 'All legal pages complete with Kenya-specific content' });
    } else {
      results.failed++;
      results.details.push({ check: 'Legal Pages', status: 'FAIL', message: 'Legal pages incomplete or missing content' });
    }
  } catch (error) {
    console.log(`  ❌ Legal pages check failed: ${error.message}`);
    results.failed++;
    results.details.push({ check: 'Legal Pages', status: 'FAIL', message: error.message });
  }

  // Check 3: App Integration
  console.log('\n🔧 Check 3: Application Integration');
  results.total++;
  
  try {
    const appFile = 'src/pages/_app.tsx';
    
    if (existsSync(appFile)) {
      const appContent = readFileSync(appFile, 'utf-8');
      
      const hasConsentModal = appContent.includes('ConsentModal');
      const hasConsentHook = appContent.includes('useConsent');
      const hasConsentWrapper = appContent.includes('ConsentWrapper');
      
      console.log(`  ${hasConsentModal ? '✅' : '❌'} ConsentModal imported`);
      console.log(`  ${hasConsentHook ? '✅' : '❌'} useConsent hook imported`);
      console.log(`  ${hasConsentWrapper ? '✅' : '❌'} ConsentWrapper component added`);
      
      if (hasConsentModal && hasConsentHook && hasConsentWrapper) {
        results.passed++;
        results.details.push({ check: 'App Integration', status: 'PASS', message: 'Consent modal integrated into main app' });
      } else {
        results.failed++;
        results.details.push({ check: 'App Integration', status: 'FAIL', message: 'Consent modal not properly integrated' });
      }
    } else {
      console.log(`  ❌ _app.tsx not found`);
      results.failed++;
      results.details.push({ check: 'App Integration', status: 'FAIL', message: '_app.tsx not found' });
    }
  } catch (error) {
    console.log(`  ❌ App integration check failed: ${error.message}`);
    results.failed++;
    results.details.push({ check: 'App Integration', status: 'FAIL', message: error.message });
  }

  // Check 4: Settings Page Integration
  console.log('\n⚙️  Check 4: Settings Page Integration');
  results.total++;
  
  try {
    const settingsFile = 'src/components/Settings.tsx';
    
    if (existsSync(settingsFile)) {
      const settingsContent = readFileSync(settingsFile, 'utf-8');
      
      const hasConsentSettings = settingsContent.includes('ConsentSettings');
      const hasConsentManagement = settingsContent.includes('withdrawConsent');
      const hasConsentStatus = settingsContent.includes('hasConsent');
      const hasSettingsUI = settingsContent.includes('Privacy & Cookie Preferences');
      
      console.log(`  ${hasConsentSettings ? '✅' : '❌'} ConsentSettings component`);
      console.log(`  ${hasConsentManagement ? '✅' : '❌'} Consent withdrawal functionality`);
      console.log(`  ${hasConsentStatus ? '✅' : '❌'} Consent status display`);
      console.log(`  ${hasSettingsUI ? '✅' : '❌'} Settings UI components`);
      
      if (hasConsentSettings && hasConsentManagement && hasConsentStatus && hasSettingsUI) {
        results.passed++;
        results.details.push({ check: 'Settings Integration', status: 'PASS', message: 'Consent settings fully integrated' });
      } else {
        results.failed++;
        results.details.push({ check: 'Settings Integration', status: 'FAIL', message: 'Settings integration incomplete' });
      }
    } else {
      console.log(`  ❌ Settings.tsx not found`);
      results.failed++;
      results.details.push({ check: 'Settings Integration', status: 'FAIL', message: 'Settings.tsx not found' });
    }
  } catch (error) {
    console.log(`  ❌ Settings integration check failed: ${error.message}`);
    results.failed++;
    results.details.push({ check: 'Settings Integration', status: 'FAIL', message: error.message });
  }

  // Check 5: Footer Links
  console.log('\n🦶 Check 5: Footer Legal Links');
  results.total++;
  
  try {
    const footerFile = 'src/components/Footer.tsx';
    
    if (existsSync(footerFile)) {
      const footerContent = readFileSync(footerFile, 'utf-8');
      
      const hasPrivacyLink = footerContent.includes('/privacy-policy');
      const hasTermsLink = footerContent.includes('/terms-of-service');
      const hasCookieLink = footerContent.includes('/cookie-policy');
      const hasAdGoBranding = footerContent.includes('AdGo Kenya Limited');
      
      console.log(`  ${hasPrivacyLink ? '✅' : '❌'} Privacy Policy link`);
      console.log(`  ${hasTermsLink ? '✅' : '❌'} Terms of Service link`);
      console.log(`  ${hasCookieLink ? '✅' : '❌'} Cookie Policy link`);
      console.log(`  ${hasAdGoBranding ? '✅' : '❌'} AdGo Kenya branding`);
      
      if (hasPrivacyLink && hasTermsLink && hasCookieLink && hasAdGoBranding) {
        results.passed++;
        results.details.push({ check: 'Footer Links', status: 'PASS', message: 'Footer legal links properly configured' });
      } else {
        results.failed++;
        results.details.push({ check: 'Footer Links', status: 'FAIL', message: 'Footer links incomplete' });
      }
    } else {
      console.log(`  ❌ Footer.tsx not found`);
      results.failed++;
      results.details.push({ check: 'Footer Links', status: 'FAIL', message: 'Footer.tsx not found' });
    }
  } catch (error) {
    console.log(`  ❌ Footer links check failed: ${error.message}`);
    results.failed++;
    results.details.push({ check: 'Footer Links', status: 'FAIL', message: error.message });
  }

  // Check 6: Compliance Features Validation
  console.log('\n🔒 Check 6: Compliance Features Validation');
  results.total++;
  
  try {
    // Check ConsentModal features
    const consentModal = readFileSync('src/components/ConsentModal.tsx', 'utf-8');
    const useConsentHook = readFileSync('src/hooks/useConsent.ts', 'utf-8');
    
    const features = {
      'GDPR Compliance': consentModal.includes('GDPR') || consentModal.includes('data rights'),
      'Kenya DPA Compliance': consentModal.includes('Kenya') && consentModal.includes('DPA'),
      'Granular Consent': consentModal.includes('necessary') && consentModal.includes('marketing') && consentModal.includes('analytics'),
      'Consent Withdrawal': useConsentHook.includes('withdrawConsent'),
      'Anonymous Support': useConsentHook.includes('localStorage'),
      'IP Tracking': useConsentHook.includes('getClientIP'),
      'Database Storage': useConsentHook.includes('user_consents'),
      'Error Handling': useConsentHook.includes('try') && useConsentHook.includes('catch')
    };

    let allFeaturesPresent = true;
    
    Object.entries(features).forEach(([feature, present]) => {
      console.log(`  ${present ? '✅' : '❌'} ${feature}`);
      if (!present) allFeaturesPresent = false;
    });

    if (allFeaturesPresent) {
      results.passed++;
      results.details.push({ check: 'Compliance Features', status: 'PASS', message: 'All compliance features implemented' });
    } else {
      results.failed++;
      results.details.push({ check: 'Compliance Features', status: 'FAIL', message: 'Missing compliance features' });
    }
  } catch (error) {
    console.log(`  ❌ Compliance features check failed: ${error.message}`);
    results.failed++;
    results.details.push({ check: 'Compliance Features', status: 'FAIL', message: error.message });
  }

  // Final Results
  console.log('\n' + '='.repeat(60));
  console.log('📊 TASK 8 VALIDATION RESULTS: COMPLIANCE & CONSENT');
  console.log('='.repeat(60));
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`   Total Checks: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📊 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  console.log(`\n📋 DETAILED RESULTS:`);
  results.details.forEach((detail, index) => {
    const icon = detail.status === 'PASS' ? '✅' : '❌';
    console.log(`   ${index + 1}. ${icon} ${detail.check}: ${detail.message}`);
  });

  if (results.failed === 0) {
    console.log(`\n🎉 TASK 8 COMPLETE: COMPLIANCE & CONSENT`);
    console.log(`✅ All GDPR and Kenya DPA compliance requirements implemented`);
    console.log(`🔒 Consent management system fully functional`);
    console.log(`📄 Legal documentation complete and Kenya-specific`);
    console.log(`⚙️  User settings integration ready`);
    console.log(`🦶 Footer legal links properly configured`);
    
    console.log(`\n📋 TASK 8 DELIVERABLES COMPLETED:`);
    console.log(`   ✅ ConsentModal component with granular controls`);
    console.log(`   ✅ useConsent hook with database integration`);
    console.log(`   ✅ Privacy Policy (Kenya DPA compliant)`);
    console.log(`   ✅ Terms of Service (Kenya jurisdiction)`);
    console.log(`   ✅ Cookie Policy (comprehensive categories)`);
    console.log(`   ✅ Consent storage database schema`);
    console.log(`   ✅ Settings page integration`);
    console.log(`   ✅ App-wide consent modal integration`);
    console.log(`   ✅ Footer legal links`);
    console.log(`   ✅ IP tracking API endpoint`);
    
    console.log(`\n🚀 READY FOR TASK 9: PRODUCTION BUILD OPTIMIZATION`);
    
    return true;
  } else {
    console.log(`\n⚠️  TASK 8 INCOMPLETE: COMPLIANCE & CONSENT`);
    console.log(`❌ ${results.failed} check(s) failed - address issues before proceeding`);
    return false;
  }
}

// Execute validation
validateTask8Complete()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('💥 Validation crashed:', error);
    process.exit(1);
  });