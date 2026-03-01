import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { authService } from '../authServices';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { colors, spacing } from '../../../theme';

const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPass) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields',
      });
      return;
    }
    if (password !== confirmPass) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return;
    }
    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password must be at least 6 characters',
      });
      return;
    }

    setLoading(true);
    try {
      await authService.signUp(email, password, name);
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Account created. Please check your email.',
      });
      setTimeout(() => navigation.navigate('Login'), 1500);
    } catch (error: any) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message });
    } finally {
      setLoading(false);
    }
  };

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
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Min 6 characters"
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="Re-enter password"
            secureTextEntry
          />

          <Button title="Sign Up" onPress={handleSignUp} loading={loading} />
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
