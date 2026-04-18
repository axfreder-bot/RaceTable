/**
 * App.tsx — RaceTable root with Firebase auth flow
 *
 * - If Firebase not configured OR user not authenticated → show AuthScreen
 * - If authenticated → show AppNavigator (main tab nav)
 */

import React, {useEffect} from 'react';
import {StatusBar, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {AppNavigator} from './src/navigation/AppNavigator';
import {AuthScreen} from './src/screens/AuthScreen';
import {colors} from './src/theme/colors';
import {useAuth} from './src/hooks/useAuth';

// Inner component that uses the auth hook
const AppContent: React.FC = () => {
  const {authState} = useAuth();

  if (authState === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accentEnergy} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (authState === 'unauthenticated') {
    return <AuthScreen />;
  }

  return <AppNavigator />;
};

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <AppContent />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default App;
