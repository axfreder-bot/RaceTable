import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';

interface MacroRingProps {
  current: number;
  target: number;
  color: string;
  label: string;
  size?: number;
}

export const MacroRing: React.FC<MacroRingProps> = ({
  current,
  target,
  color,
  label,
  size = 80,
}) => {
  const percentage = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <View style={styles.svgContainer}>
        <View
          style={[
            styles.ring,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: colors.surfaceElevated,
            },
          ]}
        />
        <View
          style={[
            styles.ringProgress,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              borderTopColor: 'transparent',
              borderRightColor: percentage > 25 ? color : 'transparent',
              borderBottomColor: percentage > 50 ? color : 'transparent',
              borderLeftColor: percentage > 75 ? color : 'transparent',
              transform: [{rotate: '-45deg'}],
            },
          ]}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={[styles.value, {color}]}>{Math.round(current)}g</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    position: 'absolute',
  },
  ring: {
    position: 'absolute',
  },
  ringProgress: {
    position: 'absolute',
  },
  labelContainer: {
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: 2,
  },
});
