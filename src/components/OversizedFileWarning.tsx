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

export default function OversizedFileWarning({ file }: { file: File }) {
  if (file.size <= 50 * 1024 * 1024) return null; // 50 MB
  return (
    <div className="p-3 bg-red-100 border border-red-400 rounded text-red-800">
      File {file.name} is too large ({(file.size / 1024 / 1024).toFixed(2)} MB).
      Max allowed size is 50 MB.
    </div>
  );
}