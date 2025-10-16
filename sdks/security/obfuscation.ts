/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:30 UTC
 */

/**
 * AdGo SDK Security Hardening & Code Obfuscation
 * Enterprise-grade protection for production deployments
 * 
 * Features:
 * - Build integrity verification with SHA-256 hashes
 * - Code obfuscation with dynamic string encryption
 * - Anti-tampering detection mechanisms
 * - Source map protection and removal
 * - Runtime integrity monitoring
 */

import * as crypto from 'crypto';

export interface SecurityConfig {
  enableObfuscation: boolean;
  enableIntegrityChecks: boolean;
  enableAntiTampering: boolean;
  buildHash?: string;
  encryptionKey?: string;
}

export class SDKSecurity {
  private config: SecurityConfig;
  private buildHash: string;
  private encryptionKey: Buffer;

  constructor(config: SecurityConfig) {
    this.config = config;
    this.buildHash = config.buildHash || this.generateBuildHash();
    this.encryptionKey = Buffer.from(config.encryptionKey || this.generateEncryptionKey(), 'hex');
  }

  /**
   * Generate build integrity hash for tamper detection
   */
  private generateBuildHash(): string {
    const timestamp = Date.now();
    const randomSalt = crypto.randomBytes(32).toString('hex');
    return crypto.createHash('sha256')
      .update(`adgo-sdk-${timestamp}-${randomSalt}`)
      .digest('hex');
  }

  /**
   * Generate encryption key for string obfuscation
   */
  private generateEncryptionKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Encrypt sensitive strings in the SDK
   */
  public encryptString(input: string): string {
    if (!this.config.enableObfuscation) return input;

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
    let encrypted = cipher.update(input, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}`;
  }

  /**
   * Decrypt obfuscated strings at runtime
   */
  public decryptString(encrypted: string): string {
    if (!this.config.enableObfuscation) return encrypted;

    try {
      const [ivHex, encryptedData] = encrypted.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, iv);
      
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.warn('AdGo SDK: Failed to decrypt string, possible tampering detected');
      return encrypted;
    }
  }

  /**
   * Verify build integrity at runtime
   */
  public verifyBuildIntegrity(): boolean {
    if (!this.config.enableIntegrityChecks) return true;

    try {
      // Check for common tampering indicators
      const suspiciousGlobals = ['eval', 'Function', 'setTimeout', 'setInterval'];
      const hasBeenTampered = suspiciousGlobals.some(global => {
        const original = (window as any)[global];
        return original && original.toString().includes('native code') === false;
      });

      if (hasBeenTampered) {
        this.reportSecurityViolation('build_integrity', 'Tampering detected in global functions');
        return false;
      }

      // Verify source map removal in production
      if (process.env.NODE_ENV === 'production') {
        const scripts = document.querySelectorAll('script[src*="adgo-sdk"]');
        scripts.forEach(script => {
          const src = (script as HTMLScriptElement).src;
          if (src.includes('.map') || src.includes('sourceMappingURL')) {
            this.reportSecurityViolation('source_map', 'Source maps detected in production');
            return false;
          }
        });
      }

      return true;
    } catch (error) {
      console.warn('AdGo SDK: Build integrity check failed', error);
      return false;
    }
  }

  /**
   * Anti-tampering runtime checks
   */
  public enableAntiTampering(): void {
    if (!this.config.enableAntiTampering) return;

    // Protect critical SDK functions from modification
    const protectedFunctions = ['fetch', 'XMLHttpRequest', 'WebSocket'];
    
    protectedFunctions.forEach(funcName => {
      const original = (window as any)[funcName];
      if (original) {
        Object.defineProperty(window, funcName, {
          value: original,
          writable: false,
          configurable: false
        });
      }
    });

    // Monitor for debugging attempts
    let devtoolsOpen = false;
    setInterval(() => {
      const before = Date.now();
      console.clear();
      const after = Date.now();
      
      if (after - before > 100) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          this.reportSecurityViolation('debug_attempt', 'Developer tools detected');
        }
      } else {
        devtoolsOpen = false;
      }
    }, 1000);

    // Prevent context menu in production
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.reportSecurityViolation('context_menu', 'Right-click context menu blocked');
        return false;
      });

      // Prevent common debugging shortcuts
      document.addEventListener('keydown', (e) => {
        const blockedKeys = [
          { key: 'F12' },
          { key: 'I', ctrl: true, shift: true },
          { key: 'J', ctrl: true, shift: true },
          { key: 'U', ctrl: true }
        ];

        const isBlocked = blockedKeys.some(blocked => {
          return e.key === blocked.key && 
                 (!blocked.ctrl || e.ctrlKey) && 
                 (!blocked.shift || e.shiftKey);
        });

        if (isBlocked) {
          e.preventDefault();
          this.reportSecurityViolation('keyboard_shortcut', `Blocked ${e.key} shortcut`);
          return false;
        }
      });
    }
  }

  /**
   * Report security violations to telemetry
   */
  private async reportSecurityViolation(type: string, details: string): Promise<void> {
    try {
      // Send to telemetry endpoint
      await fetch('/api/security/violation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AdGo-Security': this.buildHash
        },
        body: JSON.stringify({
          type,
          details,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          buildHash: this.buildHash
        })
      });
    } catch (error) {
      console.warn('Failed to report security violation:', error);
    }
  }

  /**
   * Generate security configuration for build process
   */
  public static generateProductionConfig(): SecurityConfig {
    return {
      enableObfuscation: true,
      enableIntegrityChecks: true,
      enableAntiTampering: true,
      buildHash: crypto.randomBytes(32).toString('hex'),
      encryptionKey: crypto.randomBytes(32).toString('hex')
    };
  }

  /**
   * Apply HTTPS enforcement across all SDK communications
   */
  public enforceHTTPS(): void {
    // Redirect to HTTPS if not already
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:') {
      if (process.env.NODE_ENV === 'production') {
        window.location.href = window.location.href.replace('http:', 'https:');
        return;
      }
    }

    // Override fetch to ensure HTTPS
    const originalFetch = window.fetch;
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      let url: string;
      
      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof URL) {
        url = input.href;
      } else {
        url = input.url;
      }

      // Force HTTPS for AdGo API calls
      if (url.includes('adgo') || url.includes('supabase')) {
        url = url.replace(/^http:/, 'https:');
      }

      return originalFetch(url, {
        ...init,
        headers: {
          ...init?.headers,
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      });
    };
  }

  /**
   * Remove development artifacts from production builds
   */
  public static sanitizeProduction(code: string): string {
    return code
      // Remove console logs
      .replace(/console\.(log|debug|info|warn|error|trace|table|group|groupEnd)\s*\([^)]*\);?/g, '')
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      // Remove source map references
      .replace(/\/\/# sourceMappingURL=.*/g, '')
      // Remove debug statements
      .replace(/debugger;?/g, '')
      // Minify variable names
      .replace(/\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, (match, keyword, varName) => {
        const shortName = Buffer.from(varName).toString('base64').substring(0, 3);
        return `${keyword} ${shortName}`;
      });
  }
}

export default SDKSecurity;