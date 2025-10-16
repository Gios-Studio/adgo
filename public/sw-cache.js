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
 * Generated: 2025-10-15 04:38:33 UTC
 */

/**
 * AdGo Service Worker for Background Sync and Offline Support
 * Provides comprehensive offline capabilities and background synchronization
 */

const CACHE_NAME = 'adgo-cache-v1';
const RUNTIME_CACHE = 'adgo-runtime-cache';
const OFFLINE_PAGE = '/offline.html';

// Resources to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/offline.html',
  '/adgo-logo.png',
  '/favicon.ico',
  '/locales/en-US.json',
  '/locales/fr-FR.json',
  '/locales/ar-SA.json'
];

// API endpoints that support offline-first approach
const OFFLINE_FIRST_PATHS = [
  '/api/ads/',
  '/api/campaigns/',
  '/api/analytics/'
];

// Network-first paths (always try network first)
const NETWORK_FIRST_PATHS = [
  '/api/auth/',
  '/api/billing/',
  '/api/telemetry/'
];

self.addEventListener('install', (event) => {
  console.log('AdGo Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static resources...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('AdGo Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle different types of requests
  if (request.mode === 'navigate') {
    // Handle page navigation
    event.respondWith(handleNavigate(request));
  } else if (url.pathname.startsWith('/api/')) {
    // Handle API requests
    event.respondWith(handleApiRequest(request));
  } else if (request.destination === 'image') {
    // Handle images
    event.respondWith(handleImageRequest(request));
  } else {
    // Handle other static assets
    event.respondWith(handleStaticRequest(request));
  }
});

// Background sync for offline operations
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'adgo-sync') {
    event.waitUntil(performBackgroundSync());
  }
});

// Handle push notifications (for real-time updates)
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'AdGo notification',
    icon: '/adgo-logo.png',
    badge: '/adgo-icon.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/view.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('AdGo', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url || '/')
    );
  }
});

/**
 * Handle page navigation requests
 */
async function handleNavigate(request) {
  try {
    // Try network first for navigation
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful navigation responses
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
      return response;
    }
    
    throw new Error(`Network response not ok: ${response.status}`);
    
  } catch (error) {
    console.log('Navigation offline, serving cached page or offline page');
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Serve offline page
    return caches.match(OFFLINE_PAGE);
  }
}

/**
 * Handle API requests with different strategies
 */
async function handleApiRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Determine strategy based on path
  if (OFFLINE_FIRST_PATHS.some(p => path.startsWith(p))) {
    return handleOfflineFirstRequest(request);
  } else if (NETWORK_FIRST_PATHS.some(p => path.startsWith(p))) {
    return handleNetworkFirstRequest(request);
  } else {
    return handleCacheFirstRequest(request);
  }
}

/**
 * Offline-first strategy: Check cache first, then network
 */
async function handleOfflineFirstRequest(request) {
  try {
    // Check cache first
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('Serving from cache:', request.url);
      
      // Update cache in background if online
      if (navigator.onLine) {
        updateCacheInBackground(request);
      }
      
      return cachedResponse;
    }
    
    // Not in cache, try network
    const response = await fetch(request);
    
    if (response.ok && request.method === 'GET') {
      // Cache successful GET responses
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
    
  } catch (error) {
    console.log('API request failed, checking cache:', request.url);
    
    // Network failed, try cache again (might have been updated)
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response
    return createOfflineResponse(request);
  }
}

/**
 * Network-first strategy: Try network first, then cache
 */
async function handleNetworkFirstRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok && request.method === 'GET') {
      // Cache successful GET responses
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
    
  } catch (error) {
    console.log('Network failed for:', request.url);
    
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Queue for background sync if it's a mutation
    if (request.method !== 'GET') {
      await queueForBackgroundSync(request);
    }
    
    return createOfflineResponse(request);
  }
}

/**
 * Cache-first strategy: Always check cache first
 */
async function handleCacheFirstRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok && request.method === 'GET') {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
    
  } catch (error) {
    return createOfflineResponse(request);
  }
}

/**
 * Handle image requests with caching
 */
async function handleImageRequest(request) {
  // Check cache first for images
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache images for longer periods
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
    
  } catch (error) {
    // Return placeholder image for failed requests
    return caches.match('/placeholder-image.png') || 
           createOfflineResponse(request);
  }
}

/**
 * Handle static asset requests
 */
async function handleStaticRequest(request) {
  return caches.match(request) || fetch(request);
}

/**
 * Update cache in background without blocking response
 */
async function updateCacheInBackground(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, response.clone());
      console.log('Cache updated in background:', request.url);
    }
  } catch (error) {
    console.log('Background cache update failed:', error);
  }
}

/**
 * Create offline response for failed requests
 */
function createOfflineResponse(request) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/api/')) {
    // Return JSON error for API requests
    return new Response(
      JSON.stringify({
        error: 'Offline mode',
        message: 'Request queued for sync when online',
        timestamp: Date.now()
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json',
          'X-Offline-Mode': 'true'
        }
      }
    );
  } else {
    // Return generic offline response
    return new Response(
      'Currently offline. Please check your connection.',
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    );
  }
}

/**
 * Queue request for background sync
 */
async function queueForBackgroundSync(request) {
  try {
    // Clone request to extract data
    const requestData = {
      url: request.url,
      method: request.method,
      headers: [...request.headers.entries()].reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {}),
      body: request.body ? await request.text() : null,
      timestamp: Date.now()
    };
    
    // Store in IndexedDB for background sync
    const db = await openIndexedDB();
    const transaction = db.transaction(['sync_queue'], 'readwrite');
    const store = transaction.objectStore('sync_queue');
    
    await store.add({
      id: `sync_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      ...requestData
    });
    
    console.log('Request queued for background sync:', request.url);
    
    // Register for background sync
    if ('serviceWorker' in self && 'sync' in self.serviceWorker) {
      await self.registration.sync.register('adgo-sync');
    }
    
  } catch (error) {
    console.error('Failed to queue for background sync:', error);
  }
}

/**
 * Perform background sync of queued operations
 */
async function performBackgroundSync() {
  console.log('Starting background sync...');
  
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(['sync_queue'], 'readwrite');
    const store = transaction.objectStore('sync_queue');
    
    const queuedRequests = await store.getAll();
    
    for (const queuedRequest of queuedRequests) {
      try {
        // Attempt to replay the request
        const response = await fetch(queuedRequest.url, {
          method: queuedRequest.method,
          headers: queuedRequest.headers,
          body: queuedRequest.body
        });
        
        if (response.ok) {
          // Request successful, remove from queue
          await store.delete(queuedRequest.id);
          console.log('Background sync successful:', queuedRequest.url);
        } else {
          console.log('Background sync failed:', response.status, queuedRequest.url);
        }
        
      } catch (error) {
        console.log('Background sync error:', error, queuedRequest.url);
      }
    }
    
    // Notify clients of sync completion
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        operations: queuedRequests.map(req => req.id)
      });
    });
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

/**
 * Open IndexedDB for storing sync queue
 */
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AdGoServiceWorker', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('sync_queue')) {
        const store = db.createObjectStore('sync_queue', { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// Periodic cache cleanup (run every hour)
setInterval(async () => {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const request of requests) {
      const response = await cache.match(request);
      const dateHeader = response.headers.get('date');
      
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime();
        if (now - responseDate > maxAge) {
          await cache.delete(request);
          console.log('Expired cache entry removed:', request.url);
        }
      }
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}, 60 * 60 * 1000); // Every hour

console.log('AdGo Service Worker loaded successfully');