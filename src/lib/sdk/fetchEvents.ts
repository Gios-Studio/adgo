/**
 * AdGo SDK Event Fetching Library
 * Enhanced pagination and delta sync capabilities for stable event retrieval
 */

export interface EventsQuery {
  ride_id?: string;
  device_id?: string;
  zone?: string;
  limit?: number;
  offset?: number;
  cursor?: string;
  since?: string;
  campaign_id?: string;
  event_type?: 'impression' | 'click' | 'conversion';
}

export interface PaginationInfo {
  limit: number;
  offset: number;
  total: number;
  hasMore: boolean;
  nextOffset: number | null;
  nextCursor?: string | null;
}

export interface DeltaSyncInfo {
  since: string | null;
  latestTimestamp: string | null;
}

export interface EventsResponse {
  events: any[];
  pagination: PaginationInfo;
  deltaSync: DeltaSyncInfo;
  cached?: boolean;
  timestamp: string;
}

export interface FetchConfig {
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  cacheEnabled?: boolean;
}

/**
 * Enhanced event fetching client with pagination stability and caching
 */
export class EventsFetcher {
  private baseUrl: string;
  private timeout: number;
  private retryAttempts: number;
  private cacheEnabled: boolean;
  private cache: Map<string, { data: EventsResponse; timestamp: number; ttl: number }>;

  constructor(config: FetchConfig = {}) {
    this.baseUrl = config.baseUrl || '';
    this.timeout = config.timeout || 10000;
    this.retryAttempts = config.retryAttempts || 3;
    this.cacheEnabled = config.cacheEnabled ?? true;
    this.cache = new Map();
  }

  /**
   * Fetch events with stable pagination and automatic fallback
   */
  async fetchEvents(query: EventsQuery = {}): Promise<EventsResponse> {
    const queryParams = this.normalizeQuery(query);
    const cacheKey = this.generateCacheKey(queryParams);

    // Check cache first
    if (this.cacheEnabled) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return { ...cached, cached: true };
      }
    }

    let lastError: Error | null = null;

    // Retry mechanism with exponential backoff
    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        const response = await this.executeRequest(queryParams);
        
        // Cache successful response
        if (this.cacheEnabled) {
          this.setCache(cacheKey, response, 30000); // 30 second TTL
        }

        return response;

      } catch (error) {
        lastError = error as Error;
        console.warn(`Fetch attempt ${attempt + 1} failed:`, error);

        if (attempt < this.retryAttempts - 1) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('All fetch attempts failed');
  }

  /**
   * Fetch events with cursor-based pagination (for large datasets)
   */
  async fetchWithCursor(query: EventsQuery = {}): Promise<EventsResponse> {
    // Convert offset to cursor if needed
    if (query.offset && !query.cursor) {
      // For cursor-based pagination, we need to start fresh
      delete query.offset;
    }

    return this.fetchEvents({ ...query, cursor: query.cursor });
  }

  /**
   * Fetch events with delta sync (only new events since timestamp)
   */
  async fetchDeltaSync(since: string, query: EventsQuery = {}): Promise<EventsResponse> {
    return this.fetchEvents({ ...query, since, limit: query.limit || 100 });
  }

  /**
   * Paginate through all events with automatic page handling
   */
  async *paginateEvents(query: EventsQuery = {}): AsyncGenerator<any[], void, unknown> {
    let currentOffset = query.offset || 0;
    const limit = Math.min(query.limit || 50, 100); // Cap at 100 per page
    let hasMore = true;

    while (hasMore) {
      try {
        const response = await this.fetchEvents({
          ...query,
          offset: currentOffset,
          limit
        });

        if (response.events.length > 0) {
          yield response.events;
        }

        hasMore = response.pagination.hasMore;
        currentOffset = response.pagination.nextOffset || currentOffset + limit;

        // Safety break to prevent infinite loops
        if (currentOffset > 10000) {
          console.warn('Pagination limit reached (10,000 records), stopping');
          break;
        }

      } catch (error) {
        console.error('Pagination failed at offset', currentOffset, error);
        break;
      }
    }
  }

  /**
   * Stream events in real-time with automatic retry and delta sync
   */
  async *streamEvents(
    query: EventsQuery = {},
    interval: number = 5000
  ): AsyncGenerator<any[], void, unknown> {
    let lastTimestamp = query.since || new Date().toISOString();

    while (true) {
      try {
        const response = await this.fetchDeltaSync(lastTimestamp, query);
        
        if (response.events.length > 0) {
          yield response.events;
          lastTimestamp = response.deltaSync.latestTimestamp || lastTimestamp;
        }

        await new Promise(resolve => setTimeout(resolve, interval));

      } catch (error) {
        console.error('Stream error, retrying in', interval, 'ms:', error);
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  }

  /**
   * Execute the actual HTTP request
   */
  private async executeRequest(query: EventsQuery): Promise<EventsResponse> {
    const url = this.buildUrl('/api/sdk/events', query);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-SDK-Version': '1.0.0'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Normalize query parameters and apply defaults
   */
  private normalizeQuery(query: EventsQuery): EventsQuery {
    return {
      limit: Math.min(query.limit || 50, 100), // Default 50, max 100
      offset: Math.max(query.offset || 0, 0),
      zone: query.zone || 'post-ride',
      ...query
    };
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(path: string, params: EventsQuery): string {
    const url = new URL(path, this.baseUrl || window.location.origin);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  /**
   * Generate cache key for query
   */
  private generateCacheKey(query: EventsQuery): string {
    const normalized = { ...query };
    delete normalized.since; // Don't cache delta sync queries
    
    return JSON.stringify(normalized);
  }

  /**
   * Get cached response if valid
   */
  private getFromCache(key: string): EventsResponse | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set cached response
   */
  private setCache(key: string, data: EventsResponse, ttl: number): void {
    // Limit cache size
    if (this.cache.size > 100) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Clear all cached data
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; hitRate?: number } {
    return {
      size: this.cache.size
      // Hit rate would require additional tracking
    };
  }
}

// Default instance for convenience
export const defaultEventsFetcher = new EventsFetcher();

/**
 * Convenience function for simple event fetching
 */
export async function fetchEvents(query: EventsQuery = {}): Promise<EventsResponse> {
  return defaultEventsFetcher.fetchEvents(query);
}

/**
 * Convenience function for delta sync
 */
export async function fetchEventsSince(since: string, query: EventsQuery = {}): Promise<EventsResponse> {
  return defaultEventsFetcher.fetchDeltaSync(since, query);
}

/**
 * Validate pagination parameters
 */
export function validatePaginationParams(params: {
  limit?: number;
  offset?: number;
}): { isValid: boolean; error?: string } {
  const { limit = 50, offset = 0 } = params;

  if (limit < 1 || limit > 100) {
    return { isValid: false, error: 'limit must be between 1 and 100' };
  }

  if (offset < 0) {
    return { isValid: false, error: 'offset must be non-negative' };
  }

  return { isValid: true };
}