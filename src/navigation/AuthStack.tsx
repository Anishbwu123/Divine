import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import SignUpScreen from '../features/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../features/auth/screens/ResetPasswordScreen';
import VerifyOtpScreen from '../features/auth/screens/VerifyOtpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

export default AuthStack;
