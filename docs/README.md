# 📚 AdGo Platform Documentation

[![Documentation Status](https://img.shields.io/badge/docs-live-brightgreen)](https://docs.adgo.com)
[![Build Status](https://github.com/adgo-inc/adgo-platform/workflows/Deploy%20Documentation/badge.svg)](https://github.com/adgo-inc/adgo-platform/actions)
[![Version](https://img.shields.io/github/v/release/adgo-inc/adgo-platform)](https://github.com/adgo-inc/adgo-platform/releases)

This repository contains the comprehensive documentation for the **AdGo Platform** - an enterprise advertising technology suite with global reach, advanced targeting, and comprehensive analytics.

## 🌍 Live Documentation

- **Production**: [docs.adgo.com](https://docs.adgo.com)
- **Staging**: [docs-staging.adgo.com](https://docs-staging.adgo.com)
- **Local Development**: `http://localhost:3000`

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn**
- **Git**

### Local Development

```bash
# Clone the repository
git clone https://github.com/adgo-inc/adgo-platform.git
cd adgo-platform/docs

# Install dependencies
npm install

# Start development server
npm start
```

The documentation site will be available at `http://localhost:3000` with live reload enabled.

### Building for Production

```bash
# Build static files
npm run build

# Serve built files locally
npm run serve
```

## 📋 Documentation Structure

```
docs/
├── docs/                          # Main documentation content
│   ├── getting-started/          # Quick start guides
│   ├── concepts/                 # Core platform concepts
│   ├── integration/              # Integration tutorials
│   ├── api/                      # API reference
│   ├── sdk/                      # SDK documentation
│   ├── advanced/                 # Advanced topics
│   ├── developer-tools/          # Developer experience tools
│   └── troubleshooting/          # Common issues and solutions
├── blog/                         # Developer blog posts
├── src/                          # React components and pages
│   ├── components/               # Reusable components
│   ├── css/                      # Global styles
│   └── pages/                    # Custom pages
├── static/                       # Static assets
│   ├── img/                      # Images and logos
│   └── files/                    # Downloadable files
├── docusaurus.config.js          # Main configuration
├── sidebars.js                   # Navigation structure
└── package.json                  # Dependencies and scripts
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server with live reload |
| `npm run build` | Build static production files |
| `npm run serve` | Serve built files locally |
| `npm run clear` | Clear Docusaurus cache |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run write-translations` | Extract translatable strings |
| `npm run typecheck` | Run TypeScript type checking |

## 📝 Content Guidelines

### Writing Style
- **Clear and Concise**: Use simple, direct language
- **Developer-Focused**: Write for technical audiences
- **Example-Rich**: Include code samples and practical examples
- **Actionable**: Provide clear next steps and CTAs

### Markdown Features
This documentation supports extended Markdown features:

#### Code Blocks with Syntax Highlighting
```javascript
import AdGoSDK from '@adgo/sdk';

const adgo = new AdGoSDK({
  licenseKey: 'adgo_your_license_key_here'
});
```

#### Interactive Tabs
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript" default>
    // JavaScript code here
  </TabItem>
  <TabItem value="ts" label="TypeScript">
    // TypeScript code here
  </TabItem>
</Tabs>
```

#### Admonitions
```markdown
:::tip
This is a helpful tip for developers!
:::

:::warning
This is an important warning to pay attention to.
:::

:::danger
This indicates a critical issue that must be addressed.
:::
```

### Front Matter
All documentation pages should include proper front matter:

```yaml
---
title: Page Title
sidebar_label: Short Label
sidebar_position: 1
description: Brief description for SEO
keywords: [keyword1, keyword2, keyword3]
---
```

## 🌐 Internationalization (i18n)

The documentation supports multiple languages:

- **English** (`en`) - Default
- **French** (`fr`) - Français
- **Arabic** (`ar`) - العربية

### Adding Translations

1. **Extract translatable strings**:
   ```bash
   npm run write-translations -- --locale fr
   ```

2. **Translate content**:
   - Copy markdown files to `i18n/[locale]/docusaurus-plugin-content-docs/current/`
   - Translate the content while preserving the structure

3. **Test translations**:
   ```bash
   npm start -- --locale fr
   ```

## 🔄 Deployment Process

### Automated Deployment
The documentation is automatically deployed using GitHub Actions:

1. **Staging**: Triggered on pushes to `develop` branch
2. **Production**: Triggered on pushes to `main` branch
3. **Manual**: Can be triggered via GitHub Actions UI

### Manual Deployment

```bash
# Build the documentation
npm run build

# Deploy to GitHub Pages (if configured)
npm run deploy
```

## 🧪 Testing

### Local Testing

```bash
# Build and serve locally
npm run build
npm run serve

# Test different locales
npm start -- --locale fr
npm start -- --locale ar
```

### Automated Testing
The CI/CD pipeline includes:

- **Build Verification**: Ensures documentation builds successfully
- **Link Checking**: Validates all internal and external links
- **Accessibility Testing**: Checks WCAG compliance
- **Performance Auditing**: Monitors bundle sizes and load times

## 📊 Analytics & Monitoring

### Google Analytics
The documentation includes Google Analytics 4 tracking:
- **Tracking ID**: Configured in `docusaurus.config.js`
- **Privacy**: Anonymized IP collection enabled
- **Events**: Custom events for documentation engagement

### Search Analytics
Algolia DocSearch provides:
- **Real-time search**: Instant search results
- **Analytics**: Search query insights
- **Indexing**: Automatic content crawling

## 🤝 Contributing

### Content Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b docs/new-feature`
3. **Write/edit documentation** following our style guidelines
4. **Test locally**: `npm start` and verify changes
5. **Submit a pull request** with detailed description

### Review Process
- **Technical Review**: Engineering team validates accuracy
- **Editorial Review**: Technical writing team checks style and clarity
- **User Testing**: Selected users test new content flows

### Contribution Guidelines

- **One Topic Per PR**: Keep changes focused and reviewable
- **Clear Commit Messages**: Use conventional commit format
- **Test All Changes**: Verify builds and links work correctly
- **Update Navigation**: Add new pages to `sidebars.js` if needed

## 🔍 SEO Optimization

### Meta Tags
- **Title Tags**: Descriptive and keyword-rich
- **Meta Descriptions**: Concise summaries under 160 characters  
- **Open Graph**: Social sharing optimizations
- **Schema Markup**: Structured data for search engines

### Performance
- **Image Optimization**: WebP format with fallbacks
- **Bundle Splitting**: Automatic code splitting by Docusaurus
- **CDN**: Global content delivery via Cloudflare
- **Caching**: Aggressive caching for static assets

## 📱 Responsive Design

The documentation is fully responsive and tested on:
- **Desktop**: 1920×1080, 1366×768
- **Tablet**: iPad (768×1024), iPad Pro (1024×1366)
- **Mobile**: iPhone (375×667), Android (360×640)

## ♿ Accessibility

### WCAG Compliance
- **Level AA**: Full compliance with WCAG 2.1 Level AA
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: Compatible with NVDA, JAWS, VoiceOver
- **Color Contrast**: Minimum 4.5:1 ratio for all text

### Testing Tools
- **axe-core**: Automated accessibility testing
- **pa11y**: CI/CD accessibility validation  
- **Lighthouse**: Performance and accessibility auditing

## 🛠️ Development Tools

### IDE Setup
Recommended VS Code extensions:
- **MDX**: Syntax highlighting for MDX files
- **Prettier**: Code formatting
- **ESLint**: JavaScript/TypeScript linting
- **markdownlint**: Markdown style checking

### Browser DevTools
- **React DevTools**: Component debugging
- **Lighthouse**: Performance auditing
- **axe DevTools**: Accessibility testing

## 📞 Support & Resources

### Documentation Team
- **Technical Writing**: [docs@adgosolutions.com](mailto:docs@adgosolutions.com)
- **Developer Relations**: [devrel@adgosolutions.com](mailto:devrel@adgosolutions.com)
- **Engineering Support**: [engineering@adgosolutions.com](mailto:engineering@adgosolutions.com)

### Community Resources
- **Discord**: [discord.gg/adgo](https://discord.gg/adgo)
- **GitHub Discussions**: [GitHub Discussions](https://github.com/adgo-inc/adgo-platform/discussions)
- **Stack Overflow**: Tag questions with `adgo-platform`

### Documentation Issues
Found an issue? Please report it:
1. **Check existing issues**: [GitHub Issues](https://github.com/adgo-inc/adgo-platform/issues)
2. **Create new issue**: Use the documentation issue template
3. **Include details**: Page URL, browser, expected vs actual behavior

## 📄 License

The AdGo Platform documentation is licensed under the [MIT License](../LICENSE).

The AdGo Platform itself is proprietary software owned by AdGo Solutions Limited. See [licensing terms](https://adgo.com/license) for usage rights.

---

## 🏆 Acknowledgments

Special thanks to:
- **Docusaurus Team**: For the excellent documentation platform
- **Contributors**: All community members who have improved our docs
- **Beta Testers**: Early adopters who provided valuable feedback
- **Design Team**: For the beautiful visual design and UX

---

**Built with ❤️ by the AdGo team** | Copyright © 2025 AdGo Solutions Limited.