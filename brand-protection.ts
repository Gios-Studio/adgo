/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:33 UTC
 */

/**
 * AdGo Platform - Brand Protection & Anti-Piracy System
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

import { createHash } from 'crypto';

interface BrandAsset {
  name: string;
  type: 'logo' | 'icon' | 'wordmark' | 'color' | 'font';
  path?: string;
  value?: string;
  restrictions: string[];
  protection_level: 'standard' | 'enhanced' | 'maximum';
}

interface BrandViolation {
  id: string;
  type: 'unauthorized_usage' | 'modification' | 'impersonation' | 'trademark_infringement';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detected_at: string;
  source_url?: string;
  evidence: string[];
}

interface BrandMonitoringConfig {
  company: string;
  brand_name: string;
  trademarks: string[];
  protected_terms: string[];
  monitoring_enabled: boolean;
  auto_takedown: boolean;
  alert_email: string;
}

class AdGoBrandProtector {
  private config: BrandMonitoringConfig;
  private protectedAssets: BrandAsset[];
  private violations: BrandViolation[];

  constructor(config: BrandMonitoringConfig) {
    this.config = config;
    this.protectedAssets = [];
    this.violations = [];
    this.initializeProtectedAssets();
  }

  private initializeProtectedAssets(): void {
    this.protectedAssets = [
      {
        name: 'AdGo Primary Logo',
        type: 'logo',
        path: '/src/assets/adgo-logo.png',
        restrictions: [
          'Minimum size: 24px height',
          'Clear space: Equal to logo height',
          'No modifications allowed',
          'Use only on approved backgrounds'
        ],
        protection_level: 'maximum'
      },
      {
        name: 'AdGo Full Logo',
        type: 'logo',
        path: '/src/assets/adgo-logo-full.png',
        restrictions: [
          'Minimum size: 32px height',
          'Maintain aspect ratio',
          'No text modifications',
          'Professional contexts only'
        ],
        protection_level: 'maximum'
      },
      {
        name: 'AdGo Icon',
        type: 'icon',
        path: '/src/assets/adgo-icon.png',
        restrictions: [
          'Minimum size: 16px',
          'No color modifications',
          'Maintain square format'
        ],
        protection_level: 'enhanced'
      },
      {
        name: 'Primary Brand Blue',
        type: 'color',
        value: '#667eea',
        restrictions: [
          'Use exact hex value',
          'No color variations without approval',
          'Accessibility compliant usage only'
        ],
        protection_level: 'standard'
      },
      {
        name: 'Secondary Purple',
        type: 'color',
        value: '#764ba2',
        restrictions: [
          'Use exact hex value',
          'Complementary use with primary color',
          'Gradient applications approved'
        ],
        protection_level: 'standard'
      },
      {
        name: 'Accent Gold',
        type: 'color',
        value: '#ffd700',
        restrictions: [
          'Sparingly used for highlights',
          'Not for large areas',
          'Maintain readability'
        ],
        protection_level: 'standard'
      },
      {
        name: 'Inter Font Family',
        type: 'font',
        value: 'Inter, Arial, sans-serif',
        restrictions: [
          'Primary font for body text',
          'Minimum 16px for accessibility',
          'Maintain font licensing'
        ],
        protection_level: 'standard'
      }
    ];
  }

  /**
   * Generate digital fingerprint for brand assets
   */
  generateAssetFingerprint(assetPath: string): string {
    try {
      const fs = require('fs');
      const content = fs.readFileSync(assetPath);
      return createHash('sha256').update(content).digest('hex');
    } catch (error) {
      console.warn(`Could not generate fingerprint for ${assetPath}:`, error);
      return '';
    }
  }

  /**
   * Create comprehensive brand usage guidelines
   */
  generateBrandGuidelines(): string {
    return `# AdGo Brand Usage Guidelines

## Brand Protection Notice
The AdGo™ brand, including all logos, trademarks, and visual elements, are the exclusive property of ${this.config.company}. Unauthorized use is strictly prohibited.

## Logo Usage Standards

### AdGo Primary Logo
- **File:** adgo-logo.png
- **Minimum Size:** 24px height (digital), 0.5" (print)
- **Clear Space:** Equal to the height of the logo on all sides
- **Backgrounds:** White, light gray (#f8f9fa), or branded blue (#667eea)
- **Restrictions:** No modifications, rotations, or distortions

### AdGo Full Logo
- **File:** adgo-logo-full.png  
- **Minimum Size:** 32px height (digital), 0.75" (print)
- **Usage:** Official communications, business documents
- **Restrictions:** Text cannot be separated from icon

### AdGo Icon
- **File:** adgo-icon.png
- **Minimum Size:** 16px (square format)
- **Usage:** App icons, favicons, social media profiles
- **Restrictions:** Must maintain square proportions

## Color Palette

### Primary Colors
- **Brand Blue:** #667eea (Primary brand color)
- **Purple:** #764ba2 (Secondary, gradients)
- **Gold:** #ffd700 (Accents only, sparingly)

### Usage Rules
- Always use exact hex values
- Ensure WCAG AA accessibility compliance
- Test on various backgrounds for readability

## Typography

### Primary Font Family
- **Digital:** Inter (Google Fonts)
- **Fallbacks:** Arial, Helvetica, sans-serif
- **Minimum Size:** 16px for body text
- **Licensing:** Respect SIL Open Font License

### Font Weights
- Regular (400): Body text
- Medium (500): Subheadings  
- Semi-Bold (600): Headings
- Bold (700): Emphasis only

## Trademark Usage

### AdGo™ Trademark
- Always include ™ symbol on first use in materials
- Use "AdGo platform" not "AdGo" as generic term
- Proper: "The AdGo™ advertising platform"
- Incorrect: "AdGo your ads" or "Use AdGo"

### Legal Requirements
- Attribution required in all uses
- Cannot be used to endorse third-party products
- Must comply with trademark laws in all jurisdictions

## Prohibited Uses

### Logo Restrictions
❌ Do NOT:
- Modify colors, fonts, or proportions
- Add effects, shadows, or gradients to logo
- Use on busy or low-contrast backgrounds  
- Rotate, skew, or distort the logo
- Use outdated or unofficial versions

### Brand Name Restrictions
❌ Do NOT:
- Use as a generic term for advertising
- Modify spelling or capitalization
- Combine with other company names
- Use in domain names without permission
- Translate into other languages

## Digital Asset Protection

### File Integrity
All brand assets include digital signatures for authenticity verification:
- SHA256 hashes for tamper detection
- Metadata preservation required
- Version control through official channels only

### Usage Monitoring
- Automated brand monitoring systems active
- Violation reporting: brandprotection@adgosolutions.com
- Legal enforcement for unauthorized usage
- Takedown procedures for infringement

## Approval Process

### Pre-Approval Required
- Marketing materials and advertisements
- Partnership and co-branding opportunities  
- Merchandise and promotional items
- Digital products and applications

### Contact Information
- **Brand Guidelines:** brand@adgosolutions.com
- **Usage Approval:** marketing@adgosolutions.com
- **Violation Reports:** brandprotection@adgosolutions.com
- **Legal Matters:** legal@adgosolutions.com

## Compliance Checklist

Before using AdGo brand elements, ensure:
- [ ] Proper logo size and clear space maintained
- [ ] Approved color palette used exactly
- [ ] Trademark symbols included correctly
- [ ] Usage aligns with brand guidelines
- [ ] Legal approval obtained if required
- [ ] Asset integrity preserved

## Updates and Revisions
These guidelines are updated periodically. Always use the latest version available at: https://adgo.com/brand-guidelines

---
© ${new Date().getFullYear()} ${this.config.company}. All rights reserved.
AdGo™ is a trademark of ${this.config.company}.

Last Updated: ${new Date().toISOString().split('T')[0]}
Version: 1.0.0`;
  }

  /**
   * Create tamper detection system for brand assets
   */
  createTamperDetection(): string {
    return `/**
 * AdGo Brand Asset Tamper Detection
 * Monitors brand assets for unauthorized modifications
 */

class AdGoBrandTamperDetector {
  private static readonly ASSET_HASHES = {
    'adgo-logo.png': '${this.generateAssetFingerprint('/src/assets/adgo-logo.png')}',
    'adgo-logo-full.png': '${this.generateAssetFingerprint('/src/assets/adgo-logo-full.png')}',
    'adgo-icon.png': '${this.generateAssetFingerprint('/src/assets/adgo-icon.png')}'
  };

  private static readonly PROTECTED_COLORS = [
    '#667eea', // Primary blue
    '#764ba2', // Secondary purple  
    '#ffd700'  // Accent gold
  ];

  /**
   * Verify brand asset integrity
   */
  static async verifyAssetIntegrity(assetPath: string): Promise<boolean> {
    try {
      const response = await fetch(assetPath);
      const arrayBuffer = await response.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      const expectedHash = this.ASSET_HASHES[assetPath.split('/').pop() || ''];
      
      if (expectedHash && hashHex !== expectedHash) {
        this.reportTamperAttempt(assetPath, 'Hash mismatch detected');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Asset integrity check failed:', error);
      return false;
    }
  }

  /**
   * Monitor DOM for unauthorized logo usage
   */
  static monitorDOMForBrandAssets(): void {
    if (typeof window === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            this.checkElementForBrandViolations(element);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'style', 'class']
    });
  }

  /**
   * Check element for potential brand violations
   */
  private static checkElementForBrandViolations(element: Element): void {
    // Check for unauthorized logo usage
    const images = element.querySelectorAll('img');
    images.forEach((img) => {
      if (img.src && this.isAdGoAsset(img.src) && !this.isAuthorizedUsage(img)) {
        this.reportBrandViolation('unauthorized_logo_usage', img.src);
      }
    });

    // Check for trademark violations
    const textContent = element.textContent || '';
    if (this.containsTrademarkViolation(textContent)) {
      this.reportBrandViolation('trademark_violation', textContent);
    }

    // Check for color theft
    const computedStyle = window.getComputedStyle(element);
    if (this.isUsingProtectedColors(computedStyle)) {
      this.reportBrandViolation('color_theft', computedStyle.backgroundColor);
    }
  }

  /**
   * Check if asset is an AdGo brand asset
   */
  private static isAdGoAsset(src: string): boolean {
    return src.includes('adgo-logo') || src.includes('adgo-icon');
  }

  /**
   * Check if usage is authorized
   */
  private static isAuthorizedUsage(img: HTMLImageElement): boolean {
    // Check for proper attribution and authorized domains
    const authorizedDomains = ['adgo.com', 'localhost', '127.0.0.1'];
    const currentDomain = window.location.hostname;
    
    return authorizedDomains.includes(currentDomain) && 
           img.hasAttribute('data-adgo-authorized');
  }

  /**
   * Check for trademark violations in text
   */
  private static containsTrademarkViolation(text: string): boolean {
    const violations = [
      /adgo(?!™)/gi, // AdGo without trademark symbol
      /ad\\s*go/gi,  // Spaced version
      /ADGO/g        // All caps without permission
    ];

    return violations.some(pattern => pattern.test(text));
  }

  /**
   * Check if element uses protected brand colors
   */
  private static isUsingProtectedColors(style: CSSStyleDeclaration): boolean {
    const colorProperties = [
      style.backgroundColor,
      style.color,
      style.borderColor
    ];

    return colorProperties.some(color => 
      this.PROTECTED_COLORS.some(protectedColor =>
        this.colorsMatch(color, protectedColor)
      )
    );
  }

  /**
   * Compare colors for similarity
   */
  private static colorsMatch(color1: string, color2: string): boolean {
    // Normalize colors and check for exact matches
    const normalize = (color: string) => color.replace(/\\s+/g, '').toLowerCase();
    return normalize(color1) === normalize(color2);
  }

  /**
   * Report tamper attempt
   */
  private static reportTamperAttempt(asset: string, reason: string): void {
    console.error('🚨 Brand Asset Tamper Detected:', { asset, reason });
    
    // Send to monitoring system
    if (typeof fetch !== 'undefined') {
      fetch('/api/brand-protection/tamper-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tamper_attempt',
          asset,
          reason,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(console.error);
    }
  }

  /**
   * Report brand violation
   */
  private static reportBrandViolation(type: string, details: string): void {
    console.warn('⚠️ Brand Violation Detected:', { type, details });
    
    // Report to brand protection system
    if (typeof fetch !== 'undefined') {
      fetch('/api/brand-protection/violation-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          details,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          severity: this.calculateSeverity(type)
        })
      }).catch(console.error);
    }
  }

  /**
   * Calculate violation severity
   */
  private static calculateSeverity(type: string): string {
    switch (type) {
      case 'unauthorized_logo_usage':
      case 'trademark_violation':
        return 'high';
      case 'color_theft':
        return 'medium';
      default:
        return 'low';
    }
  }

  /**
   * Initialize brand protection
   */
  static initialize(): void {
    // Verify critical assets on load
    ['adgo-logo.png', 'adgo-logo-full.png', 'adgo-icon.png'].forEach(asset => {
      this.verifyAssetIntegrity(\`/assets/\${asset}\`);
    });

    // Start DOM monitoring
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.monitorDOMForBrandAssets();
      });
    } else {
      this.monitorDOMForBrandAssets();
    }

    console.log('🛡️ AdGo Brand Protection System Active');
  }
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  AdGoBrandTamperDetector.initialize();
}

export default AdGoBrandTamperDetector;`;
  }

  /**
   * Generate brand protection configuration
   */
  generateBrandConfig(): object {
    return {
      brand_protection: {
        company: this.config.company,
        brand_name: this.config.brand_name,
        monitoring: {
          enabled: true,
          auto_takedown: false,
          alert_threshold: 'medium',
          monitoring_keywords: [
            'AdGo',
            'Ad Go', 
            'ADGO',
            'advanced advertising',
            'adgo platform'
          ]
        },
        assets: this.protectedAssets.map(asset => ({
          name: asset.name,
          type: asset.type,
          fingerprint: asset.path ? this.generateAssetFingerprint(asset.path) : null,
          protection_level: asset.protection_level,
          restrictions: asset.restrictions
        })),
        legal: {
          trademark_notice: `AdGo™ is a trademark of ${this.config.company}`,
          copyright_notice: `© ${new Date().getFullYear()} ${this.config.company}. All rights reserved.`,
          license_type: 'Proprietary',
          enforcement_policy: 'Strict',
          contact_email: 'legal@adgosolutions.com'
        },
        technical: {
          watermarking: true,
          fingerprinting: true,
          tamper_detection: true,
          usage_tracking: true,
          violation_reporting: true
        }
      }
    };
  }

  /**
   * Create comprehensive brand protection package
   */
  createBrandProtectionPackage(): void {
    const fs = require('fs');

    try {
      // Generate brand guidelines
      const guidelines = this.generateBrandGuidelines();
      fs.writeFileSync('BRAND-GUIDELINES.md', guidelines, 'utf-8');
      console.log('✅ Generated BRAND-GUIDELINES.md');

      // Generate tamper detection code
      const tamperDetection = this.createTamperDetection();
      fs.writeFileSync('src/utils/brand-protection.ts', tamperDetection, 'utf-8');
      console.log('✅ Generated brand-protection.ts');

      // Generate brand configuration
      const config = this.generateBrandConfig();
      fs.writeFileSync('brand-protection.json', JSON.stringify(config, null, 2), 'utf-8');
      console.log('✅ Generated brand-protection.json');

      console.log('🛡️ Brand protection package created successfully!');
    } catch (error) {
      console.error('❌ Failed to create brand protection package:', error);
    }
  }
}

// Export for use in build scripts
export { AdGoBrandProtector };
export type { BrandAsset, BrandViolation, BrandMonitoringConfig };

// CLI usage
if (require.main === module) {
  const config: BrandMonitoringConfig = {
    company: 'AdGo Solutions Limited.',
    brand_name: 'AdGo',
    trademarks: ['AdGo™', 'AdGo Platform™'],
    protected_terms: ['adgo', 'advanced advertising', 'ad targeting'],
    monitoring_enabled: true,
    auto_takedown: false,
    alert_email: 'brandprotection@adgosolutions.com'
  };

  const protector = new AdGoBrandProtector(config);
  protector.createBrandProtectionPackage();
}