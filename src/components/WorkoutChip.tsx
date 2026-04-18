import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../theme/colors';
import {WorkoutType} from '../types';

interface WorkoutChipProps {
  type: WorkoutType;
  selected: boolean;
  onPress: () => void;
}

const workoutConfig: Record<WorkoutType, {label: string; emoji: string; color: string}> = {
  'easy-run': {label: 'Easy Run', emoji: '🏃', color: colors.accentEnergy},
  tempo: {label: 'Tempo', emoji: '⚡', color: colors.accentProtein},
  'long-run': {label: 'Long Run', emoji: '🔴', color: colors.accentAlert},
  intervals: {label: 'Intervals', emoji: '💨', color: colors.accentRecovery},
  'rest-day': {label: 'Rest Day', emoji: '😴', color: colors.textSecondary},
};

export const WorkoutChip: React.FC<WorkoutChipProps> = ({type, selected, onPress}) => {
  const config = workoutConfig[type];

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && {backgroundColor: config.color + '20', borderColor: config.color},
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.emoji}>{config.emoji}</Text>
      <Text style={[styles.label, selected && {color: config.color}]}>
        {config.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 10,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
