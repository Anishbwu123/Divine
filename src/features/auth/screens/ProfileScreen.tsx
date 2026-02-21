import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logoutUser } from '../../auth/authSlice';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Button from '../../../components/common/Button';
import { colors, spacing } from '../../../theme';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { verses, bookmarkedIds, lastReadVerseIndex } = useAppSelector(
    state => state.chalisa,
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logoutUser()),
      },
    ]);
  };

  return (
    <SafeWrapper>
      <View style={styles.container}>
        {/* Avatar */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {user?.full_name?.charAt(0)?.toUpperCase() || '🙏'}
          </Text>
        </View>

        <Text style={styles.name}>{user?.full_name || 'Devotee'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{lastReadVerseIndex + 1}/43</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{bookmarkedIds.length}</Text>
            <Text style={styles.statLabel}>Bookmarks</Text>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <Button title="Logout" onPress={handleLogout} variant="outline" />
        </View>
      </View>
    </SafeWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: spacing.xxl },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 40, color: colors.textWhite, fontWeight: 'bold' },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  email: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  statBox: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    width: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  logoutContainer: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
    width: '80%',
  },
});

export default ProfileScreen;
