// AdGo Performance Cache Layer
// In-memory caching with TTL and logging

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  sets: number;
  size: number;
}

class PerformanceCache {
  private cache = new Map<string, CacheEntry<any>>();
  private stats: CacheStats = { hits: 0, misses: 0, sets: 0, size: 0 };
  private readonly DEFAULT_TTL = 30000; // 30 seconds
  private readonly MAX_SIZE = 1000;

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    // Cleanup expired entries if cache is getting full
    if (this.cache.size >= this.MAX_SIZE) {
      this.cleanup();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    };

    this.cache.set(key, entry);
    this.stats.sets++;
    this.stats.size = this.cache.size;
    
    this.logCacheOperation('SET', key, { ttl });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.stats.misses++;
      this.logCacheOperation('MISS', key);
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.size = this.cache.size;
      this.logCacheOperation('EXPIRED', key);
      return null;
    }

    this.stats.hits++;
    this.logCacheOperation('HIT', key);
    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.size = this.cache.size;
      return false;
    }
    
    return true;
  }

  delete(key: string): boolean {
    const result = this.cache.delete(key);
    this.stats.size = this.cache.size;
    if (result) {
      this.logCacheOperation('DELETE', key);
    }
    return result;
  }

  clear(): void {
    this.cache.clear();
    this.stats.size = 0;
    this.logCacheOperation('CLEAR', 'all');
  }

  cleanup(): void {
    const now = Date.now();
    let removedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        removedCount++;
      }
    }
    
    this.stats.size = this.cache.size;
    
    if (removedCount > 0) {
      this.logCacheOperation('CLEANUP', `${removedCount} entries`);
    }
  }

  getStats(): CacheStats & { hitRate: number } {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
    
    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100) / 100
    };
  }

  private logCacheOperation(operation: string, key: string, extra?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      operation,
      key,
      stats: this.getStats(),
      ...extra
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[CACHE ${operation}] ${key}`, extra || '');
    }

    // In production, this would write to /logs/cache.log
    // For now, we'll use console.log with structured format
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(logEntry));
    }
  }

  // Generate cache key for metrics requests
  static generateMetricsKey(
    campaign_id?: string, 
    partner_id?: string, 
    period?: string
  ): string {
    const parts = ['metrics'];
    if (campaign_id) parts.push(`campaign:${campaign_id}`);
    if (partner_id) parts.push(`partner:${partner_id}`);
    if (period) parts.push(`period:${period}`);
    return parts.join('|');
  }
}

// Global cache instance
export const performanceCache = new PerformanceCache();

// Cache statistics endpoint for monitoring
export function getCacheStats() {
  return performanceCache.getStats();
}

export default PerformanceCache;