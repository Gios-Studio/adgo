#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('\n📋 AdGo Static Page Structure Verification\n');

const CRITICAL_PAGES = [
  { file: 'src/pages/index.tsx', route: '/', name: 'Home Page', type: 'tsx' },
  { file: 'src/pages/dashboard.tsx', route: '/dashboard', name: 'Dashboard', type: 'tsx' },
  { file: 'src/pages/analytics.tsx', route: '/analytics', name: 'Analytics', type: 'tsx' },
  { file: 'src/pages/adupload.tsx', route: '/adupload', name: 'Ad Upload', type: 'tsx' },
  { file: 'src/pages/wallet.tsx', route: '/wallet', name: 'Wallet', type: 'tsx' },
  { file: 'src/pages/settings.tsx', route: '/settings', name: 'Settings', type: 'tsx' },
  { file: 'src/pages/login.tsx', route: '/login', name: 'Login', type: 'tsx' },
  { file: 'src/pages/signup.tsx', route: '/signup', name: 'Signup', type: 'tsx' },
  
  // API endpoints
  { file: 'src/pages/api/health.ts', route: '/api/health', name: 'Health API', type: 'api' },
  { file: 'src/pages/api/metrics/ctr.ts', route: '/api/metrics/ctr', name: 'CTR API', type: 'api' },
  { file: 'src/pages/api/driver/wallet.ts', route: '/api/driver/wallet', name: 'Driver Wallet API', type: 'api' },
  { file: 'src/pages/api/sdk/events.ts', route: '/api/sdk/events', name: 'SDK Events API', type: 'api' },
];

const LAYOUT_FILES = [
  { file: 'components/Layout.tsx', name: 'Main Layout Component' },
  { file: 'src/pages/_app.tsx', name: 'Next.js App Component' },
  { file: 'src/pages/_document.tsx', name: 'Document Component' },
];

let results = [];

// Test file existence and basic structure
const testFile = (page) => {
  const filePath = join(process.cwd(), page.file);
  
  if (!existsSync(filePath)) {
    return {
      ...page,
      exists: false,
      valid: false,
      issues: ['File does not exist'],
    };
  }
  
  try {
    const content = readFileSync(filePath, 'utf8');
    const issues = [];
    let valid = true;
    
    // Check for basic React/Next.js patterns
    if (page.type === 'tsx') {
      if (!content.includes('export default')) {
        issues.push('Missing default export');
        valid = false;
      }
      
      if (!content.includes('return') && !content.includes('=>')) {
        issues.push('No JSX return found');
        valid = false;
      }
      
      // Check for Layout usage in pages
      if (page.file.includes('src/pages/') && !page.file.includes('_') && !content.includes('Layout')) {
        issues.push('Page not using Layout component');
      }
      
      // Check for imports
      if (!content.includes('import')) {
        issues.push('No imports found');
      }
    } else if (page.type === 'api') {
      if (!content.includes('export default')) {
        issues.push('Missing API handler export');
        valid = false;
      }
      
      if (!content.includes('req') && !content.includes('request')) {
        issues.push('No request parameter found');
        valid = false;
      }
    }
    
    // Check for basic TypeScript
    if (!content.includes('any') && content.includes(':')) {
      // Has some typing
    }
    
    return {
      ...page,
      exists: true,
      valid: issues.length === 0,
      issues,
      size: content.length,
      hasTypes: content.includes(': ') || content.includes('interface') || content.includes('type '),
    };
    
  } catch (error) {
    return {
      ...page,
      exists: true,
      valid: false,
      issues: [`Read error: ${error.message}`],
    };
  }
};

// Test critical pages
console.log('🧪 Testing Critical Pages...\n');

for (const page of CRITICAL_PAGES) {
  const result = testFile(page);
  results.push(result);
  
  const icon = result.valid ? '✅' : '❌';
  const existsFlag = result.exists ? '' : '[MISSING]';
  const typeInfo = result.hasTypes ? '[TS]' : '[JS]';
  
  console.log(`${icon} ${result.name} ${existsFlag} ${typeInfo}`);
  console.log(`   Route: ${result.route}`);
  console.log(`   File: ${result.file}`);
  
  if (result.issues.length > 0) {
    console.log(`   Issues: ${result.issues.join(', ')}`);
  } else if (result.exists) {
    console.log(`   Size: ${result.size} chars, Valid: ${result.valid}`);
  }
  console.log('');
}

// Test layout components
console.log('\n🏗️ Testing Layout Components...\n');

for (const layout of LAYOUT_FILES) {
  const result = testFile({ ...layout, type: 'tsx', route: 'N/A' });
  
  const icon = result.valid ? '✅' : result.exists ? '⚠️' : '❌';
  console.log(`${icon} ${result.name}`);
  console.log(`   File: ${result.file}`);
  
  if (result.issues.length > 0) {
    console.log(`   Issues: ${result.issues.join(', ')}`);
  } else if (result.exists) {
    console.log(`   Valid layout component`);
  }
  console.log('');
}

// Summary
console.log('\n📊 PAGE STRUCTURE SUMMARY');
console.log('═'.repeat(50));

const validPages = results.filter(r => r.valid).length;
const existingPages = results.filter(r => r.exists).length;
const totalPages = results.length;

console.log(`✅ Valid Pages: ${validPages}/${totalPages} (${Math.round(validPages/totalPages*100)}%)`);
console.log(`📁 Existing Pages: ${existingPages}/${totalPages} (${Math.round(existingPages/totalPages*100)}%)`);

const tsxPages = results.filter(r => r.type === 'tsx');
const apiPages = results.filter(r => r.type === 'api');
const validTsx = tsxPages.filter(r => r.valid).length;
const validApi = apiPages.filter(r => r.valid).length;

console.log(`🖥️ Valid UI Pages: ${validTsx}/${tsxPages.length}`);
console.log(`🔌 Valid API Pages: ${validApi}/${apiPages.length}`);

// Critical issues
const criticalIssues = results.filter(r => !r.exists || !r.valid);
if (criticalIssues.length > 0) {
  console.log('\n⚠️  Pages Needing Attention:');
  criticalIssues.forEach(issue => {
    console.log(`   • ${issue.name}: ${issue.issues?.join(', ') || 'Missing file'}`);
  });
}

if (validPages === totalPages) {
  console.log('\n🎉 ALL PAGES ARE PROPERLY STRUCTURED!');
  console.log('✅ File structure is production-ready.');
} else if (validPages / totalPages >= 0.9) {
  console.log('\n🟡 MOSTLY COMPLETE with minor structural issues.');
} else {
  console.log('\n⚠️  Significant structural issues detected.');
}

console.log('\n📋 Static verification complete.\n');