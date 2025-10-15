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

// Text Ad Types for AdGo
// Supports both media and text-based advertisements with language localization

export type AdLanguage = 'en' | 'sw' | 'fr' | 'ar';

export type AdType = 'media' | 'text';

export interface TextStyle {
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: 'normal' | 'bold' | '500' | '600' | '700';
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
  padding?: string;
}

export interface BaseAd {
  id: string;
  title: string;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  user_id: string;
  campaign_id?: string;
  language: AdLanguage;
  ad_type: AdType;
  created_at: string;
  updated_at: string;
}

export interface MediaAd extends BaseAd {
  ad_type: 'media';
  media_url: string;
  ad_text?: never;
  cta_link?: never;
  text_style?: never;
}

export interface TextAd extends BaseAd {
  ad_type: 'text';
  ad_text: string; // Max 180 characters
  cta_link?: string;
  text_style: TextStyle;
  media_url?: never;
}

export type Ad = MediaAd | TextAd;

// Language display mappings
export const LANGUAGE_LABELS: Record<AdLanguage, string> = {
  en: 'English',
  sw: 'Kiswahili',
  fr: 'Français',
  ar: 'العربية'
};

// Language codes to locale mappings
export const LANGUAGE_LOCALES: Record<AdLanguage, string> = {
  en: 'en-US',
  sw: 'sw-KE',
  fr: 'fr-FR',
  ar: 'ar-SA'
};

// Default text styles for different languages
export const DEFAULT_TEXT_STYLES: Record<AdLanguage, TextStyle> = {
  en: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'left',
    borderRadius: '8px',
    padding: '16px'
  },
  sw: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'left',
    borderRadius: '8px',
    padding: '16px'
  },
  fr: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'left',
    borderRadius: '8px',
    padding: '16px'
  },
  ar: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    fontSize: '16px',
    fontWeight: 'normal',
    textAlign: 'right', // RTL for Arabic
    borderRadius: '8px',
    padding: '16px'
  }
};

// Text ad validation
export interface TextAdValidation {
  isValid: boolean;
  errors: string[];
}

export function validateTextAd(ad: Partial<TextAd>): TextAdValidation {
  const errors: string[] = [];

  // Check ad_text length
  if (!ad.ad_text || ad.ad_text.trim().length === 0) {
    errors.push('Ad text is required for text advertisements');
  } else if (ad.ad_text.length > 180) {
    errors.push('Ad text cannot exceed 180 characters');
  }

  // Check language
  if (!ad.language || !Object.keys(LANGUAGE_LABELS).includes(ad.language)) {
    errors.push('Valid language selection is required (en, sw, fr, ar)');
  }

  // Check CTA link if provided
  if (ad.cta_link && ad.cta_link.trim().length > 0) {
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(ad.cta_link)) {
      errors.push('CTA link must be a valid URL starting with http:// or https://');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Text ad display component props
export interface TextAdDisplayProps {
  ad: TextAd;
  onClick?: () => void;
  className?: string;
  maxWidth?: string;
}

// Text ad creation form data
export interface TextAdFormData {
  title: string;
  ad_text: string;
  language: AdLanguage;
  cta_link?: string;
  text_style: TextStyle;
}

// Analytics for text ads
export interface TextAdAnalytics {
  language: AdLanguage;
  total_text_ads: number;
  active_text_ads: number;
  avg_text_length: number;
  ads_with_cta: number;
}

// Localized ad fetching
export interface LocalizedAdsParams {
  language?: AdLanguage;
  ad_type?: AdType;
  limit?: number;
}

export interface LocalizedAdsResponse {
  ads: Ad[];
  total: number;
  language: AdLanguage;
}

// Character counter for text input
export interface CharacterCounter {
  current: number;
  max: number;
  remaining: number;
  percentage: number;
  isOverLimit: boolean;
}

export function getCharacterCounter(text: string, maxLength: number = 180): CharacterCounter {
  const current = text.length;
  const remaining = maxLength - current;
  const percentage = (current / maxLength) * 100;
  
  return {
    current,
    max: maxLength,
    remaining,
    percentage,
    isOverLimit: current > maxLength
  };
}

// Language direction for RTL support
export function getLanguageDirection(language: AdLanguage): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

// Get localized placeholder text
export const AD_TEXT_PLACEHOLDERS: Record<AdLanguage, string> = {
  en: 'Enter your advertisement text here (max 180 characters)...',
  sw: 'Ingiza maandishi ya tangazo lako hapa (kimo cha herufi 180)...',
  fr: 'Saisissez le texte de votre publicité ici (max 180 caractères)...',
  ar: 'أدخل نص إعلانك هنا (بحد أقصى 180 حرف)...'
};

// CTA button text translations
export const CTA_BUTTON_TEXT: Record<AdLanguage, string> = {
  en: 'Learn More',
  sw: 'Jifunze Zaidi',
  fr: 'En Savoir Plus',
  ar: 'اقرأ المزيد'
};