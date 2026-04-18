import {useMemo} from 'react';
import {supplements} from '../data/supplements';
import {FeelingType, Supplement, WorkoutType} from '../types';

export const useSupplementStack = (
  feelings: FeelingType[],
  workoutType: WorkoutType,
): Supplement[] => {
  return useMemo(() => {
    let stack: Supplement[] = [];

    // Base morning supplements (always taken)
    stack = stack.concat(supplements.filter(s => s.when.includes('morning')));

    // Pre-run supplements
    if (workoutType !== 'rest-day') {
      stack = stack.concat(supplements.filter(s => s.when.includes('pre-run')));
    }

    // Post-run supplements
    if (workoutType !== 'rest-day') {
      stack = stack.concat(supplements.filter(s => s.when.includes('post-run')));
    }

    // Before-bed supplements
    stack = stack.concat(supplements.filter(s => s.when.includes('before-bed')));

    // Feeling-based adjustments
    if (feelings.includes('exhausted') || feelings.includes('fatigued')) {
      // Skip morning caffeine if already exhausted (will make it worse)
      stack = stack.filter(s => s.key !== 'caffeine');
      // Add extra rhodiola for energy
      const rhodiola = supplements.find(s => s.key === 'rhodiola');
      if (rhodiola && !stack.find(s => s.key === 'rhodiola')) {
        stack.unshift(rhodiola);
      }
    }

    if (feelings.includes('sore')) {
      // Add extra tart cherry and omega-3 for recovery
      const tartCherry = supplements.find(s => s.key === 'tart-cherry');
      if (tartCherry && !stack.find(s => s.key === 'tart-cherry')) {
        stack.push(tartCherry);
      }
    }

    if (feelings.includes('energized')) {
      // Reduce pre-run stimulants — already have energy
      const caffeine = supplements.find(s => s.key === 'caffeine');
      if (caffeine) {
        // Only one caffeine dose max
        const caffeineCount = stack.filter(s => s.key === 'caffeine').length;
        if (caffeineCount > 1) {
          stack = stack.filter(s => !(s.key === 'caffeine' && s.when.includes('pre-run')));
        }
      }
    }

    // Remove duplicates
    const seen = new Set<string>();
    return stack.filter(s => {
      if (seen.has(s.key)) return false;
      seen.add(s.key);
      return true;
    });
  }, [feelings, workoutType]);
};

export const getSupplementsByTimingCategory = (
  stack: Supplement[],
): Record<string, Supplement[]> => {
  return {
    morning: stack.filter(s => s.when.includes('morning')),
    preRun: stack.filter(s => s.when.includes('pre-run')),
    postRun: stack.filter(s => s.when.includes('post-run')),
    withMeal: stack.filter(s => s.when.includes('with-meal')),
    beforeBed: stack.filter(s => s.when.includes('before-bed')),
  };
};
