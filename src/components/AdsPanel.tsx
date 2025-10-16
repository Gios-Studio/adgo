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

// src/components/AdsPanel.tsx
import { isMuted } from "@/lib/mute";
import UtilityAd from "@/components/UtilityAd";

type Ad = { id: string; title: string; body: string; category: string };
export default function AdsPanel({ rideId, allAds }: { rideId: string; allAds: Ad[] }) {
  const eligibleAds = allAds.filter(a => !isMuted(a.category)); // <- your line

  if (eligibleAds.length === 0) return null;

  // render the first eligible (frequency cap will still gate it)
  const ad = eligibleAds[0];
  return <UtilityAd rideId={rideId} ad={ad} />;
}