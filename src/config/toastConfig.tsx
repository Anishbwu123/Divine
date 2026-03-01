import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast, BaseToastProps } from 'react-native-toast-message';
import { colors, spacing } from '../theme';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.base, styles.success]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text1NumberOfLines={1}
      text2NumberOfLines={2}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[styles.base, styles.error]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text1NumberOfLines={1}
      text2NumberOfLines={2}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[styles.base, styles.info]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text1NumberOfLines={1}
      text2NumberOfLines={2}
    />
  ),
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 70,
    width: '90%',
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  success: {
    borderLeftColor: colors.success,
    backgroundColor: '#F0FFF0',
  },
  error: {
    borderLeftColor: colors.error,
    backgroundColor: '#FFF0F0',
  },
  info: {
    borderLeftColor: colors.primary,
    backgroundColor: colors.bgMain,
  },
  contentContainer: {
    paddingHorizontal: spacing.sm,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});

export default toastConfig;
