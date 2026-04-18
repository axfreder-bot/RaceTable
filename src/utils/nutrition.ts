export const calculateCalories = (protein: number, carbs: number, fat: number): number => {
  return Math.round(protein * 4 + carbs * 4 + fat * 9);
};

export const calculateMacroPercentage = (
  protein: number,
  carbs: number,
  fat: number,
): {proteinPct: number; carbsPct: number; fatPct: number} => {
  const totalCals = protein * 4 + carbs * 4 + fat * 9;
  if (totalCals === 0) return {proteinPct: 0, carbsPct: 0, fatPct: 0};
  return {
    proteinPct: Math.round((protein * 4 / totalCals) * 100),
    carbsPct: Math.round((carbs * 4 / totalCals) * 100),
    fatPct: Math.round((fat * 9 / totalCals) * 100),
  };
};

export const sumMacros = (
  items: Array<{protein: number; carbs: number; fat: number; calories: number}>,
): {protein: number; carbs: number; fat: number; calories: number} => {
  return items.reduce(
    (acc, item) => ({
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
      calories: acc.calories + item.calories,
    }),
    {protein: 0, carbs: 0, fat: 0, calories: 0},
  );
};

export const macroRingData = (
  current: number,
  target: number,
): {progress: number; remaining: number; percentage: number} => {
  const percentage = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
  return {
    progress: current,
    remaining: Math.max(target - current, 0),
    percentage,
  };
};

export const formatMacro = (grams: number): string => {
  return `${Math.round(grams)}g`;
};

export const formatCalories = (calories: number): string => {
  return `${Math.round(calories)} cal`;
};
