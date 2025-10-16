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
 * Generated: 2025-10-15 04:38:30 UTC
 */

/**
 * AdGo SDK for JavaScript/TypeScript
 * Enterprise-grade SDK with security, telemetry, and regional support
 * 
 * @version 1.0.0
 * @license MIT
 * @copyright 2025 AdGo Solutions
 */

/* Build Metadata - Injected during build process */
const BUILD_WATERMARK = '/* AdGo SDK v1.0.0 - Built on 2025-10-15T14:00:00Z */';
const BUILD_HASH = 'a1b2c3d4e5f6789abcdef1234567890';
const SDK_VERSION = '1.0.0';
const SDK_NAME = 'adgo-js-sdk';

interface AdGoConfig {
  licenseKey: string;
  region?: 'global' | 'eu' | 'africa' | 'asia' | 'americas';
  baseURL?: string;
  sandbox?: boolean;
  enableTelemetry?: boolean;
  offlineMode?: boolean;
  hmacSecret?: string;
  timeout?: number;
  retryAttempts?: number;
  debug?: boolean;
}

interface LicenseInfo {
  valid: boolean;
  license?: {
    id: string;
    plan: string;
    region: string;
    usage_count: number;
    usage_limit: number;
    remaining: number;
    expires_at?: string;
    metadata?: any;
  };
  token?: string;
  error?: string;
}

interface AdGoResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  rate_limited?: boolean;
  remaining_calls?: number;
}

type TelemetryEvent = {
  event_type: 'init' | 'api_call' | 'error' | 'feature_used';
  event_data: any;
  timestamp?: string;
};

class AdGoSDK {
  private config: AdGoConfig;
  private licenseCache: LicenseInfo | null = null;
  private cacheExpiry: number = 0;
  private sessionId: string;
  private telemetryQueue: TelemetryEvent[] = [];
  private offlineCache: Map<string, any> = new Map();
  private retryQueue: Array<() => Promise<any>> = [];
  
  // Regional endpoints
  private readonly REGIONAL_ENDPOINTS = {
    global: 'https://api.adgosolutions.com',
    eu: 'https://eu.api.adgosolutions.com',
    africa: 'https://africa.api.adgosolutions.com',
    asia: 'https://asia.api.adgosolutions.com',
    americas: 'https://americas.api.adgosolutions.com'
  };

  // Localization
  private readonly MESSAGES = {
    en: {
      license_invalid: 'Invalid license key',
      license_expired: 'License has expired',
      rate_limited: 'Rate limit exceeded',
      network_error: 'Network connection failed',
      unauthorized: 'Unauthorized access'
    },
    fr: {
      license_invalid: 'Clé de licence invalide',
      license_expired: 'La licence a expiré',
      rate_limited: 'Limite de taux dépassée',
      network_error: 'Échec de la connexion réseau',
      unauthorized: 'Accès non autorisé'
    },
    ar: {
      license_invalid: 'مفتاح الترخيص غير صالح',
      license_expired: 'انتهت صلاحية الترخيص',
      rate_limited: 'تم تجاوز حد المعدل',
      network_error: 'فشل الاتصال بالشبكة',
      unauthorized: 'وصول غير مصرح به'
    }
  };

  constructor(config: AdGoConfig) {
    if (!config.licenseKey) {
      throw new Error('License key is required');
    }

    this.config = {
      region: 'global',
      baseURL: '',
      sandbox: false,
      enableTelemetry: true,
      offlineMode: false,
      timeout: 30000,
      retryAttempts: 3,
      debug: false,
      ...config
    };

    // Set base URL based on region
    if (!this.config.baseURL) {
      this.config.baseURL = this.config.sandbox 
        ? 'https://sandbox.api.adgosolutions.com'
        : this.REGIONAL_ENDPOINTS[this.config.region!];
    }

    this.sessionId = this.generateSessionId();
    
    // Initialize SDK
    this.initialize();
  }

  /**
   * Initialize the SDK - verify license and setup telemetry
   */
  private async initialize(): Promise<void> {
    try {
      // Check build integrity
      await this.verifyBuildIntegrity();

      // Verify license
      await this.verifyLicense();

      // Start telemetry collection
      if (this.config.enableTelemetry) {
        this.startTelemetryCollection();
      }

      // Log initialization
      this.logTelemetry('init', {
        sdk_version: SDK_VERSION,
        config: {
          region: this.config.region,
          sandbox: this.config.sandbox,
          offline_mode: this.config.offlineMode
        },
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
        timestamp: new Date().toISOString()
      });

      if (this.config.debug) {
        console.log('AdGo SDK initialized successfully');
      }

    } catch (error) {
      this.logTelemetry('error', {
        error: 'initialization_failed',
        message: error.message,
        stack: error.stack
      });

      if (!this.config.offlineMode) {
        throw error;
      }
    }
  }

  /**
   * Verify SDK build integrity
   */
  private async verifyBuildIntegrity(): Promise<void> {
    try {
      const response = await this.makeRequest('/sdk/health', {
        method: 'GET',
        params: { sdk_name: SDK_NAME, version: SDK_VERSION }
      });

      if (response.data?.sdk_build?.build_hash !== BUILD_HASH) {
        console.warn('SDK build integrity check failed - using potentially modified version');
      }
    } catch (error) {
      if (this.config.debug) {
        console.warn('Build integrity check failed:', error.message);
      }
    }
  }

  /**
   * Verify license with caching
   */
  async verifyLicense(forceRefresh: boolean = false): Promise<LicenseInfo> {
    const now = Date.now();

    // Check cache (24 hours)
    if (!forceRefresh && this.licenseCache && now < this.cacheExpiry) {
      return this.licenseCache;
    }

    // Check offline cache
    if (this.config.offlineMode || navigator?.onLine === false) {
      const cachedLicense = this.getOfflineLicense();
      if (cachedLicense) {
        return cachedLicense;
      }
    }

    try {
      const response = await this.makeRequest('/sdk/verify', {
        method: 'POST',
        body: {
          license_key: this.config.licenseKey,
          sdk_version: SDK_VERSION,
          region: this.config.region
        }
      });

      if (response.success) {
        this.licenseCache = response.data;
        this.cacheExpiry = now + (24 * 60 * 60 * 1000); // 24 hours
        
        // Store in offline cache (max 48 hours)
        this.storeOfflineLicense(response.data, 48);
        
        return response.data;
      } else {
        throw new Error(response.error || 'License verification failed');
      }

    } catch (error) {
      this.logTelemetry('error', {
        error: 'license_verification_failed',
        message: error.message
      });

      // Try offline cache as fallback
      const cachedLicense = this.getOfflineLicense();
      if (cachedLicense) {
        return cachedLicense;
      }

      throw error;
    }
  }

  /**
   * Record API usage and check rate limits
   */
  async recordUsage(calls: number = 1): Promise<{ allowed: boolean; remaining: number }> {
    try {
      const response = await this.makeRequest('/sdk/meter', {
        method: 'POST',
        body: {
          license_key: this.config.licenseKey,
          calls
        }
      });

      this.logTelemetry('api_call', {
        calls,
        allowed: response.data?.allowed,
        remaining: response.data?.remaining,
        usage_count: response.data?.usage_count
      });

      return {
        allowed: response.data?.allowed || false,
        remaining: response.data?.remaining || 0
      };

    } catch (error) {
      this.logTelemetry('error', {
        error: 'usage_recording_failed',
        message: error.message
      });

      // Assume allowed if we can't verify (offline mode)
      return { allowed: true, remaining: 1000 };
    }
  }

  /**
   * Core API method - record impression
   */
  async recordImpression(adId: string, userId?: string, metadata?: any): Promise<AdGoResponse> {
    const usage = await this.recordUsage();
    if (!usage.allowed) {
      return { success: false, error: 'Rate limit exceeded', rate_limited: true };
    }

    try {
      const response = await this.makeRequest('/api/sdk/impression', {
        method: 'POST',
        body: {
          ad_id: adId,
          user_id: userId,
          metadata: {
            ...metadata,
            sdk_version: SDK_VERSION,
            session_id: this.sessionId,
            timestamp: new Date().toISOString()
          }
        }
      });

      this.logTelemetry('feature_used', {
        feature: 'record_impression',
        ad_id: adId,
        success: response.success
      });

      return {
        success: response.success,
        data: response.data,
        error: response.error,
        remaining_calls: usage.remaining
      };

    } catch (error) {
      this.logTelemetry('error', {
        error: 'impression_recording_failed',
        ad_id: adId,
        message: error.message
      });

      return { success: false, error: error.message };
    }
  }

  /**
   * Core API method - record click
   */
  async recordClick(adId: string, userId?: string, metadata?: any): Promise<AdGoResponse> {
    const usage = await this.recordUsage();
    if (!usage.allowed) {
      return { success: false, error: 'Rate limit exceeded', rate_limited: true };
    }

    try {
      const response = await this.makeRequest('/api/sdk/click', {
        method: 'POST',
        body: {
          ad_id: adId,
          user_id: userId,
          metadata: {
            ...metadata,
            sdk_version: SDK_VERSION,
            session_id: this.sessionId,
            timestamp: new Date().toISOString()
          }
        }
      });

      this.logTelemetry('feature_used', {
        feature: 'record_click',
        ad_id: adId,
        success: response.success
      });

      return {
        success: response.success,
        data: response.data,
        error: response.error,
        remaining_calls: usage.remaining
      };

    } catch (error) {
      this.logTelemetry('error', {
        error: 'click_recording_failed',
        ad_id: adId,
        message: error.message
      });

      return { success: false, error: error.message };
    }
  }

  /**
   * Get analytics data
   */
  async getAnalytics(options?: { days?: number; event_type?: string }): Promise<AdGoResponse> {
    try {
      const params = new URLSearchParams({
        license_key: this.config.licenseKey,
        days: (options?.days || 7).toString(),
        ...(options?.event_type && { event_type: options.event_type })
      });

      const response = await this.makeRequest(`/telemetry/analytics?${params}`, {
        method: 'GET'
      });

      return {
        success: response.success,
        data: response.data
      };

    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Send heartbeat ping
   */
  async ping(): Promise<boolean> {
    try {
      const response = await this.makeRequest('/sdk/ping', {
        method: 'POST',
        body: {
          license_key: this.config.licenseKey,
          sdk_version: SDK_VERSION,
          health_data: {
            session_duration: Date.now() - parseInt(this.sessionId.split('_')[1]),
            telemetry_queue_size: this.telemetryQueue.length,
            offline_cache_size: this.offlineCache.size
          }
        }
      });

      return response.success;
    } catch {
      return false;
    }
  }

  // Private Methods

  private async makeRequest(endpoint: string, options: {
    method: string;
    body?: any;
    params?: any;
    headers?: Record<string, string>;
  }): Promise<any> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': `AdGo-JS-SDK/${SDK_VERSION}`,
      'X-AdGo-Region': this.config.region!,
      ...options.headers
    };

    // Add HMAC signature if configured
    if (this.config.hmacSecret && options.body) {
      headers['X-AdGo-Sig'] = await this.generateHMACSignature(JSON.stringify(options.body));
    }

    const requestOptions: RequestInit = {
      method: options.method,
      headers,
      ...(options.body && { body: JSON.stringify(options.body) })
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    requestOptions.signal = controller.signal;

    try {
      const response = await fetch(url, requestOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic
      if (this.config.retryAttempts! > 0 && this.shouldRetry(error)) {
        await this.sleep(1000); // Wait 1 second before retry
        return this.makeRequestWithRetry(endpoint, options, this.config.retryAttempts! - 1);
      }

      throw error;
    }
  }

  private async makeRequestWithRetry(endpoint: string, options: any, attemptsLeft: number): Promise<any> {
    try {
      return await this.makeRequest(endpoint, { ...options, retryAttempts: 0 });
    } catch (error) {
      if (attemptsLeft > 0 && this.shouldRetry(error)) {
        await this.sleep(2000); // Exponential backoff
        return this.makeRequestWithRetry(endpoint, options, attemptsLeft - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors, timeouts, and 5xx responses
    return error.name === 'AbortError' || 
           error.message.includes('fetch') ||
           error.message.includes('5');
  }

  private async generateHMACSignature(payload: string): Promise<string> {
    if (!this.config.hmacSecret) return '';

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.config.hmacSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(payload)
    );

    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private logTelemetry(event_type: TelemetryEvent['event_type'], event_data: any): void {
    if (!this.config.enableTelemetry) return;

    this.telemetryQueue.push({
      event_type,
      event_data,
      timestamp: new Date().toISOString()
    });

    // Batch send telemetry every 10 events or 30 seconds
    if (this.telemetryQueue.length >= 10) {
      this.flushTelemetry();
    }
  }

  private async flushTelemetry(): Promise<void> {
    if (this.telemetryQueue.length === 0) return;

    const events = [...this.telemetryQueue];
    this.telemetryQueue = [];

    try {
      await this.makeRequest('/telemetry/batch', {
        method: 'POST',
        body: {
          license_key: this.config.licenseKey,
          events,
          sdk_info: {
            name: SDK_NAME,
            version: SDK_VERSION,
            platform: typeof window !== 'undefined' ? 'browser' : 'node'
          }
        }
      });
    } catch (error) {
      // Re-queue events if sending failed
      this.telemetryQueue.unshift(...events);
      if (this.config.debug) {
        console.warn('Telemetry flush failed:', error.message);
      }
    }
  }

  private startTelemetryCollection(): void {
    // Flush telemetry every 30 seconds
    setInterval(() => this.flushTelemetry(), 30000);

    // Flush on page unload (browser only)
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flushTelemetry());
    }
  }

  private generateSessionId(): string {
    return `adgo_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Offline Cache Methods

  private storeOfflineLicense(license: LicenseInfo, maxHours: number): void {
    const expiry = Date.now() + (maxHours * 60 * 60 * 1000);
    this.offlineCache.set('license', { license, expiry });
  }

  private getOfflineLicense(): LicenseInfo | null {
    const cached = this.offlineCache.get('license');
    if (cached && Date.now() < cached.expiry) {
      return cached.license;
    }
    this.offlineCache.delete('license');
    return null;
  }

  // Public utility methods

  /**
   * Get current license information
   */
  getLicenseInfo(): LicenseInfo | null {
    return this.licenseCache;
  }

  /**
   * Get SDK version
   */
  getVersion(): string {
    return SDK_VERSION;
  }

  /**
   * Get session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Force flush telemetry queue
   */
  async flush(): Promise<void> {
    await this.flushTelemetry();
  }

  /**
   * Enable/disable debug mode
   */
  setDebugMode(enabled: boolean): void {
    this.config.debug = enabled;
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdGoSDK;
}

if (typeof window !== 'undefined') {
  (window as any).AdGoSDK = AdGoSDK;
}

export default AdGoSDK;