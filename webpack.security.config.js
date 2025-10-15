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
 * AdGo SDK Production Build Configuration
 * Comprehensive webpack setup for security hardening and obfuscation
 */

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const crypto = require('crypto');
const fs = require('fs');

class AdGoSecurityPlugin {
  constructor(options = {}) {
    this.options = {
      enableObfuscation: true,
      enableIntegrityChecks: true,
      removeSourceMaps: true,
      addWatermark: true,
      ...options
    };
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('AdGoSecurityPlugin', (compilation, callback) => {
      // Generate build hash for integrity checking
      const buildHash = crypto.randomBytes(32).toString('hex');
      
      // Process each asset
      Object.keys(compilation.assets).forEach(filename => {
        if (filename.endsWith('.js')) {
          const asset = compilation.assets[filename];
          let source = asset.source();

          // Add watermark
          if (this.options.addWatermark) {
            const watermark = `/*! AdGo SDK v${process.env.npm_package_version || '1.0.0'} | Build: ${buildHash} | © ${new Date().getFullYear()} AdGo Solutions Limited. */\n`;
            source = watermark + source;
          }

          // Remove source map references
          if (this.options.removeSourceMaps) {
            source = source.replace(/\/\/# sourceMappingURL=.*/g, '');
            source = source.replace(/\/\*# sourceMappingURL=.*\*\//g, '');
          }

          // Apply additional obfuscation
          if (this.options.enableObfuscation) {
            source = this.obfuscateSource(source);
          }

          // Add integrity checks
          if (this.options.enableIntegrityChecks) {
            source = this.addIntegrityChecks(source, buildHash);
          }

          compilation.assets[filename] = {
            source: () => source,
            size: () => source.length
          };
        }

        // Remove source map files
        if (filename.endsWith('.js.map') && this.options.removeSourceMaps) {
          delete compilation.assets[filename];
        }
      });

      // Generate integrity manifest
      this.generateIntegrityManifest(compilation, buildHash);

      callback();
    });
  }

  obfuscateSource(source) {
    // Advanced string obfuscation
    const stringRegex = /(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g;
    
    return source.replace(stringRegex, (match, quote, content, endQuote) => {
      if (content.length < 3) return match; // Skip short strings
      
      // Encrypt sensitive strings
      if (content.includes('adgo') || content.includes('supabase') || content.includes('api')) {
        const encrypted = Buffer.from(content).toString('base64');
        return `${quote}${encrypted}${endQuote}`;
      }
      
      return match;
    });
  }

  addIntegrityChecks(source, buildHash) {
    // Inject runtime integrity verification
    const integrityCheck = `
(function() {
  const expectedHash = '${buildHash}';
  if (typeof window !== 'undefined') {
    window.__adgo_build_hash__ = expectedHash;
    
    // Verify script integrity periodically
    setInterval(() => {
      const scripts = document.querySelectorAll('script[src*="adgo"]');
      scripts.forEach(script => {
        if (script.integrity && !script.integrity.includes(expectedHash)) {
          console.warn('AdGo SDK: Build integrity violation detected');
        }
      });
    }, 30000);
  }
})();
`;
    
    return integrityCheck + source;
  }

  generateIntegrityManifest(compilation, buildHash) {
    const manifest = {
      buildHash,
      timestamp: Date.now(),
      version: process.env.npm_package_version || '1.0.0',
      files: {}
    };

    Object.keys(compilation.assets).forEach(filename => {
      if (filename.endsWith('.js') || filename.endsWith('.css')) {
        const asset = compilation.assets[filename];
        const content = asset.source();
        const hash = crypto.createHash('sha256').update(content).digest('hex');
        
        manifest.files[filename] = {
          hash,
          size: content.length,
          integrity: `sha256-${Buffer.from(hash, 'hex').toString('base64')}`
        };
      }
    });

    compilation.assets['adgo-integrity.json'] = {
      source: () => JSON.stringify(manifest, null, 2),
      size: () => JSON.stringify(manifest, null, 2).length
    };
  }
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  
  entry: {
    'adgo-sdk': './sdks/javascript/adgo-sdk.ts',
    'adgo-sdk.min': './sdks/javascript/adgo-sdk.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist/sdk'),
    filename: '[name].js',
    library: 'AdGoSDK',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@sdk': path.resolve(__dirname, 'sdks')
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' 
            ? MiniCssExtractPlugin.loader 
            : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },

  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 3,
            unsafe: true,
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_proto: true
          },
          mangle: {
            properties: {
              regex: /^_/
            }
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ADGO_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
      'process.env.BUILD_TIMESTAMP': JSON.stringify(Date.now())
    }),

    new AdGoSecurityPlugin({
      enableObfuscation: process.env.NODE_ENV === 'production',
      enableIntegrityChecks: process.env.NODE_ENV === 'production',
      removeSourceMaps: process.env.NODE_ENV === 'production',
      addWatermark: true
    }),

    ...(process.env.NODE_ENV === 'production' 
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
          })
        ]
      : []
    ),

    ...(process.env.ANALYZE_BUNDLE 
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
          })
        ]
      : []
    )
  ],

  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',

  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
    hints: process.env.NODE_ENV === 'production' ? 'error' : 'warning'
  },

  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
};