import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ChalisaReadScreen from '../features/chalisa/screens/ChalisaReadScreen';


const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BottomTabs" component={BottomTabs} />
    <Stack.Screen name="ChalisaRead" component={ChalisaReadScreen} />
  </Stack.Navigator>
);

export default AppStack;