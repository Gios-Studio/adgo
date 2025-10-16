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

export const BLOCKED_CATEGORIES = ["political", "adult", "gambling", "weapons"];
export const BLOCKED_KEYWORDS = [
  "election", "vote", "manifesto", "xxx", "porn", "escort", "casino", "betting", "firearm", "ammo"
];

export function validateCreative(input: { category?: string; title: string; body?: string }) {
  const errs: string[] = [];

  if (input.category && BLOCKED_CATEGORIES.includes(input.category.toLowerCase())) {
    errs.push(`Category '${input.category}' is not allowed on AdGo.`);
  }

  const blob = `${input.title} ${(input.body || "")}`.toLowerCase();
  const hits = BLOCKED_KEYWORDS.filter(k => blob.includes(k));
  if (hits.length) errs.push(`Contains prohibited terms: ${hits.join(", ")}`);

  return { ok: errs.length === 0, errors: errs };
}