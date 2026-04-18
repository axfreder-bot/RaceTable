import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {colors} from '../theme/colors';
import {DishCard} from '../components/DishCard';
import {restaurants, searchRestaurants} from '../data/restaurants';
import {Restaurant, Dish} from '../types';

export const EatOutScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const results = query.trim() === '' ? restaurants : searchRestaurants(query);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBack = () => {
    setSelectedRestaurant(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Eat Out</Text>
          <Text style={styles.subtitle}>Find runner-friendly dishes nearby</Text>
        </View>

        {/* Search Bar */}
        {!selectedRestaurant && (
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search restaurants, cuisine, city..."
                placeholderTextColor={colors.textSecondary}
                value={query}
                onChangeText={setQuery}
                autoCorrect={false}
                autoCapitalize="none"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Text style={styles.clearBtn}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Restaurant List */}
        {!selectedRestaurant && (
          <View>
            <Text style={styles.sectionTitle}>
              {query.trim() === '' ? 'ALL RESTAURANTS' : `${results.length} RESULTS`}
            </Text>
            {results.map(restaurant => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.restaurantCard}
                onPress={() => handleSelectRestaurant(restaurant)}
                activeOpacity={0.7}>
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantMeta}>
                    {restaurant.cuisine} • {restaurant.city}
                  </Text>
                </View>
                <View style={styles.dishCount}>
                  <Text style={styles.dishCountText}>{restaurant.dishes.length} dishes</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Restaurant Detail / Dish List */}
        {selectedRestaurant && (
          <View>
            <TouchableOpacity style={styles.backRow} onPress={handleBack}>
              <Text style={styles.backText}>← Back to restaurants</Text>
            </TouchableOpacity>

            <View style={styles.restaurantHeader}>
              <Text style={styles.detailName}>{selectedRestaurant.name}</Text>
              <Text style={styles.detailMeta}>
                {selectedRestaurant.cuisine} • {selectedRestaurant.city}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>DISHES</Text>

            {/* Fit Score Legend */}
            <View style={styles.legendRow}>
              <LegendItem color={colors.accentEnergy} label="FITS" />
              <LegendItem color={colors.accentProtein} label="CAUTION" />
              <LegendItem color={colors.accentAlert} label="AVOID" />
            </View>

            {selectedRestaurant.dishes.map(dish => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </View>
        )}

        {/* Empty State */}
        {results.length === 0 && query.trim() !== '' && !selectedRestaurant && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>No restaurants found for "{query}"</Text>
            <Text style={styles.emptyHint}>Try searching by cuisine or city</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const LegendItem: React.FC<{color: string; label: string}> = ({color, label}) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, {backgroundColor: color}]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

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
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    padding: 0,
  },
  clearBtn: {
    fontSize: 16,
    color: colors.textSecondary,
    padding: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  restaurantCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  restaurantMeta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  dishCount: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dishCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  backRow: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accentEnergy,
  },
  restaurantHeader: {
    marginBottom: 16,
  },
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  detailMeta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
