import {
  getMealTime,
  formatTimeOfDay,
} from '../src/utils/timing';

describe('timing utils', () => {
  describe('getMealTime', () => {
    it('returns correct fixed times', () => {
      expect(getMealTime('breakfast', 'easy-run', '6:00 AM')).toBe('7:00 AM');
      expect(getMealTime('lunch', 'easy-run', '6:00 AM')).toBe('12:30 PM');
      expect(getMealTime('dinner', 'easy-run', '6:00 AM')).toBe('7:00 PM');
      expect(getMealTime('before-bed', 'easy-run', '6:00 AM')).toBe('9:30 PM');
    });

    it('calculates pre-run 90 min before workout', () => {
      expect(getMealTime('pre-run', 'easy-run', '6:00 AM')).toBe('4:30 AM');
      expect(getMealTime('pre-run', 'long-run', '7:00 AM')).toBe('5:30 AM');
    });

    it('calculates post-run 60 min after workout', () => {
      expect(getMealTime('post-run', 'easy-run', '6:00 AM')).toBe('7:00 AM');
      expect(getMealTime('post-run', 'long-run', '9:00 AM')).toBe('10:00 AM');
    });
  });

  describe('formatTimeOfDay', () => {
    it('labels Morning for AM hours 5-11', () => {
      expect(formatTimeOfDay('7:00 AM')).toBe('Morning');
      expect(formatTimeOfDay('5:00 AM')).toBe('Morning');
    });

    it('labels Afternoon for PM hours 12-16 (12-4pm)', () => {
      expect(formatTimeOfDay('12:00 PM')).toBe('Afternoon');
      expect(formatTimeOfDay('4:00 PM')).toBe('Afternoon');
    });

    it('labels Evening for PM hours 17-20 (5-8pm)', () => {
      expect(formatTimeOfDay('5:00 PM')).toBe('Evening');
      expect(formatTimeOfDay('8:00 PM')).toBe('Evening');
    });

    it('labels Night for PM 21+ and AM before 5', () => {
      expect(formatTimeOfDay('10:00 PM')).toBe('Night');
      expect(formatTimeOfDay('3:00 AM')).toBe('Night');
    });
  });
});
