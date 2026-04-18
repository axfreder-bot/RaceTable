/**
 * useSupplementInventory.ts — User's supplement inventory in Firestore
 *
 * Tracks which supplements the user owns/takes and their weekly order list.
 * Falls back to local state if Firebase is not configured.
 *
 * Firestore path: users/{uid}/inventory
 */

import {useState, useEffect, useCallback} from 'react';
import {auth, db} from '../firebase/config';
import {supplements as seedSupplements} from '../data/supplements';
import {Supplement} from '../types';
import type {FirebaseAuthTypes} from '../firebase/config';
import {doc, getDoc, setDoc} from '@react-native-firebase/firestore';

interface SupplementInventory {
  hasSupplement: string[];
  doesNotTake: string[];
  weeklyOrderList: string[];
  lastUpdated: string | null;
}

interface UseSupplementInventoryReturn {
  inventory: SupplementInventory;
  loading: boolean;
  saving: boolean;
  error: string | null;
  addSupplement: (key: string) => Promise<void>;
  removeSupplement: (key: string) => Promise<void>;
  setDoesNotTake: (key: string, value: boolean) => Promise<void>;
  addToWeeklyOrder: (key: string) => Promise<void>;
  removeFromWeeklyOrder: (key: string) => Promise<void>;
  allSupplements: Supplement[];
}

const DEFAULT_INVENTORY: SupplementInventory = {
  hasSupplement: seedSupplements.map(s => s.key),
  doesNotTake: [],
  weeklyOrderList: [],
  lastUpdated: null,
};

export const useSupplementInventory = (): UseSupplementInventoryReturn => {
  const [inventory, setInventory] = useState<SupplementInventory>(DEFAULT_INVENTORY);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  // Track current user
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged({
      next: (firebaseUser: FirebaseAuthTypes.User | null) => {
        setUid(firebaseUser?.uid || null);
      },
    });
    return () => unsubscribe();
  }, []);

  // Load inventory from Firestore
  const loadInventory = useCallback(async (userId: string) => {
    if (!db) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'users', userId, 'inventory', 'main');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as SupplementInventory;
        setInventory({
          hasSupplement: data.hasSupplement || [],
          doesNotTake: data.doesNotTake || [],
          weeklyOrderList: data.weeklyOrderList || [],
          lastUpdated: data.lastUpdated || null,
        });
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      loadInventory(uid);
    }
  }, [uid, loadInventory]);

  const saveInventory = useCallback(async (userId: string, newInventory: SupplementInventory) => {
    if (!db) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'users', userId, 'inventory', 'main');
      await setDoc(docRef, {
        ...newInventory,
        lastUpdated: new Date().toISOString(),
      });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }, []);

  const updateInventory = useCallback(async (updater: (prev: SupplementInventory) => SupplementInventory) => {
    setInventory(prev => {
      const next = updater(prev);
      if (uid) {
        saveInventory(uid, next);
      }
      return next;
    });
  }, [uid, saveInventory]);

  const addSupplement = useCallback(async (key: string) => {
    await updateInventory(prev => ({
      ...prev,
      hasSupplement: prev.hasSupplement.includes(key)
        ? prev.hasSupplement
        : [...prev.hasSupplement, key],
      doesNotTake: prev.doesNotTake.filter(k => k !== key),
    }));
  }, [updateInventory]);

  const removeSupplement = useCallback(async (key: string) => {
    await updateInventory(prev => ({
      ...prev,
      hasSupplement: prev.hasSupplement.filter(k => k !== key),
    }));
  }, [updateInventory]);

  const setDoesNotTake = useCallback(async (key: string, value: boolean) => {
    await updateInventory(prev => ({
      ...prev,
      doesNotTake: value
        ? [...prev.doesNotTake.filter(k => k !== key), key]
        : prev.doesNotTake.filter(k => k !== key),
    }));
  }, [updateInventory]);

  const addToWeeklyOrder = useCallback(async (key: string) => {
    await updateInventory(prev => ({
      ...prev,
      weeklyOrderList: prev.weeklyOrderList.includes(key)
        ? prev.weeklyOrderList
        : [...prev.weeklyOrderList, key],
    }));
  }, [updateInventory]);

  const removeFromWeeklyOrder = useCallback(async (key: string) => {
    await updateInventory(prev => ({
      ...prev,
      weeklyOrderList: prev.weeklyOrderList.filter(k => k !== key),
    }));
  }, [updateInventory]);

  return {
    inventory,
    loading,
    saving,
    error,
    addSupplement,
    removeSupplement,
    setDoesNotTake,
    addToWeeklyOrder,
    removeFromWeeklyOrder,
    allSupplements: seedSupplements,
  };
};
