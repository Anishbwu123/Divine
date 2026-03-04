import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../../../config/supabase';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { colors, spacing } from '../../../theme';

const forgotSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

const ForgotPasswordScreen = ({ navigation }: any) => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: forgotSchema,
    onSubmit: async values => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(
          values.email,
        );
        if (error) throw error;
        Toast.show({
          type: 'success',
          text1: 'Reset Link Sent! ✉️',
          text2: 'Please check your email.',
        });
        setTimeout(() => navigation.navigate('Login'), 2000);
      } catch (error: any) {
        Toast.show({ type: 'error', text1: 'Error', text2: error.message });
      }
    },
  });

  return (
    <SafeWrapper>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🔒</Text>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a reset link
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            placeholder="Enter your email"
            keyboardType="email-address"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />

          <Button
            title="Send Reset Link"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
          />
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 50,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  form: {
    marginTop: spacing.lg,
  },
  backButton: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  backText: {
    color: colors.primary,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
