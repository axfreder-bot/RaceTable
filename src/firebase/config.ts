/**
 * Firebase configuration for RaceTable
 *
 * IMPORTANT: This file requires manual setup before Firebase will work.
 * Follow the instructions in docs/FIREBASE_SETUP.md
 */

import {initializeApp, FirebaseApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type {FirebaseAuthTypes};

// Replace TODO_FILL_IN values from GoogleService-Info.plist after creating Firebase project
const firebaseConfig = {
  apiKey: 'TODO_FILL_IN',
  authDomain: 'TODO_FILL_IN',
  projectId: 'TODO_FILL_IN',
  storageBucket: 'TODO_FILL_IN',
  messagingSenderId: 'TODO_FILL_IN',
  appId: 'TODO_FILL_IN',
};

// initializeApp returns Promise<FirebaseApp> in type declarations, but the native
// implementation resolves synchronously. We use a safe cast to handle both cases.
let appInstance: FirebaseApp | null = null;
let authInstance: ReturnType<typeof getAuth> | null = null;
let dbInstance: ReturnType<typeof getFirestore> | null = null;

try {
  const appOrPromise = initializeApp(firebaseConfig);
  const resolvedApp = (appOrPromise as unknown as FirebaseApp);
  appInstance = resolvedApp;
  authInstance = getAuth(appInstance);
  dbInstance = getFirestore(appInstance);
} catch (error) {
  console.warn('[Firebase] Initialization failed - using seed data fallback:', error);
}

export const app = appInstance;
export const auth = authInstance;
export const db = dbInstance;
