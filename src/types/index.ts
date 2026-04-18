export type SupplementTiming = 'morning' | 'pre-run' | 'post-run' | 'with-meal' | 'before-bed' | 'during';
export type SupplementCategory = 'protein' | 'recovery' | 'vitamin' | 'stimulant' | 'hydration' | 'cognitive';
export type WorkoutType = 'easy-run' | 'tempo' | 'long-run' | 'intervals' | 'rest-day';
export type FeelingType = 'energized' | 'normal' | 'sore' | 'fatigued' | 'exhausted';
export type FitScore = 'fits' | 'caution' | 'avoid';
export type MealMoment = 'breakfast' | 'pre-run' | 'during' | 'post-run' | 'lunch' | 'dinner' | 'before-bed';
export type SubscriptionTier = 'free' | 'monthly' | 'annual';

export interface Supplement {
  key: string;
  name: string;
  icon: string;
  dosage: string;
  when: SupplementTiming[];
  withFood: boolean;
  notes: string;
  category: SupplementCategory;
}

export interface MealTemplate {
  key: string;
  name: string;
  moment: MealMoment;
  time: string;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  calories: number;
  foodOptions: FoodOption[];
}

export interface FoodOption {
  name: string;
  servings: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  dishes: Dish[];
}

export interface Dish {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  fitScore: FitScore;
  fitNotes: string;
}

export interface DayPlan {
  date: string;
  workout: WorkoutType;
  workoutTime: string;
  feelings: FeelingType[];
  meals: PlannedMeal[];
}

export interface PlannedMeal {
  moment: MealMoment;
  name: string;
  time: string;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  calories: number;
  foodOptions: FoodOption[];
  supplements: Supplement[];
  confirmed: boolean;
  actualFoods?: FoodOption[];
}

export interface FoodLogEntry {
  id: string;
  date: string;
  moment: MealMoment;
  plannedMeal: PlannedMeal;
  confirmed: boolean;
  actualFoods: FoodOption[];
  deviations: string[];
}

export interface TrainingWeek {
  weekNumber: number;
  workouts: TrainingWorkout[];
}

export interface TrainingWorkout {
  day: string;
  type: WorkoutType;
  description: string;
  miles: number;
}

export interface RaceInfo {
  name: string;
  date: string;
  city: string;
  daysUntil: number;
}

export interface SupplementStack {
  morning: Supplement[];
  preRun: Supplement[];
  postRun: Supplement[];
  withMeal: Supplement[];
  beforeBed: Supplement[];
}

export interface UserProfile {
  name: string;
  subscriptionTier: SubscriptionTier;
  supplementInventory: Record<string, boolean>;
  raceInfo: RaceInfo | null;
}
