// Multi-App Aggregation Engine
// Aggregates data and events across multiple apps for unified analytics

export type AppEvent = {
  appId: string;
  eventId: string;
  userId: string;
  timestamp: Date;
};

export function aggregateAppEvents(events: AppEvent[]): Record<string, AppEvent[]> {
  const result: Record<string, AppEvent[]> = {};
  for (const e of events) {
    if (!result[e.appId]) result[e.appId] = [];
    result[e.appId].push(e);
  }
  return result;
}
