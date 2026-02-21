import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../store/hooks';

import SplashScreen from '../features/auth/splash/screens/SplashScreen';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
 
  const user = useAppSelector(state => state.auth.user);
  const [showSplash, setShowSplash] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  
  if (showSplash) {
    return <SplashScreen />;
  }

 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
        
          <Stack.Screen name="AppStack" component={AppStack} />
        ) : (
        
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;