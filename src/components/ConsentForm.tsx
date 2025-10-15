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
 * Generated: 2025-10-15 04:38:34 UTC
 */

// components/ConsentForm.tsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ConsentForm({ userId }: { userId: string }) {
  const [consent, setConsent] = useState(false);

  const handleConsent = async () => {
    await supabase.from("profiles")
      .update({ consent_given: true, consent_timestamp: new Date().toISOString() })
      .eq("id", userId);
    setConsent(true);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-bold">Data Consent</h2>
      {consent ? (
        <p className="text-green-600">✅ Consent granted</p>
      ) : (
        <button onClick={handleConsent} className="bg-blue-600 text-white px-4 py-2 rounded">
          Agree & Continue
        </button>
      )}
    </div>
  );
}