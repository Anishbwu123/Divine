import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '../theme';
import HomeScreen from '../features/home/screens/HomeScreen';
import BookmarksScreen from '../features/bookmark/screens/BookmarkScreen';
import ProfileScreen from '../features/auth/screens/ProfileScreen';


const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textLight,
      tabBarStyle: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>🏠</Text>,
      }}
    />
    <Tab.Screen
      name="Bookmarks"
      component={BookmarksScreen}
      options={{
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>⭐</Text>,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 22 }}>👤</Text>,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabs;