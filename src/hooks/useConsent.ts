import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './useAuth';

interface ConsentData {
  marketing: boolean;
  analytics: boolean;
  functional: boolean;
  necessary: boolean;
}

interface ConsentRecord {
  id: string;
  user_id: string | null;
  consents: ConsentData;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
}

export const useConsent = () => {
  const [consentRecord, setConsentRecord] = useState<ConsentRecord | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    checkConsentStatus();
  }, [user]);

  const checkConsentStatus = async () => {
    setLoading(true);
    
    try {
      // Check localStorage first for anonymous users
      const localConsent = localStorage.getItem('adgo-consent');
      
      if (!user) {
        if (localConsent) {
          const parsedConsent = JSON.parse(localConsent);
          setConsentRecord(parsedConsent);
          setShowConsentModal(false);
        } else {
          setShowConsentModal(true);
        }
        setLoading(false);
        return;
      }

      // For authenticated users, check database
      const { data, error } = await supabase
        .from('user_consents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking consent:', error);
      }

      if (data) {
        setConsentRecord(data);
        setShowConsentModal(false);
      } else {
        setShowConsentModal(true);
      }
    } catch (error) {
      console.error('Consent check error:', error);
      setShowConsentModal(true);
    } finally {
      setLoading(false);
    }
  };

  const saveConsent = async (consents: ConsentData) => {
    try {
      const consentData = {
        user_id: user?.id || null,
        consents,
        ip_address: await getClientIP(),
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (user) {
        // Save to database for authenticated users
        const { data, error } = await supabase
          .from('user_consents')
          .upsert({
            user_id: user.id,
            consents,
            ip_address: consentData.ip_address,
            user_agent: consentData.user_agent,
          })
          .select()
          .single();

        if (error) throw error;
        setConsentRecord(data);
      } else {
        // Save to localStorage for anonymous users
        const localRecord = {
          id: `local-${Date.now()}`,
          ...consentData,
        };
        localStorage.setItem('adgo-consent', JSON.stringify(localRecord));
        setConsentRecord(localRecord);
      }

      setShowConsentModal(false);
      return true;
    } catch (error) {
      console.error('Error saving consent:', error);
      return false;
    }
  };

  const updateConsent = async (consents: ConsentData) => {
    if (!consentRecord) return false;
    return await saveConsent(consents);
  };

  const withdrawConsent = async () => {
    if (!user) {
      localStorage.removeItem('adgo-consent');
      setConsentRecord(null);
      setShowConsentModal(true);
      return true;
    }

    try {
      const { error } = await supabase
        .from('user_consents')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setConsentRecord(null);
      setShowConsentModal(true);
      return true;
    } catch (error) {
      console.error('Error withdrawing consent:', error);
      return false;
    }
  };

  const hasConsent = (type: keyof ConsentData): boolean => {
    if (!consentRecord) return false;
    return consentRecord.consents[type] === true;
  };

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('/api/get-client-ip');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch {
      return 'unknown';
    }
  };

  return {
    consentRecord,
    showConsentModal,
    loading,
    saveConsent,
    updateConsent,
    withdrawConsent,
    hasConsent,
    checkConsentStatus,
  };
};