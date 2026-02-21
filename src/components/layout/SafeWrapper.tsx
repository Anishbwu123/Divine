import React from 'react';
import {  StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';

interface SafeWrapperProps {
  children: React.ReactNode;
  barStyle?: 'light-content' | 'dark-content';
  bgColor?: string;
}

const SafeWrapper: React.FC<SafeWrapperProps> = ({
  children,
  barStyle = 'dark-content',
  bgColor = colors.bgMain,
}) => (
  <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
    <StatusBar barStyle={barStyle} backgroundColor={bgColor} />
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeWrapper;
