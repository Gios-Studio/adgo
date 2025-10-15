/**
 * AdGo Platform - AI Integration & Assistant Hooks
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

interface AIProvider {
  name: string;
  apiKey: string;
  endpoint: string;
  model?: string;
}

interface AIRequest {
  prompt: string;
  context?: Record<string, any>;
  maxTokens?: number;
  temperature?: number;
}

interface AIResponse {
  success: boolean;
  response?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  error?: string;
}

interface CodeSuggestion {
  type: 'completion' | 'fix' | 'optimization' | 'documentation';
  description: string;
  code: string;
  explanation: string;
  confidence: number;
}

interface AdOptimization {
  originalAd: any;
  suggestions: {
    headline?: string;
    description?: string;
    cta?: string;
    targeting?: any;
    budget?: any;
  };
  reasoning: string;
  expectedImprovement: {
    ctr: number;
    conversion: number;
    roi: number;
  };
}

class AdGoAIAssistant {
  private providers: Map<string, AIProvider> = new Map();
  private defaultProvider: string = 'openai';

  constructor() {
    this.initializeProviders();
    this.setupDeveloperHelpers();
  }

  /**
   * Initialize AI providers
   */
  private initializeProviders(): void {
    // OpenAI GPT integration
    this.addProvider({
      name: 'openai',
      apiKey: process.env.OPENAI_API_KEY || '',
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4'
    });

    // Anthropic Claude integration
    this.addProvider({
      name: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      endpoint: 'https://api.anthropic.com/v1/messages',
      model: 'claude-3-sonnet-20240229'
    });

    // Local/Custom AI integration
    this.addProvider({
      name: 'local',
      apiKey: 'none',
      endpoint: 'http://localhost:11434/api/generate',
      model: 'llama2'
    });
  }

  /**
   * Add AI provider
   */
  addProvider(provider: AIProvider): void {
    this.providers.set(provider.name, provider);
  }

  /**
   * Setup developer helper functions
   */
  private setupDeveloperHelpers(): void {
    if (typeof window !== 'undefined') {
      (window as any).adgoAI = {
        askQuestion: (question: string) => this.askQuestion(question),
        generateCode: (description: string) => this.generateCode(description),
        explainError: (error: any) => this.explainError(error),
        optimizeAd: (adData: any) => this.optimizeAd(adData),
        suggestTargeting: (adContent: string) => this.suggestTargeting(adContent),
        generateTestCases: (apiEndpoint: string) => this.generateTestCases(apiEndpoint),
        reviewCode: (code: string) => this.reviewCode(code),
        getHelp: () => this.showHelp()
      };

      console.log('🤖 AdGo AI Assistant loaded! Use adgoAI.* methods for AI assistance.');
    }
  }

  /**
   * Make AI request to specified provider
   */
  private async makeAIRequest(
    prompt: string, 
    provider: string = this.defaultProvider,
    options: Partial<AIRequest> = {}
  ): Promise<AIResponse> {
    const aiProvider = this.providers.get(provider);
    
    if (!aiProvider) {
      return {
        success: false,
        error: `AI provider '${provider}' not found`
      };
    }

    if (!aiProvider.apiKey && provider !== 'local') {
      return {
        success: false,
        error: `API key not configured for provider '${provider}'`
      };
    }

    try {
      const response = await this.callAIProvider(aiProvider, prompt, options);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown AI error'
      };
    }
  }

  /**
   * Call specific AI provider
   */
  private async callAIProvider(
    provider: AIProvider, 
    prompt: string, 
    options: Partial<AIRequest>
  ): Promise<AIResponse> {
    switch (provider.name) {
      case 'openai':
        return this.callOpenAI(provider, prompt, options);
      case 'anthropic':
        return this.callAnthropic(provider, prompt, options);
      case 'local':
        return this.callLocalAI(provider, prompt, options);
      default:
        throw new Error(`Unsupported AI provider: ${provider.name}`);
    }
  }

  /**
   * Call OpenAI API
   */
  private async callOpenAI(
    provider: AIProvider, 
    prompt: string, 
    options: Partial<AIRequest>
  ): Promise<AIResponse> {
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: provider.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI assistant helping developers use the AdGo advertising platform. Provide clear, concise, and actionable advice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      response: data.choices[0]?.message?.content,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0
      }
    };
  }

  /**
   * Call Anthropic Claude API
   */
  private async callAnthropic(
    provider: AIProvider, 
    prompt: string, 
    options: Partial<AIRequest>
  ): Promise<AIResponse> {
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': provider.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: provider.model || 'claude-3-sonnet-20240229',
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
        messages: [
          {
            role: 'user',
            content: `You are an expert AI assistant helping developers use the AdGo advertising platform. ${prompt}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      response: data.content[0]?.text,
      usage: {
        promptTokens: data.usage?.input_tokens || 0,
        completionTokens: data.usage?.output_tokens || 0,
        totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
      }
    };
  }

  /**
   * Call local AI (Ollama or similar)
   */
  private async callLocalAI(
    provider: AIProvider, 
    prompt: string, 
    options: Partial<AIRequest>
  ): Promise<AIResponse> {
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: provider.model || 'llama2',
        prompt: prompt,
        options: {
          temperature: options.temperature || 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Local AI error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      response: data.response,
      usage: {
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }

  /**
   * Ask general question about AdGo platform
   */
  async askQuestion(question: string): Promise<string | null> {
    console.log('🤖 Asking AI:', question);

    const prompt = `
Question about AdGo advertising platform: ${question}

Context: AdGo is an advanced advertising platform with the following key components:
- JavaScript/TypeScript SDK for integration
- REST API for ad management and analytics
- Real-time telemetry and monitoring
- License-based usage tracking
- Multi-region deployment support
- Comprehensive security and compliance features

Please provide a helpful, accurate answer based on this context.
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success) {
      console.log('🤖 AI Response:', response.response);
      return response.response || null;
    } else {
      console.error('❌ AI Error:', response.error);
      return null;
    }
  }

  /**
   * Generate code based on description
   */
  async generateCode(description: string): Promise<CodeSuggestion | null> {
    console.log('🤖 Generating code for:', description);

    const prompt = `
Generate TypeScript/JavaScript code for AdGo platform integration: ${description}

Requirements:
- Use AdGo SDK patterns and best practices
- Include proper error handling
- Add TypeScript types where appropriate
- Include comments explaining the code
- Follow modern JavaScript/TypeScript conventions

Please provide:
1. The complete code implementation
2. Explanation of how it works
3. Usage examples
4. Any important considerations

Format the response as a JSON object with: { "code": "...", "explanation": "...", "usage": "..." }
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success && response.response) {
      try {
        const parsed = JSON.parse(response.response);
        
        const suggestion: CodeSuggestion = {
          type: 'completion',
          description: description,
          code: parsed.code || '',
          explanation: parsed.explanation || '',
          confidence: 0.8
        };

        console.log('🤖 Generated code:', suggestion);
        return suggestion;
      } catch (error) {
        console.error('❌ Failed to parse AI response:', error);
        return null;
      }
    } else {
      console.error('❌ Code generation failed:', response.error);
      return null;
    }
  }

  /**
   * Explain error and suggest fixes
   */
  async explainError(error: any): Promise<CodeSuggestion | null> {
    console.log('🤖 Explaining error:', error);

    const errorInfo = {
      message: error.message || 'Unknown error',
      stack: error.stack || '',
      code: error.code || '',
      type: error.constructor?.name || 'Error'
    };

    const prompt = `
Analyze this AdGo platform error and provide a solution:

Error Details:
- Message: ${errorInfo.message}
- Type: ${errorInfo.type}
- Code: ${errorInfo.code}
- Stack: ${errorInfo.stack.substring(0, 500)}

Please provide:
1. Clear explanation of what caused the error
2. Step-by-step solution to fix it
3. Code example showing the fix
4. Prevention tips for the future

Format as JSON: { "explanation": "...", "solution": "...", "code": "...", "prevention": "..." }
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success && response.response) {
      try {
        const parsed = JSON.parse(response.response);
        
        const suggestion: CodeSuggestion = {
          type: 'fix',
          description: `Fix for: ${errorInfo.message}`,
          code: parsed.code || '',
          explanation: `${parsed.explanation}\n\nSolution: ${parsed.solution}\n\nPrevention: ${parsed.prevention}`,
          confidence: 0.85
        };

        console.log('🤖 Error explanation:', suggestion);
        return suggestion;
      } catch (error) {
        console.error('❌ Failed to parse error explanation:', error);
        return null;
      }
    } else {
      console.error('❌ Error explanation failed:', response.error);
      return null;
    }
  }

  /**
   * Optimize ad content and targeting
   */
  async optimizeAd(adData: any): Promise<AdOptimization | null> {
    console.log('🤖 Optimizing ad:', adData);

    const prompt = `
Optimize this AdGo advertisement for better performance:

Current Ad Data:
${JSON.stringify(adData, null, 2)}

Please analyze and provide optimization suggestions for:
1. Headlines (A/B test variations)
2. Description copy improvements
3. Call-to-action optimization
4. Targeting refinements
5. Budget allocation recommendations

Include reasoning for each suggestion and expected performance improvements.

Format as JSON: {
  "suggestions": {
    "headline": "...",
    "description": "...",
    "cta": "...",
    "targeting": {...},
    "budget": {...}
  },
  "reasoning": "...",
  "expectedImprovement": {
    "ctr": 0.15,
    "conversion": 0.25,
    "roi": 0.30
  }
}
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success && response.response) {
      try {
        const parsed = JSON.parse(response.response);
        
        const optimization: AdOptimization = {
          originalAd: adData,
          suggestions: parsed.suggestions || {},
          reasoning: parsed.reasoning || '',
          expectedImprovement: parsed.expectedImprovement || {
            ctr: 0,
            conversion: 0,
            roi: 0
          }
        };

        console.log('🤖 Ad optimization:', optimization);
        return optimization;
      } catch (error) {
        console.error('❌ Failed to parse ad optimization:', error);
        return null;
      }
    } else {
      console.error('❌ Ad optimization failed:', response.error);
      return null;
    }
  }

  /**
   * Suggest targeting parameters based on ad content
   */
  async suggestTargeting(adContent: string): Promise<any> {
    console.log('🤖 Suggesting targeting for:', adContent);

    const prompt = `
Analyze this ad content and suggest optimal targeting parameters for AdGo platform:

Ad Content: "${adContent}"

Please suggest:
1. Target demographics (age, gender, location)
2. Interest categories and keywords
3. Behavioral targeting options
4. Device and platform preferences
5. Timing and scheduling recommendations

Format as JSON targeting object that can be used with AdGo API.
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success && response.response) {
      try {
        const targeting = JSON.parse(response.response);
        console.log('🤖 Targeting suggestions:', targeting);
        return targeting;
      } catch (error) {
        console.error('❌ Failed to parse targeting suggestions:', error);
        return null;
      }
    } else {
      console.error('❌ Targeting suggestion failed:', response.error);
      return null;
    }
  }

  /**
   * Generate test cases for API endpoints
   */
  async generateTestCases(apiEndpoint: string): Promise<CodeSuggestion | null> {
    console.log('🤖 Generating test cases for:', apiEndpoint);

    const prompt = `
Generate comprehensive test cases for AdGo API endpoint: ${apiEndpoint}

Please create test cases covering:
1. Successful requests with valid data
2. Error handling for invalid inputs
3. Authentication and authorization tests
4. Rate limiting and edge cases
5. Performance and load testing scenarios

Use Jest/TypeScript format and include:
- Setup and teardown
- Mock data
- Assertions
- Error scenarios
- Documentation

Format as JSON: { "testCode": "...", "explanation": "...", "coverage": "..." }
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success && response.response) {
      try {
        const parsed = JSON.parse(response.response);
        
        const suggestion: CodeSuggestion = {
          type: 'completion',
          description: `Test cases for ${apiEndpoint}`,
          code: parsed.testCode || '',
          explanation: `${parsed.explanation}\n\nCoverage: ${parsed.coverage}`,
          confidence: 0.75
        };

        console.log('🤖 Generated test cases:', suggestion);
        return suggestion;
      } catch (error) {
        console.error('❌ Failed to parse test cases:', error);
        return null;
      }
    } else {
      console.error('❌ Test case generation failed:', response.error);
      return null;
    }
  }

  /**
   * Review code for best practices and improvements
   */
  async reviewCode(code: string): Promise<CodeSuggestion | null> {
    console.log('🤖 Reviewing code...');

    const prompt = `
Review this AdGo platform integration code for best practices and improvements:

\`\`\`typescript
${code}
\`\`\`

Please analyze for:
1. Security vulnerabilities
2. Performance optimizations  
3. Error handling improvements
4. Code structure and readability
5. AdGo SDK best practices
6. TypeScript usage optimization

Provide specific recommendations with code examples.

Format as JSON: { "issues": [...], "improvements": "...", "optimizedCode": "...", "securityNotes": "..." }
    `;

    const response = await this.makeAIRequest(prompt);
    
    if (response.success && response.response) {
      try {
        const parsed = JSON.parse(response.response);
        
        const suggestion: CodeSuggestion = {
          type: 'optimization',
          description: 'Code review and optimization',
          code: parsed.optimizedCode || '',
          explanation: `Improvements: ${parsed.improvements}\n\nSecurity Notes: ${parsed.securityNotes}\n\nIssues Found: ${JSON.stringify(parsed.issues)}`,
          confidence: 0.9
        };

        console.log('🤖 Code review:', suggestion);
        return suggestion;
      } catch (error) {
        console.error('❌ Failed to parse code review:', error);
        return null;
      }
    } else {
      console.error('❌ Code review failed:', response.error);
      return null;
    }
  }

  /**
   * Show AI assistant help
   */
  showHelp(): void {
    console.log(`
🤖 AdGo AI Assistant Help

Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 General Help:
  adgoAI.askQuestion("How do I integrate AdGo SDK?")
  adgoAI.askQuestion("What are the rate limits?")

💻 Code Generation:
  adgoAI.generateCode("Create ad fetching function")
  adgoAI.generateCode("Implement error handling")

🐛 Error Analysis:
  adgoAI.explainError(error)
  adgoAI.explainError(new Error("License verification failed"))

📈 Ad Optimization:
  adgoAI.optimizeAd({headline: "Buy Now", description: "Great deals"})
  adgoAI.suggestTargeting("Tech startup software")

🧪 Testing:
  adgoAI.generateTestCases("/api/ads/fetch")
  adgoAI.reviewCode(myCodeString)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configuration:
- Default provider: ${this.defaultProvider}
- Available providers: ${Array.from(this.providers.keys()).join(', ')}

Tips:
- Be specific in your questions
- Include relevant context
- Check console for detailed responses
- Use generated code as starting points

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  }
}

// Create global instance
const adgoAI = new AdGoAIAssistant();

// Export for module usage
export { AdGoAIAssistant };
export type { AIProvider, AIRequest, AIResponse, CodeSuggestion, AdOptimization };