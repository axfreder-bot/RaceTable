import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {TodayScreen} from '../screens/TodayScreen';
import {LogScreen} from '../screens/LogScreen';
import {EatOutScreen} from '../screens/EatOutScreen';
import {RaceScreen} from '../screens/RaceScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {colors} from '../theme/colors';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, {label: string; emoji: string}> = {
  Today: {label: 'Today', emoji: '☀️'},
  Log: {label: 'Log', emoji: '📋'},
  EatOut: {label: 'Eat Out', emoji: '🍽️'},
  Race: {label: 'Race', emoji: '🏃'},
  Profile: {label: 'Profile', emoji: '⚙️'},
};

const TabIcon: React.FC<{emoji: string; focused: boolean}> = ({emoji, focused}) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.icon, focused && styles.iconFocused]}>{emoji}</Text>
    {focused && <View style={styles.activeDot} />}
  </View>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: styles.tabLabel,
        }}>
        <Tab.Screen
          name="Today"
          component={TodayScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon emoji={TAB_ICONS.Today.emoji} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Log"
          component={LogScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon emoji={TAB_ICONS.Log.emoji} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="EatOut"
          component={EatOutScreen}
          options={{
            tabBarLabel: 'Eat Out',
            tabBarIcon: ({focused}) => (
              <TabIcon emoji={TAB_ICONS.EatOut.emoji} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Race"
          component={RaceScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon emoji={TAB_ICONS.Race.emoji} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon emoji={TAB_ICONS.Profile.emoji} focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.surfaceElevated,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 80,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentEnergy,
    marginTop: 4,
  },
});
