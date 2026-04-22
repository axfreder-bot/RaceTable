import {
  calculateCalories,
  calculateMacroPercentage,
  sumMacros,
  macroRingData,
  formatMacro,
  formatCalories,
} from '../src/utils/nutrition';

describe('nutrition utils', () => {
  describe('calculateCalories', () => {
    it('calculates calories correctly for protein, carbs, fat', () => {
      expect(calculateCalories(30, 50, 20)).toBe(30 * 4 + 50 * 4 + 20 * 9);
    });

    it('rounds to nearest integer', () => {
      expect(calculateCalories(10, 10, 10)).toBe(170);
    });

    it('returns 0 for all zeros', () => {
      expect(calculateCalories(0, 0, 0)).toBe(0);
    });
  });

  describe('calculateMacroPercentage', () => {
    it('returns correct percentages summing to 100', () => {
      const result = calculateMacroPercentage(25, 25, 25);
      expect(result.proteinPct + result.carbsPct + result.fatPct).toBe(100);
    });

    it('splits evenly for protein and carbs only', () => {
      const result = calculateMacroPercentage(25, 25, 0);
      expect(result.proteinPct).toBe(50);
      expect(result.carbsPct).toBe(50);
      expect(result.fatPct).toBe(0);
    });

    it('returns zeros when all inputs are 0', () => {
      const result = calculateMacroPercentage(0, 0, 0);
      expect(result.proteinPct).toBe(0);
      expect(result.carbsPct).toBe(0);
      expect(result.fatPct).toBe(0);
    });

    it('gives fat full share when no protein or carbs', () => {
      const result = calculateMacroPercentage(0, 0, 50);
      expect(result.fatPct).toBe(100);
    });
  });

  describe('sumMacros', () => {
    it('sums multiple food items correctly', () => {
      const items = [
        {protein: 30, carbs: 40, fat: 20, calories: 460},
        {protein: 20, carbs: 30, fat: 10, calories: 290},
      ];
      const result = sumMacros(items);
      expect(result.protein).toBe(50);
      expect(result.carbs).toBe(70);
      expect(result.fat).toBe(30);
      expect(result.calories).toBe(750);
    });

    it('returns zero totals for empty array', () => {
      const result = sumMacros([]);
      expect(result.protein).toBe(0);
      expect(result.carbs).toBe(0);
      expect(result.fat).toBe(0);
      expect(result.calories).toBe(0);
    });

    it('DNE VERIFY: sumMacros is consistent with manual calorie entries', () => {
      // sumMacros aggregates manually-entered calories (from food database).
      // calories field is user-input, not derived. This verifies the aggregator
      // correctly sums protein/carbs/fat and that calories sum matches.
      const meals = [
        {protein: 30, carbs: 50, fat: 15, calories: 515},
        {protein: 25, carbs: 40, fat: 12, calories: 368},
        {protein: 20, carbs: 30, fat: 10, calories: 290},
      ];
      const totals = sumMacros(meals);
      // Verify macro totals
      expect(totals.protein).toBe(75);
      expect(totals.carbs).toBe(120);
      expect(totals.fat).toBe(37);
      // Verify calories sum
      expect(totals.calories).toBe(515 + 368 + 290);
    });

    it('calculateCalories: known food values', () => {
      // Chicken breast: 31p+0c+3.6f → Math.round(124+0+32.4) = Math.round(156.4) = 156
      expect(calculateCalories(31, 0, 3.6)).toBe(156);
      // White rice cooked: 2.7p+28c+0.3f → Math.round(10.8+112+2.7) = Math.round(125.5) = 126
      expect(calculateCalories(2.7, 28, 0.3)).toBe(126);
    });
  });

  describe('macroRingData', () => {
    it('returns correct progress/remaining/percentage', () => {
      const result = macroRingData(150, 200);
      expect(result.progress).toBe(150);
      expect(result.remaining).toBe(50);
      expect(result.percentage).toBe(75);
    });

    it('caps percentage at 100 when over target', () => {
      const result = macroRingData(250, 200);
      expect(result.percentage).toBe(100);
      expect(result.remaining).toBe(0);
    });

    it('returns 0 percentage when target is 0', () => {
      const result = macroRingData(100, 0);
      expect(result.percentage).toBe(0);
    });
  });

  describe('formatMacro', () => {
    it('rounds and appends g', () => {
      expect(formatMacro(30.6)).toBe('31g');
      expect(formatMacro(30.4)).toBe('30g');
    });
  });

  describe('formatCalories', () => {
    it('rounds and appends cal', () => {
      expect(formatCalories(499.6)).toBe('500 cal');
      expect(formatCalories(499.4)).toBe('499 cal');
    });
  });
});
