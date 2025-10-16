/**
 * AdGo Platform - Developer Debugging Utilities
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

interface DebugConfig {
  enabled: boolean;
  level: 'trace' | 'debug' | 'info' | 'warn' | 'error';
  persistLogs: boolean;
  maxLogSize: number;
  includeStackTrace: boolean;
  colorOutput: boolean;
}

interface LogEntry {
  timestamp: string;
  level: string;
  category: string;
  message: string;
  data?: any;
  stackTrace?: string;
  sessionId: string;
}

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

interface NetworkRequest {
  id: string;
  url: string;
  method: string;
  timestamp: string;
  status?: number;
  duration?: number;
  requestHeaders?: Record<string, string>;
  responseHeaders?: Record<string, string>;
  requestBody?: any;
  responseBody?: any;
  error?: string;
}

class AdGoDebugger {
  private static instance: AdGoDebugger;
  private config: DebugConfig;
  private logs: LogEntry[] = [];
  private performanceMetrics: Map<string, PerformanceMetric> = new Map();
  private networkRequests: NetworkRequest[] = [];
  private sessionId: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.config = {
      enabled: process.env.NODE_ENV === 'development',
      level: 'debug',
      persistLogs: true,
      maxLogSize: 1000,
      includeStackTrace: true,
      colorOutput: true
    };
    
    this.setupGlobalDebugging();
    this.interceptNetworkRequests();
  }

  public static getInstance(): AdGoDebugger {
    if (!AdGoDebugger.instance) {
      AdGoDebugger.instance = new AdGoDebugger();
    }
    return AdGoDebugger.instance;
  }

  /**
   * Configure debugger settings
   */
  configure(config: Partial<DebugConfig>): void {
    this.config = { ...this.config, ...config };
    this.log('info', 'debugger', 'Configuration updated', config);
  }

  /**
   * Setup global debugging utilities
   */
  private setupGlobalDebugging(): void {
    if (typeof window !== 'undefined') {
      // Add global debugging utilities
      (window as any).adgoDebugger = {
        // Logging utilities
        log: (level: string, category: string, message: string, data?: any) => 
          this.log(level as any, category, message, data),
        
        // Performance utilities
        startTimer: (name: string, metadata?: any) => this.startPerformanceTimer(name, metadata),
        endTimer: (name: string) => this.endPerformanceTimer(name),
        measure: (name: string, fn: () => unknown) => this.measureFunction(name, fn),
        
        // Network debugging
        getNetworkLogs: () => this.getNetworkRequests(),
        clearNetworkLogs: () => this.clearNetworkRequests(),
        
        // General utilities
        getLogs: (category?: string) => this.getLogs(category),
        clearLogs: () => this.clearLogs(),
        exportLogs: () => this.exportLogs(),
        getMetrics: () => this.getPerformanceMetrics(),
        inspect: (obj: any) => this.inspectObject(obj),
        
        // SDK specific
        inspectSDK: () => this.inspectSDKState(),
        validateConfig: (config: any) => this.validateSDKConfig(config),
        testConnection: () => this.testAPIConnection(),
        
        // Configuration
        enable: () => this.enable(),
        disable: () => this.disable(),
        getConfig: () => this.config
      };

      console.log('🔧 AdGo Debugger loaded! Use adgoDebugger.* methods for debugging.');
    }
  }

  /**
   * Intercept network requests for debugging
   */
  private interceptNetworkRequests(): void {
    if (typeof window !== 'undefined' && window.fetch) {
      const originalFetch = window.fetch;
      
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const requestId = this.generateRequestId();
        const url = input.toString();
        const method = init?.method || 'GET';
        const startTime = Date.now();
        
        // Log request start
        const networkRequest: NetworkRequest = {
          id: requestId,
          url,
          method,
          timestamp: new Date().toISOString(),
          requestHeaders: init?.headers as Record<string, string>,
          requestBody: init?.body
        };

        this.networkRequests.push(networkRequest);
        this.log('debug', 'network', `Request started: ${method} ${url}`, { requestId });

        try {
          const response = await originalFetch(input, init);
          const duration = Date.now() - startTime;

          // Update request with response info
          networkRequest.status = response.status;
          networkRequest.duration = duration;
          networkRequest.responseHeaders = Object.fromEntries(response.headers.entries());

          // Clone response to capture body without consuming it
          const responseClone = response.clone();
          try {
            networkRequest.responseBody = await responseClone.text();
          } catch (error) {
            // Response might not be text
            networkRequest.responseBody = '[Binary or unreadable content]';
          }

          this.log('debug', 'network', `Request completed: ${method} ${url} (${response.status})`, {
            requestId,
            duration: `${duration}ms`,
            status: response.status
          });

          return response;

        } catch (error) {
          const duration = Date.now() - startTime;
          networkRequest.duration = duration;
          networkRequest.error = error instanceof Error ? error.message : 'Unknown error';

          this.log('error', 'network', `Request failed: ${method} ${url}`, {
            requestId,
            duration: `${duration}ms`,
            error: networkRequest.error
          });

          throw error;
        }
      };
    }
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `debug_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  }

  /**
   * Log message with specified level
   */
  log(level: DebugConfig['level'], category: string, message: string, data?: any): void {
    if (!this.config.enabled) return;

    // Check if log level meets threshold
    const levels = { trace: 0, debug: 1, info: 2, warn: 3, error: 4 };
    if (levels[level] < levels[this.config.level]) return;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      category,
      message,
      data,
      sessionId: this.sessionId,
      stackTrace: this.config.includeStackTrace && level === 'error' ? new Error().stack : undefined
    };

    // Add to logs array
    this.logs.push(logEntry);

    // Trim logs if too many
    if (this.logs.length > this.config.maxLogSize) {
      this.logs = this.logs.slice(-this.config.maxLogSize);
    }

    // Console output with colors
    this.outputToConsole(logEntry);
  }

  /**
   * Output log entry to console with formatting
   */
  private outputToConsole(entry: LogEntry): void {
    const colors = {
      TRACE: '#888',
      DEBUG: '#2196F3',
      INFO: '#4CAF50',
      WARN: '#FF9800',
      ERROR: '#F44336'
    };

    const color = this.config.colorOutput ? colors[entry.level as keyof typeof colors] : '';
    const style = color ? `color: ${color}; font-weight: bold;` : '';
    
    const prefix = `[AdGo ${entry.level}] ${entry.category}:`;
    
    if (entry.data) {
      console.log(`%c${prefix}`, style, entry.message, entry.data);
    } else {
      console.log(`%c${prefix}`, style, entry.message);
    }

    if (entry.stackTrace && entry.level === 'ERROR') {
      console.log('Stack trace:', entry.stackTrace);
    }
  }

  /**
   * Start performance timer
   */
  startPerformanceTimer(name: string, metadata?: Record<string, any>): void {
    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      metadata
    };

    this.performanceMetrics.set(name, metric);
    this.log('debug', 'performance', `Timer started: ${name}`, metadata);
  }

  /**
   * End performance timer
   */
  endPerformanceTimer(name: string): number | null {
    const metric = this.performanceMetrics.get(name);
    
    if (!metric) {
      this.log('warn', 'performance', `Timer not found: ${name}`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;

    this.log('debug', 'performance', `Timer ended: ${name}`, {
      duration: `${metric.duration.toFixed(2)}ms`,
      metadata: metric.metadata
    });

    return metric.duration;
  }

  /**
   * Measure function execution time
   */
  async measureFunction<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    this.startPerformanceTimer(name);
    
    try {
      const result = await fn();
      this.endPerformanceTimer(name);
      return result;
    } catch (error) {
      this.endPerformanceTimer(name);
      this.log('error', 'performance', `Function measurement failed: ${name}`, { error });
      throw error;
    }
  }

  /**
   * Get logs filtered by category
   */
  getLogs(category?: string): LogEntry[] {
    if (category) {
      return this.logs.filter(log => log.category === category);
    }
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
    this.log('info', 'debugger', 'Logs cleared');
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): PerformanceMetric[] {
    return Array.from(this.performanceMetrics.values());
  }

  /**
   * Get network requests
   */
  getNetworkRequests(filterByAdGo: boolean = false): NetworkRequest[] {
    if (filterByAdGo) {
      return this.networkRequests.filter(req => 
        req.url.includes('adgo') || 
        req.url.includes('api') ||
        req.url.includes('localhost:3000')
      );
    }
    return [...this.networkRequests];
  }

  /**
   * Clear network request logs
   */
  clearNetworkRequests(): void {
    this.networkRequests = [];
    this.log('info', 'network', 'Network logs cleared');
  }

  /**
   * Inspect object structure and properties
   */
  inspectObject(obj: any): void {
    console.log('🔍 Object Inspection:');
    console.log('Type:', typeof obj);
    console.log('Constructor:', obj?.constructor?.name);
    
    if (obj && typeof obj === 'object') {
      console.log('Properties:', Object.keys(obj));
      console.log('Prototype:', Object.getPrototypeOf(obj));
      console.log('Descriptor sample:', Object.getOwnPropertyDescriptor(obj, Object.keys(obj)[0]));
    }
    
    console.log('Full object:', obj);
    
    this.log('debug', 'inspector', 'Object inspected', {
      type: typeof obj,
      constructor: obj?.constructor?.name,
      properties: obj && typeof obj === 'object' ? Object.keys(obj) : null
    });
  }

  /**
   * Inspect current SDK state
   */
  inspectSDKState(): void {
    const sdkInfo = {
      windowObjects: this.getAdGoWindowObjects(),
      localStorage: this.getAdGoLocalStorage(),
      sessionStorage: this.getAdGoSessionStorage(),
      cookies: this.getAdGoCookies(),
      networkActivity: this.getNetworkRequests(true).length,
      performanceMetrics: this.getPerformanceMetrics().length,
      logEntries: this.getLogs().length
    };

    console.log('🔍 AdGo SDK State Inspection:');
    console.table(sdkInfo);
    
    this.log('debug', 'sdk', 'SDK state inspected', sdkInfo);
  }

  /**
   * Get AdGo-related window objects
   */
  private getAdGoWindowObjects(): Record<string, any> {
    if (typeof window === 'undefined') return {};
    
    const adgoObjects: Record<string, any> = {};
    
    Object.keys(window).forEach(key => {
      if (key.toLowerCase().includes('adgo')) {
        adgoObjects[key] = typeof (window as any)[key];
      }
    });
    
    return adgoObjects;
  }

  /**
   * Get AdGo-related localStorage items
   */
  private getAdGoLocalStorage(): Record<string, any> {
    if (typeof localStorage === 'undefined') return {};
    
    const adgoItems: Record<string, any> = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.toLowerCase().includes('adgo')) {
        adgoItems[key] = localStorage.getItem(key);
      }
    }
    
    return adgoItems;
  }

  /**
   * Get AdGo-related sessionStorage items
   */
  private getAdGoSessionStorage(): Record<string, any> {
    if (typeof sessionStorage === 'undefined') return {};
    
    const adgoItems: Record<string, any> = {};
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.toLowerCase().includes('adgo')) {
        adgoItems[key] = sessionStorage.getItem(key);
      }
    }
    
    return adgoItems;
  }

  /**
   * Get AdGo-related cookies
   */
  private getAdGoCookies(): Record<string, string> {
    if (typeof document === 'undefined') return {};
    
    const adgoCookies: Record<string, string> = {};
    
    document.cookie.split(';').forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      if (key && key.toLowerCase().includes('adgo')) {
        adgoCookies[key] = value;
      }
    });
    
    return adgoCookies;
  }

  /**
   * Validate SDK configuration
   */
  validateSDKConfig(config: any): { valid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!config.licenseKey) {
      errors.push('Missing required field: licenseKey');
    } else if (typeof config.licenseKey !== 'string') {
      errors.push('licenseKey must be a string');
    } else if (!config.licenseKey.startsWith('adgo_')) {
      warnings.push('licenseKey should start with "adgo_"');
    }

    // Optional fields validation
    if (config.region && !['global', 'eu', 'africa', 'asia', 'americas'].includes(config.region)) {
      warnings.push('Unsupported region, will default to "global"');
    }

    if (config.timeout && (typeof config.timeout !== 'number' || config.timeout <= 0)) {
      errors.push('timeout must be a positive number');
    }

    if (config.retryAttempts && (typeof config.retryAttempts !== 'number' || config.retryAttempts < 0)) {
      errors.push('retryAttempts must be a non-negative number');
    }

    const result = {
      valid: errors.length === 0,
      errors,
      warnings
    };

    this.log('debug', 'validation', 'SDK config validated', result);
    return result;
  }

  /**
   * Test API connection
   */
  async testAPIConnection(): Promise<{ success: boolean; latency?: number; error?: string }> {
    const baseUrl = 'http://localhost:3000/api'; // Default dev URL
    const startTime = performance.now();

    try {
      this.log('info', 'connection', 'Testing API connection...', { baseUrl });

      const response = await fetch(`${baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const latency = performance.now() - startTime;

      if (response.ok) {
        this.log('info', 'connection', 'API connection successful', { 
          status: response.status, 
          latency: `${latency.toFixed(2)}ms` 
        });
        
        return { success: true, latency };
      } else {
        const error = `HTTP ${response.status}: ${response.statusText}`;
        this.log('warn', 'connection', 'API connection failed', { error, latency: `${latency.toFixed(2)}ms` });
        
        return { success: false, latency, error };
      }

    } catch (error) {
      const latency = performance.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      this.log('error', 'connection', 'API connection failed', { error: errorMessage, latency: `${latency.toFixed(2)}ms` });
      
      return { success: false, latency, error: errorMessage };
    }
  }

  /**
   * Export logs as downloadable file
   */
  exportLogs(): string {
    const exportData = {
      sessionId: this.sessionId,
      exportTime: new Date().toISOString(),
      config: this.config,
      logs: this.logs,
      performanceMetrics: Array.from(this.performanceMetrics.values()),
      networkRequests: this.networkRequests,
      summary: {
        totalLogs: this.logs.length,
        logsByLevel: this.getLogsByLevel(),
        totalNetworkRequests: this.networkRequests.length,
        totalMetrics: this.performanceMetrics.size
      }
    };

    const jsonData = JSON.stringify(exportData, null, 2);

    if (typeof window !== 'undefined') {
      // Create downloadable file
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-debug-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      this.log('info', 'export', 'Debug data exported', { filename: a.download });
    }

    return jsonData;
  }

  /**
   * Get logs grouped by level
   */
  private getLogsByLevel(): Record<string, number> {
    const byLevel: Record<string, number> = {};
    
    this.logs.forEach(log => {
      byLevel[log.level] = (byLevel[log.level] || 0) + 1;
    });

    return byLevel;
  }

  /**
   * Enable debugger
   */
  enable(): void {
    this.config.enabled = true;
    this.log('info', 'debugger', 'Debugger enabled');
  }

  /**
   * Disable debugger
   */
  disable(): void {
    this.log('info', 'debugger', 'Debugger disabled');
    this.config.enabled = false;
  }
}

// Create global instance
const adgoDebuggerInstance = AdGoDebugger.getInstance();

// Export for module usage
export { AdGoDebugger };
export type { DebugConfig, LogEntry, PerformanceMetric, NetworkRequest };