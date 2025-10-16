/**
 * AdGo Platform - Developer Experience & SDK Sandbox
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 */

import AdGoSDK from '../../sdks/javascript/adgo-sdk';

interface SandboxConfig {
  mode: 'development' | 'testing' | 'production';
  apiKey: string;
  debugMode: boolean;
  mockData: boolean;
  telemetryEnabled: boolean;
  rateLimiting: boolean;
  maxRequestsPerMinute?: number;
}

interface DebugEvent {
  timestamp: string;
  type: 'api_call' | 'error' | 'warning' | 'info' | 'performance';
  message: string;
  data?: any;
  stackTrace?: string;
  performanceMetrics?: {
    duration: number;
    memoryUsage: number;
    networkLatency?: number;
  };
}

interface MockAdData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetUrl: string;
  category: string;
  ctr: number;
  impressions: number;
  revenue: number;
}

class AdGoSandbox {
  private sdk: AdGoSDK | null = null;
  private config: SandboxConfig;
  private debugEvents: DebugEvent[] = [];
  private mockAds: MockAdData[] = [];
  private requestCount: number = 0;
  private requestResetTime: number = Date.now() + 60000;

  constructor(config: SandboxConfig) {
    this.config = config;
    this.initializeMockData();
    this.setupDebugConsole();
  }

  /**
   * Initialize the SDK in sandbox mode
   */
  async initialize(): Promise<void> {
    try {
      this.addDebugEvent('info', 'Initializing AdGo SDK in sandbox mode', {
        config: this.config,
        mode: this.config.mode
      });

      // Initialize SDK with sandbox configuration
      this.sdk = new AdGoSDK({
        licenseKey: this.config.apiKey,
        region: this.config.mode === 'production' ? 'global' : 'americas',
        debug: this.config.debugMode,
        enableTelemetry: this.config.telemetryEnabled,
        baseURL: this.getSandboxBaseUrl(),
        sandbox: this.config.mode !== 'production'
      });

      this.addDebugEvent('info', 'SDK initialized successfully', {
        sdkVersion: this.sdk.getVersion(),
        environment: this.config.mode
      });

      // Setup development helpers
      this.setupDevHelpers();
      
    } catch (error) {
      this.addDebugEvent('error', 'Failed to initialize SDK', {
        error: error instanceof Error ? error.message : error,
        stackTrace: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Get appropriate base URL for sandbox mode
   */
  private getSandboxBaseUrl(): string {
    switch (this.config.mode) {
      case 'development':
        return 'http://localhost:3000/api';
      case 'testing':
        return 'https://test-api.adgo.com';
      case 'production':
        return 'https://api.adgo.com';
      default:
        return 'http://localhost:3000/api';
    }
  }

  /**
   * Initialize mock data for testing
   */
  private initializeMockData(): void {
    this.mockAds = [
      {
        id: 'mock_ad_1',
        title: 'Revolutionary Ad Platform',
        description: 'Transform your advertising with AI-powered targeting',
        imageUrl: '/mock-ads/tech-ad.jpg',
        targetUrl: 'https://example.com/tech',
        category: 'technology',
        ctr: 2.5,
        impressions: 10000,
        revenue: 450.00
      },
      {
        id: 'mock_ad_2',
        title: 'E-commerce Growth Suite',
        description: 'Boost your online sales with advanced analytics',
        imageUrl: '/mock-ads/ecommerce-ad.jpg',
        targetUrl: 'https://example.com/ecommerce',
        category: 'business',
        ctr: 3.2,
        impressions: 15000,
        revenue: 720.00
      },
      {
        id: 'mock_ad_3',
        title: 'Travel Deals Finder',
        description: 'Discover amazing travel deals worldwide',
        imageUrl: '/mock-ads/travel-ad.jpg',
        targetUrl: 'https://example.com/travel',
        category: 'travel',
        ctr: 4.1,
        impressions: 8000,
        revenue: 320.00
      }
    ];
  }

  /**
   * Setup enhanced debug console
   */
  private setupDebugConsole(): void {
    if (!this.config.debugMode) return;

    // Override console methods to capture debug info
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      this.addDebugEvent('info', 'Console Log', { args });
      originalLog.apply(console, args);
    };

    console.error = (...args: any[]) => {
      this.addDebugEvent('error', 'Console Error', { args });
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      this.addDebugEvent('warning', 'Console Warning', { args });
      originalWarn.apply(console, args);
    };

    // Add AdGo-specific debug methods to global scope
    (window as any).adgoDebug = {
      getLogs: () => this.getDebugLogs(),
      clearLogs: () => this.clearDebugLogs(),
      getPerformanceMetrics: () => this.getPerformanceMetrics(),
      inspectSDK: () => this.inspectSDK(),
      testAd: (adId?: string) => this.testAd(adId),
      simulateError: (errorType: string) => this.simulateError(errorType)
    };

    console.log('🚀 AdGo Debug Console Activated! Use adgoDebug.* methods for debugging.');
  }

  /**
   * Setup development helper functions
   */
  private setupDevHelpers(): void {
    if (typeof window !== 'undefined') {
      // Add AdGo sandbox controls to window
      (window as any).adgoSandbox = {
        getConfig: () => this.config,
        getMockAds: () => this.mockAds,
        reloadSDK: () => this.reloadSDK(),
        switchMode: (mode: SandboxConfig['mode']) => this.switchMode(mode),
        exportLogs: () => this.exportDebugLogs(),
        testScenarios: () => this.runTestScenarios()
      };
    }
  }

  /**
   * Add debug event with performance tracking
   */
  private addDebugEvent(
    type: DebugEvent['type'], 
    message: string, 
    data?: any,
    startTime?: number
  ): void {
    const event: DebugEvent = {
      timestamp: new Date().toISOString(),
      type,
      message,
      data,
      stackTrace: type === 'error' ? new Error().stack : undefined,
      performanceMetrics: startTime ? {
        duration: Date.now() - startTime,
        memoryUsage: this.getMemoryUsage()
      } : undefined
    };

    this.debugEvents.push(event);

    // Keep only last 1000 events to prevent memory issues
    if (this.debugEvents.length > 1000) {
      this.debugEvents = this.debugEvents.slice(-1000);
    }

    // Log to console if debug mode is enabled
    if (this.config.debugMode) {
      const style = this.getLogStyle(type);
      console.log(`%c[AdGo ${type.toUpperCase()}]`, style, message, data);
    }
  }

  /**
   * Get memory usage if available
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Get console log styling for different event types
   */
  private getLogStyle(type: DebugEvent['type']): string {
    const styles = {
      info: 'color: #2196F3; font-weight: bold;',
      error: 'color: #F44336; font-weight: bold;',
      warning: 'color: #FF9800; font-weight: bold;',
      api_call: 'color: #4CAF50; font-weight: bold;',
      performance: 'color: #9C27B0; font-weight: bold;'
    };
    return styles[type] || 'color: #666; font-weight: bold;';
  }

  /**
   * Check rate limiting
   */
  private checkRateLimit(): boolean {
    if (!this.config.rateLimiting) return true;

    const now = Date.now();
    if (now > this.requestResetTime) {
      this.requestCount = 0;
      this.requestResetTime = now + 60000;
    }

    const maxRequests = this.config.maxRequestsPerMinute || 60;
    if (this.requestCount >= maxRequests) {
      this.addDebugEvent('warning', 'Rate limit exceeded', {
        requestCount: this.requestCount,
        maxRequests,
        resetTime: new Date(this.requestResetTime).toISOString()
      });
      return false;
    }

    this.requestCount++;
    return true;
  }

  /**
   * Fetch ad with sandbox enhancements
   */
  async fetchAd(placement?: string, targeting?: any): Promise<MockAdData | null> {
    const startTime = Date.now();

    try {
      // Check rate limiting
      if (!this.checkRateLimit()) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      this.addDebugEvent('api_call', 'Fetching ad', {
        placement,
        targeting,
        mockMode: this.config.mockData
      });

      if (this.config.mockData) {
        // Return mock data for development
        const mockAd = this.getMockAd(targeting?.category);
        
        this.addDebugEvent('api_call', 'Mock ad returned', {
          ad: mockAd,
          placement,
          targeting
        }, startTime);

        return mockAd;
      }

      // Use real SDK if available and not in mock mode
      if (this.sdk) {
        // For now, simulate API call with SDK license verification
        const license = await this.sdk.verifyLicense();
        
        if (license.valid) {
          // In a real implementation, this would make an actual ad request
          const mockAd = this.getMockAd(targeting?.category);
          
          this.addDebugEvent('api_call', 'SDK verified ad fetched', {
            ad: mockAd ? 'Ad received' : 'No ad available',
            placement,
            targeting,
            license: license.license?.plan
          }, startTime);

          return mockAd;
        } else {
          throw new Error('Invalid license for ad fetch');
        }
      }

      return null;

    } catch (error) {
      this.addDebugEvent('error', 'Failed to fetch ad', {
        error: error instanceof Error ? error.message : error,
        placement,
        targeting,
        stackTrace: error instanceof Error ? error.stack : undefined
      });
      throw error;
    }
  }

  /**
   * Get mock ad based on category preference
   */
  private getMockAd(category?: string): MockAdData {
    if (category) {
      const categoryAd = this.mockAds.find(ad => ad.category === category);
      if (categoryAd) return categoryAd;
    }

    // Return random mock ad
    const randomIndex = Math.floor(Math.random() * this.mockAds.length);
    return this.mockAds[randomIndex];
  }

  /**
   * Test specific ad by ID
   */
  async testAd(adId?: string): Promise<void> {
    console.log('🧪 Testing Ad Fetch...');
    
    try {
      const ad = adId 
        ? this.mockAds.find(a => a.id === adId)
        : await this.fetchAd('test_placement', { category: 'technology' });

      console.log('✅ Ad Test Result:', ad);
      
      if (ad) {
        this.displayAdPreview(ad);
      }
    } catch (error) {
      console.error('❌ Ad Test Failed:', error);
    }
  }

  /**
   * Display ad preview in console
   */
  private displayAdPreview(ad: MockAdData): void {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                        AD PREVIEW                            ║
╠══════════════════════════════════════════════════════════════╣
║ Title: ${ad.title.padEnd(52)} ║
║ Description: ${ad.description.padEnd(47)} ║
║ Category: ${ad.category.padEnd(50)} ║
║ CTR: ${ad.ctr.toFixed(2)}% | Impressions: ${String(ad.impressions).padEnd(20)} ║
║ Revenue: $${ad.revenue.toFixed(2).padEnd(46)} ║
╚══════════════════════════════════════════════════════════════╝
    `);
  }

  /**
   * Simulate various error scenarios for testing
   */
  simulateError(errorType: string): void {
    console.log(`🎭 Simulating ${errorType} error...`);
    
    switch (errorType) {
      case 'network':
        this.addDebugEvent('error', 'Simulated network error', {
          code: 'NETWORK_ERROR',
          message: 'Failed to connect to AdGo API'
        });
        break;
      
      case 'timeout':
        this.addDebugEvent('error', 'Simulated timeout error', {
          code: 'TIMEOUT_ERROR',
          message: 'Request timed out after 30 seconds'
        });
        break;
      
      case 'invalid_key':
        this.addDebugEvent('error', 'Simulated invalid API key', {
          code: 'AUTH_ERROR',
          message: 'Invalid or expired API key'
        });
        break;
      
      case 'rate_limit':
        this.requestCount = this.config.maxRequestsPerMinute || 60;
        this.addDebugEvent('warning', 'Simulated rate limit', {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests'
        });
        break;
      
      default:
        this.addDebugEvent('error', 'Unknown error simulation', {
          code: 'UNKNOWN_ERROR',
          errorType
        });
    }
  }

  /**
   * Run comprehensive test scenarios
   */
  async runTestScenarios(): Promise<void> {
    console.log('🧪 Running AdGo SDK Test Scenarios...');
    
    const scenarios = [
      {
        name: 'Basic Ad Fetch',
        test: () => this.fetchAd('header', { category: 'technology' })
      },
      {
        name: 'Category Targeting',
        test: () => this.fetchAd('sidebar', { category: 'business' })
      },
      {
        name: 'No Category Targeting', 
        test: () => this.fetchAd('footer')
      },
      {
        name: 'Performance Test',
        test: async () => {
          const startTime = Date.now();
          await Promise.all([
            this.fetchAd('test1'),
            this.fetchAd('test2'),
            this.fetchAd('test3')
          ]);
          return { duration: Date.now() - startTime };
        }
      }
    ];

    for (const scenario of scenarios) {
      try {
        console.log(`\n▶️ Running: ${scenario.name}`);
        const result = await scenario.test();
        console.log(`✅ ${scenario.name}: PASSED`, result);
      } catch (error) {
        console.error(`❌ ${scenario.name}: FAILED`, error);
      }
    }

    console.log('\n📊 Test Summary:');
    this.printDebugSummary();
  }

  /**
   * Switch sandbox mode
   */
  async switchMode(mode: SandboxConfig['mode']): Promise<void> {
    console.log(`🔄 Switching to ${mode} mode...`);
    
    this.config.mode = mode;
    
    if (this.sdk) {
      await this.reloadSDK();
    }
    
    this.addDebugEvent('info', 'Sandbox mode switched', {
      newMode: mode,
      config: this.config
    });
  }

  /**
   * Reload SDK with current configuration
   */
  async reloadSDK(): Promise<void> {
    console.log('🔄 Reloading SDK...');
    
    try {
      if (this.sdk) {
        // Clean up current SDK instance
        this.sdk = null;
      }
      
      await this.initialize();
      console.log('✅ SDK reloaded successfully');
    } catch (error) {
      console.error('❌ Failed to reload SDK:', error);
    }
  }

  /**
   * Get debug logs
   */
  getDebugLogs(): DebugEvent[] {
    return [...this.debugEvents];
  }

  /**
   * Clear debug logs
   */
  clearDebugLogs(): void {
    this.debugEvents = [];
    console.log('🗑️ Debug logs cleared');
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): any {
    const errorCount = this.debugEvents.filter(e => e.type === 'error').length;
    const warningCount = this.debugEvents.filter(e => e.type === 'warning').length;
    const apiCallCount = this.debugEvents.filter(e => e.type === 'api_call').length;
    
    const performanceEvents = this.debugEvents.filter(e => e.performanceMetrics);
    const avgDuration = performanceEvents.length > 0
      ? performanceEvents.reduce((sum, e) => sum + (e.performanceMetrics?.duration || 0), 0) / performanceEvents.length
      : 0;

    return {
      totalEvents: this.debugEvents.length,
      errorCount,
      warningCount,
      apiCallCount,
      averageApiDuration: avgDuration,
      requestCount: this.requestCount,
      rateLimitEnabled: this.config.rateLimiting,
      memoryUsage: this.getMemoryUsage()
    };
  }

  /**
   * Inspect SDK state
   */
  inspectSDK(): any {
    return {
      sdkInstance: !!this.sdk,
      config: this.config,
      mockAdsCount: this.mockAds.length,
      debugEventsCount: this.debugEvents.length,
      version: this.sdk?.getVersion() || 'Not initialized'
    };
  }

  /**
   * Print debug summary
   */
  printDebugSummary(): void {
    const metrics = this.getPerformanceMetrics();
    
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                        DEBUG SUMMARY                           ║
╠════════════════════════════════════════════════════════════════╣
║ Total Events: ${String(metrics.totalEvents).padEnd(47)} ║
║ API Calls: ${String(metrics.apiCallCount).padEnd(50)} ║
║ Errors: ${String(metrics.errorCount).padEnd(53)} ║
║ Warnings: ${String(metrics.warningCount).padEnd(51)} ║
║ Avg API Duration: ${String(metrics.averageApiDuration.toFixed(2)) + 'ms'.padEnd(43)} ║
║ Request Count: ${String(metrics.requestCount).padEnd(46)} ║
║ Memory Usage: ${String((metrics.memoryUsage / 1024 / 1024).toFixed(2)) + 'MB'.padEnd(45)} ║
╚════════════════════════════════════════════════════════════════╝
    `);
  }

  /**
   * Export debug logs as JSON
   */
  exportDebugLogs(): string {
    const exportData = {
      timestamp: new Date().toISOString(),
      config: this.config,
      metrics: this.getPerformanceMetrics(),
      events: this.debugEvents
    };
    
    const jsonData = JSON.stringify(exportData, null, 2);
    
    if (typeof window !== 'undefined') {
      // Create downloadable file
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-debug-logs-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    return jsonData;
  }
}

// Export for use in applications
export { AdGoSandbox };
export type { SandboxConfig, DebugEvent, MockAdData };