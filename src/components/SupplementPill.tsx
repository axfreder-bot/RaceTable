import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
import {Supplement} from '../types';

interface SupplementPillProps {
  supplement: Supplement;
  onPress?: () => void;
  active?: boolean;
}

export const SupplementPill: React.FC<SupplementPillProps> = ({
  supplement,
  onPress,
  active = true,
}) => {
  const categoryColor = getCategoryColor(supplement.category);

  return (
    <TouchableOpacity
      style={[
        styles.pill,
        active && {borderColor: categoryColor, borderWidth: 1},
        !active && styles.pillInactive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.icon}>{supplement.icon}</Text>
      <View style={styles.textContainer}>
        <Text style={[styles.name, !active && styles.textInactive]}>
          {supplement.name}
        </Text>
        <Text style={styles.dosage}>{supplement.dosage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getCategoryColor = (category: string): string => {
  const map: Record<string, string> = {
    protein: colors.accentProtein,
    recovery: colors.accentRecovery,
    vitamin: colors.accentHydration,
    stimulant: colors.accentEnergy,
    hydration: colors.accentHydration,
    cognitive: colors.accentRecovery,
  };
  return map[category] || colors.textSecondary;
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: 'transparent',
  },
  pillInactive: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dosage: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  textInactive: {
    color: colors.textSecondary,
  },
});
