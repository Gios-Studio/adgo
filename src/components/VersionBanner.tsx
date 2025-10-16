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

import React from 'react';
import { Badge } from 'lucide-react';

interface VersionBannerProps {
  className?: string;
  showBadge?: boolean;
}

export const VersionBanner: React.FC<VersionBannerProps> = ({ 
  className = '',
  showBadge = true 
}) => {
  const version = process.env.npm_package_version || '1.0.0-launch-ready';
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBadge && (
        <Badge size={16} className="text-blue-600" />
      )}
      <span className="text-sm font-medium text-gray-600">
        AdGo v{version}
      </span>
      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
        PILOT READY
      </span>
    </div>
  );
};

// Version display for footer
export const FooterVersion: React.FC = () => {
  return (
    <VersionBanner 
      className="justify-center py-2" 
      showBadge={false}
    />
  );
};

// Version display for header/navbar
export const HeaderVersion: React.FC = () => {
  return (
    <VersionBanner 
      className="ml-auto" 
      showBadge={true}
    />
  );
};

export default VersionBanner;