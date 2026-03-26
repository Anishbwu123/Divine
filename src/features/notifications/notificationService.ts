// src/features/notifications/notificationService.ts
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { supabase } from '../../config/supabase';

// ============================================
// 1. REQUEST PERMISSION
// ============================================
export const requestPermission = async (): Promise<boolean> => {
  // Request Notifee permission
  const notifeeSettings = await notifee.requestPermission();

  // Request Firebase permission
  const authStatus = await messaging().requestPermission();

  const isGranted =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return isGranted;
};

// ============================================
// 2. CREATE ANDROID CHANNEL
// ============================================
export const createChannel = async (): Promise<string> => {
  return await notifee.createChannel({
    id: 'hanuman_chalisa',
    name: 'Hanuman Chalisa',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });
};

// ============================================
// 3. GET AND SAVE FCM TOKEN
// ============================================
export const saveFCMToken = async (): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const token = await messaging().getToken();
    if (!token) return;

    // Save to Supabase
    await supabase
      .from('user_tokens')
      .upsert({
        user_id: user.id,
        fcm_token: token,
        device_type: Platform.OS,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id, fcm_token' });

    console.log('FCM Token saved ✅');
  } catch (error) {
    console.error('Save token error:', error);
  }
};

// ============================================
// 4. DISPLAY NOTIFICATION (Used in all states)
// ============================================
export const displayNotification = async (
  title: string,
  body: string,
  bigText?: string,
): Promise<void> => {
  const channelId = await createChannel();

  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      style: bigText
        ? {
            type: AndroidStyle.BIGTEXT,
            text: bigText,
          }
        : undefined,
      color: '#FF6B00',
      smallIcon: 'ic_notification',
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
    ios: {
      sound: 'default',
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
};

// ============================================
// 5. LOGIN NOTIFICATION
// ============================================
export const showLoginNotification = async (
  userName: string,
): Promise<void> => {
  await displayNotification(
    '🙏 जय श्री राम!',
    `Welcome back ${userName}!`,
    `Welcome back ${userName}! 🙏\n\nContinue your spiritual journey with Hanuman Chalisa.\n\nजय हनुमान! 🚩`,
  );
};

// ============================================
// 6. SIGNUP NOTIFICATION
// ============================================
export const showSignupNotification = async (
  userName: string,
): Promise<void> => {
  await displayNotification(
    '🎉 Welcome to Hanuman Chalisa!',
    `Namaste ${userName}! Your journey begins now.`,
    `Namaste ${userName}! 🙏\n\nWelcome to Hanuman Chalisa App.\n\nMay Lord Hanuman bless you with strength, wisdom and happiness.\n\nजय हनुमान! 🚩`,
  );
};

// ============================================
// 7. SETUP ALL STATE HANDLERS
// ============================================
export const setupNotificationHandlers = (): void => {

  // Handlers for foreground are setup in App.tsx
  // Background and Quit states are now correctly handled in index.js
};