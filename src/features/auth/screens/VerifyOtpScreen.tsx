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
import { supabase } from '../../../config/supabase';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { colors, spacing } from '../../../theme';

const VerifyOtpScreen = ({ navigation, route }: any) => {
  const email = route.params?.email || '';
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (token.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Code',
        text2: 'Please enter a valid 8-digit OTP',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery',
      });

      if (error) throw error;

      Toast.show({
        type: 'success',
        text1: 'Verified! ✨',
        text2: 'OTP verified successfully. You can now reset your password.',
      });

      // Navigate to ResetPassword after successful verification
      navigation.replace('ResetPassword');
    } catch (error: any) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const maskEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    const maskedUsername =
      username.slice(0, 2) + '*'.repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  };

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
                <Text style={styles.title}>Enter OTP</Text>
                <Text style={styles.subtitle}>
                  We sent an 6-digit verification code to
                  {'\n'}
                  <Text style={styles.emailText}>{maskEmail(email)}</Text>
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>OTP Code</Text>
                  <Input
                    label=""
                    value={token}
                    onChangeText={setToken}
                    placeholder="Enter 8-digit code"
                    keyboardType="numeric"
                    maxLength={8}
                  />
                </View>

                <View style={styles.buttonSpacing} />

                <Button
                  title="Verify OTP"
                  onPress={handleVerify}
                  loading={isLoading}
                />
              </View>

              <View style={styles.backButton}>
                <Text
                  style={styles.backText}
                  onPress={() => navigation.goBack()}
                >
                  ← Back
                </Text>
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
    lineHeight: 22,
  },
  emailText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
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

export default VerifyOtpScreen;
