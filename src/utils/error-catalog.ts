/**
 * AdGo Platform - Error Catalog & Debugging System
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

interface ErrorCatalogEntry {
  code: string;
  category: 'SDK' | 'API' | 'NETWORK' | 'AUTH' | 'VALIDATION' | 'BUSINESS' | 'SYSTEM';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  causes: string[];
  solutions: string[];
  documentation?: string;
  examples?: string[];
  relatedErrors?: string[];
}

interface ErrorReport {
  id: string;
  timestamp: string;
  errorCode: string;
  message: string;
  stackTrace?: string;
  context: {
    userAgent: string;
    url: string;
    userId?: string;
    sessionId: string;
    sdkVersion: string;
    environment: string;
  };
  metadata?: Record<string, any>;
  resolved?: boolean;
  resolutionNotes?: string;
}

class AdGoErrorCatalog {
  private static instance: AdGoErrorCatalog;
  private catalog: Map<string, ErrorCatalogEntry> = new Map();
  private errorReports: ErrorReport[] = [];

  private constructor() {
    this.initializeCatalog();
    this.setupGlobalErrorHandler();
  }

  public static getInstance(): AdGoErrorCatalog {
    if (!AdGoErrorCatalog.instance) {
      AdGoErrorCatalog.instance = new AdGoErrorCatalog();
    }
    return AdGoErrorCatalog.instance;
  }

  /**
   * Initialize comprehensive error catalog
   */
  private initializeCatalog(): void {
    const errors: ErrorCatalogEntry[] = [
      // SDK Errors
      {
        code: 'SDK_001',
        category: 'SDK',
        severity: 'HIGH',
        title: 'SDK Initialization Failed',
        description: 'The AdGo SDK failed to initialize properly',
        causes: [
          'Invalid or missing license key',
          'Network connectivity issues',
          'Unsupported browser environment',
          'Missing required dependencies'
        ],
        solutions: [
          'Verify your license key is correct and active',
          'Check network connectivity and firewall settings',
          'Ensure browser meets minimum requirements (ES2015+)',
          'Update SDK to latest version',
          'Check console for additional error details'
        ],
        documentation: 'https://docs.adgo.com/sdk/initialization',
        examples: [
          'const sdk = new AdGoSDK({ licenseKey: "your_key_here" });',
          'await sdk.verifyLicense();'
        ],
        relatedErrors: ['SDK_002', 'AUTH_001']
      },
      {
        code: 'SDK_002',
        category: 'SDK',
        severity: 'MEDIUM',
        title: 'SDK Configuration Invalid',
        description: 'Invalid configuration parameters provided to SDK',
        causes: [
          'Missing required configuration fields',
          'Invalid region specification',
          'Malformed base URL',
          'Invalid timeout values'
        ],
        solutions: [
          'Review SDK configuration documentation',
          'Validate all required fields are present',
          'Use supported region codes (global, eu, asia, americas, africa)',
          'Ensure timeout values are positive numbers',
          'Check configuration against schema'
        ],
        documentation: 'https://docs.adgo.com/sdk/configuration',
        relatedErrors: ['SDK_001', 'VALIDATION_001']
      },

      // Authentication Errors
      {
        code: 'AUTH_001',
        category: 'AUTH',
        severity: 'CRITICAL',
        title: 'Invalid License Key',
        description: 'The provided license key is invalid or expired',
        causes: [
          'Incorrect license key format',
          'Expired license',
          'Suspended account',
          'Regional restrictions'
        ],
        solutions: [
          'Verify license key from AdGo dashboard',
          'Contact support to renew expired license',
          'Check account status and billing',
          'Ensure license is valid for current region',
          'Generate new license key if compromised'
        ],
        documentation: 'https://docs.adgo.com/authentication/license-keys',
        examples: [
          'License format: adgo_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          'Sandbox format: adgo_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        ],
        relatedErrors: ['AUTH_002', 'BUSINESS_001']
      },
      {
        code: 'AUTH_002',
        category: 'AUTH',
        severity: 'HIGH',
        title: 'Authentication Rate Limited',
        description: 'Too many authentication attempts from this IP',
        causes: [
          'Excessive authentication requests',
          'Multiple failed login attempts',
          'Automated bot activity detected',
          'Shared IP address issues'
        ],
        solutions: [
          'Wait for rate limit to reset (typically 15 minutes)',
          'Implement exponential backoff in retry logic',
          'Cache successful authentication tokens',
          'Contact support if legitimate usage is blocked',
          'Consider upgrading plan for higher limits'
        ],
        documentation: 'https://docs.adgo.com/authentication/rate-limits',
        relatedErrors: ['API_002', 'NETWORK_003']
      },

      // API Errors
      {
        code: 'API_001',
        category: 'API',
        severity: 'HIGH',
        title: 'API Request Failed',
        description: 'Failed to communicate with AdGo API servers',
        causes: [
          'Network connectivity issues',
          'API server maintenance',
          'Invalid request format',
          'Timeout exceeded'
        ],
        solutions: [
          'Check network connectivity',
          'Verify API endpoint URLs',
          'Implement retry logic with exponential backoff',
          'Check AdGo status page for service issues',
          'Validate request payload format'
        ],
        documentation: 'https://docs.adgo.com/api/troubleshooting',
        relatedErrors: ['NETWORK_001', 'API_002']
      },
      {
        code: 'API_002',
        category: 'API',
        severity: 'MEDIUM',
        title: 'API Rate Limit Exceeded',
        description: 'API request quota exceeded for current time period',
        causes: [
          'High volume of API requests',
          'Inefficient request patterns',
          'Missing request caching',
          'Plan limits reached'
        ],
        solutions: [
          'Implement request caching',
          'Add delays between requests',
          'Upgrade to higher tier plan',
          'Optimize request frequency',
          'Use batch operations when available'
        ],
        documentation: 'https://docs.adgo.com/api/rate-limits',
        relatedErrors: ['BUSINESS_002', 'AUTH_002']
      },

      // Network Errors
      {
        code: 'NETWORK_001',
        category: 'NETWORK',
        severity: 'HIGH',
        title: 'Network Connection Failed',
        description: 'Unable to establish connection to AdGo services',
        causes: [
          'No internet connection',
          'DNS resolution failure',
          'Firewall blocking requests',
          'Corporate proxy issues'
        ],
        solutions: [
          'Check internet connectivity',
          'Verify DNS settings',
          'Configure firewall to allow AdGo domains',
          'Configure proxy settings if applicable',
          'Try different network connection'
        ],
        documentation: 'https://docs.adgo.com/troubleshooting/network',
        relatedErrors: ['API_001', 'NETWORK_002']
      },
      {
        code: 'NETWORK_002',
        category: 'NETWORK',
        severity: 'MEDIUM',
        title: 'Request Timeout',
        description: 'Network request exceeded timeout limit',
        causes: [
          'Slow internet connection',
          'Server high load',
          'Large payload size',
          'Geographic distance to servers'
        ],
        solutions: [
          'Increase timeout configuration',
          'Use regional endpoints for better latency',
          'Reduce request payload size',
          'Implement retry logic',
          'Consider upgrading internet connection'
        ],
        documentation: 'https://docs.adgo.com/sdk/configuration#timeout',
        relatedErrors: ['API_001', 'NETWORK_001']
      },

      // Validation Errors
      {
        code: 'VALIDATION_001',
        category: 'VALIDATION',
        severity: 'MEDIUM',
        title: 'Invalid Request Parameters',
        description: 'Request contains invalid or malformed parameters',
        causes: [
          'Missing required fields',
          'Invalid data types',
          'Values outside allowed ranges',
          'Malformed JSON payload'
        ],
        solutions: [
          'Validate all required fields are present',
          'Check data types match API specification',
          'Ensure values are within allowed ranges',
          'Validate JSON payload structure',
          'Review API documentation for parameter requirements'
        ],
        documentation: 'https://docs.adgo.com/api/validation',
        examples: [
          '{"placement": "header", "targeting": {"category": "tech"}}',
          '{"error": "Missing required field: placement"}'
        ],
        relatedErrors: ['SDK_002', 'API_001']
      },

      // Business Logic Errors
      {
        code: 'BUSINESS_001',
        category: 'BUSINESS',
        severity: 'HIGH',
        title: 'Account Suspended',
        description: 'Account has been suspended due to policy violation',
        causes: [
          'Policy violation detected',
          'Payment issues',
          'Fraudulent activity',
          'Terms of service violation'
        ],
        solutions: [
          'Contact AdGo support immediately',
          'Review account notifications',
          'Update payment information',
          'Review and comply with terms of service',
          'Appeal suspension if appropriate'
        ],
        documentation: 'https://docs.adgo.com/policies/account-suspension',
        relatedErrors: ['AUTH_001', 'BUSINESS_002']
      },
      {
        code: 'BUSINESS_002',
        category: 'BUSINESS',
        severity: 'MEDIUM',
        title: 'Usage Limit Exceeded',
        description: 'Account usage has exceeded plan limits',
        causes: [
          'High traffic volume',
          'Inefficient usage patterns',
          'Plan limits reached',
          'Billing issues'
        ],
        solutions: [
          'Upgrade to higher tier plan',
          'Optimize usage patterns',
          'Implement usage monitoring',
          'Update billing information',
          'Contact sales for enterprise plans'
        ],
        documentation: 'https://docs.adgo.com/billing/usage-limits',
        relatedErrors: ['API_002', 'BUSINESS_001']
      },

      // System Errors
      {
        code: 'SYSTEM_001',
        category: 'SYSTEM',
        severity: 'CRITICAL',
        title: 'Internal Server Error',
        description: 'An internal server error occurred',
        causes: [
          'Server infrastructure issues',
          'Database connectivity problems',
          'Service dependencies failure',
          'Unexpected system load'
        ],
        solutions: [
          'Check AdGo status page for system issues',
          'Implement retry logic with exponential backoff',
          'Contact support if issue persists',
          'Monitor for system status updates',
          'Consider implementing circuit breaker pattern'
        ],
        documentation: 'https://status.adgo.com',
        relatedErrors: ['API_001', 'SYSTEM_002']
      }
    ];

    // Add all errors to catalog
    errors.forEach(error => {
      this.catalog.set(error.code, error);
    });
  }

  /**
   * Setup global error handler
   */
  private setupGlobalErrorHandler(): void {
    if (typeof window !== 'undefined') {
      // Handle unhandled JavaScript errors
      window.addEventListener('error', (event) => {
        this.reportError({
          errorCode: 'SYSTEM_001',
          message: event.message,
          stackTrace: event.error?.stack,
          context: this.getErrorContext(),
          metadata: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            type: 'unhandled_javascript_error'
          }
        });
      });

      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.reportError({
          errorCode: 'SYSTEM_001',
          message: event.reason?.message || 'Unhandled promise rejection',
          stackTrace: event.reason?.stack,
          context: this.getErrorContext(),
          metadata: {
            reason: event.reason,
            type: 'unhandled_promise_rejection'
          }
        });
      });
    }
  }

  /**
   * Get error context information
   */
  private getErrorContext(): ErrorReport['context'] {
    return {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
      sessionId: this.generateSessionId(),
      sdkVersion: '1.0.0', // This would come from the SDK
      environment: process.env.NODE_ENV || 'unknown'
    };
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `error_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get error information by code
   */
  getError(errorCode: string): ErrorCatalogEntry | null {
    return this.catalog.get(errorCode) || null;
  }

  /**
   * Search errors by category or keyword
   */
  searchErrors(query: string): ErrorCatalogEntry[] {
    const results: ErrorCatalogEntry[] = [];
    const searchTerm = query.toLowerCase();

    this.catalog.forEach(error => {
      const searchableText = [
        error.code,
        error.title,
        error.description,
        error.category,
        ...error.causes,
        ...error.solutions
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push(error);
      }
    });

    return results.sort((a, b) => {
      // Sort by severity (CRITICAL > HIGH > MEDIUM > LOW)
      const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  /**
   * Get errors by category
   */
  getErrorsByCategory(category: ErrorCatalogEntry['category']): ErrorCatalogEntry[] {
    const results: ErrorCatalogEntry[] = [];
    
    this.catalog.forEach(error => {
      if (error.category === category) {
        results.push(error);
      }
    });

    return results;
  }

  /**
   * Report an error occurrence
   */
  reportError(errorInfo: Partial<ErrorReport> & { errorCode: string; message: string }): string {
    const errorReport: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      errorCode: errorInfo.errorCode,
      message: errorInfo.message,
      stackTrace: errorInfo.stackTrace,
      context: errorInfo.context || this.getErrorContext(),
      metadata: errorInfo.metadata,
      resolved: false
    };

    this.errorReports.push(errorReport);

    // Keep only last 1000 reports to prevent memory issues
    if (this.errorReports.length > 1000) {
      this.errorReports = this.errorReports.slice(-1000);
    }

    // Log error for debugging
    console.error('[AdGo Error Catalog]', {
      id: errorReport.id,
      code: errorReport.errorCode,
      message: errorReport.message,
      timestamp: errorReport.timestamp
    });

    // Send to telemetry if available
    this.sendErrorTelemetry(errorReport);

    return errorReport.id;
  }

  /**
   * Send error telemetry
   */
  private async sendErrorTelemetry(errorReport: ErrorReport): Promise<void> {
    try {
      if (typeof fetch !== 'undefined') {
        await fetch('/api/telemetry/error', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            event_type: 'error_occurred',
            event_data: {
              error_id: errorReport.id,
              error_code: errorReport.errorCode,
              message: errorReport.message,
              context: errorReport.context,
              metadata: errorReport.metadata
            },
            timestamp: errorReport.timestamp
          })
        });
      }
    } catch (error) {
      console.warn('Failed to send error telemetry:', error);
    }
  }

  /**
   * Get all error reports
   */
  getErrorReports(limit?: number): ErrorReport[] {
    const reports = [...this.errorReports].reverse(); // Most recent first
    return limit ? reports.slice(0, limit) : reports;
  }

  /**
   * Mark error as resolved
   */
  markErrorResolved(errorId: string, resolutionNotes?: string): boolean {
    const report = this.errorReports.find(r => r.id === errorId);
    if (report) {
      report.resolved = true;
      report.resolutionNotes = resolutionNotes;
      return true;
    }
    return false;
  }

  /**
   * Generate error diagnostics report
   */
  generateDiagnosticsReport(): string {
    const totalErrors = this.errorReports.length;
    const resolvedErrors = this.errorReports.filter(e => e.resolved).length;
    const unresolvedErrors = totalErrors - resolvedErrors;
    
    const errorsByCode = new Map<string, number>();
    const errorsByCategory = new Map<string, number>();
    
    this.errorReports.forEach(report => {
      // Count by error code
      errorsByCode.set(report.errorCode, (errorsByCode.get(report.errorCode) || 0) + 1);
      
      // Count by category
      const errorInfo = this.getError(report.errorCode);
      if (errorInfo) {
        errorsByCategory.set(errorInfo.category, (errorsByCategory.get(errorInfo.category) || 0) + 1);
      }
    });

    let report = `
# AdGo Error Diagnostics Report
Generated: ${new Date().toISOString()}

## Summary
- Total Errors: ${totalErrors}
- Resolved: ${resolvedErrors}
- Unresolved: ${unresolvedErrors}
- Resolution Rate: ${totalErrors > 0 ? ((resolvedErrors / totalErrors) * 100).toFixed(2) : 0}%

## Top Error Codes
`;

    const sortedCodes = Array.from(errorsByCode.entries()).sort((a, b) => b[1] - a[1]);
    sortedCodes.slice(0, 10).forEach(([code, count]) => {
      const errorInfo = this.getError(code);
      report += `- ${code}: ${count} occurrences (${errorInfo?.title || 'Unknown'})\n`;
    });

    report += `
## Errors by Category
`;

    const sortedCategories = Array.from(errorsByCategory.entries()).sort((a, b) => b[1] - a[1]);
    sortedCategories.forEach(([category, count]) => {
      report += `- ${category}: ${count} occurrences\n`;
    });

    report += `
## Recent Unresolved Errors
`;

    const recentUnresolved = this.errorReports
      .filter(e => !e.resolved)
      .slice(0, 5)
      .reverse();

    recentUnresolved.forEach(error => {
      const errorInfo = this.getError(error.errorCode);
      report += `
### ${error.errorCode} - ${errorInfo?.title || 'Unknown Error'}
- **Time:** ${error.timestamp}
- **Message:** ${error.message}
- **Context:** ${error.context.url}
- **Environment:** ${error.context.environment}
`;
    });

    return report;
  }

  /**
   * Export error catalog as JSON
   */
  exportCatalog(): string {
    const catalogData = {
      version: '1.0.0',
      generated: new Date().toISOString(),
      errors: Array.from(this.catalog.values()),
      statistics: {
        totalErrors: this.catalog.size,
        categories: Array.from(new Set(Array.from(this.catalog.values()).map(e => e.category))),
        severityDistribution: this.getSeverityDistribution()
      }
    };

    return JSON.stringify(catalogData, null, 2);
  }

  /**
   * Get severity distribution
   */
  private getSeverityDistribution(): Record<string, number> {
    const distribution = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
    
    this.catalog.forEach(error => {
      distribution[error.severity]++;
    });

    return distribution;
  }

  /**
   * Create error help widget
   */
  createHelpWidget(): HTMLElement {
    const widget = document.createElement('div');
    widget.id = 'adgo-error-help';
    widget.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 350px;
      max-height: 500px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
      z-index: 10000;
      display: none;
    `;

    widget.innerHTML = `
      <div style="padding: 16px; border-bottom: 1px solid #eee; background: #f8f9fa; border-radius: 8px 8px 0 0;">
        <h3 style="margin: 0; color: #333; font-size: 16px;">🛠️ AdGo Error Helper</h3>
        <button id="adgo-error-close" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
      </div>
      <div id="adgo-error-content" style="padding: 16px; max-height: 400px; overflow-y: auto;">
        <input type="text" id="adgo-error-search" placeholder="Search errors..." style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 12px;">
        <div id="adgo-error-results"></div>
      </div>
    `;

    // Add event listeners
    widget.querySelector('#adgo-error-close')?.addEventListener('click', () => {
      widget.style.display = 'none';
    });

    const searchInput = widget.querySelector('#adgo-error-search') as HTMLInputElement;
    const resultsDiv = widget.querySelector('#adgo-error-results') as HTMLElement;

    searchInput?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      if (query.length > 2) {
        const results = this.searchErrors(query);
        this.displaySearchResults(results, resultsDiv);
      } else {
        resultsDiv.innerHTML = '<p style="color: #666; text-align: center;">Type to search errors...</p>';
      }
    });

    // Initial content
    resultsDiv.innerHTML = '<p style="color: #666; text-align: center;">Type to search errors...</p>';

    return widget;
  }

  /**
   * Display search results in widget
   */
  private displaySearchResults(results: ErrorCatalogEntry[], container: HTMLElement): void {
    if (results.length === 0) {
      container.innerHTML = '<p style="color: #666; text-align: center;">No errors found</p>';
      return;
    }

    container.innerHTML = results.slice(0, 5).map(error => `
      <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #eee; border-radius: 4px;">
        <div style="font-weight: bold; color: #333; margin-bottom: 4px;">
          ${error.code} - ${error.title}
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
          ${error.category} | ${error.severity}
        </div>
        <div style="font-size: 14px; color: #555; margin-bottom: 8px;">
          ${error.description}
        </div>
        <details style="font-size: 13px;">
          <summary style="cursor: pointer; color: #0066cc;">Solutions</summary>
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            ${error.solutions.map(solution => `<li style="margin: 4px 0;">${solution}</li>`).join('')}
          </ul>
        </details>
      </div>
    `).join('');
  }
}

// Global instance
const errorCatalog = AdGoErrorCatalog.getInstance();

// Add global helper methods
if (typeof window !== 'undefined') {
  (window as any).adgoErrors = {
    search: (query: string) => errorCatalog.searchErrors(query),
    getError: (code: string) => errorCatalog.getError(code),
    report: (code: string, message: string, metadata?: any) => 
      errorCatalog.reportError({ errorCode: code, message, metadata }),
    showHelper: () => {
      let widget = document.getElementById('adgo-error-help') as HTMLElement;
      if (!widget) {
        widget = errorCatalog.createHelpWidget();
        document.body.appendChild(widget);
      }
      widget.style.display = 'block';
    },
    exportCatalog: () => errorCatalog.exportCatalog(),
    getDiagnostics: () => errorCatalog.generateDiagnosticsReport()
  };

  console.log('🔍 AdGo Error Catalog loaded! Use adgoErrors.* methods for error management.');
}

export { AdGoErrorCatalog };
export type { ErrorCatalogEntry, ErrorReport };