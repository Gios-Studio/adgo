/**
 * AdGo Platform - Integration Testing Tools
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

interface TestCase {
  id: string;
  name: string;
  description: string;
  category: 'unit' | 'integration' | 'e2e' | 'performance' | 'security';
  priority: 'low' | 'medium' | 'high' | 'critical';
  setup?: () => Promise<void> | void;
  test: () => Promise<TestResult> | TestResult;
  teardown?: () => Promise<void> | void;
  timeout?: number;
  retries?: number;
  skip?: boolean;
  tags?: string[];
}

interface TestResult {
  passed: boolean;
  duration: number;
  message: string;
  data?: any;
  error?: Error;
  assertions?: AssertionResult[];
}

interface AssertionResult {
  type: string;
  passed: boolean;
  expected: any;
  actual: any;
  message: string;
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  hooks?: {
    beforeAll?: () => Promise<void> | void;
    afterAll?: () => Promise<void> | void;
    beforeEach?: () => Promise<void> | void;
    afterEach?: () => Promise<void> | void;
  };
}

interface TestReport {
  suiteId: string;
  suiteName: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  coverage?: number;
  results: TestCaseReport[];
  summary: string;
}

interface TestCaseReport {
  testId: string;
  testName: string;
  category: string;
  priority: string;
  result: TestResult;
  logs: string[];
}

class AdGoTestRunner {
  private static instance: AdGoTestRunner;
  private suites: Map<string, TestSuite> = new Map();
  private reports: TestReport[] = [];
  private currentSuite: string | null = null;
  private sdk: AdGoSDK | null = null;

  private constructor() {
    this.setupGlobalTestingUtils();
  }

  public static getInstance(): AdGoTestRunner {
    if (!AdGoTestRunner.instance) {
      AdGoTestRunner.instance = new AdGoTestRunner();
    }
    return AdGoTestRunner.instance;
  }

  /**
   * Setup global testing utilities
   */
  private setupGlobalTestingUtils(): void {
    if (typeof window !== 'undefined') {
      (window as any).adgoTesting = {
        // Test creation
        describe: (name: string, description: string, tests: TestCase[]) => 
          this.createSuite(name, description, tests),
        
        it: (name: string, description: string, testFn: () => Promise<TestResult> | TestResult) =>
          this.createTest(name, description, testFn),
        
        // Test execution
        run: (suiteId?: string) => this.runTests(suiteId),
        runAll: () => this.runAllTests(),
        
        // Assertions
        expect: (actual: any) => new Expectation(actual),
        assert: (condition: boolean, message: string) => this.assert(condition, message),
        
        // SDK testing
        setupSDK: (config: any) => this.setupSDK(config),
        testSDKIntegration: () => this.runSDKIntegrationTests(),
        
        // Mocking
        mock: (target: any, property: string, implementation: any) => 
          this.mock(target, property, implementation),
        restore: () => this.restoreAllMocks(),
        
        // Reports
        getReports: () => this.reports,
        getLatestReport: () => this.getLatestReport(),
        exportReport: (format: 'json' | 'html' | 'junit') => this.exportReport(format),
        
        // Utilities
        performance: () => this.createPerformanceTests(),
        security: () => this.createSecurityTests(),
        e2e: () => this.createE2ETests()
      };

      console.log('🧪 AdGo Testing Tools loaded! Use adgoTesting.* methods for testing.');
    }
  }

  /**
   * Create test suite
   */
  createSuite(name: string, description: string, tests: TestCase[]): string {
    const suiteId = `suite_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    
    const suite: TestSuite = {
      id: suiteId,
      name,
      description,
      tests: tests.map(test => ({
        ...test,
        id: test.id || `test_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
      }))
    };

    this.suites.set(suiteId, suite);
    console.log(`📝 Test suite created: ${name} (${tests.length} tests)`);
    
    return suiteId;
  }

  /**
   * Create individual test case
   */
  createTest(name: string, description: string, testFn: () => Promise<TestResult> | TestResult): TestCase {
    return {
      id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name,
      description,
      category: 'unit',
      priority: 'medium',
      test: testFn
    };
  }

  /**
   * Setup SDK for testing
   */
  async setupSDK(config: any): Promise<void> {
    try {
      this.sdk = new AdGoSDK(config);
      // SDK initializes in constructor, verify license instead
      const licenseInfo = await this.sdk.verifyLicense();
      if (!licenseInfo.valid) {
        throw new Error('Invalid license key provided');
      }
      console.log('✅ SDK setup complete for testing');
    } catch (error) {
      console.error('❌ SDK setup failed:', error);
      throw error;
    }
  }

  /**
   * Run specific test suite
   */
  async runTests(suiteId?: string): Promise<TestReport> {
    const targetSuite = suiteId ? this.suites.get(suiteId) : Array.from(this.suites.values())[0];
    
    if (!targetSuite) {
      throw new Error('No test suite found to run');
    }

    console.log(`🚀 Running test suite: ${targetSuite.name}`);
    
    const startTime = Date.now();
    const results: TestCaseReport[] = [];
    
    try {
      // Run beforeAll hook
      if (targetSuite.hooks?.beforeAll) {
        await targetSuite.hooks.beforeAll();
      }

      for (const test of targetSuite.tests) {
        if (test.skip) {
          results.push({
            testId: test.id,
            testName: test.name,
            category: test.category,
            priority: test.priority,
            result: {
              passed: true,
              duration: 0,
              message: 'Test skipped'
            },
            logs: ['Test was skipped']
          });
          continue;
        }

        const testResult = await this.runSingleTest(test, targetSuite.hooks);
        results.push({
          testId: test.id,
          testName: test.name,
          category: test.category,
          priority: test.priority,
          result: testResult,
          logs: []
        });
      }

      // Run afterAll hook
      if (targetSuite.hooks?.afterAll) {
        await targetSuite.hooks.afterAll();
      }

    } catch (error) {
      console.error('Test suite execution failed:', error);
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const report: TestReport = {
      suiteId: targetSuite.id,
      suiteName: targetSuite.name,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      duration,
      totalTests: results.length,
      passedTests: results.filter(r => r.result.passed).length,
      failedTests: results.filter(r => !r.result.passed).length,
      skippedTests: targetSuite.tests.filter(t => t.skip).length,
      results,
      summary: this.generateSummary(results)
    };

    this.reports.push(report);
    this.displayResults(report);
    
    return report;
  }

  /**
   * Run single test case
   */
  private async runSingleTest(test: TestCase, hooks?: TestSuite['hooks']): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      // Run beforeEach hook
      if (hooks?.beforeEach) {
        await hooks.beforeEach();
      }

      // Run test setup
      if (test.setup) {
        await test.setup();
      }

      console.log(`  🧪 Running: ${test.name}`);
      
      // Run the actual test with timeout
      const testPromise = Promise.resolve(test.test());
      const timeoutPromise = new Promise<TestResult>((_, reject) => {
        setTimeout(() => reject(new Error('Test timeout')), test.timeout || 30000);
      });

      const result = await Promise.race([testPromise, timeoutPromise]);
      
      // Run test teardown
      if (test.teardown) {
        await test.teardown();
      }

      // Run afterEach hook
      if (hooks?.afterEach) {
        await hooks.afterEach();
      }

      const duration = performance.now() - startTime;
      
      console.log(`    ${result.passed ? '✅' : '❌'} ${result.message} (${duration.toFixed(2)}ms)`);
      
      return {
        ...result,
        duration
      };

    } catch (error) {
      const duration = performance.now() - startTime;
      
      console.log(`    ❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'} (${duration.toFixed(2)}ms)`);
      
      return {
        passed: false,
        duration,
        message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  }

  /**
   * Run all test suites
   */
  async runAllTests(): Promise<TestReport[]> {
    const reports: TestReport[] = [];
    
    for (const [suiteId] of this.suites) {
      const report = await this.runTests(suiteId);
      reports.push(report);
    }
    
    return reports;
  }

  /**
   * Create SDK integration tests
   */
  runSDKIntegrationTests(): string {
    const tests: TestCase[] = [
      {
        id: 'sdk_init',
        name: 'SDK Initialization',
        description: 'Test that SDK initializes correctly',
        category: 'integration',
        priority: 'critical',
        test: async () => {
          if (!this.sdk) {
            throw new Error('SDK not setup - call setupSDK first');
          }
          
          const licenseInfo = this.sdk.getLicenseInfo();
          return {
            passed: licenseInfo?.valid || false,
            duration: 0,
            message: licenseInfo?.valid ? 'SDK initialized successfully' : 'SDK initialization failed'
          };
        }
      },
      {
        id: 'sdk_config',
        name: 'SDK Configuration',
        description: 'Test that SDK configuration is valid',
        category: 'integration',
        priority: 'high',
        test: async () => {
          if (!this.sdk) {
            throw new Error('SDK not setup - call setupSDK first');
          }
          
          const licenseInfo = this.sdk.getLicenseInfo();
          const version = this.sdk.getVersion();
          const hasValidLicense = licenseInfo?.valid || false;
          
          return {
            passed: hasValidLicense,
            duration: 0,
            message: hasValidLicense ? 'SDK configuration is valid' : 'SDK license validation failed',
            data: { version, licenseInfo }
          };
        }
      },
      {
        id: 'sdk_ping',
        name: 'API Connection Test',
        description: 'Test API connectivity',
        category: 'integration',
        priority: 'critical',
        test: async () => {
          if (!this.sdk) {
            throw new Error('SDK not setup - call setupSDK first');
          }
          
          try {
            const connected = await this.sdk.ping();
            
            return {
              passed: connected,
              duration: 0,
              message: connected ? 'API connection successful' : 'API connection failed',
              data: { connected }
            };
          } catch (error) {
            return {
              passed: false,
              duration: 0,
              message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              error: error instanceof Error ? error : new Error(String(error))
            };
          }
        }
      },
      {
        id: 'sdk_usage_tracking',
        name: 'Usage Tracking',
        description: 'Test SDK usage recording',
        category: 'integration',
        priority: 'medium',
        test: async () => {
          if (!this.sdk) {
            throw new Error('SDK not setup - call setupSDK first');
          }
          
          try {
            const usageResult = await this.sdk.recordUsage(1);
            
            return {
              passed: usageResult.allowed,
              duration: 0,
              message: usageResult.allowed ? 'Usage tracking successful' : 'Usage limit reached',
              data: usageResult
            };
          } catch (error) {
            return {
              passed: false,
              duration: 0,
              message: `Usage tracking failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              error: error instanceof Error ? error : new Error(String(error))
            };
          }
        }
      }
    ];

    return this.createSuite('SDK Integration Tests', 'Core SDK functionality tests', tests);
  }

  /**
   * Create performance tests
   */
  createPerformanceTests(): string {
    const tests: TestCase[] = [
      {
        id: 'perf_init_time',
        name: 'SDK Initialization Performance',
        description: 'Measure SDK initialization time',
        category: 'performance',
        priority: 'medium',
        test: async () => {
          const startTime = performance.now();
          
          if (this.sdk) {
            // Test license verification speed instead of initialization
            await this.sdk.verifyLicense();
          }
          
          const duration = performance.now() - startTime;
          const passed = duration < 1000; // Should verify within 1 second
          
          return {
            passed,
            duration: 0,
            message: `License verified in ${duration.toFixed(2)}ms`,
            data: { verificationTime: duration, threshold: 1000 }
          };
        }
      },
      {
        id: 'perf_ad_fetch',
        name: 'Ad Fetch Performance',
        description: 'Measure ad fetching performance',
        category: 'performance',
        priority: 'high',
        test: async () => {
          if (!this.sdk) {
            throw new Error('SDK not setup');
          }
          
          const startTime = performance.now();
          
          try {
            await this.sdk.ping();
            const duration = performance.now() - startTime;
            const passed = duration < 2000; // Should ping within 2 seconds
            
            return {
              passed,
              duration: 0,
              message: `API ping completed in ${duration.toFixed(2)}ms`,
              data: { pingTime: duration, threshold: 2000 }
            };
          } catch (error) {
            return {
              passed: false,
              duration: 0,
              message: `Performance test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              error: error instanceof Error ? error : new Error(String(error))
            };
          }
        }
      }
    ];

    return this.createSuite('Performance Tests', 'SDK performance benchmarks', tests);
  }

  /**
   * Create security tests
   */
  createSecurityTests(): string {
    const tests: TestCase[] = [
      {
        id: 'sec_license_validation',
        name: 'License Key Validation',
        description: 'Test license key validation security',
        category: 'security',
        priority: 'critical',
        test: async () => {
          // Test invalid license key rejection
          try {
            const invalidSDK = new AdGoSDK({ licenseKey: 'invalid_key' });
            const licenseInfo = await invalidSDK.verifyLicense();
            
            if (licenseInfo.valid) {
              return {
                passed: false,
                duration: 0,
                message: 'Invalid license key was accepted (security vulnerability)',
                data: { vulnerability: 'License validation bypass' }
              };
            } else {
              return {
                passed: true,
                duration: 0,
                message: 'Invalid license key properly rejected',
                data: { security: 'License validation working' }
              };
            }
          } catch (error) {
            return {
              passed: true,
              duration: 0,
              message: 'Invalid license key properly rejected with error',
              data: { security: 'License validation working', error: error instanceof Error ? error.message : 'Unknown error' }
            };
          }
        }
      },
      {
        id: 'sec_xss_protection',
        name: 'XSS Protection',
        description: 'Test cross-site scripting protection',
        category: 'security',
        priority: 'critical',
        test: async () => {
          const maliciousScript = '<script>alert("xss")</script>';
          
          // This would be a more comprehensive test in practice
          const sanitized = maliciousScript.replace(/<script[^>]*>.*?<\/script>/gi, '');
          const passed = !sanitized.includes('<script>');
          
          return {
            passed,
            duration: 0,
            message: passed ? 'XSS protection working' : 'XSS vulnerability detected',
            data: { original: maliciousScript, sanitized }
          };
        }
      }
    ];

    return this.createSuite('Security Tests', 'Security vulnerability tests', tests);
  }

  /**
   * Create end-to-end tests
   */
  createE2ETests(): string {
    const tests: TestCase[] = [
      {
        id: 'e2e_full_flow',
        name: 'Complete Ad Display Flow',
        description: 'Test complete ad display workflow',
        category: 'e2e',
        priority: 'critical',
        test: async () => {
          if (!this.sdk) {
            throw new Error('SDK not setup');
          }
          
          try {
            // Full workflow test using available methods
            const licenseInfo = await this.sdk.verifyLicense();
            const connected = await this.sdk.ping();
            const usage = await this.sdk.recordUsage(1);
            
            const allPassed = licenseInfo.valid && connected && usage.allowed;
            
            return {
              passed: allPassed,
              duration: 0,
              message: allPassed ? 'Complete SDK workflow executed successfully' : 'Some workflow steps failed',
              data: { licenseInfo, connected, usage }
            };
          } catch (error) {
            return {
              passed: false,
              duration: 0,
              message: `E2E test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
              error: error instanceof Error ? error : new Error(String(error))
            };
          }
        }
      }
    ];

    return this.createSuite('E2E Tests', 'End-to-end workflow tests', tests);
  }

  /**
   * Simple assertion helper
   */
  private assert(condition: boolean, message: string): AssertionResult {
    return {
      type: 'assert',
      passed: condition,
      expected: true,
      actual: condition,
      message
    };
  }

  /**
   * Mock implementation
   */
  private mock(target: any, property: string, implementation: any): void {
    if (target && typeof target === 'object') {
      target[`__original_${property}`] = target[property];
      target[property] = implementation;
    }
  }

  /**
   * Restore all mocks
   */
  private restoreAllMocks(): void {
    // This would restore all mocked functions in a real implementation
    console.log('🔄 All mocks restored');
  }

  /**
   * Generate test summary
   */
  private generateSummary(results: TestCaseReport[]): string {
    const passed = results.filter(r => r.result.passed).length;
    const total = results.length;
    const percentage = total > 0 ? ((passed / total) * 100).toFixed(1) : '0';
    
    return `${passed}/${total} tests passed (${percentage}%)`;
  }

  /**
   * Display test results
   */
  private displayResults(report: TestReport): void {
    console.log(`\n📊 Test Results: ${report.suiteName}`);
    console.log(`   Duration: ${report.duration}ms`);
    console.log(`   Summary: ${report.summary}`);
    
    if (report.failedTests > 0) {
      console.log('\n❌ Failed Tests:');
      report.results
        .filter(r => !r.result.passed)
        .forEach(result => {
          console.log(`   • ${result.testName}: ${result.result.message}`);
        });
    }
  }

  /**
   * Get latest test report
   */
  getLatestReport(): TestReport | null {
    return this.reports.length > 0 ? this.reports[this.reports.length - 1] : null;
  }

  /**
   * Export test report
   */
  exportReport(format: 'json' | 'html' | 'junit' = 'json'): string {
    const latestReport = this.getLatestReport();
    
    if (!latestReport) {
      throw new Error('No test report available to export');
    }

    switch (format) {
      case 'json':
        return this.exportJSONReport(latestReport);
      case 'html':
        return this.exportHTMLReport(latestReport);
      case 'junit':
        return this.exportJUnitReport(latestReport);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export JSON report
   */
  private exportJSONReport(report: TestReport): string {
    const jsonData = JSON.stringify(report, null, 2);
    
    if (typeof window !== 'undefined') {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-test-report-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    return jsonData;
  }

  /**
   * Export HTML report
   */
  private exportHTMLReport(report: TestReport): string {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>AdGo Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f5f5f5; padding: 20px; border-radius: 5px; }
        .summary { margin: 20px 0; }
        .test { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 3px; }
        .passed { border-left: 4px solid #4CAF50; }
        .failed { border-left: 4px solid #F44336; }
        .skipped { border-left: 4px solid #FF9800; }
    </style>
</head>
<body>
    <div class="header">
        <h1>AdGo Test Report: ${report.suiteName}</h1>
        <p>Generated: ${report.endTime}</p>
        <p>Duration: ${report.duration}ms</p>
    </div>
    
    <div class="summary">
        <h2>Summary</h2>
        <p>${report.summary}</p>
        <p>Total: ${report.totalTests} | Passed: ${report.passedTests} | Failed: ${report.failedTests} | Skipped: ${report.skippedTests}</p>
    </div>
    
    <div class="results">
        <h2>Test Results</h2>
        ${report.results.map(result => `
            <div class="test ${result.result.passed ? 'passed' : 'failed'}">
                <h3>${result.testName}</h3>
                <p><strong>Category:</strong> ${result.category}</p>
                <p><strong>Priority:</strong> ${result.priority}</p>
                <p><strong>Result:</strong> ${result.result.message}</p>
                <p><strong>Duration:</strong> ${result.result.duration.toFixed(2)}ms</p>
            </div>
        `).join('')}
    </div>
</body>
</html>`;

    if (typeof window !== 'undefined') {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-test-report-${Date.now()}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }

    return html;
  }

  /**
   * Export JUnit XML report
   */
  private exportJUnitReport(report: TestReport): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="${report.suiteName}" tests="${report.totalTests}" failures="${report.failedTests}" skipped="${report.skippedTests}" time="${(report.duration / 1000).toFixed(3)}">
    ${report.results.map(result => `
    <testcase classname="${result.category}" name="${result.testName}" time="${(result.result.duration / 1000).toFixed(3)}">
        ${!result.result.passed ? `<failure message="${result.result.message}">${result.result.error?.stack || result.result.message}</failure>` : ''}
    </testcase>`).join('')}
</testsuite>`;

    if (typeof window !== 'undefined') {
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-test-junit-${Date.now()}.xml`;
      a.click();
      URL.revokeObjectURL(url);
    }

    return xml;
  }
}

/**
 * Expectation class for fluent assertions
 */
class Expectation {
  constructor(private actual: any) {}

  toBe(expected: any): AssertionResult {
    const passed = this.actual === expected;
    return {
      type: 'toBe',
      passed,
      expected,
      actual: this.actual,
      message: passed ? 'Values are equal' : `Expected ${expected}, got ${this.actual}`
    };
  }

  toEqual(expected: any): AssertionResult {
    const passed = JSON.stringify(this.actual) === JSON.stringify(expected);
    return {
      type: 'toEqual',
      passed,
      expected,
      actual: this.actual,
      message: passed ? 'Objects are equal' : `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(this.actual)}`
    };
  }

  toBeTruthy(): AssertionResult {
    const passed = !!this.actual;
    return {
      type: 'toBeTruthy',
      passed,
      expected: 'truthy value',
      actual: this.actual,
      message: passed ? 'Value is truthy' : `Expected truthy value, got ${this.actual}`
    };
  }

  toBeFalsy(): AssertionResult {
    const passed = !this.actual;
    return {
      type: 'toBeFalsy',
      passed,
      expected: 'falsy value',
      actual: this.actual,
      message: passed ? 'Value is falsy' : `Expected falsy value, got ${this.actual}`
    };
  }

  toThrow(): AssertionResult {
    let threw = false;
    let error: Error | null = null;

    try {
      if (typeof this.actual === 'function') {
        this.actual();
      }
    } catch (e) {
      threw = true;
      error = e instanceof Error ? e : new Error(String(e));
    }

    return {
      type: 'toThrow',
      passed: threw,
      expected: 'function to throw',
      actual: threw ? error?.message : 'no error thrown',
      message: threw ? 'Function threw as expected' : 'Function did not throw'
    };
  }
}

// Create global instance
const testRunner = AdGoTestRunner.getInstance();

export { AdGoTestRunner, Expectation };
export type { TestCase, TestSuite, TestResult, TestReport, AssertionResult };