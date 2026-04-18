import {useState, useCallback} from 'react';
import {FoodLogEntry, FoodOption, MealMoment, PlannedMeal} from '../types';

const generateId = () => Math.random().toString(36).substring(2, 10);

export const useFoodLog = (initialMeals: PlannedMeal[] = []) => {
  const [log, setLog] = useState<FoodLogEntry[]>(() =>
    initialMeals.map(meal => createInitialLogEntry(meal)),
  );

  const confirmMeal = useCallback(
    (moment: MealMoment, actualFoods: FoodOption[]) => {
      setLog(prev => {
        const existing = prev.find(e => e.moment === moment);
        if (existing) {
          const deviations = calculateDeviations(existing.plannedMeal.foodOptions, actualFoods);
          return prev.map(e =>
            e.moment === moment
              ? {...e, confirmed: true, actualFoods, deviations}
              : e,
          );
        }
        return prev;
      });
    },
    [],
  );

  const updateActualFoods = useCallback(
    (moment: MealMoment, actualFoods: FoodOption[]) => {
      setLog(prev => {
        const existing = prev.find(e => e.moment === moment);
        const deviations = existing ? calculateDeviations(existing.plannedMeal.foodOptions, actualFoods) : [];
        if (existing) {
          return prev.map(e =>
            e.moment === moment ? {...e, actualFoods, deviations} : e,
          );
        }
        return prev;
      });
    },
    [],
  );

  const getDeviationSummary = useCallback((entries: FoodLogEntry[]): string[] => {
    const allDeviations = entries
      .filter(e => e.confirmed && e.deviations.length > 0)
      .flatMap(e => e.deviations);
    return [...new Set(allDeviations)];
  }, []);

  const getTotalConsumed = useCallback((entries: FoodLogEntry[]) => {
    return entries
      .filter(e => e.confirmed)
      .reduce(
        (acc, entry) => {
          const sum = entry.actualFoods.reduce(
            (a, f) => ({
              protein: a.protein + f.protein * f.servings,
              carbs: a.carbs + f.carbs * f.servings,
              fat: a.fat + f.fat * f.servings,
              calories: a.calories + f.calories * f.servings,
            }),
            {protein: 0, carbs: 0, fat: 0, calories: 0},
          );
          return {
            protein: acc.protein + sum.protein,
            carbs: acc.carbs + sum.carbs,
            fat: acc.fat + sum.fat,
            calories: acc.calories + sum.calories,
          };
        },
        {protein: 0, carbs: 0, fat: 0, calories: 0},
      );
  }, []);

  return {log, confirmMeal, updateActualFoods, getDeviationSummary, getTotalConsumed};
};

const createInitialLogEntry = (meal: PlannedMeal): FoodLogEntry => ({
  id: generateId(),
  date: new Date().toISOString().split('T')[0],
  moment: meal.moment,
  plannedMeal: meal,
  confirmed: false,
  actualFoods: [],
  deviations: [],
});

const calculateDeviations = (planned: FoodOption[], actual: FoodOption[]): string[] => {
  const deviations: string[] = [];
  const plannedNames = new Set(planned.map(p => p.name));

  for (const a of actual) {
    if (!planned.find(p => p.name === a.name)) {
      deviations.push(`Added: ${a.name}`);
    }
  }

  for (const p of planned) {
    if (!actual.find(a => a.name === p.name)) {
      deviations.push(`Missed: ${p.name}`);
    }
  }

  return deviations;
};
