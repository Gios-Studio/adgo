---
title: Quick Start Guide
sidebar_label: Quick Start
sidebar_position: 2
description: Get up and running with AdGo Platform in under 5 minutes. Perfect for developers who want to integrate quickly.
keywords: [quick start, getting started, installation, setup]
---

# Quick Start Guide

Get your first ad serving in **less than 5 minutes** with AdGo Platform! This guide will take you from zero to your first advertisement display.

## 🎯 Prerequisites

- **AdGo Account**: Sign up at [console.adgo.com](https://console.adgo.com)
- **License Key**: Obtain from your developer dashboard
- **Development Environment**: Node.js 18+ or modern browser

## 📦 Step 1: Installation

Choose your preferred installation method:

### NPM/Yarn (Recommended)
```bash
# Using npm
npm install @adgo/sdk

# Using yarn
yarn add @adgo/sdk

# Using pnpm
pnpm add @adgo/sdk
```

### CDN (Browser)
```html
<!-- Production -->
<script src="https://cdn.adgo.com/sdk/v1/adgo.min.js"></script>

<!-- Development (with debugging) -->
<script src="https://cdn.adgo.com/sdk/v1/adgo.dev.js"></script>
```

## 🔑 Step 2: Initialize SDK

### JavaScript/TypeScript
```javascript
import AdGoSDK from '@adgo/sdk';

const adgo = new AdGoSDK({
  licenseKey: 'adgo_your_license_key_here',
  region: 'global', // Options: 'global', 'eu', 'americas', 'africa', 'asia'
  sandbox: true,    // Use sandbox for testing
  debug: true       // Enable debug logging
});

// Verify license (optional but recommended)
const licenseInfo = await adgo.verifyLicense();
console.log('License valid:', licenseInfo.valid);
```

### Browser (CDN)
```html
<script>
  const adgo = new AdGoSDK({
    licenseKey: 'adgo_your_license_key_here',
    region: 'global',
    sandbox: true,
    debug: true
  });
</script>
```

## 🎨 Step 3: Create Ad Container

Add an HTML container where your ad will be displayed:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First AdGo Integration</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <!-- Ad Container -->
    <div id="adgo-banner" class="ad-container">
        <!-- Ad will be inserted here -->
    </div>
    
    <p>More content...</p>
</body>
</html>
```

### Optional: Add CSS Styling
```css
.ad-container {
  width: 728px;
  height: 90px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
}

.ad-container.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## 📢 Step 4: Fetch and Display Ad

Now let's fetch and display your first advertisement:

```javascript
async function displayAd() {
  try {
    // Add loading state
    const container = document.getElementById('adgo-banner');
    container.classList.add('loading');
    container.innerHTML = 'Loading advertisement...';
    
    // Fetch ad with targeting
    const ad = await adgo.recordImpression('test-ad-001', 'user-123', {
      placement: 'banner',
      size: '728x90',
      targeting: {
        category: 'technology',
        keywords: ['javascript', 'programming', 'web development'],
        demographics: {
          age: '25-35',
          interests: ['coding', 'software']
        }
      }
    });
    
    // Remove loading state
    container.classList.remove('loading');
    
    if (ad && ad.success) {
      // Display the ad
      container.innerHTML = `
        <div class="ad-content" onclick="handleAdClick('${ad.data?.id}')">
          <img src="${ad.data?.imageUrl || 'https://via.placeholder.com/728x90?text=Sample+Ad'}" 
               alt="${ad.data?.title || 'Advertisement'}"
               style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      `;
      
      console.log('✅ Ad displayed successfully:', ad);
    } else {
      // Fallback content
      container.innerHTML = `
        <div class="ad-fallback">
          <p>Advertisement space</p>
        </div>
      `;
      console.log('ℹ️ No ad available, showing fallback');
    }
    
  } catch (error) {
    console.error('❌ Error displaying ad:', error);
    
    // Error fallback
    document.getElementById('adgo-banner').innerHTML = `
      <div class="ad-error">
        <p>Unable to load advertisement</p>
      </div>
    `;
  }
}

// Handle ad clicks
async function handleAdClick(adId) {
  try {
    const clickResult = await adgo.recordClick(adId, 'user-123', {
      timestamp: new Date().toISOString(),
      source: 'banner_click'
    });
    
    console.log('🖱️ Click recorded:', clickResult);
    
    // Redirect to ad destination (if provided)
    if (clickResult.data?.redirectUrl) {
      window.open(clickResult.data.redirectUrl, '_blank');
    }
    
  } catch (error) {
    console.error('❌ Error recording click:', error);
  }
}

// Display ad when page loads
document.addEventListener('DOMContentLoaded', displayAd);
```

## 🧪 Step 5: Test Your Integration

### Testing in Sandbox Mode
With `sandbox: true`, you'll receive test advertisements that don't affect billing:

```javascript
// Test different ad placements
const testPlacements = ['banner', 'rectangle', 'skyscraper', 'mobile'];

for (const placement of testPlacements) {
  const ad = await adgo.recordImpression(`test-${placement}`, 'test-user', {
    placement,
    targeting: { category: 'test' }
  });
  
  console.log(`${placement} ad:`, ad);
}
```

### API Connection Test
```javascript
// Test API connectivity
const connectionTest = await adgo.ping();
console.log('API Connection:', connectionTest ? '✅ Connected' : '❌ Failed');

// Check license status
const license = await adgo.verifyLicense();
console.log('License Status:', license.valid ? '✅ Valid' : '❌ Invalid');
```

## 📊 Step 6: Monitor Performance

### Basic Analytics
```javascript
// Get performance analytics
const analytics = await adgo.getAnalytics({
  days: 7,
  event_type: 'impressions'
});

console.log('📊 7-day analytics:', analytics);
```

### Usage Tracking
```javascript
// Check your API usage
const usage = await adgo.recordUsage(1);
console.log('📈 API Usage:', {
  allowed: usage.allowed,
  remaining: usage.remaining
});
```

## 🔧 Complete Example

Here's a complete HTML page demonstrating AdGo integration:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AdGo Quick Start Demo</title>
    <script src="https://cdn.adgo.com/sdk/v1/adgo.dev.js"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .ad-container { width: 728px; height: 90px; margin: 20px auto; border: 1px solid #ddd; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #f9f9f9; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
        button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin: 5px; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>🚀 AdGo Platform - Quick Start Demo</h1>
    
    <div id="status" class="status">Initializing AdGo SDK...</div>
    
    <div>
        <button onclick="testConnection()">Test Connection</button>
        <button onclick="displayAd()">Load Ad</button>
        <button onclick="checkAnalytics()">View Analytics</button>
        <button onclick="clearAd()">Clear Ad</button>
    </div>
    
    <div id="adgo-banner" class="ad-container">
        Click "Load Ad" to display advertisement
    </div>
    
    <div id="logs" style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 20px;">
        <h3>📋 Logs</h3>
        <div id="log-content"></div>
    </div>

    <script>
        // Initialize AdGo SDK
        const adgo = new AdGoSDK({
            licenseKey: 'adgo_your_license_key_here', // Replace with your key
            region: 'global',
            sandbox: true,
            debug: true
        });

        function updateStatus(message, type = 'success') {
            const statusEl = document.getElementById('status');
            statusEl.textContent = message;
            statusEl.className = `status ${type}`;
        }

        function addLog(message) {
            const logContent = document.getElementById('log-content');
            const timestamp = new Date().toLocaleTimeString();
            logContent.innerHTML += `<div>[${timestamp}] ${message}</div>`;
            logContent.scrollTop = logContent.scrollHeight;
        }

        async function testConnection() {
            try {
                addLog('🔄 Testing API connection...');
                const connected = await adgo.ping();
                
                if (connected) {
                    updateStatus('✅ API Connection successful', 'success');
                    addLog('✅ API connection test passed');
                } else {
                    updateStatus('❌ API Connection failed', 'error');
                    addLog('❌ API connection test failed');
                }
                
                // Test license
                const license = await adgo.verifyLicense();
                addLog(`📜 License status: ${license.valid ? 'Valid' : 'Invalid'}`);
                
            } catch (error) {
                updateStatus(`❌ Connection error: ${error.message}`, 'error');
                addLog(`❌ Connection error: ${error.message}`);
            }
        }

        async function displayAd() {
            try {
                addLog('📢 Fetching advertisement...');
                const container = document.getElementById('adgo-banner');
                container.innerHTML = 'Loading advertisement...';
                
                const ad = await adgo.recordImpression('demo-ad-001', 'demo-user', {
                    placement: 'banner',
                    targeting: { category: 'demo' }
                });
                
                if (ad && ad.success) {
                    container.innerHTML = `
                        <div onclick="handleAdClick('demo-ad-001')" style="cursor: pointer; text-align: center; padding: 20px;">
                            <strong>📢 Demo Advertisement</strong><br>
                            <small>Click me to test click tracking!</small>
                        </div>
                    `;
                    updateStatus('✅ Advertisement loaded successfully', 'success');
                    addLog('✅ Advertisement displayed successfully');
                } else {
                    container.innerHTML = 'No advertisement available';
                    addLog('ℹ️ No advertisement available');
                }
                
            } catch (error) {
                updateStatus(`❌ Ad loading error: ${error.message}`, 'error');
                addLog(`❌ Ad loading error: ${error.message}`);
                document.getElementById('adgo-banner').innerHTML = 'Error loading advertisement';
            }
        }

        async function handleAdClick(adId) {
            try {
                addLog(`🖱️ Recording click for ad: ${adId}`);
                const result = await adgo.recordClick(adId, 'demo-user');
                
                if (result && result.success) {
                    addLog('✅ Click recorded successfully');
                    updateStatus('✅ Ad click tracked', 'success');
                } else {
                    addLog('❌ Click recording failed');
                }
                
            } catch (error) {
                addLog(`❌ Click tracking error: ${error.message}`);
            }
        }

        async function checkAnalytics() {
            try {
                addLog('📊 Fetching analytics data...');
                const analytics = await adgo.getAnalytics({ days: 1 });
                
                if (analytics && analytics.success) {
                    addLog(`📈 Analytics: ${JSON.stringify(analytics.data, null, 2)}`);
                    updateStatus('✅ Analytics loaded', 'success');
                } else {
                    addLog('📊 No analytics data available');
                }
                
            } catch (error) {
                addLog(`❌ Analytics error: ${error.message}`);
            }
        }

        function clearAd() {
            document.getElementById('adgo-banner').innerHTML = 'Advertisement cleared';
            addLog('🧹 Advertisement container cleared');
            updateStatus('Advertisement cleared', 'success');
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', async () => {
            addLog('🚀 AdGo SDK initialized in sandbox mode');
            updateStatus('✅ SDK initialized - Ready for testing!', 'success');
            
            // Auto-test connection
            await testConnection();
        });
    </script>
</body>
</html>
```

## ✅ Next Steps

Congratulations! 🎉 You've successfully integrated AdGo Platform. Here's what to do next:

1. **🔐 [Set up Authentication](./authentication)** - Configure secure API access
2. **🎯 [Explore Targeting](../concepts/targeting-system)** - Learn advanced audience targeting
3. **📊 [Analytics Integration](../integration/web-integration)** - Implement comprehensive tracking
4. **🧪 [Testing & Debugging](../developer-tools/sandbox-environment)** - Use our developer tools
5. **🚀 [Go Live](../advanced/performance-optimization)** - Production deployment checklist

## 🆘 Troubleshooting

### Common Issues

**License Key Invalid**
```javascript
// Check license format
if (!licenseKey.startsWith('adgo_')) {
  console.error('License key should start with "adgo_"');
}
```

**CORS Errors**
```javascript
// Ensure your domain is whitelisted in AdGo console
const adgo = new AdGoSDK({
  licenseKey: 'your_key',
  allowedOrigins: ['https://yourdomain.com']
});
```

**No Ads Returned**
```javascript
// Check targeting parameters
const ad = await adgo.recordImpression('ad-id', 'user-id', {
  placement: 'banner', // Required
  targeting: {
    category: 'general' // Use broader categories for testing
  }
});
```

---

**Need help?** Join our [Discord community](https://discord.gg/adgo) or visit [support.adgo.com](https://support.adgo.com) 💬