import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {colors} from '../theme/colors';
import {NutritionCard} from '../components/NutritionCard';
import {FoodLogConfirm} from '../components/FoodLogConfirm';
import {ProgressChart} from '../components/ProgressChart';
import {SupplementPill} from '../components/SupplementPill';
import {useFoodLog} from '../hooks/useFoodLog';
import {useSupplementStack} from '../hooks/useSupplementStack';
import {useDayPlan} from '../hooks/useDayPlan';
import {FoodOption, FoodLogEntry, WorkoutType, FeelingType} from '../types';

const MOCK_FEELINGS: FeelingType[] = ['normal'];

export const LogScreen: React.FC = () => {
  const [workoutType] = useState<WorkoutType>('tempo');
  const [workoutTime] = useState<string>('6:30 AM');
  const [selectedMealMoment, setSelectedMealMoment] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'log' | 'confirm'>('log');

  const supplementStack = useSupplementStack(MOCK_FEELINGS, workoutType);
  const dayPlan = useDayPlan(workoutType, workoutTime, MOCK_FEELINGS, supplementStack);
  const {log, confirmMeal, getTotalConsumed, getDeviationSummary} = useFoodLog(dayPlan.meals);

  const consumed = getTotalConsumed(log);
  const deviations = getDeviationSummary(log);
  const confirmedCount = log.filter(e => e.confirmed).length;

  const handleConfirmMeal = (moment: string, actualFoods: FoodOption[]) => {
    confirmMeal(moment as any, actualFoods);
    setSelectedMealMoment(null);
    setViewMode('log');
  };

  const logEntry = (moment: string): FoodLogEntry | undefined =>
    log.find(e => e.moment === moment);

  const plannedMeal = (moment: string) =>
    dayPlan.meals.find(m => m.moment === moment);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Food Log</Text>
          <Text style={styles.subtitle}>
            {confirmedCount}/{log.length} meals confirmed today
          </Text>
        </View>

        {/* Daily Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, {color: colors.accentProtein}]}>
              {Math.round(consumed.protein)}g
            </Text>
            <Text style={styles.summaryLabel}>Protein</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, {color: colors.accentEnergy}]}>
              {Math.round(consumed.carbs)}g
            </Text>
            <Text style={styles.summaryLabel}>Carbs</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, {color: colors.accentRecovery}]}>
              {Math.round(consumed.fat)}g
            </Text>
            <Text style={styles.summaryLabel}>Fat</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{Math.round(consumed.calories)}</Text>
            <Text style={styles.summaryLabel}>Calories</Text>
          </View>
        </View>

        {/* Deviation Summary */}
        {deviations.length > 0 && (
          <View style={styles.deviationsCard}>
            <Text style={styles.deviationsTitle}>Deviations from Plan</Text>
            {deviations.map((d, i) => (
              <Text key={i} style={styles.deviationItem}>• {d}</Text>
            ))}
          </View>
        )}

        {/* Mode Toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'log' && styles.toggleBtnActive]}
            onPress={() => setViewMode('log')}>
            <Text style={[styles.toggleText, viewMode === 'log' && styles.toggleTextActive]}>
              View Log
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === 'confirm' && styles.toggleBtnActive]}
            onPress={() => setViewMode('confirm')}>
            <Text style={[styles.toggleText, viewMode === 'confirm' && styles.toggleTextActive]}>
              Confirm Meals
            </Text>
          </TouchableOpacity>
        </View>

        {/* Meal List */}
        {dayPlan.meals.map(meal => {
          const entry = logEntry(meal.moment);

          if (viewMode === 'confirm' && selectedMealMoment === meal.moment) {
            return (
              <FoodLogConfirm
                key={meal.moment}
                meal={meal}
                onConfirm={actualFoods => handleConfirmMeal(meal.moment, actualFoods)}
              />
            );
          }

          return (
            <TouchableOpacity
              key={meal.moment}
              onPress={() => {
                if (!entry?.confirmed) {
                  setSelectedMealMoment(meal.moment);
                  setViewMode('confirm');
                }
              }}
              activeOpacity={0.8}>
              <NutritionCard meal={meal} compact={false} />
              {entry?.confirmed && (
                <View style={styles.confirmedBadge}>
                  <Text style={styles.confirmedText}>✓ Confirmed</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Supplement Log */}
        <View style={styles.supplementSection}>
          <Text style={styles.sectionTitle}>SUPPLEMENTS TAKEN</Text>
          <View style={styles.pillGrid}>
            {supplementStack.slice(0, 8).map(supp => (
              <SupplementPill key={supp.key} supplement={supp} active={true} />
            ))}
          </View>
        </View>

        {/* Progress Chart */}
        <ProgressChart />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  summaryRow: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.surfaceElevated,
  },
  deviationsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.accentAlert,
  },
  deviationsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accentAlert,
    marginBottom: 8,
  },
  deviationItem: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleBtnActive: {
    backgroundColor: colors.surfaceElevated,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleTextActive: {
    color: colors.textPrimary,
  },
  confirmedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accentEnergy + '20',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  confirmedText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accentEnergy,
  },
  supplementSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
