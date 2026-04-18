import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';

interface ProgressChartProps {
  weekData?: Array<{day: string; protein: number; carbs: number; calories: number}>;
}

const defaultWeekData = [
  {day: 'Mon', protein: 142, carbs: 310, calories: 2400},
  {day: 'Tue', protein: 158, carbs: 380, calories: 2800},
  {day: 'Wed', protein: 135, carbs: 290, calories: 2200},
  {day: 'Thu', protein: 162, carbs: 340, calories: 2650},
  {day: 'Fri', protein: 148, carbs: 320, calories: 2450},
  {day: 'Sat', protein: 175, carbs: 420, calories: 3100},
  {day: 'Sun', protein: 130, carbs: 300, calories: 2100},
];

export const ProgressChart: React.FC<ProgressChartProps> = ({weekData = defaultWeekData}) => {
  const maxCalories = Math.max(...weekData.map(d => d.calories));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Summary</Text>
      <View style={styles.chartContainer}>
        {weekData.map((day, idx) => {
          const heightPercent = (day.calories / maxCalories) * 100;
          return (
            <View key={idx} style={styles.barColumn}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPercent}%`,
                      backgroundColor:
                        idx === weekData.length - 1
                          ? colors.accentEnergy
                          : colors.surfaceElevated,
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{day.day}</Text>
              <Text style={styles.calLabel}>{day.calories}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.legend}>
        <LegendItem color={colors.accentProtein} label="Avg Protein: 150g" />
        <LegendItem color={colors.accentEnergy} label="Avg Carbs: 340g" />
        <LegendItem color={colors.textSecondary} label="Avg Cal: 2530" />
      </View>
    </View>
  );
};

const LegendItem: React.FC<{color: string; label: string}> = ({color, label}) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, {backgroundColor: color}]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 100,
    width: 24,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  dayLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 6,
    fontWeight: '500',
  },
  calLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 2,
  },
  legend: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceElevated,
    paddingTop: 12,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
