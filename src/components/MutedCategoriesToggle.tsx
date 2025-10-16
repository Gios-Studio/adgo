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

import { useEffect, useState } from "react";
import { getMuted, toggleMute } from "@/lib/mute";

const CATEGORIES = ["coffee", "fashion", "music", "airport", "groceries"];

export default function MutedCategoriesToggle() {
  const [muted, setMuted] = useState<string[]>([]);
  useEffect(() => setMuted(getMuted()), []);

  return (
    <div>
      <h3 className="font-semibold mb-2">Mute ad categories</h3>
      <ul className="grid grid-cols-2 gap-2">
        {CATEGORIES.map(cat => {
          const isOn = muted.includes(cat);
          return (
            <li key={cat}>
              <button
                className={`rounded px-3 py-2 border ${isOn ? "opacity-60" : ""}`}
                onClick={() => { toggleMute(cat); setMuted(getMuted()); }}
                aria-pressed={isOn}
              >
                {isOn ? "Unmute " : "Mute "}{cat}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}