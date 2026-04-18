/**
 * useRestaurants.ts — Fetch restaurants from Firestore
 *
 * Falls back to local seed data if Firebase is not configured yet.
 */

import {useState, useEffect, useCallback} from 'react';
import {db} from '../firebase/config';
import {restaurants as seedRestaurants} from '../data/restaurants';
import {Restaurant} from '../types';
import {collection, getDocs, query, orderBy} from '@react-native-firebase/firestore';

interface UseRestaurantsReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  dataSource: 'firebase' | 'seed';
  getRestaurantById: (id: string) => Restaurant | undefined;
  searchRestaurants: (q: string) => Restaurant[];
}

export const useRestaurants = (): UseRestaurantsReturn => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(seedRestaurants);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'firebase' | 'seed'>('seed');

  const loadFromFirestore = useCallback(async () => {
    if (!db) return false;
    setLoading(true);
    try {
      const restaurantsRef = collection(db, 'restaurants');
      const q = query(restaurantsRef, orderBy('name'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs.map((d: any) => ({id: d.id, ...d.data()} as Restaurant));
        setRestaurants(data);
        setDataSource('firebase');
        return true;
      }
      return false;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromFirestore().then(success => {
      if (!success) {
        setRestaurants(seedRestaurants);
        setDataSource('seed');
      }
    });
  }, [loadFromFirestore]);

  const getRestaurantById = useCallback((id: string): Restaurant | undefined => {
    return restaurants.find(r => r.id === id);
  }, [restaurants]);

  const searchRestaurants = useCallback((q: string): Restaurant[] => {
    if (!q.trim()) return restaurants;
    const lower = q.toLowerCase();
    return restaurants.filter(
      r =>
        r.name.toLowerCase().includes(lower) ||
        r.cuisine.toLowerCase().includes(lower) ||
        r.city.toLowerCase().includes(lower) ||
        r.dishes.some(d => d.name.toLowerCase().includes(lower)),
    );
  }, [restaurants]);

  return {
    restaurants,
    loading,
    error,
    dataSource,
    getRestaurantById,
    searchRestaurants,
  };
};
