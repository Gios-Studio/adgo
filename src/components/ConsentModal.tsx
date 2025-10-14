import React, { useState, useEffect } from 'react';
import { X, Shield, Eye, Target, Cog } from 'lucide-react';
import { useConsent } from '@/hooks/useConsent';

interface ConsentData {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ isOpen, onClose }) => {
  const { saveConsent } = useConsent();
  const [consents, setConsents] = useState<ConsentData>({
    marketing: false,
    analytics: false,
    functional: true,
    necessary: true,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleAcceptAll = async () => {
    setSaving(true);
    const allConsents = {
      marketing: true,
      analytics: true,
      functional: true,
      necessary: true,
    };
    
    const success = await saveConsent(allConsents);
    if (success) {
      onClose();
    }
    setSaving(false);
  };

  const handleAcceptSelected = async () => {
    setSaving(true);
    const success = await saveConsent(consents);
    if (success) {
      onClose();
    }
    setSaving(false);
  };

  const handleRejectAll = async () => {
    setSaving(true);
    const minimalConsents = {
      marketing: false,
      analytics: false,
      functional: false,
      necessary: true,
    };
    
    const success = await saveConsent(minimalConsents);
    if (success) {
      onClose();
    }
    setSaving(false);
  };

  const handleConsentChange = (type: keyof ConsentData, value: boolean) => {
    // Necessary cookies cannot be disabled
    if (type === 'necessary') return;
    
    setConsents(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-2">🍪</div>
            <h2 className="text-2xl font-bold text-gray-800">Privacy & Cookie Consent</h2>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              AdGo respects your privacy and is committed to protecting your personal data. 
              We use cookies and similar technologies to enhance your experience and provide personalized advertising.
            </p>
            
            <p className="text-gray-700 mb-4">
              This notice complies with Kenya&apos;s Data Protection Act (Kenya DPA) 2019 and GDPR requirements. 
              Please review and customize your consent preferences below.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {/* Necessary Cookies */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">Strictly Necessary Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Essential for the website to function properly. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consents.necessary}
                  disabled
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Used for: Authentication, security, load balancing, and core website functionality.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">Functional Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Enable enhanced functionality and personalization.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consents.functional}
                  onChange={(e) => handleConsentChange('functional', e.target.checked)}
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Used for: Language preferences, dashboard customization, and user settings.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Help us understand how you interact with our platform.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consents.analytics}
                  onChange={(e) => handleConsentChange('analytics', e.target.checked)}
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Used for: Page views, click tracking, performance monitoring, and usage analytics.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">Marketing Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Used to deliver relevant advertising and measure campaign effectiveness.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={consents.marketing}
                  onChange={(e) => handleConsentChange('marketing', e.target.checked)}
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-gray-500">
                Used for: Ad personalization, campaign tracking, and cross-platform advertising.
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Your Data Rights</h4>
            <p className="text-sm text-blue-700">
              You have the right to access, correct, delete, or port your personal data. 
              You can withdraw consent at any time in your account settings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              disabled={saving}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
            >
              {saving ? 'Saving...' : 'Accept All'}
            </button>
            <button
              onClick={handleAcceptSelected}
              disabled={saving}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
            <button
              onClick={handleRejectAll}
              disabled={saving}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-semibold"
            >
              {saving ? 'Saving...' : 'Decline All'}
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            {' • '}
            <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a>
            {' • '}
            <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentModal;