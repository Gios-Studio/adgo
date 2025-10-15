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

import { useState } from "react";

export default function FrequencyCapToggle({
  initialValue = false,
  onChange,
}: {
  initialValue?: boolean;
  onChange?: (val: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(initialValue);

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => {
          setEnabled(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <span>Enable Frequency Cap</span>
    </label>
  );
}