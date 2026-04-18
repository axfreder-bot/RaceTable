import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {colors} from '../theme/colors';
import {FoodOption, PlannedMeal, Supplement} from '../types';
import {SupplementPill} from './SupplementPill';

interface NutritionCardProps {
  meal: PlannedMeal;
  onSelectFood?: (option: FoodOption) => void;
  onShowOrder?: (supplement: Supplement) => void;
  compact?: boolean;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
  meal,
  onSelectFood,
  onShowOrder,
  compact = false,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.time}>{meal.time}</Text>
        </View>
        <View style={styles.macroSummary}>
          <Text style={styles.calories}>{meal.calories} cal</Text>
        </View>
      </View>

      <View style={styles.macroRow}>
        <MacroBadge label="Protein" value={`${Math.round(meal.proteinGrams)}g`} color={colors.accentProtein} />
        <MacroBadge label="Carbs" value={`${Math.round(meal.carbsGrams)}g`} color={colors.accentEnergy} />
        <MacroBadge label="Fat" value={`${Math.round(meal.fatGrams)}g`} color={colors.accentRecovery} />
      </View>

      {!compact && meal.foodOptions.length > 0 && (
        <View style={styles.foodOptions}>
          <Text style={styles.optionsLabel}>FOOD OPTIONS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {meal.foodOptions.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.foodChip}
                onPress={() => onSelectFood?.(option)}>
                <Text style={styles.foodChipText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {meal.supplements.length > 0 && (
        <View style={styles.supplements}>
          <Text style={styles.optionsLabel}>SUPPLEMENTS</Text>
          <View style={styles.pillRow}>
            {meal.supplements.map(supp => (
              <SupplementPill
                key={supp.key}
                supplement={supp}
                onPress={() => onShowOrder?.(supp)}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const MacroBadge: React.FC<{label: string; value: string; color: string}> = ({label, value, color}) => (
  <View style={[styles.macroBadge, {borderColor: color}]}>
    <Text style={styles.macroValue}>{value}</Text>
    <Text style={styles.macroLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  time: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  macroSummary: {
    alignItems: 'flex-end',
  },
  calories: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  macroBadge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  macroLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: 1,
  },
  foodOptions: {
    marginTop: 4,
  },
  optionsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  foodChip: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  foodChipText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  supplements: {
    marginTop: 8,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
