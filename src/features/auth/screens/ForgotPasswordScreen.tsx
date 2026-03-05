import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                  Enter your email and we'll send you a reset link
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <Input
                    label=""
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
                </View>

                <View style={styles.buttonSpacing} />

                <Button
                  title="Send Reset Link"
                  onPress={() => formik.handleSubmit()}
                  loading={formik.isSubmitting}
                />
              </View>

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backText}>← Back to Login</Text>
              </TouchableOpacity>
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
  emoji: {
    fontSize: 50,
    marginBottom: spacing.md,
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
    marginBottom: -10,
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
  backButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
