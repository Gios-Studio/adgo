// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AdGo Platform',
  tagline: 'Enterprise Advertising Technology Suite',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.adgo.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'adgo-inc', // Usually your GitHub org/user name.
  projectName: 'adgo-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'ar'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr-FR',
      },
      ar: {
        label: 'العربية',
        direction: 'rtl',
        htmlLang: 'ar-SA',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/adgo-inc/adgo-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          versions: {
            current: {
              label: '1.0.0',
              path: '/',
            },
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/adgo-inc/adgo-docs/tree/main/',
          blogTitle: 'AdGo Developer Blog',
          blogDescription: 'Latest updates, tutorials, and insights from the AdGo team',
          postsPerPage: 'ALL',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} AdGo Solutions Limited.`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-XXXXXXXXXX',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/adgo-social-card.jpg',
      navbar: {
        title: 'AdGo',
        logo: {
          alt: 'AdGo Logo',
          src: 'img/adgo-logo.svg',
          srcDark: 'img/adgo-logo-dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/adgo-inc/adgo-platform',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Quick Start',
                to: '/docs/getting-started',
              },
              {
                label: 'API Reference',
                to: '/docs/api/overview',
              },
              {
                label: 'SDK Guides',
                to: '/docs/sdk/javascript',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Developer Blog',
                to: '/blog',
              },
              {
                label: 'Support Center',
                href: 'https://support.adgo.com',
              },
              {
                label: 'Status Page',
                href: 'https://status.adgo.com',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/adgo',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/adgo_platform',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/company/adgo-inc',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Policy',
                href: 'https://adgo.com/privacy',
              },
              {
                label: 'Terms of Service',
                href: 'https://adgo.com/terms',
              },
              {
                label: 'License Agreement',
                href: 'https://adgo.com/license',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AdGo Solutions Limited. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'typescript', 'javascript', 'jsx', 'tsx'],
      },
      algolia: {
        appId: 'ADGO_SEARCH_APP_ID',
        apiKey: 'ADGO_SEARCH_API_KEY',
        indexName: 'adgo-docs',
        contextualSearch: true,
        externalUrlRegex: 'external\\.com|domain\\.com',
        searchParameters: {},
        searchPagePath: 'search',
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      announcementBar: {
        id: 'v1_release',
        content:
          '🎉 AdGo Platform v1.0.0 is now available! <a target="_blank" rel="noopener noreferrer" href="https://github.com/adgo-inc/adgo-platform/releases/tag/v1.0.0">Check out the release notes</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      metadata: [
        {name: 'keywords', content: 'advertising, ad tech, platform, API, SDK, documentation'},
        {name: 'author', content: 'AdGo Solutions Limited.'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'AdGo Documentation'},
      ],
    }),

  plugins: [
    // Simplified plugin configuration for production build
  ],

  // Webpack configuration removed for production build simplicity
};

module.exports = config;