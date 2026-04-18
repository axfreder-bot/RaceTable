import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
import {FeelingType} from '../types';

interface FeelingCardProps {
  feeling: FeelingType;
  selected: boolean;
  onPress: () => void;
}

const feelingConfig: Record<FeelingType, {label: string; emoji: string; color: string}> = {
  energized: {label: 'Energized', emoji: '⚡', color: colors.accentEnergy},
  normal: {label: 'Normal', emoji: '😐', color: colors.textSecondary},
  sore: {label: 'Sore', emoji: '💪', color: colors.accentAlert},
  fatigued: {label: 'Fatigued', emoji: '😴', color: colors.accentRecovery},
  exhausted: {label: 'Exhausted', emoji: '🥱', color: colors.accentAlert},
};

export const FeelingCard: React.FC<FeelingCardProps> = ({feeling, selected, onPress}) => {
  const config = feelingConfig[feeling];

  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && {borderColor: config.color, borderWidth: 2},
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 80,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
