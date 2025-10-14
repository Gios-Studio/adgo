#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

console.log('🔧 Fixing ESLint issues...\n');

// Fix React unescaped entities
const fixUnescapedEntities = (content) => {
  return content
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;");
};

// Files to fix
const filesToFix = [
  'src/components/Testimonials.tsx',
  'src/pages/Landing.tsx', 
  'src/pages/Waitlist.tsx'
];

let fixedCount = 0;

for (const file of filesToFix) {
  try {
    console.log(`Fixing ${file}...`);
    let content = readFileSync(file, 'utf8');
    
    // Only fix unescaped quotes in text content (not attributes)
    if (file.includes('Testimonials.tsx')) {
      content = content.replace(
        /"AdGo has revolutionized how we think about advertising."/,
        "&quot;AdGo has revolutionized how we think about advertising.&quot;"
      );
      content = content.replace(
        /"The efficiency gains are remarkable."/,
        "&quot;The efficiency gains are remarkable.&quot;"
      );
    }
    
    if (file.includes('Landing.tsx')) {
      content = content.replace(/world's/g, "world&apos;s");
      content = content.replace(/advertiser's/g, "advertiser&apos;s");
      content = content.replace(/driver's/g, "driver&apos;s");
      content = content.replace(/campaigns'/g, "campaigns&apos;");
    }
    
    if (file.includes('Waitlist.tsx')) {
      content = content.replace(/we're/g, "we&apos;re");
      content = content.replace(/you're/g, "you&apos;re");
      content = content.replace(/don't/g, "don&apos;t");
    }
    
    writeFileSync(file, content, 'utf8');
    fixedCount++;
    console.log(`✅ Fixed ${file}`);
  } catch (error) {
    console.log(`❌ Error fixing ${file}: ${error.message}`);
  }
}

// Fix empty interfaces
const fixEmptyInterfaces = (file) => {
  try {
    let content = readFileSync(file, 'utf8');
    
    // Fix empty interface extending React props
    content = content.replace(
      /interface\s+\w+Props\s+extends\s+[^{]+{\s*}/g,
      'type $&Props = React.ComponentProps<"$1">'
    );
    
    writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed empty interfaces in ${file}`);
  } catch (error) {
    console.log(`❌ Error fixing interfaces in ${file}: ${error.message}`);
  }
};

// Fix tailwind.config.ts require statement
try {
  console.log('Fixing tailwind.config.ts...');
  let tailwindConfig = readFileSync('tailwind.config.ts', 'utf8');
  tailwindConfig = tailwindConfig.replace(
    'require("tailwindcss/defaultTheme")',
    'import("tailwindcss/defaultTheme")'
  );
  writeFileSync('tailwind.config.ts', tailwindConfig, 'utf8');
  console.log('✅ Fixed tailwind.config.ts');
  fixedCount++;
} catch (error) {
  console.log(`❌ Error fixing tailwind.config.ts: ${error.message}`);
}

console.log(`\n🎉 Fixed ${fixedCount} files with ESLint issues!`);
console.log('Some issues may require manual attention.');