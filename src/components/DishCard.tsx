import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {Dish, FitScore} from '../types';

interface DishCardProps {
  dish: Dish;
}

const fitScoreConfig: Record<FitScore, {label: string; color: string; bg: string}> = {
  fits: {label: 'FITS', color: colors.accentEnergy, bg: 'rgba(0, 212, 170, 0.1)'},
  caution: {label: 'CAUTION', color: colors.accentProtein, bg: 'rgba(255, 184, 0, 0.1)'},
  avoid: {label: 'AVOID', color: colors.accentAlert, bg: 'rgba(255, 107, 74, 0.1)'},
};

export const DishCard: React.FC<DishCardProps> = ({dish}) => {
  const score = fitScoreConfig[dish.fitScore];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{dish.name}</Text>
        <View style={[styles.scoreBadge, {backgroundColor: score.bg}]}>
          <Text style={[styles.scoreLabel, {color: score.color}]}>{score.label}</Text>
        </View>
      </View>
      <Text style={styles.notes}>{dish.fitNotes}</Text>
      <View style={styles.macroRow}>
        <MacroItem label="Protein" value={`${dish.protein}g`} color={colors.accentProtein} />
        <MacroItem label="Carbs" value={`${dish.carbs}g`} color={colors.accentEnergy} />
        <MacroItem label="Fat" value={`${dish.fat}g`} color={colors.accentRecovery} />
        <MacroItem label="Cal" value={`${dish.calories}`} color={colors.textSecondary} />
      </View>
    </View>
  );
};

const MacroItem: React.FC<{label: string; value: string; color: string}> = ({label, value, color}) => (
  <View style={styles.macroItem}>
    <Text style={[styles.macroValue, {color}]}>{value}</Text>
    <Text style={styles.macroLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 8,
  },
  scoreBadge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  notes: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 16,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  macroLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
