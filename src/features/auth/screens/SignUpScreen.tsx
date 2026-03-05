import React from 'react';
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
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                  Start your spiritual journey
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <Input
                    label=""
                    value={formik.values.name}
                    onChangeText={formik.handleChange('name')}
                    placeholder="Your name"
                    error={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : undefined
                    }
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <Input
                    label=""
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
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <Input
                    label=""
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
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <Input
                    label=""
                    value={formik.values.confirmPassword}
                    onChangeText={formik.handleChange('confirmPassword')}
                    placeholder="Re-enter password"
                    secureTextEntry
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
  header: { alignItems: 'center', marginBottom: spacing.xl },
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
});

export default SignUpScreen;
