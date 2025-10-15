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

type Flags = {
  frequencyCapEnabled: boolean;
  muteCategoriesEnabled: boolean;
  driverWalletEnabled: boolean;
  blocklistValidationEnabled: boolean;
};
const DEFAULTS: Flags = {
  frequencyCapEnabled: true,
  muteCategoriesEnabled: true,
  driverWalletEnabled: true,
  blocklistValidationEnabled: true,
};
export function getFlags(): Flags {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("adgo_flags") || "{}") }; }
  catch { return DEFAULTS; }
}
export function setFlag<K extends keyof Flags>(k: K, v: Flags[K]) {
  const cur = getFlags(); (cur as any)[k] = v; localStorage.setItem("adgo_flags", JSON.stringify(cur));
}