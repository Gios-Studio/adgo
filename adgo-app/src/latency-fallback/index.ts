// Latency Budget & Fallback Mode Engine
// Ensures ad delivery within latency budget, triggers fallback if exceeded

export type LatencyConfig = {
  maxLatencyMs: number;
};

export type AdResponse = {
  success: boolean;
  latencyMs: number;
  fallbackUsed: boolean;
};

export function handleAdRequest(
  config: LatencyConfig,
  requestFn: () => Promise<any>,
  fallbackFn: () => Promise<any>
): Promise<AdResponse> {
  const start = Date.now();
  return new Promise((resolve) => {
    let resolved = false;
    requestFn()
      .then((result) => {
        if (!resolved) {
          resolved = true;
          const latency = Date.now() - start;
          resolve({ success: true, latencyMs: latency, fallbackUsed: false });
        }
      })
      .catch(() => {
        if (!resolved) {
          resolved = true;
          const latency = Date.now() - start;
          resolve({ success: false, latencyMs: latency, fallbackUsed: false });
        }
      });
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        fallbackFn().then(() => {
          const latency = Date.now() - start;
          resolve({ success: true, latencyMs: latency, fallbackUsed: true });
        });
      }
    }, config.maxLatencyMs);
  });
}
