import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logoutUser, updateUserName } from '../../auth/authSlice';
import SafeWrapper from '../../../components/layout/SafeWrapper';
import Button from '../../../components/common/Button';
import ReusableModal from '../../../components/common/ReusableModal';
import { colors, spacing } from '../../../theme';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { bookmarkedIds, lastReadVerseIndex } = useAppSelector(
    state => state.chalisa,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.full_name || 'Name not available');
  const [isSaving, setIsSaving] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  React.useEffect(() => {
    if (user?.full_name) {
      setEditedName(user.full_name);
    }
  }, [user?.full_name]);

  const handleSaveName = async () => {

    if (!editedName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    setIsSaving(true);
    try {
      console.log(editedName, 'sdsafsf')
      await dispatch(updateUserName(editedName)).unwrap();
      setIsEditing(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully!',
        position: 'top',
      });
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update name');
    } finally {
      setIsSaving(false);
    }
  };

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
            {user?.full_name?.charAt(0)?.toUpperCase() ||
              <Image source={require('../../../assets/Images/user.png')} resizeMode='contain' style={{ height: '50%', width: '50%' }} />}
          </Text>
        </View>

        <View style={styles.nameContainer}>
          {isEditing ? (
            <View style={styles.editRow}>
              <TextInput
                style={styles.nameInput}
                value={editedName}
                onChangeText={setEditedName}
                autoFocus
              />
              {isSaving ? (
                <ActivityIndicator color={colors.primary} style={styles.iconButton} />
              ) : (
                <TouchableOpacity onPress={handleSaveName} style={styles.iconButton}>
                  <Text style={styles.iconText}>✓</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => { setIsEditing(false); setEditedName(user?.full_name || ''); }} style={styles.iconButton}>
                <Text style={[styles.iconText, { color: colors.textSecondary }]}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.editRow}>
              <Text style={styles.name}>{user?.full_name || 'Devotee'}</Text>
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.iconButton}>
                <Text style={styles.iconText}>✎</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.email}>{user?.email || 'Not available'}</Text>

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

        <View style={styles.parentContainer}>
          <TouchableOpacity style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }} onPress={() => setIsHelpModalVisible(true)}>
            <Image source={require('../../../assets/Images/help-desk.png')} resizeMode='contain' style={{ height: 30, width: 30 }} />
            <Text style={styles.helplabel}>Help Desk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
            onPress={() => setIsPrivacyModalVisible(true)}
          >
            <Image source={require('../../../assets/Images/privacy-policy.png')} resizeMode='contain' style={{ height: 30, width: 30 }} />
            <Text style={styles.privacylabel}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}
            onPress={() => setIsTermsModalVisible(true)}
          >
            <Image source={require('../../../assets/Images/terms-and-conditions.png')} resizeMode='contain' style={{ height: 30, width: 30 }} />
            <Text style={styles.tandclabel}>Terms and Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }} onPress={handleLogout}>
            <Image source={require('../../../assets/Images/switch.png')} resizeMode='contain' style={{ height: 30, width: 30 }} />
            <Text style={styles.logoutLabel}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Modals */}
        <ReusableModal
          visible={isHelpModalVisible}
          onClose={() => setIsHelpModalVisible(false)}
          title="Help Desk"
          closeButtonText="Got it!"
          animationType='fade'
        >
          <Text style={styles.modalText}>
            Welcome to the Divine Power Help Desk. If you need assistance with your account,
            reading the Chalisa, or managing your bookmarks, please contact our support team
            at support@divinepower.app.
          </Text>
          <Text style={[styles.modalText, { marginTop: 10 }]}>
            We usually respond within 24 hours.
          </Text>
        </ReusableModal>

        <ReusableModal
          visible={isPrivacyModalVisible}
          onClose={() => setIsPrivacyModalVisible(false)}
          title="Privacy Policy"
          closeButtonText="I Agree"
          animationType='fade'
        >
          <Text style={styles.modalBullet}>• We collect minimal personal data to provide and improve our services.</Text>
          <Text style={styles.modalBullet}>• Your email is only used for authentication and account recovery purposes.</Text>
          <Text style={styles.modalBullet}>• We do not sell your personal data to third parties.</Text>
          <Text style={styles.modalBullet}>• Your reading progress and bookmarks are securely stored in the cloud so you can access them across devices.</Text>
          <Text style={styles.modalBullet}>• You can request account deletion at any time by contacting support.</Text>
          <Text style={styles.modalBullet}>• We use secure encryption to transmit your data between the app and our servers.</Text>
        </ReusableModal>

        <ReusableModal
          visible={isTermsModalVisible}
          onClose={() => setIsTermsModalVisible(false)}
          title="Terms and Conditions"
          closeButtonText="I Accept"
          animationType='fade'
        >
          <Text style={styles.modalBullet}>• By using Divine Power, you agree to these Terms and Conditions.</Text>
          <Text style={styles.modalBullet}>• The content provided in this app is for spiritual and personal purposes only.</Text>
          <Text style={styles.modalBullet}>• You agree not to misuse the app or attempt to disrupt its services.</Text>
          <Text style={styles.modalBullet}>• We reserve the right to modify or terminate the service for any reason, without notice, at any time.</Text>
          <Text style={styles.modalBullet}>• Content within the app is provided "as is" without warranties of any kind.</Text>
          <Text style={styles.modalBullet}>• You are responsible for keeping your login credentials secure.</Text>
          <Text style={styles.modalBullet}>• These terms may be updated from time to time. Continued use implies acceptance.</Text>
        </ReusableModal>

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
  },
  nameContainer: {
    marginTop: spacing.md,
    alignItems: 'center',
    minHeight: 40,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 15
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    minWidth: 150,
    textAlign: 'center',
    padding: 0,
  },
  iconButton: {
    padding: spacing.sm,
    marginLeft: spacing.xs,
  },
  iconText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
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
    marginTop: '85%',
    marginBottom: spacing.xl,
    width: '80%',
  },
  parentContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: spacing.xxl,
    gap: 35,
  },
  privacylabel: {
    fontSize: 16
  },
  tandclabel: {
    fontSize: 16
  },
  logoutLabel: {
    fontSize: 16
  },
  helplabel: {
    fontSize: 16
  },
  modalText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: 'center',
  },
  modalBullet: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 10,
    textAlign: 'left',
  }
});

export default ProfileScreen;
