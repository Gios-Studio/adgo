import { aggregateAppEvents, AppEvent } from './index';

describe('aggregateAppEvents', () => {
  it('should group events by appId', () => {
    const events: AppEvent[] = [
      { appId: 'A1', eventId: 'E1', userId: 'U1', timestamp: new Date() },
      { appId: 'A2', eventId: 'E2', userId: 'U2', timestamp: new Date() },
      { appId: 'A1', eventId: 'E3', userId: 'U3', timestamp: new Date() },
    ];
    const agg = aggregateAppEvents(events);
    expect(agg['A1'].length).toBe(2);
    expect(agg['A2'].length).toBe(1);
  });
});
