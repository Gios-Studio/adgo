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
 * Generated: 2025-10-15 04:38:36 UTC
 */

// pages/_app.tsx
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { builder, BuilderComponent } from "@builder.io/react";
import ConsentModal from "@/components/ConsentModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useConsent } from "@/hooks/useConsent";
import { validateClientEnvironment } from "@/lib/envValidation";
import { useEffect } from "react";

// ✅ Initialize Builder.io only once
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY || "af2d418e03484a10b50b332058b99748");

function ConsentWrapper() {
  const { showConsentModal } = useConsent();
  
  return (
    <ConsentModal 
      isOpen={showConsentModal} 
      onClose={() => {}} // ConsentModal handles its own closing via useConsent
    />
  );
}

function EnvironmentValidator() {
  useEffect(() => {
    // Validate client environment on mount
    const validation = validateClientEnvironment();
    if (!validation.isValid) {
      console.error('❌ Client environment validation failed:', validation.missingVars);
    }
  }, []);
  
  return null;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      {/* ✅ Environment validation */}
      <EnvironmentValidator />
      
      {/* ✅ Optional Builder global layout */}
      <BuilderComponent model="layout" content={pageProps?.builderContent} />

      {/* ✅ Page-level content */}
      <Component {...pageProps} />

      {/* ✅ GDPR/Kenya DPA Consent Modal */}
      <ConsentWrapper />

      {/* ✅ Toast notifications with error-friendly positioning */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}