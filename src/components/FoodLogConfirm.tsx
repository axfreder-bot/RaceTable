import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {colors} from '../theme/colors';
import {FoodOption, PlannedMeal} from '../types';

interface FoodLogConfirmProps {
  meal: PlannedMeal;
  onConfirm: (actualFoods: FoodOption[]) => void;
}

export const FoodLogConfirm: React.FC<FoodLogConfirmProps> = ({meal, onConfirm}) => {
  const [selected, setSelected] = useState<FoodOption[]>([]);

  const toggleFood = (option: FoodOption) => {
    setSelected(prev => {
      const exists = prev.find(p => p.name === option.name);
      if (exists) {
        return prev.filter(p => p.name !== option.name);
      }
      return [...prev, {...option, servings: 1}];
    });
  };

  const isSelected = (option: FoodOption) => selected.some(p => p.name === option.name);

  const handleConfirm = () => {
    if (selected.length === 0) {
      // Confirm with original planned foods if nothing selected
      onConfirm(meal.foodOptions);
    } else {
      onConfirm(selected);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Confirm: {meal.name}</Text>
      <Text style={styles.subtitle}>Tap foods you actually ate</Text>

      <ScrollView style={styles.optionsList}>
        {meal.foodOptions.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.optionRow, isSelected(option) && styles.optionRowSelected]}
            onPress={() => toggleFood(option)}
            activeOpacity={0.7}>
            <View style={styles.checkbox}>
              {isSelected(option) && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.optionInfo}>
              <Text style={styles.optionName}>{option.name}</Text>
              <Text style={styles.optionMacros}>
                {Math.round(option.protein * option.servings)}p / {Math.round(option.carbs * option.servings)}c / {Math.round(option.fat * option.servings)}f
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.8}>
        <Text style={styles.confirmBtnText}>Confirm Meal</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  optionsList: {
    maxHeight: 240,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionRowSelected: {
    borderColor: colors.accentEnergy,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: colors.accentEnergy,
    fontSize: 14,
    fontWeight: '700',
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  optionMacros: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  confirmBtn: {
    backgroundColor: colors.accentEnergy,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});
