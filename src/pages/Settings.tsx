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

import React from "react";
import Layout from "../../components/Layout";
import { FlagsPanel } from "@/components/FlagsPanel";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage feature flags and preferences here.</p>
        <FlagsPanel />
      </div>
    </Layout>
  );
}