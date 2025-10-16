# AdGo SDK Documentation

## Overview
The AdGo SDK provides a comprehensive API for integrating advertising technology into ride-hailing and mobility platforms. Our SDK enables real-time ad serving, event tracking, and automated driver payouts.

## Base URL
```
Production: https://app.adgosolutions.com/api
Development: http://localhost:3000/api
```

## Authentication
All API requests require a valid API key in the header:
```
Authorization: Bearer YOUR_API_KEY
```

## Quick Start

### 1. Get an Ad
```javascript
GET /sdk/events?ride_id={ride_id}&device_id={device_id}&zone={zone}
```

**Parameters:**
- `ride_id` (required): Unique ride identifier
- `device_id` (optional): Device identifier for targeting
- `zone` (optional): Ad placement zone (default: "post-ride")

**Response:**
```json
{
  "ad": {
    "id": "ad_123",
    "campaign_id": "camp_456", 
    "title": "Amazing Product",
    "media_url": "https://cdn.adgosolutions.com/ads/image.jpg",
    "tracking_pixel": "/api/sdk/events?event_type=impression&...",
    "click_url": "/api/sdk/events?event_type=click&..."
  },
  "ride_id": "ride_789",
  "zone": "post-ride"
}
```

### 2. Track Events
```javascript
POST /sdk/events
```

**Body:**
```json
{
  "campaign_id": "camp_456",
  "ad_id": "ad_123", 
  "ride_id": "ride_789",
  "device_id": "device_001",
  "zone": "post-ride",
  "event_type": "impression|click|conversion",
  "meta": {"custom": "data"}
}
```

**Response:**
```json
{
  "success": true,
  "event_id": "evt_999",
  "ride_id": "ride_789",
  "event_type": "impression"
}
```

## Complete API Reference

### Health Check
**GET** `/health`

Returns API status and version information.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-16T12:00:00Z",
  "version": "1.0.0",
  "uptime": "24h 15m 30s"
}
```

### Metrics
**GET** `/metrics/ctr`

Returns click-through rate and performance metrics.

**Response:**
```json
{
  "ctr": 2.45,
  "impressions": 50000,
  "clicks": 1225,
  "conversions": 85,
  "period": "24h"
}
```

### Driver Wallet
**GET** `/driver/wallet?driver_id={driver_id}`

Returns driver earnings and wallet balance.

**Response:**
```json
{
  "driver_id": "driver_123",
  "balance_cents": 15000,
  "balance_ksh": "150.00",
  "earnings_today": "25.50",
  "total_clicks": 102
}
```

### Partner Workflows
**GET** `/partners/workflows`

Returns partner workflow configurations and status.

## SDK Integration Examples

### JavaScript/Node.js
```javascript
class AdGoSDK {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://app.adgosolutions.com/api';
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }
  
  async getAd(rideId, deviceId = null, zone = 'post-ride') {
    const params = new URLSearchParams({ ride_id: rideId, zone });
    if (deviceId) params.append('device_id', deviceId);
    
    const response = await fetch(`${this.baseUrl}/sdk/events?${params}`, {
      headers: this.headers
    });
    return response.json();
  }
  
  async trackEvent(eventData) {
    const response = await fetch(`${this.baseUrl}/sdk/events`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(eventData)
    });
    return response.json();
  }
  
  async getMetrics() {
    const response = await fetch(`${this.baseUrl}/metrics/ctr`, {
      headers: this.headers
    });
    return response.json();
  }
}

// Usage
const sdk = new AdGoSDK('your_api_key_here');

// Get ad for a ride
const adResponse = await sdk.getAd('ride_123', 'device_456');
if (adResponse.ad) {
  console.log('Display ad:', adResponse.ad.title);
  
  // Track impression
  await sdk.trackEvent({
    campaign_id: adResponse.ad.campaign_id,
    ad_id: adResponse.ad.id,
    ride_id: 'ride_123',
    device_id: 'device_456',
    event_type: 'impression'
  });
}
```

### Python
```python
import requests
from typing import Optional, Dict, Any

class AdGoSDK:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = 'https://app.adgosolutions.com/api'
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def get_ad(self, ride_id: str, device_id: Optional[str] = None, 
               zone: str = 'post-ride') -> Dict[str, Any]:
        params = {'ride_id': ride_id, 'zone': zone}
        if device_id:
            params['device_id'] = device_id
        
        response = requests.get(
            f'{self.base_url}/sdk/events',
            params=params,
            headers=self.headers
        )
        return response.json()
    
    def track_event(self, event_data: Dict[str, Any]) -> Dict[str, Any]:
        response = requests.post(
            f'{self.base_url}/sdk/events',
            json=event_data,
            headers=self.headers
        )
        return response.json()
    
    def get_metrics(self) -> Dict[str, Any]:
        response = requests.get(
            f'{self.base_url}/metrics/ctr',
            headers=self.headers
        )
        return response.json()

# Usage
sdk = AdGoSDK('your_api_key_here')

# Get ad for a ride
ad_response = sdk.get_ad('ride_123', 'device_456')
if ad_response.get('ad'):
    print(f"Display ad: {ad_response['ad']['title']}")
    
    # Track impression
    sdk.track_event({
        'campaign_id': ad_response['ad']['campaign_id'],
        'ad_id': ad_response['ad']['id'],
        'ride_id': 'ride_123',
        'device_id': 'device_456',
        'event_type': 'impression'
    })
```

### Swift/iOS
```swift
import Foundation

class AdGoSDK {
    private let apiKey: String
    private let baseUrl = "https://app.adgosolutions.com/api"
    
    init(apiKey: String) {
        self.apiKey = apiKey
    }
    
    func getAd(rideId: String, deviceId: String? = nil, 
               zone: String = "post-ride") async throws -> [String: Any] {
        var components = URLComponents(string: "\(baseUrl)/sdk/events")!
        components.queryItems = [
            URLQueryItem(name: "ride_id", value: rideId),
            URLQueryItem(name: "zone", value: zone)
        ]
        
        if let deviceId = deviceId {
            components.queryItems?.append(URLQueryItem(name: "device_id", value: deviceId))
        }
        
        var request = URLRequest(url: components.url!)
        request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONSerialization.jsonObject(with: data) as! [String: Any]
    }
    
    func trackEvent(eventData: [String: Any]) async throws -> [String: Any] {
        let url = URL(string: "\(baseUrl)/sdk/events")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: eventData)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONSerialization.jsonObject(with: data) as! [String: Any]
    }
}
```

### Android/Kotlin
```kotlin
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

class AdGoSDK(private val apiKey: String) {
    private val baseUrl = "https://app.adgosolutions.com/api"
    private val client = OkHttpClient()
    private val JSON = "application/json".toMediaType()
    
    suspend fun getAd(rideId: String, deviceId: String? = null, 
                      zone: String = "post-ride"): JSONObject = withContext(Dispatchers.IO) {
        val urlBuilder = HttpUrl.parse("$baseUrl/sdk/events")!!.newBuilder()
            .addQueryParameter("ride_id", rideId)
            .addQueryParameter("zone", zone)
        
        deviceId?.let { urlBuilder.addQueryParameter("device_id", it) }
        
        val request = Request.Builder()
            .url(urlBuilder.build())
            .addHeader("Authorization", "Bearer $apiKey")
            .build()
        
        val response = client.newCall(request).execute()
        JSONObject(response.body!!.string())
    }
    
    suspend fun trackEvent(eventData: JSONObject): JSONObject = withContext(Dispatchers.IO) {
        val body = eventData.toString().toRequestBody(JSON)
        val request = Request.Builder()
            .url("$baseUrl/sdk/events")
            .post(body)
            .addHeader("Authorization", "Bearer $apiKey")
            .addHeader("Content-Type", "application/json")
            .build()
        
        val response = client.newCall(request).execute()
        JSONObject(response.body!!.string())
    }
}
```

## Error Handling

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `401` - Unauthorized (invalid or missing API key)
- `404` - Not Found (invalid endpoint)
- `405` - Method Not Allowed
- `429` - Rate Limited (too many requests)
- `500` - Internal Server Error

### Error Response Format
```json
{
  "error": "invalid_parameters",
  "message": "Missing required parameter: ride_id",
  "code": 400,
  "timestamp": "2025-10-16T12:00:00Z"
}
```

### Common Error Codes
- `missing_ride_id` - ride_id parameter is required
- `frequency_cap_reached` - Ad already shown for this ride
- `no_available_campaigns` - No active campaigns with budget
- `no_active_ads` - Campaign has no active ads
- `invalid_event_type` - event_type must be impression, click, or conversion

## Rate Limits
- **1000 requests per hour** per API key
- **10 requests per second** burst limit
- Rate limit headers included in responses:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1697461200
  ```

## Webhooks

### Event Notifications
AdGo can send real-time webhooks for important events:

```json
{
  "event": "ad.clicked",
  "timestamp": "2025-10-16T12:00:00Z",
  "data": {
    "campaign_id": "camp_456",
    "ad_id": "ad_123",
    "ride_id": "ride_789",
    "driver_payout": 10
  }
}
```

### Webhook Endpoints
Configure webhook URLs in your partner dashboard:
- `ad.impression` - Ad was displayed
- `ad.clicked` - Ad was clicked
- `driver.payout` - Driver earned money
- `campaign.budget_low` - Campaign budget below threshold

## Testing

### Sandbox Environment
Use the sandbox environment for testing:
```
Base URL: https://sandbox.adgosolutions.com/api
Test API Key: sk_test_123456789
```

### Test Data
- Use `ride_id` starting with `test_` for sandbox testing
- All test events are automatically cleaned up after 24 hours
- No real money transactions occur in sandbox

## Support

### Documentation
- **API Reference**: https://sdk.adgosolutions.com
- **Integration Guide**: https://docs.adgosolutions.com/integration
- **FAQ**: https://help.adgosolutions.com/sdk

### Contact
- **Technical Support**: sdk@adgosolutions.com
- **Business Development**: partnerships@adgosolutions.com
- **Status Page**: https://status.adgosolutions.com

### Resources
- **GitHub**: https://github.com/adgo-solutions/sdk-examples
- **Postman Collection**: https://www.postman.com/adgo-solutions/workspace/sdk
- **Discord Community**: https://discord.gg/adgo-dev