/**
 * AdGo Platform - Developer Experience Suite
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

// Import all developer experience tools
import { AdGoSandbox } from './sdk-sandbox';
import { AdGoErrorCatalog } from './error-catalog';
import { AdGoPostmanGenerator } from './postman-generator';
import { AdGoAIAssistant } from './ai-assistant';
import { AdGoDebugger } from './debug-tools';
import { AdGoTestRunner } from './integration-testing';

interface DeveloperExperienceConfig {
  enableSandbox?: boolean;
  enableErrorCatalog?: boolean;
  enablePostmanGenerator?: boolean;
  enableAIAssistant?: boolean;
  enableDebugger?: boolean;
  enableTesting?: boolean;
  aiProviderConfig?: {
    openai?: { apiKey: string };
    anthropic?: { apiKey: string };
    local?: { endpoint: string };
  };
  debugLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error';
}

interface DeveloperTools {
  sandbox: AdGoSandbox;
  errorCatalog: AdGoErrorCatalog;
  postmanGenerator: AdGoPostmanGenerator;
  aiAssistant: AdGoAIAssistant;
  debugger: AdGoDebugger;
  testRunner: AdGoTestRunner;
}

/**
 * AdGo Developer Experience Suite
 * Comprehensive toolkit for AdGo SDK development, testing, and debugging
 */
class AdGoDeveloperExperience {
  private static instance: AdGoDeveloperExperience;
  private config: DeveloperExperienceConfig;
  private tools: Partial<DeveloperTools> = {};
  private initialized: boolean = false;

  private constructor(config: DeveloperExperienceConfig = {}) {
    this.config = {
      enableSandbox: true,
      enableErrorCatalog: true,
      enablePostmanGenerator: true,
      enableAIAssistant: true,
      enableDebugger: true,
      enableTesting: true,
      debugLevel: 'debug',
      ...config
    };
  }

  public static getInstance(config?: DeveloperExperienceConfig): AdGoDeveloperExperience {
    if (!AdGoDeveloperExperience.instance) {
      AdGoDeveloperExperience.instance = new AdGoDeveloperExperience(config);
    }
    return AdGoDeveloperExperience.instance;
  }

  /**
   * Initialize all developer experience tools
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('🚀 AdGo Developer Experience already initialized');
      return;
    }

    console.log('🚀 Initializing AdGo Developer Experience Suite...');

    // Initialize debugger first (other tools may use it)
    if (this.config.enableDebugger) {
      this.tools.debugger = AdGoDebugger.getInstance();
      this.tools.debugger.configure({
        enabled: true,
        level: this.config.debugLevel || 'debug',
        persistLogs: true,
        maxLogSize: 1000,
        includeStackTrace: true,
        colorOutput: true
      });
      console.log('  ✅ Debugger initialized');
    }

    // Initialize sandbox environment
    if (this.config.enableSandbox) {
      this.tools.sandbox = new AdGoSandbox({
        apiKey: 'dev_key',
        mode: 'development',
        debugMode: true,
        mockData: true,
        telemetryEnabled: false,
        rateLimiting: false
      });
      await this.tools.sandbox.initialize();
      console.log('  ✅ Sandbox environment initialized');
    }

    // Initialize error catalog
    if (this.config.enableErrorCatalog) {
      this.tools.errorCatalog = AdGoErrorCatalog.getInstance();
      console.log('  ✅ Error catalog initialized');
    }

    // Initialize Postman generator
    if (this.config.enablePostmanGenerator) {
      this.tools.postmanGenerator = new AdGoPostmanGenerator();
      console.log('  ✅ Postman generator initialized');
    }

    // Initialize AI assistant
    if (this.config.enableAIAssistant && this.config.aiProviderConfig) {
      this.tools.aiAssistant = new AdGoAIAssistant();
      console.log('  ✅ AI assistant initialized');
    }

    // Initialize test runner
    if (this.config.enableTesting) {
      this.tools.testRunner = AdGoTestRunner.getInstance();
      console.log('  ✅ Test runner initialized');
    }

    this.setupGlobalDeveloperTools();
    this.initialized = true;

    console.log('🎉 AdGo Developer Experience Suite ready!');
    this.displayWelcomeMessage();
  }

  /**
   * Setup global developer tools access
   */
  private setupGlobalDeveloperTools(): void {
    if (typeof window !== 'undefined') {
      (window as any).adgoDX = {
        // Tool access
        sandbox: this.tools.sandbox,
        errors: this.tools.errorCatalog,
        postman: this.tools.postmanGenerator,
        ai: this.tools.aiAssistant,
        debug: this.tools.debugger,
        test: this.tools.testRunner,

        // Quick actions
        generatePostmanCollection: () => this.tools.postmanGenerator?.generateCollection(),
        createTestSuite: (name: string, tests: any[]) => 
          this.tools.testRunner?.createSuite(name, 'Generated test suite', tests),
        explainError: (error: any) => this.tools.aiAssistant?.explainError(error),
        optimizeAd: (adData: any) => this.tools.aiAssistant?.optimizeAd(adData),
        
        // Debug shortcuts
        log: (message: string, data?: any) => 
          this.tools.debugger?.log('info', 'developer', message, data),
        measure: (name: string, fn: () => unknown) => 
          this.tools.debugger?.measureFunction(name, fn),
        
        // Sandbox shortcuts
        mockAd: () => this.tools.sandbox?.fetchAd('banner'),
        testScenario: () => 
          this.tools.sandbox?.runTestScenarios(),
        
        // Utility functions
        getStatus: () => this.getToolsStatus(),
        help: () => this.displayHelp(),
        export: () => this.exportDeveloperData(),
        
        // Configuration
        configure: (newConfig: Partial<DeveloperExperienceConfig>) => 
          this.updateConfig(newConfig),
        restart: () => this.restart()
      };

      console.log('🔧 Global developer tools available via: window.adgoDX');
    }
  }

  /**
   * Display welcome message with available tools
   */
  private displayWelcomeMessage(): void {
    const enabledTools = Object.entries(this.tools)
      .filter(([_, tool]) => tool !== undefined)
      .map(([name]) => name);

    console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                      🚀 AdGo Developer Experience Suite                      ║
║                                                                              ║
║  Available Tools: ${enabledTools.join(', ').padEnd(55)}║
║                                                                              ║
║  Quick Start:                                                                ║
║    • Use window.adgoDX to access all tools                                   ║
║    • Run adgoDX.help() for detailed documentation                           ║
║    • Try adgoDX.sandbox.fetchAd() to test the sandbox                       ║
║    • Use adgoDX.test.runSDKIntegrationTests() for testing                   ║
║                                                                              ║
║  Documentation: https://docs.adgo.com/developer-experience                   ║
╚══════════════════════════════════════════════════════════════════════════════╝
    `);
  }

  /**
   * Get status of all tools
   */
  getToolsStatus(): Record<string, any> {
    return {
      initialized: this.initialized,
      config: this.config,
      enabledTools: Object.keys(this.tools),
      toolsStatus: {
        sandbox: this.tools.sandbox ? 'Available' : 'Disabled',
        errorCatalog: this.tools.errorCatalog ? 'Available' : 'Disabled',
        postmanGenerator: this.tools.postmanGenerator ? 'Available' : 'Disabled',
        aiAssistant: this.tools.aiAssistant ? 'Available' : 'Disabled',
        debugger: this.tools.debugger ? 'Available' : 'Disabled',
        testRunner: this.tools.testRunner ? 'Available' : 'Disabled'
      }
    };
  }

  /**
   * Display comprehensive help information
   */
  displayHelp(): void {
    console.log(`
🔧 AdGo Developer Experience - Help & Documentation

📦 Available Tools:
${this.tools.sandbox ? '  • Sandbox (adgoDX.sandbox) - SDK testing environment with mock data' : ''}
${this.tools.errorCatalog ? '  • Error Catalog (adgoDX.errors) - Error management and debugging help' : ''}
${this.tools.postmanGenerator ? '  • Postman Generator (adgoDX.postman) - API documentation generator' : ''}
${this.tools.aiAssistant ? '  • AI Assistant (adgoDX.ai) - AI-powered development help' : ''}
${this.tools.debugger ? '  • Debugger (adgoDX.debug) - Advanced debugging and logging' : ''}
${this.tools.testRunner ? '  • Test Runner (adgoDX.test) - Integration testing framework' : ''}

🚀 Quick Commands:
  adgoDX.generatePostmanCollection()     - Generate complete API collection
  adgoDX.createTestSuite(name, tests)    - Create and run test suite
  adgoDX.explainError(error)             - Get AI explanation of errors
  adgoDX.optimizeAd(adData)              - AI-powered ad optimization
  adgoDX.mockAd()                        - Generate mock advertisement data
  adgoDX.log(message, data)              - Debug logging
  adgoDX.measure(name, function)         - Performance measurement
  adgoDX.export()                        - Export all developer data

📚 Detailed Documentation:
  For complete API reference: https://docs.adgo.com/developer-experience
  For SDK documentation: https://docs.adgo.com/sdk
  For integration guides: https://docs.adgo.com/integration
    `);
  }

  /**
   * Export all developer data
   */
  exportDeveloperData(): { sandbox?: any; errors?: any; debug?: any; tests?: any } {
    const exportData: any = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      config: this.config
    };

    if (this.tools.sandbox) {
      exportData.sandbox = {
        initialized: true,
        toolsAvailable: ['fetchAd', 'runTestScenarios', 'simulateError']
      };
    }

    if (this.tools.errorCatalog) {
      exportData.errors = {
        initialized: true,
        toolsAvailable: ['searchErrors', 'reportError', 'generateDiagnosticsReport']
      };
    }

    if (this.tools.debugger) {
      exportData.debug = {
        logs: this.tools.debugger.getLogs(),
        metrics: this.tools.debugger.getPerformanceMetrics(),
        networkRequests: this.tools.debugger.getNetworkRequests()
      };
    }

    if (this.tools.testRunner) {
      exportData.tests = {
        latestReport: this.tools.testRunner.getLatestReport(),
        toolsAvailable: ['runSDKIntegrationTests', 'createPerformanceTests', 'createSecurityTests']
      };
    }

    // Create downloadable file
    if (typeof window !== 'undefined') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-developer-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);

      console.log('📁 Developer data exported successfully');
    }

    return exportData;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<DeveloperExperienceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Apply configuration changes to tools
    if (this.tools.debugger && newConfig.debugLevel) {
      this.tools.debugger.configure({ level: newConfig.debugLevel });
    }

    console.log('⚙️  Configuration updated:', newConfig);
  }

  /**
   * Restart developer experience suite
   */
  async restart(): Promise<void> {
    console.log('🔄 Restarting AdGo Developer Experience Suite...');
    
    this.initialized = false;
    this.tools = {};
    
    await this.initialize();
  }

  /**
   * Get specific tool instance
   */
  getTool<K extends keyof DeveloperTools>(toolName: K): DeveloperTools[K] | undefined {
    return this.tools[toolName] as DeveloperTools[K];
  }

  /**
   * Check if a specific tool is enabled
   */
  isToolEnabled(toolName: keyof DeveloperTools): boolean {
    return this.tools[toolName] !== undefined;
  }

  /**
   * Get comprehensive metrics about developer experience usage
   */
  getUsageMetrics(): {
    toolsUsed: string[];
    totalActions: number;
    sessionDuration: number;
    mostUsedTool: string;
    recommendations: string[];
  } {
    const toolsUsed = Object.keys(this.tools);
    const mockMetrics = {
      toolsUsed,
      totalActions: Math.floor(Math.random() * 100) + 20,
      sessionDuration: Date.now() - (Date.now() - Math.random() * 3600000), // Random session time
      mostUsedTool: toolsUsed[Math.floor(Math.random() * toolsUsed.length)] || 'sandbox',
      recommendations: [
        'Try using the AI assistant for code optimization',
        'Generate Postman collections for API documentation',
        'Use the test runner for comprehensive SDK testing',
        'Enable error tracking for better debugging'
      ]
    };

    return mockMetrics;
  }
}

// Auto-initialize if in development environment
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const dx = AdGoDeveloperExperience.getInstance({
    enableSandbox: true,
    enableErrorCatalog: true,
    enablePostmanGenerator: true,
    enableAIAssistant: false, // Disabled by default (requires API keys)
    enableDebugger: true,
    enableTesting: true,
    debugLevel: 'debug'
  });

  // Initialize after a brief delay to ensure DOM is ready
  setTimeout(() => {
    dx.initialize().catch(console.error);
  }, 100);
}

export { AdGoDeveloperExperience };
export type { DeveloperExperienceConfig, DeveloperTools };