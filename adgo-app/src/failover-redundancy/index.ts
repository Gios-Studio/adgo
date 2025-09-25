// Failover & Redundancy Engine
// Ensures ad delivery via redundant endpoints and failover logic

export type Endpoint = {
  name: string;
  requestFn: () => Promise<any>;
};

export type FailoverResult = {
  endpoint: string;
  success: boolean;
  attempts: number;
};

export async function deliverWithFailover(endpoints: Endpoint[]): Promise<FailoverResult> {
  let attempts = 0;
  for (const ep of endpoints) {
    attempts++;
    try {
      await ep.requestFn();
      return { endpoint: ep.name, success: true, attempts };
    } catch (e) {
      // Try next endpoint
    }
  }
  return { endpoint: '', success: false, attempts };
}
