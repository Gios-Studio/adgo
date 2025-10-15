/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

// Environment variable validation for production builds
// Validates all required environment variables are present

interface EnvValidation {
  isValid: boolean;
  missingVars: string[];
  warnings: string[];
  summary: string;
}

export function validateEnvironment(): EnvValidation {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const optionalVars = [
    'NEXT_PUBLIC_BUILDER_API_KEY',
    'NEXT_PUBLIC_BUILDER_PROJECT_ID'
  ];

  const missingVars: string[] = [];
  const warnings: string[] = [];

  // Check required environment variables
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  // Check optional variables and warn if missing
  optionalVars.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(`Optional variable missing: ${varName}`);
    }
  });

  // Validate Supabase URL format
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.startsWith('https://') && !supabaseUrl.includes('.supabase.co')) {
    warnings.push('NEXT_PUBLIC_SUPABASE_URL format may be incorrect');
  }

  // Validate JWT key format
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (anonKey && !anonKey.startsWith('eyJ')) {
    warnings.push('NEXT_PUBLIC_SUPABASE_ANON_KEY format may be incorrect');
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey && !serviceKey.startsWith('eyJ')) {
    warnings.push('SUPABASE_SERVICE_ROLE_KEY format may be incorrect');
  }

  const isValid = missingVars.length === 0;
  const summary = isValid 
    ? `✅ All ${requiredVars.length} required environment variables are present`
    : `❌ Missing ${missingVars.length} required environment variables`;

  return {
    isValid,
    missingVars,
    warnings,
    summary
  };
}

// Runtime check for client-side environment variables
export function validateClientEnvironment(): EnvValidation {
  const clientVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];

  const missingVars: string[] = [];
  const warnings: string[] = [];

  clientVars.forEach(varName => {
    if (typeof window !== 'undefined' && !process.env[varName]) {
      missingVars.push(varName);
    }
  });

  const isValid = missingVars.length === 0;
  const summary = isValid 
    ? `✅ Client environment variables validated`
    : `❌ Missing client environment variables: ${missingVars.join(', ')}`;

  return {
    isValid,
    missingVars,
    warnings,
    summary
  };
}

// Build-time validation utility
export function logEnvironmentStatus(): void {
  const validation = validateEnvironment();
  
  console.log('\n🔧 Environment Validation:');
  console.log(validation.summary);
  
  if (validation.missingVars.length > 0) {
    console.error('❌ Missing required variables:');
    validation.missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
  }
  
  if (validation.warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    validation.warnings.forEach(warning => {
      console.warn(`   - ${warning}`);
    });
  }
  
  if (validation.isValid) {
    console.log('✅ Environment is production ready!');
  } else {
    console.error('❌ Environment validation failed - fix missing variables before deployment');
  }
}