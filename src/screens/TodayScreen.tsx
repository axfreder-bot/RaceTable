import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from 'react-native';
import {colors} from '../theme/colors';
import {FeelingCard} from '../components/FeelingCard';
import {WorkoutChip} from '../components/WorkoutChip';
import {NutritionCard} from '../components/NutritionCard';
import {AffiliateOrderCard} from '../components/AffiliateOrderCard';
import {MacroRing} from '../components/MacroRing';
import {FeelingType, Supplement, WorkoutType} from '../types';
import {useSupplementStack} from '../hooks/useSupplementStack';
import {useDayPlan, getTotalDailyMacros} from '../hooks/useDayPlan';
import {getDayOfWeek, getFormattedDate} from '../utils/timing';

const WORKOUT_TYPES: WorkoutType[] = ['easy-run', 'tempo', 'long-run', 'intervals', 'rest-day'];
const FEELINGS: FeelingType[] = ['energized', 'normal', 'sore', 'fatigued', 'exhausted'];

const WORKOUT_DESCRIPTIONS: Record<WorkoutType, string> = {
  'easy-run': '6 mi Easy Pace',
  tempo: '8 mi Tempo Run',
  'long-run': '15 mi Long Run',
  intervals: '10x400m Intervals',
  'rest-day': 'Recovery Day',
};

const WORKOUT_TIMES: Record<WorkoutType, string> = {
  'easy-run': '7:00 AM',
  tempo: '6:30 AM',
  'long-run': '6:00 AM',
  intervals: '7:30 AM',
  'rest-day': '9:00 AM',
};

export const TodayScreen: React.FC = () => {
  const [workoutType, setWorkoutType] = useState<WorkoutType>('tempo');
  const [workoutTime, setWorkoutTime] = useState<string>(WORKOUT_TIMES.tempo);
  const [feelings, setFeelings] = useState<FeelingType[]>(['normal']);
  const [showPlan, setShowPlan] = useState(false);
  const [orderSupplement, setOrderSupplement] = useState<Supplement | null>(null);

  const supplementStack = useSupplementStack(feelings, workoutType);
  const dayPlan = useDayPlan(workoutType, workoutTime, feelings, supplementStack);
  const totalMacros = getTotalDailyMacros(dayPlan.meals);

  const toggleFeeling = (feeling: FeelingType) => {
    setFeelings(prev => {
      if (prev.includes(feeling)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(f => f !== feeling);
      }
      return [...prev, feeling];
    });
  };

  const handleWorkoutSelect = (type: WorkoutType) => {
    setWorkoutType(type);
    setWorkoutTime(WORKOUT_TIMES[type]);
    setShowPlan(false);
  };

  const workoutDesc = WORKOUT_DESCRIPTIONS[workoutType];
  const dayName = getDayOfWeek();
  const dateStr = getFormattedDate();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Alex.</Text>
          <Text style={styles.dateLine}>{dayName} — {workoutDesc}</Text>
          <Text style={styles.date}>{dateStr}</Text>
        </View>

        {/* Workout Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TODAY'S WORKOUT</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {WORKOUT_TYPES.map(type => (
              <WorkoutChip
                key={type}
                type={type}
                selected={workoutType === type}
                onPress={() => handleWorkoutSelect(type)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Time Picker Row */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RUN TIME</Text>
          <TouchableOpacity style={styles.timePickerRow} activeOpacity={0.7}>
            <Text style={styles.timeText}>{workoutTime}</Text>
            <Text style={styles.timeHint}>Tap to adjust</Text>
          </TouchableOpacity>
        </View>

        {/* Feeling Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW DO YOU FEEL?</Text>
          <View style={styles.feelingRow}>
            {FEELINGS.map(feeling => (
              <FeelingCard
                key={feeling}
                feeling={feeling}
                selected={feelings.includes(feeling)}
                onPress={() => toggleFeeling(feeling)}
              />
            ))}
          </View>
        </View>

        {/* Show Day Button */}
        {!showPlan && (
          <TouchableOpacity
            style={styles.showDayBtn}
            onPress={() => setShowPlan(true)}
            activeOpacity={0.8}>
            <Text style={styles.showDayBtnText}>Show My Day</Text>
          </TouchableOpacity>
        )}

        {/* Full Day Plan */}
        {showPlan && (
          <View style={styles.planSection}>
            {/* Daily Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Daily Targets</Text>
              <View style={styles.ringRow}>
                <MacroRing
                  current={totalMacros.protein}
                  target={150}
                  color={colors.accentProtein}
                  label="Protein"
                  size={70}
                />
                <MacroRing
                  current={totalMacros.carbs}
                  target={350}
                  color={colors.accentEnergy}
                  label="Carbs"
                  size={70}
                />
                <MacroRing
                  current={totalMacros.fat}
                  target={80}
                  color={colors.accentRecovery}
                  label="Fat"
                  size={70}
                />
              </View>
              <Text style={styles.totalCalories}>{totalMacros.calories} cal total</Text>
            </View>

            {/* Meal Cards */}
            {dayPlan.meals.map(meal => (
              <NutritionCard
                key={meal.moment}
                meal={meal}
                onShowOrder={setOrderSupplement}
              />
            ))}

            {/* Order Card */}
            {orderSupplement && (
              <AffiliateOrderCard
                supplement={orderSupplement}
                onDismiss={() => setOrderSupplement(null)}
              />
            )}
          </View>
        )}
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
    marginBottom: 28,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  dateLine: {
    fontSize: 16,
    color: colors.accentEnergy,
    fontWeight: '600',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  feelingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  timePickerRow: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timeHint: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  showDayBtn: {
    backgroundColor: colors.accentEnergy,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  showDayBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.background,
  },
  planSection: {
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ringRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  totalCalories: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
