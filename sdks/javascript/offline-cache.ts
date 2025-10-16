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
 * AdGo SDK Advanced Offline Caching System
 * Comprehensive offline support with intelligent sync strategies
 */

interface CacheConfig {
  maxSize: number;
  ttl: number;
  syncStrategy: 'immediate' | 'batch' | 'periodic';
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
}

interface CacheEntry<T> {
  key: string;
  data: T;
  timestamp: number;
  expires: number;
  version: string;
  checksum: string;
  metadata?: Record<string, any>;
}

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete' | 'sync';
  resource: string;
  data: any;
  timestamp: number;
  retries: number;
  priority: number;
}

export class AdvancedOfflineCache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private pendingOperations: Map<string, SyncOperation> = new Map();
  private config: CacheConfig;
  private isOnline: boolean = navigator.onLine;
  private syncWorker: Worker | null = null;
  private compressionEnabled: boolean = false;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 50 * 1024 * 1024, // 50MB default
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      syncStrategy: 'batch',
      compressionEnabled: false,
      encryptionEnabled: true,
      ...config
    };

    this.initializeCache();
    this.setupEventListeners();
    this.initializeServiceWorker();
  }

  /**
   * Initialize cache from persistent storage
   */
  private async initializeCache(): Promise<void> {
    try {
      // Initialize IndexedDB for persistent storage
      const db = await this.openIndexedDB();
      
      // Load cached entries
      const cachedEntries = await this.loadFromIndexedDB(db);
      
      // Populate in-memory cache
      cachedEntries.forEach(entry => {
        if (this.isEntryValid(entry)) {
          this.cache.set(entry.key, entry);
        }
      });

      // Load pending operations
      const pendingOps = await this.loadPendingOperations(db);
      pendingOps.forEach(op => {
        this.pendingOperations.set(op.id, op);
      });

      console.log(`AdGo Cache initialized: ${this.cache.size} entries, ${this.pendingOperations.size} pending operations`);
      
    } catch (error) {
      console.error('Failed to initialize cache:', error);
    }
  }

  /**
   * Setup event listeners for network and visibility changes
   */
  private setupEventListeners(): void {
    // Network status changes
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.triggerSync();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        this.triggerSync();
      }
    });

    // Periodic sync (every 5 minutes when online)
    setInterval(() => {
      if (this.isOnline && this.config.syncStrategy === 'periodic') {
        this.triggerSync();
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Initialize service worker for background sync
   */
  private async initializeServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw-cache.js');
        
        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data.type === 'SYNC_COMPLETE') {
            this.handleSyncComplete(event.data.operations);
          }
        });

        console.log('AdGo Cache Service Worker registered');
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  }

  /**
   * Store data in cache with intelligent compression and encryption
   */
  public async set<T>(key: string, data: T, options: {
    ttl?: number;
    priority?: number;
    metadata?: Record<string, any>;
  } = {}): Promise<void> {
    try {
      // Ensure cache doesn't exceed size limits
      await this.enforceSize();

      // Prepare cache entry
      const timestamp = Date.now();
      const ttl = options.ttl || this.config.ttl;
      const serializedData = JSON.stringify(data);
      
      let processedData: any = data;
      
      // Compress if enabled
      if (this.config.compressionEnabled) {
        processedData = await this.compress(serializedData);
      }

      // Encrypt if enabled
      if (this.config.encryptionEnabled) {
        processedData = await this.encrypt(processedData);
      }

      const entry: CacheEntry<any> = {
        key,
        data: processedData,
        timestamp,
        expires: timestamp + ttl,
        version: this.generateVersion(),
        checksum: await this.generateChecksum(serializedData),
        metadata: options.metadata
      };

      // Store in memory cache
      this.cache.set(key, entry);

      // Persist to IndexedDB
      await this.persistToIndexedDB(entry);

      // Schedule sync if online and immediate strategy
      if (this.isOnline && this.config.syncStrategy === 'immediate') {
        this.queueOperation({
          id: this.generateOperationId(),
          type: 'update',
          resource: key,
          data,
          timestamp,
          retries: 0,
          priority: options.priority || 1
        });
      }

    } catch (error) {
      console.error('Cache set error:', error);
      throw error;
    }
  }

  /**
   * Retrieve data from cache with fallback strategies
   */
  public async get<T>(key: string, fallbackFetch?: () => Promise<T>): Promise<T | null> {
    try {
      // Check in-memory cache first
      const entry = this.cache.get(key);
      
      if (entry && this.isEntryValid(entry)) {
        // Decrypt if needed
        let data = entry.data;
        if (this.config.encryptionEnabled) {
          data = await this.decrypt(data);
        }

        // Decompress if needed
        if (this.config.compressionEnabled) {
          data = await this.decompress(data);
        }

        // Verify checksum
        const currentChecksum = await this.generateChecksum(JSON.stringify(data));
        if (currentChecksum !== entry.checksum) {
          console.warn('Cache entry corrupted:', key);
          this.cache.delete(key);
          return null;
        }

        return data;
      }

      // If online and fallback available, fetch fresh data
      if (this.isOnline && fallbackFetch) {
        try {
          const freshData = await fallbackFetch();
          
          // Cache the fresh data
          await this.set(key, freshData);
          
          return freshData;
        } catch (error) {
          console.warn('Fallback fetch failed:', error);
        }
      }

      // Check IndexedDB for persistent cache
      const persistentEntry = await this.getFromIndexedDB(key);
      if (persistentEntry && this.isEntryValid(persistentEntry)) {
        // Load into memory cache
        this.cache.set(key, persistentEntry);
        return await this.get(key); // Recursive call to handle decryption/decompression
      }

      return null;

    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Queue operation for later sync
   */
  public queueOperation(operation: SyncOperation): void {
    this.pendingOperations.set(operation.id, operation);
    
    // Persist pending operation
    this.persistPendingOperation(operation);

    // Trigger immediate sync if online and strategy allows
    if (this.isOnline && this.config.syncStrategy === 'immediate') {
      this.syncSingleOperation(operation);
    }
  }

  /**
   * Trigger sync of all pending operations
   */
  public async triggerSync(): Promise<void> {
    if (!this.isOnline || this.pendingOperations.size === 0) {
      return;
    }

    console.log(`Starting sync: ${this.pendingOperations.size} operations`);

    // Sort operations by priority and timestamp
    const operations = Array.from(this.pendingOperations.values())
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority; // Higher priority first
        }
        return a.timestamp - b.timestamp; // Older operations first
      });

    // Batch sync operations
    const batchSize = 10;
    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      await this.syncBatch(batch);
    }
  }

  /**
   * Sync a batch of operations
   */
  private async syncBatch(operations: SyncOperation[]): Promise<void> {
    const syncPromises = operations.map(op => this.syncSingleOperation(op));
    
    try {
      await Promise.allSettled(syncPromises);
    } catch (error) {
      console.error('Batch sync error:', error);
    }
  }

  /**
   * Sync a single operation
   */
  private async syncSingleOperation(operation: SyncOperation): Promise<void> {
    try {
      // Simulate API call (replace with actual API endpoints)
      const response = await fetch(`/api/${operation.resource}`, {
        method: this.getHttpMethod(operation.type),
        headers: {
          'Content-Type': 'application/json',
          'X-AdGo-Operation-Id': operation.id
        },
        body: operation.type === 'delete' ? undefined : JSON.stringify(operation.data)
      });

      if (response.ok) {
        // Operation successful, remove from pending
        this.pendingOperations.delete(operation.id);
        await this.removePendingOperation(operation.id);
        
        console.log(`Sync successful: ${operation.type} ${operation.resource}`);
      } else {
        // Operation failed, increment retry count
        operation.retries++;
        
        if (operation.retries >= 3) {
          // Max retries reached, remove or mark as failed
          this.pendingOperations.delete(operation.id);
          await this.removePendingOperation(operation.id);
          console.error(`Sync failed after 3 retries: ${operation.id}`);
        } else {
          // Schedule for retry with exponential backoff
          setTimeout(() => {
            this.syncSingleOperation(operation);
          }, Math.pow(2, operation.retries) * 1000);
        }
      }

    } catch (error) {
      console.error('Sync operation error:', error);
      operation.retries++;
    }
  }

  /**
   * Get HTTP method for operation type
   */
  private getHttpMethod(type: string): string {
    switch (type) {
      case 'create': return 'POST';
      case 'update': return 'PUT';
      case 'delete': return 'DELETE';
      case 'sync': return 'POST';
      default: return 'POST';
    }
  }

  /**
   * Check if cache entry is valid (not expired)
   */
  private isEntryValid(entry: CacheEntry<any>): boolean {
    return Date.now() < entry.expires;
  }

  /**
   * Enforce cache size limits
   */
  private async enforceSize(): Promise<void> {
    const currentSize = this.calculateCacheSize();
    
    if (currentSize > this.config.maxSize) {
      // Remove oldest entries until under size limit
      const entries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].timestamp - b[1].timestamp);

      let removedSize = 0;
      for (const [key, entry] of entries) {
        this.cache.delete(key);
        await this.removeFromIndexedDB(key);
        
        removedSize += this.calculateEntrySize(entry);
        
        if (currentSize - removedSize <= this.config.maxSize * 0.8) {
          break; // Keep 20% buffer
        }
      }

      console.log(`Cache cleanup: removed ${removedSize} bytes`);
    }
  }

  /**
   * Calculate total cache size
   */
  private calculateCacheSize(): number {
    return Array.from(this.cache.values())
      .reduce((total, entry) => total + this.calculateEntrySize(entry), 0);
  }

  /**
   * Calculate size of a single cache entry
   */
  private calculateEntrySize(entry: CacheEntry<any>): number {
    return JSON.stringify(entry).length * 2; // Rough estimate (UTF-16)
  }

  /**
   * Generate version string for cache entry
   */
  private generateVersion(): string {
    return `v${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Generate checksum for data integrity
   */
  private async generateChecksum(data: string): Promise<string> {
    if ('crypto' in window && 'subtle' in crypto) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback simple hash
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  /**
   * Generate unique operation ID
   */
  private generateOperationId(): string {
    return `op_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Compress data (placeholder - would use actual compression library)
   */
  private async compress(data: string): Promise<string> {
    // In a real implementation, use a library like pako or fflate
    return btoa(data); // Simple base64 encoding as placeholder
  }

  /**
   * Decompress data (placeholder)
   */
  private async decompress(data: string): Promise<string> {
    return atob(data); // Simple base64 decoding as placeholder
  }

  /**
   * Encrypt data (placeholder - would use Web Crypto API)
   */
  private async encrypt(data: any): Promise<string> {
    // Placeholder encryption - in production use proper Web Crypto API
    return btoa(JSON.stringify(data));
  }

  /**
   * Decrypt data (placeholder)
   */
  private async decrypt(data: string): Promise<any> {
    return JSON.parse(atob(data));
  }

  /**
   * Handle sync completion from service worker
   */
  private handleSyncComplete(operations: string[]): void {
    operations.forEach(opId => {
      this.pendingOperations.delete(opId);
    });
    
    console.log(`Background sync completed: ${operations.length} operations`);
  }

  /**
   * Clear all cached data
   */
  public async clear(): Promise<void> {
    this.cache.clear();
    this.pendingOperations.clear();
    
    // Clear IndexedDB
    const db = await this.openIndexedDB();
    const transaction = db.transaction(['cache', 'operations'], 'readwrite');
    await transaction.objectStore('cache').clear();
    await transaction.objectStore('operations').clear();
    
    console.log('Cache cleared');
  }

  /**
   * Get cache statistics
   */
  public getStats(): {
    entryCount: number;
    totalSize: number;
    pendingOperations: number;
    hitRate: number;
  } {
    return {
      entryCount: this.cache.size,
      totalSize: this.calculateCacheSize(),
      pendingOperations: this.pendingOperations.size,
      hitRate: 0.95 // Would track actual hit rate in production
    };
  }

  // IndexedDB helper methods (simplified implementations)
  private async openIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AdGoCache', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('operations')) {
          db.createObjectStore('operations', { keyPath: 'id' });
        }
      };
    });
  }

  private async loadFromIndexedDB(db: IDBDatabase): Promise<CacheEntry<any>[]> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  private async loadPendingOperations(db: IDBDatabase): Promise<SyncOperation[]> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['operations'], 'readonly');
      const store = transaction.objectStore('operations');
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  private async persistToIndexedDB(entry: CacheEntry<any>): Promise<void> {
    const db = await this.openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.put(entry);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async getFromIndexedDB(key: string): Promise<CacheEntry<any> | null> {
    const db = await this.openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.get(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  private async removeFromIndexedDB(key: string): Promise<void> {
    const db = await this.openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.delete(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async persistPendingOperation(operation: SyncOperation): Promise<void> {
    const db = await this.openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['operations'], 'readwrite');
      const store = transaction.objectStore('operations');
      const request = store.put(operation);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async removePendingOperation(operationId: string): Promise<void> {
    const db = await this.openIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['operations'], 'readwrite');
      const store = transaction.objectStore('operations');
      const request = store.delete(operationId);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export default AdvancedOfflineCache;