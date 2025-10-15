/**
 * AdGo Platform - Brand Protection & Anti-Piracy System
 * Browser Runtime Implementation
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 */

class AdGoBrandTamperDetector {
  private static readonly ASSET_HASHES = {
    'adgo-logo.png': 'mock_hash_logo_main',
    'adgo-logo-full.png': 'mock_hash_logo_full',
    'adgo-icon.png': 'mock_hash_icon'
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
      /ad\s*go/gi,  // Spaced version
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
    const normalize = (color: string) => color.replace(/\s+/g, '').toLowerCase();
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
      this.verifyAssetIntegrity(`/assets/${asset}`);
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

export default AdGoBrandTamperDetector;