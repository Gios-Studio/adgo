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

import { useRouter } from "next/router"; // ✅ replace react-router-dom
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Ad {
  id: string;
  title: string;
  media_url: string;
}

export default function AdDisplayScreen({ ads }: { ads: Ad[] }) {
  const router = useRouter(); // ✅ Next.js router

  const handleNavigate = (path: string) => {
    router.push(path); // ✅ replaces useNavigate()
  };

  return (
    <div>
      {/* Example navigation button */}
      <button
        onClick={() => handleNavigate("/dashboard")}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Go to Dashboard
      </button>

      {/* Your ad display UI */}
      {ads.map((ad) => (
        <div key={ad.id} className="p-4 border-b">
          <h2>{ad.title}</h2>
          <video src={ad.media_url} controls className="w-full" />
        </div>
      ))}
    </div>
  );
}