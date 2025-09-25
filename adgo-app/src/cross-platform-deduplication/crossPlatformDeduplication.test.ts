import { deduplicateEvents, AdEvent } from './index';

describe('deduplicateEvents', () => {
  it('should remove duplicate events across devices', () => {
    const events: AdEvent[] = [
      { eventId: 'E1', userId: 'U1', deviceId: 'D1', timestamp: new Date() },
      { eventId: 'E1', userId: 'U1', deviceId: 'D2', timestamp: new Date() },
      { eventId: 'E2', userId: 'U1', deviceId: 'D1', timestamp: new Date() },
      { eventId: 'E2', userId: 'U2', deviceId: 'D1', timestamp: new Date() },
    ];
    const deduped = deduplicateEvents(events);
    expect(deduped.length).toBe(3);
    expect(deduped.some(e => e.eventId === 'E1' && e.userId === 'U1')).toBe(true);
    expect(deduped.some(e => e.eventId === 'E2' && e.userId === 'U1')).toBe(true);
    expect(deduped.some(e => e.eventId === 'E2' && e.userId === 'U2')).toBe(true);
  });
});
