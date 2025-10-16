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

/**
 * AdGo SDK Internationalization (i18n) Module
 * Provides multi-language support with regional preferences
 */

export interface LocaleConfig {
  locale: string;
  region: string;
  currency: string;
  timezone: string;
  rtl?: boolean;
}

export interface Translation {
  [key: string]: string | Translation;
}

export interface TranslationMap {
  [locale: string]: Translation;
}

const LOCALE_CONFIGS: Record<string, LocaleConfig> = {
  'en-US': {
    locale: 'en-US',
    region: 'us-east-1',
    currency: 'USD',
    timezone: 'America/New_York'
  },
  'en-GB': {
    locale: 'en-GB',
    region: 'eu-west-1',
    currency: 'GBP',
    timezone: 'Europe/London'
  },
  'fr-FR': {
    locale: 'fr-FR',
    region: 'eu-west-1',
    currency: 'EUR',
    timezone: 'Europe/Paris'
  },
  'ar-SA': {
    locale: 'ar-SA',
    region: 'af-south-1',
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    rtl: true
  },
  'en-ZA': {
    locale: 'en-ZA',
    region: 'af-south-1',
    currency: 'ZAR',
    timezone: 'Africa/Johannesburg'
  }
};

class AdGoI18n {
  private currentLocale: string = 'en-US';
  private translations: TranslationMap = {};
  private fallbackLocale: string = 'en-US';
  private loadedLocales: Set<string> = new Set();

  constructor(initialLocale?: string) {
    this.currentLocale = initialLocale || this.detectBrowserLocale();
    this.loadTranslations(this.currentLocale);
  }

  /**
   * Detect browser locale with fallback
   */
  private detectBrowserLocale(): string {
    if (typeof navigator === 'undefined') return 'en-US';

    const browserLocales = [
      navigator.language,
      ...navigator.languages
    ];

    for (const locale of browserLocales) {
      const normalizedLocale = this.normalizeLocale(locale);
      if (LOCALE_CONFIGS[normalizedLocale]) {
        return normalizedLocale;
      }
    }

    return 'en-US';
  }

  /**
   * Normalize locale string (e.g., 'en-us' -> 'en-US')
   */
  private normalizeLocale(locale: string): string {
    const parts = locale.split('-');
    if (parts.length === 2) {
      return `${parts[0].toLowerCase()}-${parts[1].toUpperCase()}`;
    }
    
    // Map language-only codes to full locales
    const languageMap: Record<string, string> = {
      'en': 'en-US',
      'fr': 'fr-FR',
      'ar': 'ar-SA'
    };
    
    return languageMap[parts[0]] || locale;
  }

  /**
   * Load translations for a specific locale
   */
  private async loadTranslations(locale: string): Promise<void> {
    if (this.loadedLocales.has(locale)) return;

    try {
      // In a real implementation, this would fetch from a CDN or API
      const response = await fetch(`/locales/${locale}.json`);
      if (response.ok) {
        this.translations[locale] = await response.json();
        this.loadedLocales.add(locale);
      } else {
        console.warn(`Failed to load translations for ${locale}`);
      }
    } catch (error) {
      console.warn(`Error loading translations for ${locale}:`, error);
      
      // Use embedded fallback translations
      if (locale === 'en-US' && !this.loadedLocales.has('en-US')) {
        this.translations['en-US'] = this.getEmbeddedEnglishTranslations();
        this.loadedLocales.add('en-US');
      }
    }
  }

  /**
   * Get embedded English translations as fallback
   */
  private getEmbeddedEnglishTranslations(): Translation {
    return {
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        retry: 'Retry'
      },
      sdk: {
        initialization: {
          starting: 'AdGo SDK initializing...',
          success: 'AdGo SDK ready',
          failed: 'AdGo SDK initialization failed'
        },
        license: {
          invalid: 'Invalid license key',
          expired: 'License has expired',
          limit_exceeded: 'Usage limit exceeded'
        }
      }
    };
  }

  /**
   * Set current locale and load translations
   */
  public async setLocale(locale: string): Promise<void> {
    const normalizedLocale = this.normalizeLocale(locale);
    
    if (!LOCALE_CONFIGS[normalizedLocale]) {
      console.warn(`Unsupported locale: ${locale}, falling back to ${this.fallbackLocale}`);
      return;
    }

    this.currentLocale = normalizedLocale;
    await this.loadTranslations(normalizedLocale);

    // Trigger locale change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adgo:locale-changed', {
        detail: { locale: normalizedLocale }
      }));
    }
  }

  /**
   * Get translation for a key with interpolation support
   */
  public t(key: string, params?: Record<string, any>): string {
    let translation = this.getTranslation(key, this.currentLocale);
    
    // Fallback to English if translation not found
    if (!translation && this.currentLocale !== this.fallbackLocale) {
      translation = this.getTranslation(key, this.fallbackLocale);
    }

    // Final fallback to key itself
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    // Interpolate parameters
    if (params) {
      return this.interpolate(translation, params);
    }

    return translation;
  }

  /**
   * Get translation from nested object structure
   */
  private getTranslation(key: string, locale: string): string | null {
    const translations = this.translations[locale];
    if (!translations) return null;

    const keys = key.split('.');
    let current: any = translations;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return null;
      }
    }

    return typeof current === 'string' ? current : null;
  }

  /**
   * Interpolate parameters in translation string
   */
  private interpolate(template: string, params: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  }

  /**
   * Get current locale configuration
   */
  public getLocaleConfig(): LocaleConfig {
    return LOCALE_CONFIGS[this.currentLocale] || LOCALE_CONFIGS['en-US'];
  }

  /**
   * Get current locale string
   */
  public getCurrentLocale(): string {
    return this.currentLocale;
  }

  /**
   * Check if current locale is RTL
   */
  public isRTL(): boolean {
    return this.getLocaleConfig().rtl || false;
  }

  /**
   * Format currency according to locale
   */
  public formatCurrency(amount: number): string {
    const config = this.getLocaleConfig();
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency
      }).format(amount);
    } catch (error) {
      console.warn('Currency formatting failed:', error);
      return `${config.currency} ${amount.toFixed(2)}`;
    }
  }

  /**
   * Format date according to locale
   */
  public formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
    const config = this.getLocaleConfig();
    
    try {
      return new Intl.DateTimeFormat(config.locale, {
        timeZone: config.timezone,
        ...options
      }).format(date);
    } catch (error) {
      console.warn('Date formatting failed:', error);
      return date.toISOString();
    }
  }

  /**
   * Format number according to locale
   */
  public formatNumber(number: number, options?: Intl.NumberFormatOptions): string {
    const config = this.getLocaleConfig();
    
    try {
      return new Intl.NumberFormat(config.locale, options).format(number);
    } catch (error) {
      console.warn('Number formatting failed:', error);
      return number.toString();
    }
  }

  /**
   * Get available locales
   */
  public getAvailableLocales(): LocaleConfig[] {
    return Object.values(LOCALE_CONFIGS);
  }

  /**
   * Preload translations for multiple locales
   */
  public async preloadLocales(locales: string[]): Promise<void> {
    const promises = locales.map(locale => this.loadTranslations(locale));
    await Promise.all(promises);
  }

  /**
   * Get regional preferences based on locale
   */
  public getRegionalPreferences(): {
    dateFormat: string;
    timeFormat: string;
    weekStartsOn: number;
    decimalSeparator: string;
    thousandsSeparator: string;
  } {
    const locale = this.currentLocale;
    
    // Regional preferences mapping
    const preferences: Record<string, any> = {
      'en-US': {
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12',
        weekStartsOn: 0, // Sunday
        decimalSeparator: '.',
        thousandsSeparator: ','
      },
      'en-GB': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24',
        weekStartsOn: 1, // Monday
        decimalSeparator: '.',
        thousandsSeparator: ','
      },
      'fr-FR': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24',
        weekStartsOn: 1, // Monday
        decimalSeparator: ',',
        thousandsSeparator: ' '
      },
      'ar-SA': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '12',
        weekStartsOn: 6, // Saturday
        decimalSeparator: '.',
        thousandsSeparator: ','
      },
      'en-ZA': {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24',
        weekStartsOn: 1, // Monday
        decimalSeparator: '.',
        thousandsSeparator: ' '
      }
    };

    return preferences[locale] || preferences['en-US'];
  }
}

// Singleton instance
let i18nInstance: AdGoI18n | null = null;

/**
 * Get or create i18n instance
 */
export function getI18n(initialLocale?: string): AdGoI18n {
  if (!i18nInstance) {
    i18nInstance = new AdGoI18n(initialLocale);
  }
  return i18nInstance;
}

/**
 * Convenience function for translation
 */
export function t(key: string, params?: Record<string, any>): string {
  return getI18n().t(key, params);
}

/**
 * React hook for translations (if using React)
 */
export function useTranslation() {
  const i18n = getI18n();
  
  return {
    t: (key: string, params?: Record<string, any>) => i18n.t(key, params),
    locale: i18n.getCurrentLocale(),
    setLocale: (locale: string) => i18n.setLocale(locale),
    isRTL: i18n.isRTL(),
    formatCurrency: (amount: number) => i18n.formatCurrency(amount),
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => i18n.formatDate(date, options),
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) => i18n.formatNumber(number, options)
  };
}

export default AdGoI18n;