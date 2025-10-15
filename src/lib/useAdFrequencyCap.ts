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

// Simple, per-ride cap using sessionStorage
export function canShowAd(rideId: string): boolean {
  if (!rideId) return false;
  const key = "adgo_shown_rides";
  const shown: Record<string, true> = JSON.parse(sessionStorage.getItem(key) || "{}");
  return !shown[rideId];
}

export function markAdShown(rideId: string): void {
  if (!rideId) return;
  const key = "adgo_shown_rides";
  const shown: Record<string, true> = JSON.parse(sessionStorage.getItem(key) || "{}");
  shown[rideId] = true;
  sessionStorage.setItem(key, JSON.stringify(shown));
}