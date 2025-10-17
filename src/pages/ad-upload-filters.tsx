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

// src/pages/AdUploadFilters.tsx
import React from "react";

export interface AdUploadFiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  duration: string;
  onDurationChange: (value: string) => void;
}

export default function AdUploadFilters({
  selectedCategory,
  onCategoryChange,
  duration,
  onDurationChange,
}: AdUploadFiltersProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Ad Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select a category</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="tech">Tech</option>
          <option value="retail">Retail</option>
          <option value="auto">Automotive</option>
        </select>
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Ad Duration
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => onDurationChange(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select duration</option>
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>
      </div>
    </div>
  );
}