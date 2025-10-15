/**
 * AdGo Platform - Postman Collection Generator
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

interface PostmanVariable {
  key: string;
  value: string;
  description?: string;
  type?: 'string' | 'number' | 'boolean';
}

interface PostmanHeader {
  key: string;
  value: string;
  description?: string;
}

interface PostmanRequest {
  method: string;
  header: PostmanHeader[];
  url: {
    raw: string;
    host: string[];
    path: string[];
    query?: Array<{ key: string; value: string; description?: string }>;
  };
  description?: string;
  body?: {
    mode: 'raw' | 'formdata' | 'urlencoded';
    raw?: string;
    options?: {
      raw: {
        language: string;
      };
    };
  };
}

interface PostmanItem {
  name: string;
  request: PostmanRequest;
  response?: any[];
  description?: string;
}

interface PostmanFolder {
  name: string;
  item: (PostmanItem | PostmanFolder)[];
  description?: string;
}

interface PostmanCollection {
  info: {
    name: string;
    description: string;
    schema: string;
    version: string;
  };
  item: (PostmanItem | PostmanFolder)[];
  variable: PostmanVariable[];
  auth?: {
    type: string;
    bearer?: Array<{ key: string; value: string; type: string }>;
  };
}

class AdGoPostmanGenerator {
  private baseUrl: string = '{{base_url}}';
  private apiVersion: string = 'v1';

  /**
   * Generate complete Postman collection for AdGo API
   */
  generateCollection(environment: 'sandbox' | 'production' = 'sandbox'): PostmanCollection {
    const collection: PostmanCollection = {
      info: {
        name: 'AdGo Platform API',
        description: `Complete API collection for AdGo advertising platform (${environment})`,
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        version: '1.0.0'
      },
      variable: this.getCollectionVariables(environment),
      auth: {
        type: 'bearer',
        bearer: [
          {
            key: 'token',
            value: '{{auth_token}}',
            type: 'string'
          }
        ]
      },
      item: [
        this.createAuthenticationFolder(),
        this.createSDKFolder(),
        this.createAdsFolder(),
        this.createAnalyticsFolder(),
        this.createBillingFolder(),
        this.createTelemetryFolder(),
        this.createAdminFolder(),
        this.createWebhooksFolder()
      ]
    };

    return collection;
  }

  /**
   * Get collection variables
   */
  private getCollectionVariables(environment: 'sandbox' | 'production'): PostmanVariable[] {
    const baseUrl = environment === 'production' 
      ? 'https://api.adgo.com'
      : 'http://localhost:3000/api';

    return [
      {
        key: 'base_url',
        value: baseUrl,
        description: 'AdGo API base URL',
        type: 'string'
      },
      {
        key: 'api_version',
        value: 'v1',
        description: 'API version',
        type: 'string'
      },
      {
        key: 'license_key',
        value: environment === 'production' ? 'adgo_live_your_key_here' : 'adgo_test_demo_key_123',
        description: 'Your AdGo license key',
        type: 'string'
      },
      {
        key: 'auth_token',
        value: '',
        description: 'JWT authentication token (automatically set)',
        type: 'string'
      },
      {
        key: 'session_id',
        value: '',
        description: 'Session ID for tracking (automatically generated)',
        type: 'string'
      }
    ];
  }

  /**
   * Create Authentication folder
   */
  private createAuthenticationFolder(): PostmanFolder {
    return {
      name: '🔐 Authentication',
      description: 'Authentication and license management endpoints',
      item: [
        {
          name: 'Verify License',
          description: 'Verify your AdGo license key and get authentication token',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' }
            ],
            url: {
              raw: `${this.baseUrl}/sdk/verify`,
              host: ['{{base_url}}'],
              path: ['sdk', 'verify']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                license_key: '{{license_key}}',
                sdk_version: '1.0.0',
                region: 'global'
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        },
        {
          name: 'Get License Info',
          description: 'Get detailed information about your license',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/license/info`,
              host: ['{{base_url}}'],
              path: ['license', 'info']
            }
          }
        },
        {
          name: 'Usage Metering',
          description: 'Record API usage and check remaining quota',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/sdk/meter`,
              host: ['{{base_url}}'],
              path: ['sdk', 'meter']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                license_key: '{{license_key}}',
                calls: 1
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        }
      ]
    };
  }

  /**
   * Create SDK folder
   */
  private createSDKFolder(): PostmanFolder {
    return {
      name: '⚙️ SDK Management',
      description: 'SDK configuration, health checks, and management',
      item: [
        {
          name: 'SDK Health Check',
          description: 'Check SDK service health and availability',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/sdk/health`,
              host: ['{{base_url}}'],
              path: ['sdk', 'health']
            }
          }
        },
        {
          name: 'Get SDK Configuration',
          description: 'Retrieve SDK configuration and feature flags',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/sdk/config?version={{api_version}}`,
              host: ['{{base_url}}'],
              path: ['sdk', 'config'],
              query: [
                { key: 'version', value: '{{api_version}}', description: 'SDK version' }
              ]
            }
          }
        },
        {
          name: 'Update SDK Settings',
          description: 'Update SDK configuration settings',
          request: {
            method: 'PUT',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/sdk/settings`,
              host: ['{{base_url}}'],
              path: ['sdk', 'settings']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                telemetry_enabled: true,
                debug_mode: false,
                cache_ttl: 3600,
                retry_attempts: 3
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        }
      ]
    };
  }

  /**
   * Create Ads folder
   */
  private createAdsFolder(): PostmanFolder {
    return {
      name: '📢 Ads Management',
      description: 'Ad creation, fetching, and management endpoints',
      item: [
        {
          name: 'Fetch Ad',
          description: 'Fetch an ad based on placement and targeting criteria',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/ads/fetch`,
              host: ['{{base_url}}'],
              path: ['ads', 'fetch']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                placement: 'header',
                targeting: {
                  category: 'technology',
                  keywords: ['software', 'development'],
                  demographics: {
                    age_range: '25-45',
                    interests: ['tech', 'programming']
                  }
                },
                format: 'banner',
                size: '728x90'
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        },
        {
          name: 'Create Text Ad',
          description: 'Create a new text-based advertisement',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/ads/text`,
              host: ['{{base_url}}'],
              path: ['ads', 'text']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                headline: 'Boost Your Business Today',
                description: 'Get 50% more leads with our AI-powered advertising platform',
                cta_text: 'Start Free Trial',
                target_url: 'https://example.com/signup',
                category: 'business',
                budget: {
                  daily: 100,
                  total: 1000
                }
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        },
        {
          name: 'Upload Banner Ad',
          description: 'Upload a banner advertisement with image',
          request: {
            method: 'POST',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/ads/banner`,
              host: ['{{base_url}}'],
              path: ['ads', 'banner']
            },
            body: {
              mode: 'formdata'
            }
          }
        },
        {
          name: 'Get Ad Performance',
          description: 'Get performance metrics for a specific ad',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/ads/:ad_id/performance?period=7d`,
              host: ['{{base_url}}'],
              path: ['ads', ':ad_id', 'performance'],
              query: [
                { key: 'period', value: '7d', description: 'Time period (1d, 7d, 30d)' }
              ]
            }
          }
        }
      ]
    };
  }

  /**
   * Create Analytics folder
   */
  private createAnalyticsFolder(): PostmanFolder {
    return {
      name: '📊 Analytics',
      description: 'Analytics, reporting, and performance metrics',
      item: [
        {
          name: 'Campaign Analytics',
          description: 'Get comprehensive campaign analytics',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/analytics/campaigns?start_date=2024-01-01&end_date=2024-12-31`,
              host: ['{{base_url}}'],
              path: ['analytics', 'campaigns'],
              query: [
                { key: 'start_date', value: '2024-01-01', description: 'Start date (YYYY-MM-DD)' },
                { key: 'end_date', value: '2024-12-31', description: 'End date (YYYY-MM-DD)' }
              ]
            }
          }
        },
        {
          name: 'Real-time Metrics',
          description: 'Get real-time performance metrics',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/analytics/realtime`,
              host: ['{{base_url}}'],
              path: ['analytics', 'realtime']
            }
          }
        },
        {
          name: 'Custom Report',
          description: 'Generate custom analytics report',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/analytics/reports`,
              host: ['{{base_url}}'],
              path: ['analytics', 'reports']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                report_type: 'performance',
                date_range: {
                  start: '2024-01-01',
                  end: '2024-12-31'
                },
                metrics: ['impressions', 'clicks', 'ctr', 'revenue'],
                dimensions: ['date', 'category', 'region'],
                filters: {
                  category: 'technology',
                  region: 'US'
                }
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        }
      ]
    };
  }

  /**
   * Create Billing folder
   */
  private createBillingFolder(): PostmanFolder {
    return {
      name: '💳 Billing',
      description: 'Billing, payments, and subscription management',
      item: [
        {
          name: 'Get Billing Info',
          description: 'Get current billing information and usage',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/billing/info`,
              host: ['{{base_url}}'],
              path: ['billing', 'info']
            }
          }
        },
        {
          name: 'Usage Summary',
          description: 'Get usage summary for current billing period',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/billing/usage?period=current`,
              host: ['{{base_url}}'],
              path: ['billing', 'usage'],
              query: [
                { key: 'period', value: 'current', description: 'Billing period (current, previous, custom)' }
              ]
            }
          }
        },
        {
          name: 'Create Invoice',
          description: 'Generate invoice for usage-based billing',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/billing/invoices`,
              host: ['{{base_url}}'],
              path: ['billing', 'invoices']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                billing_period: {
                  start: '2024-01-01',
                  end: '2024-01-31'
                },
                auto_pay: true
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        }
      ]
    };
  }

  /**
   * Create Telemetry folder
   */
  private createTelemetryFolder(): PostmanFolder {
    return {
      name: '📡 Telemetry',
      description: 'Telemetry data collection and monitoring',
      item: [
        {
          name: 'Send Telemetry Event',
          description: 'Send telemetry event to AdGo monitoring system',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/telemetry/events`,
              host: ['{{base_url}}'],
              path: ['telemetry', 'events']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                event_type: 'ad_impression',
                event_data: {
                  ad_id: 'ad_123456',
                  placement: 'header',
                  user_agent: 'Mozilla/5.0...',
                  timestamp: new Date().toISOString()
                },
                session_id: '{{session_id}}',
                metadata: {
                  page_url: 'https://example.com',
                  referrer: 'https://google.com'
                }
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        },
        {
          name: 'Get Telemetry Data',
          description: 'Retrieve telemetry data for analysis',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/telemetry/data?event_type=ad_impression&limit=100`,
              host: ['{{base_url}}'],
              path: ['telemetry', 'data'],
              query: [
                { key: 'event_type', value: 'ad_impression', description: 'Filter by event type' },
                { key: 'limit', value: '100', description: 'Maximum number of records' }
              ]
            }
          }
        }
      ]
    };
  }

  /**
   * Create Admin folder
   */
  private createAdminFolder(): PostmanFolder {
    return {
      name: '👨‍💼 Admin',
      description: 'Administrative endpoints (requires admin privileges)',
      item: [
        {
          name: 'System Status',
          description: 'Get comprehensive system status and health metrics',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' },
              { key: 'X-Admin-Key', value: '{{admin_key}}' }
            ],
            url: {
              raw: `${this.baseUrl}/admin/status`,
              host: ['{{base_url}}'],
              path: ['admin', 'status']
            }
          }
        },
        {
          name: 'User Management',
          description: 'Manage user accounts and permissions',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' },
              { key: 'X-Admin-Key', value: '{{admin_key}}' }
            ],
            url: {
              raw: `${this.baseUrl}/admin/users?page=1&limit=50`,
              host: ['{{base_url}}'],
              path: ['admin', 'users'],
              query: [
                { key: 'page', value: '1', description: 'Page number' },
                { key: 'limit', value: '50', description: 'Results per page' }
              ]
            }
          }
        },
        {
          name: 'Security Logs',
          description: 'Access security and audit logs',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' },
              { key: 'X-Admin-Key', value: '{{admin_key}}' }
            ],
            url: {
              raw: `${this.baseUrl}/admin/security/logs?severity=high&limit=100`,
              host: ['{{base_url}}'],
              path: ['admin', 'security', 'logs'],
              query: [
                { key: 'severity', value: 'high', description: 'Filter by severity level' },
                { key: 'limit', value: '100', description: 'Maximum number of logs' }
              ]
            }
          }
        }
      ]
    };
  }

  /**
   * Create Webhooks folder
   */
  private createWebhooksFolder(): PostmanFolder {
    return {
      name: '🔗 Webhooks',
      description: 'Webhook configuration and management',
      item: [
        {
          name: 'Create Webhook',
          description: 'Create a new webhook endpoint',
          request: {
            method: 'POST',
            header: [
              { key: 'Content-Type', value: 'application/json' },
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/webhooks`,
              host: ['{{base_url}}'],
              path: ['webhooks']
            },
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                url: 'https://your-app.com/webhooks/adgo',
                events: ['ad.impression', 'ad.click', 'billing.invoice_created'],
                secret: 'your_webhook_secret_key',
                active: true
              }, null, 2),
              options: {
                raw: { language: 'json' }
              }
            }
          }
        },
        {
          name: 'List Webhooks',
          description: 'Get all configured webhooks',
          request: {
            method: 'GET',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/webhooks`,
              host: ['{{base_url}}'],
              path: ['webhooks']
            }
          }
        },
        {
          name: 'Test Webhook',
          description: 'Send test event to webhook endpoint',
          request: {
            method: 'POST',
            header: [
              { key: 'Authorization', value: 'Bearer {{auth_token}}' }
            ],
            url: {
              raw: `${this.baseUrl}/webhooks/:webhook_id/test`,
              host: ['{{base_url}}'],
              path: ['webhooks', ':webhook_id', 'test']
            }
          }
        }
      ]
    };
  }

  /**
   * Generate environment file for Postman
   */
  generateEnvironment(name: string, environment: 'sandbox' | 'production'): any {
    const baseUrl = environment === 'production' 
      ? 'https://api.adgo.com'
      : 'http://localhost:3000/api';

    return {
      id: `adgo-env-${environment}-${Date.now()}`,
      name: `AdGo ${name} (${environment})`,
      values: [
        {
          key: 'base_url',
          value: baseUrl,
          type: 'default',
          enabled: true
        },
        {
          key: 'api_version',
          value: 'v1',
          type: 'default',
          enabled: true
        },
        {
          key: 'license_key',
          value: environment === 'production' 
            ? 'adgo_live_your_key_here' 
            : 'adgo_test_demo_key_123',
          type: 'secret',
          enabled: true
        },
        {
          key: 'auth_token',
          value: '',
          type: 'secret',
          enabled: true
        },
        {
          key: 'admin_key',
          value: environment === 'production' 
            ? 'your_admin_key_here' 
            : 'admin_demo_key',
          type: 'secret',
          enabled: true
        },
        {
          key: 'session_id',
          value: `session_${Date.now()}`,
          type: 'default',
          enabled: true
        }
      ],
      _postman_variable_scope: 'environment'
    };
  }

  /**
   * Generate complete Postman workspace export
   */
  generateWorkspace(workspaceName: string): any {
    return {
      workspace: {
        name: workspaceName,
        description: 'Complete AdGo Platform API workspace with collections and environments',
        collections: [
          this.generateCollection('sandbox'),
          this.generateCollection('production')
        ],
        environments: [
          this.generateEnvironment('Development', 'sandbox'),
          this.generateEnvironment('Production', 'production')
        ]
      }
    };
  }

  /**
   * Export collection as JSON file
   */
  exportCollection(environment: 'sandbox' | 'production' = 'sandbox'): string {
    const collection = this.generateCollection(environment);
    return JSON.stringify(collection, null, 2);
  }

  /**
   * Export environment as JSON file
   */
  exportEnvironment(name: string, environment: 'sandbox' | 'production'): string {
    const env = this.generateEnvironment(name, environment);
    return JSON.stringify(env, null, 2);
  }

  /**
   * Generate README for the Postman collection
   */
  generateReadme(): string {
    return `# AdGo Platform Postman Collection

## Overview
This Postman collection provides complete API documentation and testing capabilities for the AdGo advertising platform.

## Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Select the \`AdGo-Platform-API.postman_collection.json\` file
4. Click "Import"

### 2. Import Environment
1. Click the "Environments" tab
2. Click "Import"
3. Select environment file (\`AdGo-Sandbox.postman_environment.json\` or \`AdGo-Production.postman_environment.json\`)
4. Click "Import"

### 3. Configure Environment Variables
Update the following variables in your environment:

- \`license_key\`: Your AdGo license key
- \`base_url\`: API base URL (automatically set)
- \`auth_token\`: Will be set automatically after authentication

## Authentication Flow

### Step 1: Verify License
1. Run the "Verify License" request from the Authentication folder
2. This will automatically set the \`auth_token\` variable for subsequent requests

### Step 2: Test Connection
1. Run "SDK Health Check" to verify your connection
2. Check that you receive a successful response

## Collection Structure

### 🔐 Authentication
- License verification and token management
- Usage metering and quota checking

### ⚙️ SDK Management  
- SDK configuration and health checks
- Feature flag management

### 📢 Ads Management
- Create and manage advertisements
- Fetch ads based on targeting criteria
- Performance tracking

### 📊 Analytics
- Campaign performance metrics
- Real-time analytics
- Custom reporting

### 💳 Billing
- Billing information and invoices
- Usage-based pricing calculations
- Payment processing

### 📡 Telemetry
- Event tracking and monitoring
- Performance metrics collection
- Error reporting

### 👨‍💼 Admin
- Administrative functions (requires admin access)
- User management
- System monitoring

### 🔗 Webhooks
- Webhook configuration
- Event subscription management
- Testing and validation

## Common Variables

| Variable | Description | Example |
|----------|-------------|---------|
| \`base_url\` | API base URL | \`https://api.adgo.com\` |
| \`license_key\` | Your license key | \`adgo_live_abc123...\` |
| \`auth_token\` | JWT token | Auto-generated |
| \`session_id\` | Session identifier | Auto-generated |

## Error Handling

The collection includes examples of common error responses:

- **401 Unauthorized**: Invalid or expired license key
- **429 Too Many Requests**: Rate limit exceeded  
- **422 Validation Error**: Invalid request parameters
- **500 Server Error**: Internal server issues

## Rate Limits

Different endpoints have different rate limits:

- Authentication: 100 requests per hour
- Ad Fetching: 10,000 requests per hour  
- Analytics: 1,000 requests per hour
- Admin: 500 requests per hour

## Support

For API support and questions:

- Documentation: https://docs.adgo.com
- Support: support@adgosolutions.com
- Status Page: https://status.adgo.com

## Version History

- **v1.0.0**: Initial release with core API endpoints
- **v1.1.0**: Added advanced analytics and billing endpoints
- **v1.2.0**: Added webhooks and admin functionality

---

© 2025 AdGo Solutions Limited. All rights reserved.
`;
  }
}

// Export the generator
export { AdGoPostmanGenerator };

// CLI usage example
if (typeof require !== 'undefined' && require.main === module) {
  const generator = new AdGoPostmanGenerator();
  
  // Generate sandbox collection
  const sandboxCollection = generator.exportCollection('sandbox');
  console.log('Sandbox Collection Generated:', sandboxCollection.substring(0, 200) + '...');
  
  // Generate production environment
  const prodEnvironment = generator.exportEnvironment('Production', 'production');
  console.log('Production Environment Generated:', prodEnvironment.substring(0, 200) + '...');
  
  // Generate README
  const readme = generator.generateReadme();
  console.log('README Generated:', readme.substring(0, 200) + '...');
}