import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {colors} from '../theme/colors';
import {WorkoutChip} from '../components/WorkoutChip';
import {TrainingWeek, WorkoutType} from '../types';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WEEKLY_PLAN: Array<{day: string; type: WorkoutType; desc: string; miles: number}> = [
  {day: 'Mon', type: 'easy-run', desc: '5 mi Easy Pace', miles: 5},
  {day: 'Tue', type: 'intervals', desc: '8x800m Repeats @ 5K pace', miles: 6},
  {day: 'Wed', type: 'easy-run', desc: '4 mi Recovery', miles: 4},
  {day: 'Thu', type: 'tempo', desc: '8 mi Tempo — 3@MP, 2@HMP', miles: 8},
  {day: 'Fri', type: 'rest-day', desc: 'Rest or Cross Training', miles: 0},
  {day: 'Sat', type: 'long-run', desc: '15 mi Long Run', miles: 15},
  {day: 'Sun', type: 'easy-run', desc: '6 mi Easy w/ 4x100 strides', miles: 6},
];

const RACE_DAYS_UNTIL = 42; // Seattle Marathon
const RACE_NAME = 'Seattle Marathon 2026';
const RACE_DATE = 'November 22, 2026';

const phaseColors: Record<string, string> = {
  'easy-run': colors.accentEnergy,
  tempo: colors.accentProtein,
  'long-run': colors.accentAlert,
  intervals: colors.accentRecovery,
  'rest-day': colors.textSecondary,
};

export const RaceScreen: React.FC = () => {
  const totalMiles = WEEKLY_PLAN.reduce((sum, w) => sum + w.miles, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Race Mode</Text>
        </View>

        {/* Race Countdown */}
        <View style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>{RACE_NAME}</Text>
          <Text style={styles.countdownDate}>{RACE_DATE}</Text>
          <View style={styles.countdownNumber}>
            <Text style={styles.daysNumber}>{RACE_DAYS_UNTIL}</Text>
            <Text style={styles.daysLabel}>DAYS</Text>
          </View>
          <Text style={styles.countdownSubtext}>to race day</Text>
        </View>

        {/* This Week's Training */}
        <View style={styles.weekSection}>
          <View style={styles.weekHeader}>
            <Text style={styles.weekTitle}>This Week — Week 12</Text>
            <View style={styles.totalMilesBadge}>
              <Text style={styles.totalMilesText}>{totalMiles} mi</Text>
            </View>
          </View>

          <View style={styles.workoutList}>
            {WEEKLY_PLAN.map((workout, idx) => (
              <View key={idx} style={styles.workoutRow}>
                <View style={styles.dayCol}>
                  <Text style={[styles.dayText, idx === 2 && styles.todayText]}>
                    {workout.day}
                  </Text>
                </View>
                <View
                  style={[
                    styles.typeIndicator,
                    {backgroundColor: phaseColors[workout.type]},
                  ]}
                />
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutDesc}>{workout.desc}</Text>
                  <WorkoutChip
                    type={workout.type}
                    selected={true}
                    onPress={() => {}}
                  />
                </View>
                <View style={styles.milesCol}>
                  <Text style={styles.milesText}>
                    {workout.miles > 0 ? `${workout.miles} mi` : '—'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Phase Info */}
        <View style={styles.phaseCard}>
          <Text style={styles.phaseTitle}>Current Phase: Race-Specific</Text>
          <Text style={styles.phaseDesc}>
            High-intensity workouts with race-pace efforts. Focus on fueling 
            for hard efforts and adequate recovery between sessions.
          </Text>
          <View style={styles.phaseTargets}>
            <View style={styles.targetItem}>
              <Text style={styles.targetValue}>70 mi</Text>
              <Text style={styles.targetLabel}>Weekly Avg</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetValue}>3:45</Text>
              <Text style={styles.targetLabel}>Target Pace</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetValue}>42</Text>
              <Text style={styles.targetLabel}>Days Left</Text>
            </View>
          </View>
        </View>
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
  countdownCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.surfaceElevated,
  },
  countdownLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  countdownDate: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  countdownNumber: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 16,
  },
  daysNumber: {
    fontSize: 72,
    fontWeight: '800',
    color: colors.accentEnergy,
    letterSpacing: -2,
  },
  daysLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accentEnergy,
    marginLeft: 8,
  },
  countdownSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  weekSection: {
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  totalMilesBadge: {
    backgroundColor: colors.accentEnergy + '20',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  totalMilesText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accentEnergy,
  },
  workoutList: {
    gap: 0,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  dayCol: {
    width: 36,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  todayText: {
    color: colors.accentEnergy,
  },
  typeIndicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  milesCol: {
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  milesText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  phaseCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  phaseDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  phaseTargets: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceElevated,
    paddingTop: 14,
  },
  targetItem: {
    alignItems: 'center',
  },
  targetValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.accentProtein,
  },
  targetLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    textTransform: 'uppercase',
  },
});
