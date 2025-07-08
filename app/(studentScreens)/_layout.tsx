import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'rgb(229, 225, 221)',
        tabBarInactiveTintColor: 'rgba(229, 225, 221, 0.5)',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(26, 30, 34)',
          borderTopWidth: 0,
          justifyContent: 'center',
          alignContent: 'center',
          height: 60 + insets.bottom, 
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
        },
      }}>
      <Tabs.Screen
              name="dashboardStudent"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
              }}
            />
            <Tabs.Screen
              name="courseScreen"
              options={{
                title: 'Courses',
                tabBarIcon: ({ color }) => <Ionicons size={28} name="book" color={color} />,
              }}
            />
    </Tabs>
  );
}
