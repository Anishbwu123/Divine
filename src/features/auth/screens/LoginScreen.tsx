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

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginUser } from '../authSlice';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Input from '../../../components/common/Input';
import { colors, spacing } from '../../../theme';
import Button from '../../../components/common/Button';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async values => {
      const result = await dispatch(
        loginUser({ email: values.email, pass: values.password }),
      );
      if (loginUser.fulfilled.match(result)) {
        Toast.show({
          type: 'success',
          text1: 'Welcome back! 🙏',
          text2: 'Logged in successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: result.payload as string,
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
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to continue your path</Text>
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

                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <Input
                    label=""
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    placeholder="Enter your password"
                    secureTextEntry
                    error={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : undefined
                    }
                  />
                </View>

                <View style={styles.buttonSpacing} />

                <Button
                  title="Login"
                  onPress={() => formik.handleSubmit()}
                  loading={isLoading}
                />

                <Button
                  title="Create Account"
                  onPress={() => navigation.navigate('SignUp')}
                  variant="outline"
                />
              </View>

              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
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
  forgotButton: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  forgotText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
