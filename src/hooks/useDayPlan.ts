import {useState, useMemo} from 'react';
import {mealTemplates} from '../data/mealTemplates';
import {DayPlan, FeelingType, FoodOption, MealMoment, PlannedMeal, Supplement, WorkoutType} from '../types';
import {getMealTime} from '../utils/timing';
import {calculateCalories} from '../utils/nutrition';

export const useDayPlan = (
  workoutType: WorkoutType,
  workoutTime: string,
  feelings: FeelingType[],
  supplementStack: Supplement[],
) => {
  const [plan] = useState<DayPlan>(() => buildDayPlan(workoutType, workoutTime, feelings, supplementStack));
  return plan;
};

const buildDayPlan = (
  workoutType: WorkoutType,
  workoutTime: string,
  feelings: FeelingType[],
  supplementStack: Supplement[],
): DayPlan => {
  const moments: MealMoment[] =
    workoutType === 'rest-day'
      ? ['breakfast', 'lunch', 'dinner', 'before-bed']
      : ['breakfast', 'pre-run', 'post-run', 'lunch', 'dinner', 'before-bed'];

  const plannedMeals: PlannedMeal[] = moments.map(moment => {
    const template = mealTemplates.find(t => t.moment === moment);
    if (!template) {
      return createEmptyMeal(moment, workoutTime, workoutType);
    }

    // Adjust macros based on workout type
    const adjustedMacros = adjustMacrosForWorkout(
      template.proteinGrams,
      template.carbsGrams,
      template.fatGrams,
      moment,
      workoutType,
    );

    // Get supplements for this meal timing
    const mealSupplements = getSupplementsForMoment(moment, supplementStack);

    return {
      moment,
      name: template.name,
      time: getMealTime(moment, workoutType, workoutTime),
      proteinGrams: adjustedMacros.protein,
      carbsGrams: adjustedMacros.carbs,
      fatGrams: adjustedMacros.fat,
      calories: calculateCalories(adjustedMacros.protein, adjustedMacros.carbs, adjustedMacros.fat),
      foodOptions: template.foodOptions,
      supplements: mealSupplements,
      confirmed: false,
    };
  });

  return {
    date: new Date().toISOString().split('T')[0],
    workout: workoutType,
    workoutTime,
    feelings,
    meals: plannedMeals,
  };
};

const createEmptyMeal = (moment: MealMoment, workoutTime: string, workoutType: WorkoutType): PlannedMeal => ({
  moment,
  name: moment.charAt(0).toUpperCase() + moment.slice(1),
  time: getMealTime(moment, workoutType, workoutTime),
  proteinGrams: 0,
  carbsGrams: 0,
  fatGrams: 0,
  calories: 0,
  foodOptions: [],
  supplements: [],
  confirmed: false,
});

const adjustMacrosForWorkout = (
  protein: number,
  carbs: number,
  fat: number,
  moment: MealMoment,
  workoutType: WorkoutType,
): {protein: number; carbs: number; fat: number} => {
  if (workoutType === 'rest-day') {
    // Lower carbs, slightly higher fat on rest days
    return {protein, carbs: Math.round(carbs * 0.7), fat: Math.round(fat * 1.3)};
  }

  switch (moment) {
    case 'pre-run':
      return {protein, carbs: Math.round(carbs * 1.2), fat: Math.round(fat * 0.5)};
    case 'post-run':
      return {protein: Math.round(protein * 1.3), carbs: Math.round(carbs * 1.5), fat};
    case 'during':
      return {protein: 0, carbs: 30, fat: 0};
    default:
      return {protein, carbs, fat};
  }
};

const getSupplementsForMoment = (moment: MealMoment, stack: Supplement[]): Supplement[] => {
  const timingMap: Record<MealMoment, string[]> = {
    breakfast: ['morning'],
    'pre-run': ['pre-run'],
    during: [],
    'post-run': ['post-run'],
    lunch: ['with-meal'],
    dinner: ['with-meal'],
    'before-bed': ['before-bed'],
  };

  const timings = timingMap[moment] || [];
  return stack.filter(s => s.when.some(w => timings.includes(w)));
};

export const getTotalDailyMacros = (meals: PlannedMeal[]): {protein: number; carbs: number; fat: number; calories: number} => {
  return meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.proteinGrams,
      carbs: acc.carbs + meal.carbsGrams,
      fat: acc.fat + meal.fatGrams,
      calories: acc.calories + meal.calories,
    }),
    {protein: 0, carbs: 0, fat: 0, calories: 0},
  );
};
