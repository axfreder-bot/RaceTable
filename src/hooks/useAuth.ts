/**
 * useAuth.ts — Firebase Authentication hook for RaceTable
 *
 * Handles: sign in, sign up, sign out, current user state
 * States: loading | authenticated | unauthenticated
 *
 * Falls back to demo mode if Firebase is not configured.
 */

import {useState, useEffect, useCallback} from 'react';
import {auth, db} from '../firebase/config';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from '@react-native-firebase/auth';
import {doc, setDoc} from '@react-native-firebase/firestore';

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface UseAuthReturn {
  authState: AuthState;
  currentUser: AuthUser | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setAuthState('unauthenticated');
      setCurrentUser(null);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged({
      next: (firebaseUser: FirebaseAuthTypes.User | null) => {
        if (firebaseUser) {
          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });
          setAuthState('authenticated');
        } else {
          setCurrentUser(null);
          setAuthState('unauthenticated');
        }
      },
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmailFn = useCallback(async (email: string, password: string) => {
    if (!auth) {
      setError('Firebase not configured. Please complete setup in docs/FIREBASE_SETUP.md');
      return;
    }
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message || 'Sign in failed');
      throw e;
    }
  }, []);

  const signUpWithEmailFn = useCallback(async (email: string, password: string, displayName: string) => {
    if (!auth) {
      setError('Firebase not configured. Please complete setup in docs/FIREBASE_SETUP.md');
      return;
    }
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {displayName});
      if (db) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email,
          displayName,
          createdAt: new Date().toISOString(),
          supplementInventory: {},
        });
      }
    } catch (e: any) {
      setError(e.message || 'Sign up failed');
      throw e;
    }
  }, []);

  const signInWithGoogleFn = useCallback(async () => {
    if (!auth) {
      setError('Firebase not configured. Please complete setup in docs/FIREBASE_SETUP.md');
      return;
    }
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      setError(e.message || 'Google sign in failed');
      throw e;
    }
  }, []);

  const signOutFn = useCallback(async () => {
    if (!auth) return;
    setError(null);
    try {
      await auth.signOut();
    } catch (e: any) {
      setError(e.message || 'Sign out failed');
      throw e;
    }
  }, []);

  return {
    authState,
    currentUser,
    signInWithEmail: signInWithEmailFn,
    signUpWithEmail: signUpWithEmailFn,
    signInWithGoogle: signInWithGoogleFn,
    signOut: signOutFn,
    error,
  };
};
