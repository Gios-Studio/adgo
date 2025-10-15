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

import { getFlags, setFlag } from "@/lib/flags";
import { useEffect, useState } from "react";

export function FlagsPanel() {
  const [f, setF] = useState(getFlags());

  useEffect(() => setF(getFlags()), []);

  return (
    <div className="border rounded p-3 space-y-2">
      {Object.entries(f).map(([k, v]) => (
        <label key={k} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!v}
            onChange={(e) => {
              setFlag(k as any, e.target.checked);
              setF(getFlags());
            }}
          />
          <span>{k}</span>
        </label>
      ))}
    </div>
  );
}