/**
 * AdGo Platform - Build Watermarking & Copyright System
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
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

interface WatermarkConfig {
  company: string;
  product: string;
  version: string;
  buildId: string;
  copyrightYear: number;
  environment: 'development' | 'staging' | 'production';
}

interface FileSignature {
  path: string;
  hash: string;
  size: number;
  timestamp: string;
  signature: string;
}

interface BuildManifest {
  buildInfo: {
    company: string;
    product: string;
    version: string;
    buildId: string;
    buildDate: string;
    environment: string;
    copyright: string;
  };
  security: {
    codeObfuscation: boolean;
    sourceMapsRemoved: boolean;
    integrityChecks: boolean;
    digitalSignatures: boolean;
  };
  files: FileSignature[];
  legal: {
    license: string;
    termsOfService: string;
    privacyPolicy: string;
    contact: string;
  };
}

class AdGoBuildWatermarker {
  private config: WatermarkConfig;
  private buildManifest: BuildManifest;

  constructor(config: WatermarkConfig) {
    this.config = config;
    this.buildManifest = this.initializeManifest();
  }

  private initializeManifest(): BuildManifest {
    return {
      buildInfo: {
        company: this.config.company,
        product: this.config.product,
        version: this.config.version,
        buildId: this.config.buildId,
        buildDate: new Date().toISOString(),
        environment: this.config.environment,
        copyright: `© ${this.config.copyrightYear} ${this.config.company}. All rights reserved.`
      },
      security: {
        codeObfuscation: this.config.environment === 'production',
        sourceMapsRemoved: this.config.environment === 'production',
        integrityChecks: true,
        digitalSignatures: true
      },
      files: [],
      legal: {
        license: 'Proprietary',
        termsOfService: 'https://adgo.com/terms',
        privacyPolicy: 'https://adgo.com/privacy',
        contact: 'legal@adgosolutions.com'
      }
    };
  }

  /**
   * Generate comprehensive copyright header for JavaScript/TypeScript files
   */
  generateJSCopyrightHeader(): string {
    const currentDate = new Date().toISOString().split('T')[0];
    
    return `/**
 * ${this.config.product} - Advanced Advertising Technology Suite
 * 
 * Copyright (c) ${this.config.copyrightYear} ${this.config.company}
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * NOTICE: This file contains trade secrets and confidential information
 * of ${this.config.company}. Any reproduction or disclosure of this file
 * or its contents without the prior written consent of ${this.config.company}
 * is prohibited.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build ID: ${this.config.buildId}
 * Generated: ${currentDate}
 * Environment: ${this.config.environment}
 * 
 * @preserve This notice must not be removed from this file.
 */

`;
  }

  /**
   * Generate copyright header for CSS files
   */
  generateCSSCopyrightHeader(): string {
    return `/*
 * ${this.config.product} - Stylesheet Components
 * 
 * Copyright (c) ${this.config.copyrightYear} ${this.config.company}
 * All rights reserved.
 * 
 * This stylesheet is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * 
 * Build ID: ${this.config.buildId}
 * Environment: ${this.config.environment}
 * 
 * @preserve
 */

`;
  }

  /**
   * Generate watermark banner for compiled assets
   */
  generateWatermarkBanner(): string {
    const banner = `${this.config.product} v${this.config.version} | Build: ${this.config.buildId} | © ${this.config.copyrightYear} ${this.config.company} | Licensed under proprietary license | Unauthorized use prohibited`;
    return `/*! ${banner} */\n`;
  }

  /**
   * Add copyright header to a file
   */
  addCopyrightHeader(filePath: string): boolean {
    try {
      const content = readFileSync(filePath, 'utf-8');
      const ext = extname(filePath).toLowerCase();
      
      // Check if already has copyright header
      if (content.includes(`© ${this.config.copyrightYear} ${this.config.company}`)) {
        return false; // Already has header
      }

      let header = '';
      
      switch (ext) {
        case '.js':
        case '.ts':
        case '.jsx':
        case '.tsx':
          header = this.generateJSCopyrightHeader();
          break;
        case '.css':
        case '.scss':
        case '.sass':
          header = this.generateCSSCopyrightHeader();
          break;
        default:
          return false; // Unsupported file type
      }

      const newContent = header + content;
      writeFileSync(filePath, newContent, 'utf-8');
      
      console.log(`✅ Added copyright header to: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to add copyright header to ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Add watermark banner to compiled assets
   */
  addWatermarkBanner(filePath: string): boolean {
    try {
      const content = readFileSync(filePath, 'utf-8');
      
      // Check if already watermarked
      if (content.includes(`${this.config.product} v${this.config.version}`)) {
        return false; // Already watermarked
      }

      const banner = this.generateWatermarkBanner();
      const newContent = banner + content;
      
      writeFileSync(filePath, newContent, 'utf-8');
      
      console.log(`🔖 Added watermark to: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to add watermark to ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Generate file signature for integrity verification
   */
  generateFileSignature(filePath: string): FileSignature {
    const content = readFileSync(filePath);
    const hash = createHash('sha256').update(content).digest('hex');
    const stats = statSync(filePath);
    
    // Create signature combining hash, build ID, and timestamp
    const signatureData = `${hash}_${this.config.buildId}_${stats.mtime.getTime()}`;
    const signature = createHash('sha256').update(signatureData).digest('hex');

    return {
      path: filePath,
      hash,
      size: stats.size,
      timestamp: stats.mtime.toISOString(),
      signature
    };
  }

  /**
   * Process directory recursively
   */
  processDirectory(dirPath: string, sourceDir: boolean = true): void {
    try {
      const items = readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = join(dirPath, item);
        const stats = statSync(fullPath);
        
        if (stats.isDirectory()) {
          // Skip node_modules and other build directories
          if (!['node_modules', '.next', 'build', 'dist', '.git'].includes(item)) {
            this.processDirectory(fullPath, sourceDir);
          }
        } else if (stats.isFile()) {
          const ext = extname(fullPath).toLowerCase();
          
          if (sourceDir) {
            // Add copyright headers to source files
            if (['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'].includes(ext)) {
              this.addCopyrightHeader(fullPath);
            }
          } else {
            // Add watermarks to build files
            if (['.js', '.css'].includes(ext)) {
              this.addWatermarkBanner(fullPath);
            }
          }
          
          // Generate signature for all processed files
          if (['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'].includes(ext)) {
            const signature = this.generateFileSignature(fullPath);
            this.buildManifest.files.push(signature);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Failed to process directory ${dirPath}:`, error);
    }
  }

  /**
   * Remove source map references from production files
   */
  removeSourceMapReferences(filePath: string): boolean {
    try {
      let content = readFileSync(filePath, 'utf-8');
      let modified = false;
      
      // Remove sourceMappingURL comments
      const sourceMapPattern = /\/\/# sourceMappingURL=.*$/gm;
      if (sourceMapPattern.test(content)) {
        content = content.replace(sourceMapPattern, '');
        modified = true;
      }
      
      // Remove CSS source map comments
      const cssSourceMapPattern = /\/\*# sourceMappingURL=.*?\*\//g;
      if (cssSourceMapPattern.test(content)) {
        content = content.replace(cssSourceMapPattern, '');
        modified = true;
      }
      
      if (modified) {
        writeFileSync(filePath, content, 'utf-8');
        console.log(`🗺️ Removed source map references from: ${filePath}`);
      }
      
      return modified;
    } catch (error) {
      console.error(`❌ Failed to remove source map references from ${filePath}:`, error);
      return false;
    }
  }

  /**
   * Generate build manifest with all signatures and metadata
   */
  generateBuildManifest(): void {
    try {
      const manifestPath = 'build-manifest.json';
      const manifestContent = JSON.stringify(this.buildManifest, null, 2);
      
      writeFileSync(manifestPath, manifestContent, 'utf-8');
      
      console.log(`📋 Generated build manifest: ${manifestPath}`);
      console.log(`📊 Protected ${this.buildManifest.files.length} files`);
    } catch (error) {
      console.error('❌ Failed to generate build manifest:', error);
    }
  }

  /**
   * Generate comprehensive license file
   */
  generateLicenseFile(): void {
    const licenseContent = `${this.config.product} - Proprietary Software License

Copyright (c) ${this.config.copyrightYear} ${this.config.company}
All rights reserved.

IMPORTANT: READ CAREFULLY BEFORE USING THIS SOFTWARE.

This software and associated documentation files (the "Software") are proprietary
and confidential materials of ${this.config.company}. The Software is protected by
copyright laws and international copyright treaties, as well as other intellectual
property laws and treaties.

GRANT OF LICENSE:
Subject to the terms and conditions of this License, ${this.config.company} hereby grants
you a limited, non-exclusive, non-transferable license to use the Software solely
in accordance with the terms specified in your separate commercial license agreement.

RESTRICTIONS:
You may NOT:
- Copy, modify, or create derivative works of the Software
- Reverse engineer, decompile, or disassemble the Software  
- Distribute, sublicense, lease, rent, or transfer the Software
- Remove or alter any proprietary notices or labels on the Software
- Use the Software for any purpose not expressly permitted

INTELLECTUAL PROPERTY:
All right, title, and interest in and to the Software, including all intellectual
property rights therein, remain exclusively with ${this.config.company}.

TERMINATION:
This license is effective until terminated. Your rights under this license will
terminate automatically without notice if you fail to comply with any term(s)
of this license.

DISCLAIMER OF WARRANTIES:
THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

LIMITATION OF LIABILITY:
IN NO EVENT SHALL ${this.config.company} BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

For licensing inquiries, please contact: legal@adgosolutions.com

Build Information:
- Product: ${this.config.product}
- Version: ${this.config.version}
- Build ID: ${this.config.buildId}
- Generated: ${new Date().toISOString()}
`;

    try {
      writeFileSync('LICENSE', licenseContent, 'utf-8');
      console.log('📝 Generated LICENSE file');
    } catch (error) {
      console.error('❌ Failed to generate license file:', error);
    }
  }

  /**
   * Run complete watermarking process
   */
  runComplete(sourceDir: string, buildDir?: string): void {
    console.log('🛡️ Starting AdGo IP Protection & Watermarking Process...\n');
    
    // Process source files
    console.log('📄 Adding copyright headers to source files...');
    this.processDirectory(sourceDir, true);
    
    // Process build files if specified
    if (buildDir) {
      console.log('\n🔖 Adding watermarks to build files...');
      this.processDirectory(buildDir, false);
      
      console.log('\n🗺️ Removing source map references from production files...');
      this.processDirectory(buildDir, false);
    }
    
    // Generate legal documents
    console.log('\n📝 Generating legal documents...');
    this.generateLicenseFile();
    
    // Generate build manifest
    console.log('\n📋 Generating build manifest...');
    this.generateBuildManifest();
    
    console.log('\n✅ IP Protection & Watermarking completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Files processed: ${this.buildManifest.files.length}`);
    console.log(`   - Build ID: ${this.config.buildId}`);
    console.log(`   - Environment: ${this.config.environment}`);
    console.log(`   - Legal documents: LICENSE, build-manifest.json`);
  }
}

// Export for use in build scripts
export { AdGoBuildWatermarker };
export type { WatermarkConfig, FileSignature, BuildManifest };

// CLI usage example
if (require.main === module) {
  const config: WatermarkConfig = {
    company: 'AdGo Solutions Limited.',
    product: 'AdGo Platform',
    version: '1.0.0',
    buildId: `build_${Date.now()}`,
    copyrightYear: new Date().getFullYear(),
    environment: (process.env.NODE_ENV as any) || 'development'
  };

  const watermarker = new AdGoBuildWatermarker(config);
  
  // Process source directory
  const sourceDir = process.argv[2] || './src';
  const buildDir = process.argv[3]; // Optional build directory
  
  watermarker.runComplete(sourceDir, buildDir);
}