/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/quick-start',
        'getting-started/authentication',
        'getting-started/first-request',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'concepts/platform-overview',
        'concepts/advertising-flow',
        'concepts/targeting-system',
        'concepts/analytics-tracking',
        'concepts/billing-metering',
      ],
    },
    {
      type: 'category',
      label: 'Integration Guides',
      collapsed: false,
      items: [
        'integration/web-integration',
        'integration/mobile-integration',
        'integration/server-integration',
        'integration/webhook-setup',
        'integration/testing-debugging',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      collapsed: true,
      items: [
        'advanced/multi-region-setup',
        'advanced/custom-targeting',
        'advanced/performance-optimization',
        'advanced/security-best-practices',
        'advanced/compliance-gdpr',
      ],
    },
    {
      type: 'category',
      label: 'Developer Tools',
      collapsed: true,
      items: [
        'developer-tools/sandbox-environment',
        'developer-tools/error-debugging',
        'developer-tools/postman-collections',
        'developer-tools/ai-assistant',
        'developer-tools/testing-framework',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: true,
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/error-codes',
        'troubleshooting/performance-issues',
        'troubleshooting/support-contact',
      ],
    },
  ],

  // API Reference sidebar
  apiSidebar: [
    {
      type: 'category',
      label: 'API Overview',
      collapsed: false,
      items: [
        'api/overview',
        'api/authentication',
        'api/rate-limits',
        'api/pagination',
        'api/error-handling',
      ],
    },
    {
      type: 'category',
      label: 'Endpoints',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'api/endpoints/auth/license-verification',
            'api/endpoints/auth/token-refresh',
            'api/endpoints/auth/usage-tracking',
          ],
        },
        {
          type: 'category',
          label: 'Advertisements',
          items: [
            'api/endpoints/ads/fetch-ad',
            'api/endpoints/ads/record-impression',
            'api/endpoints/ads/record-click',
            'api/endpoints/ads/ad-targeting',
          ],
        },
        {
          type: 'category',
          label: 'Analytics',
          items: [
            'api/endpoints/analytics/performance-metrics',
            'api/endpoints/analytics/revenue-reports',
            'api/endpoints/analytics/user-insights',
            'api/endpoints/analytics/custom-events',
          ],
        },
        {
          type: 'category',
          label: 'Billing',
          items: [
            'api/endpoints/billing/usage-summary',
            'api/endpoints/billing/invoice-generation',
            'api/endpoints/billing/payment-methods',
            'api/endpoints/billing/subscription-management',
          ],
        },
        {
          type: 'category',
          label: 'Telemetry',
          items: [
            'api/endpoints/telemetry/event-reporting',
            'api/endpoints/telemetry/performance-data',
            'api/endpoints/telemetry/error-reporting',
            'api/endpoints/telemetry/real-time-monitoring',
          ],
        },
        {
          type: 'category',
          label: 'Admin',
          items: [
            'api/endpoints/admin/user-management',
            'api/endpoints/admin/system-monitoring',
            'api/endpoints/admin/configuration',
            'api/endpoints/admin/audit-logs',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Webhooks',
      collapsed: true,
      items: [
        'api/webhooks/overview',
        'api/webhooks/security',
        'api/webhooks/event-types',
        'api/webhooks/testing',
      ],
    },
  ],

  // SDK sidebar
  sdkSidebar: [
    {
      type: 'category',
      label: 'JavaScript SDK',
      collapsed: false,
      items: [
        'sdk/javascript/overview',
        'sdk/javascript/installation',
        'sdk/javascript/configuration',
        'sdk/javascript/basic-usage',
        'sdk/javascript/advanced-features',
        'sdk/javascript/error-handling',
        'sdk/javascript/offline-support',
        'sdk/javascript/typescript-support',
      ],
    },
    {
      type: 'category',
      label: 'Mobile SDKs',
      collapsed: true,
      items: [
        'sdk/mobile/ios-swift',
        'sdk/mobile/android-kotlin',
        'sdk/mobile/react-native',
        'sdk/mobile/flutter',
      ],
    },
    {
      type: 'category',
      label: 'Server SDKs',
      collapsed: true,
      items: [
        'sdk/server/nodejs',
        'sdk/server/python',
        'sdk/server/php',
        'sdk/server/go',
        'sdk/server/java',
        'sdk/server/csharp',
      ],
    },
    {
      type: 'category',
      label: 'Framework Integrations',
      collapsed: true,
      items: [
        'sdk/frameworks/nextjs',
        'sdk/frameworks/react',
        'sdk/frameworks/vue',
        'sdk/frameworks/angular',
        'sdk/frameworks/svelte',
      ],
    },
  ],
};

module.exports = sidebars;