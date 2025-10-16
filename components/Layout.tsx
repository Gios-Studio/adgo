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
 * Generated: 2025-10-15 04:38:33 UTC
 */

import Link from "next/link";
import { useRouter } from "next/router";

const navigationLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/adupload", label: "Ad Upload" },
  { href: "/analytics", label: "Analytics" },
  { href: "/wallet", label: "Wallet" },
  { href: "/settings", label: "Settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              {navigationLinks.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ease-in-out
                      border-b-2 hover:border-green-500 focus:outline-none focus:border-green-500
                      ${
                        isActive
                          ? "border-green-600 text-green-700"
                          : "border-transparent text-gray-700 hover:text-green-600 hover:underline"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}