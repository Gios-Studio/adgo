// Cross-Platform Deduplication Engine
// Deduplicates ad events across multiple platforms/devices

export type AdEvent = {
  eventId: string;
  userId: string;
  deviceId: string;
  timestamp: Date;
};

export function deduplicateEvents(events: AdEvent[]): AdEvent[] {
  const seen = new Set<string>();
  return events.filter((e) => {
    const key = `${e.userId}-${e.eventId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
