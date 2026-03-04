import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '../authServices';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { colors, spacing } from '../../../theme';

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const SignUpScreen = ({ navigation }: any) => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: signUpSchema,
    onSubmit: async values => {
      try {
        await authService.signUp(values.email, values.password, values.name);
        Toast.show({
          type: 'success',
          text1: 'Account Created! 🎉',
          text2: 'Please check your email to verify.',
        });
        setTimeout(() => navigation.navigate('Login'), 1500);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed',
          text2: error.message,
        });
      }
    },
  });

  return (
    <SafeWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.emoji}>📿</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your spiritual journey</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            placeholder="Your name"
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : undefined
            }
          />
          <Input
            label="Email"
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            placeholder="Email"
            keyboardType="email-address"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />
          <Input
            label="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            placeholder="Min 6 characters"
            secureTextEntry
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />
          <Input
            label="Confirm Password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            placeholder="Re-enter password"
            secureTextEntry
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : undefined
            }
          />

          <Button
            title="Sign Up"
            onPress={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
          />
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </View>
    </SafeWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: spacing.xl },
  emoji: { fontSize: 50, marginBottom: spacing.md },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  form: { marginTop: spacing.lg },
});

export default SignUpScreen;
