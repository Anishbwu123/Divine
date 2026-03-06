import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../../../config/supabase';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { colors, spacing } from '../../../theme';

const resetSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const ResetPasswordScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: resetSchema,
    onSubmit: async values => {
      try {
        const { error } = await supabase.auth.updateUser({
          password: values.password,
        });
        if (error) throw error;
        Toast.show({
          type: 'success',
          text1: 'Password Updated! 🔐',
          text2: 'You can now log in with your new password.',
        });
        // Sign out and go back to Login so they log in fresh
        await supabase.auth.signOut();
        setTimeout(() => navigation.replace('Login'), 2000);
      } catch (error: any) {
        Toast.show({ type: 'error', text1: 'Error', text2: error.message });
      }
    },
  });

  return (
    <ImageBackground
      source={require('../../../assets/Images/hanuman_bg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <SafeWrapper bgColor="transparent" barStyle="light-content">
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.header}>
                <Text style={styles.title}>Set New Password</Text>
                <Text style={styles.subtitle}>
                  Enter a strong new password for your account
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>New Password</Text>
                  <Input
                    label=""
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    placeholder="Enter new password"
                    secureTextEntry={!showPassword}
                    error={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : undefined
                    }
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <Input
                    label=""
                    value={formik.values.confirmPassword}
                    onChangeText={formik.handleChange('confirmPassword')}
                    placeholder="Confirm new password"
                    secureTextEntry={!showConfirm}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : undefined
                    }
                  />
                </View>

                <View style={styles.buttonSpacing} />

                <Button
                  title="Update Password"
                  onPress={() => formik.handleSubmit()}
                  loading={formik.isSubmitting}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeWrapper>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#EEEEEE',
    marginTop: spacing.xs,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    marginTop: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  inputWrapper: {
    marginBottom: spacing.sm,
  },
  buttonSpacing: {
    height: spacing.sm,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 4,
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});

export default ResetPasswordScreen;
