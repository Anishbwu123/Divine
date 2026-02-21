import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native'; // Added View and StyleSheet
import { colors } from '../theme'; // Assuming spacing is in your theme
import HomeScreen from '../features/home/screens/HomeScreen';
import BookmarksScreen from '../features/bookmark/screens/BookmarkScreen';
import ProfileScreen from '../features/auth/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#FFFFFF', // White text/icon for the active purple circle
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarShowLabel: true,
      tabBarStyle: styles.tabBar,
      tabBarItemStyle: styles.tabBarItem,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
            <Text style={{ fontSize: 20, color: focused ? '#FFF' : '#000' }}>🏠</Text>
          </View>
        ),
        // This hides the label when active to mimic the "circle only" look in your image
        tabBarLabel: ({ focused }) => focused ? null : <Text style={styles.labelText}>Home</Text>
      }}
    />
    <Tab.Screen
      name="Explore" // Changed from Bookmarks to match your image
      component={BookmarksScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
             <Text style={{ fontSize: 20 }}>🧭</Text>
          </View>
        ),
        tabBarLabel: ({ focused }) => focused ? null : <Text style={styles.labelText}>Explore</Text>
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </View>
        ),
        tabBarLabel: ({ focused }) => focused ? null : <Text style={styles.labelText}>Profile</Text>
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25, // Lifts it off the bottom
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50, // Makes it pill-shaped
    height: 70,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
    borderTopWidth: 0, // Removes the default line
    paddingHorizontal: 10,
  },
  tabBarItem: {
    height: 60,
    paddingTop: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  activeIconContainer: {
    backgroundColor: colors.primary, // This is your purple color
    marginBottom: 5, // Centers the circle vertically in the bar
  },
  labelText: {
    fontSize: 10,
    marginBottom: 10,
  }
});

export default BottomTabs;