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

const KEY = "adgo_muted_categories";

export function getMuted(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function isMuted(category: string): boolean {
  return getMuted().includes(category.toLowerCase());
}

export function toggleMute(category: string) {
  const c = category.toLowerCase();
  const muted = new Set(getMuted());
  muted.has(c) ? muted.delete(c) : muted.add(c);
  localStorage.setItem(KEY, JSON.stringify(Array.from(muted)));
}