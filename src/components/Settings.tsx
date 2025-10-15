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

import { getFlags, setFlag } from "@/lib/flags";
import { useEffect, useState } from "react";
import { useConsent } from "@/hooks/useConsent";
import ConsentModal from "./ConsentModal";
import { Shield, Eye, Target, Cog } from "lucide-react";

export function FlagsPanel() {
  const [f, setF] = useState(getFlags());
  useEffect(() => setF(getFlags()), []);
  return (
    <div className="border rounded p-3 space-y-2">
      {Object.entries(f).map(([k, v]) => (
        <label key={k} className="flex items-center gap-2">
          <input type="checkbox" checked={!!v} onChange={e => { setFlag(k as any, e.target.checked); setF(getFlags()); }} />
          <span>{k}</span>
        </label>
      ))}
    </div>
  );
}

export function ConsentSettings() {
  const { consentRecord, hasConsent, withdrawConsent, loading } = useConsent();
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  const handleWithdrawConsent = async () => {
    if (!confirm('Are you sure you want to withdraw all consent? This will reset your preferences to minimal settings.')) {
      return;
    }
    
    setWithdrawing(true);
    await withdrawConsent();
    setWithdrawing(false);
  };

  if (loading) {
    return (
      <div className="border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Consent Status Overview */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Cookie Preferences
        </h2>
        
        <p className="text-gray-600 mb-6">
          Manage your data privacy preferences and cookie settings. Changes take effect immediately.
        </p>

        {consentRecord ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Necessary Cookies */}
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-900">Necessary Cookies</h3>
                  <p className="text-sm text-green-700">Always enabled for core functionality</p>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-5 bg-green-500 rounded-full relative">
                    <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className={`flex items-start gap-3 p-4 border rounded-lg ${
                hasConsent('functional') ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <Cog className={`w-5 h-5 mt-0.5 ${hasConsent('functional') ? 'text-blue-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className={`font-medium ${hasConsent('functional') ? 'text-blue-900' : 'text-gray-700'}`}>
                    Functional Cookies
                  </h3>
                  <p className={`text-sm ${hasConsent('functional') ? 'text-blue-700' : 'text-gray-500'}`}>
                    Enhanced features and personalization
                  </p>
                </div>
                <div className="ml-auto">
                  <div className={`w-8 h-5 rounded-full relative ${
                    hasConsent('functional') ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-1 ${
                      hasConsent('functional') ? 'right-1' : 'left-1'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className={`flex items-start gap-3 p-4 border rounded-lg ${
                hasConsent('analytics') ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <Eye className={`w-5 h-5 mt-0.5 ${hasConsent('analytics') ? 'text-yellow-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className={`font-medium ${hasConsent('analytics') ? 'text-yellow-900' : 'text-gray-700'}`}>
                    Analytics Cookies
                  </h3>
                  <p className={`text-sm ${hasConsent('analytics') ? 'text-yellow-700' : 'text-gray-500'}`}>
                    Usage analytics and improvements
                  </p>
                </div>
                <div className="ml-auto">
                  <div className={`w-8 h-5 rounded-full relative ${
                    hasConsent('analytics') ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-1 ${
                      hasConsent('analytics') ? 'right-1' : 'left-1'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className={`flex items-start gap-3 p-4 border rounded-lg ${
                hasConsent('marketing') ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <Target className={`w-5 h-5 mt-0.5 ${hasConsent('marketing') ? 'text-purple-600' : 'text-gray-400'}`} />
                <div>
                  <h3 className={`font-medium ${hasConsent('marketing') ? 'text-purple-900' : 'text-gray-700'}`}>
                    Marketing Cookies
                  </h3>
                  <p className={`text-sm ${hasConsent('marketing') ? 'text-purple-700' : 'text-gray-500'}`}>
                    Personalized advertising
                  </p>
                </div>
                <div className="ml-auto">
                  <div className={`w-8 h-5 rounded-full relative ${
                    hasConsent('marketing') ? 'bg-purple-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-1 ${
                      hasConsent('marketing') ? 'right-1' : 'left-1'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consent Metadata */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Consent Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Last Updated:</strong> {new Date(consentRecord.created_at).toLocaleString()}</p>
                {consentRecord.ip_address && (
                  <p><strong>IP Address:</strong> {consentRecord.ip_address}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowConsentModal(true)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Update Preferences
              </button>
              <button
                onClick={handleWithdrawConsent}
                disabled={withdrawing}
                className="flex-1 border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 disabled:opacity-50 font-medium"
              >
                {withdrawing ? 'Withdrawing...' : 'Withdraw All Consent'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Consent Record Found</h3>
            <p className="text-gray-600 mb-4">
              You haven't set your privacy preferences yet. Click below to configure your cookie settings.
            </p>
            <button
              onClick={() => setShowConsentModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Set Privacy Preferences
            </button>
          </div>
        )}

        {/* Legal Links */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Learn more about our data practices:</p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
            >
              Cookie Policy
            </a>
            <a
              href="/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
      />
    </div>
  );
}