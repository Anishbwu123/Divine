import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  maxLength?: number;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  error,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error ? styles.inputError : null]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textLight}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      maxLength={maxLength}
      autoCapitalize="none"
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
