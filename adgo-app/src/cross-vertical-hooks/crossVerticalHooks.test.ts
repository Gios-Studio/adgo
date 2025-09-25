import { handleVerticalEvent, VerticalEvent } from './index';

describe('handleVerticalEvent', () => {
  it('should handle delivery events', () => {
    const event: VerticalEvent = { vertical: 'delivery', eventId: 'D1', payload: {}, timestamp: new Date() };
    expect(handleVerticalEvent(event)).toBe('Delivery event: D1');
  });
  it('should handle aviation events', () => {
    const event: VerticalEvent = { vertical: 'aviation', eventId: 'A1', payload: {}, timestamp: new Date() };
    expect(handleVerticalEvent(event)).toBe('Aviation event: A1');
  });
  it('should handle logistics events', () => {
    const event: VerticalEvent = { vertical: 'logistics', eventId: 'L1', payload: {}, timestamp: new Date() };
    expect(handleVerticalEvent(event)).toBe('Logistics event: L1');
  });
  it('should handle unknown verticals', () => {
    const event: any = { vertical: 'unknown', eventId: 'U1', payload: {}, timestamp: new Date() };
    expect(handleVerticalEvent(event)).toBe('Unknown vertical');
  });
});
