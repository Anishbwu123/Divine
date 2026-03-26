/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// 🔥 Firebase + Notifee imports
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';

// ✅ MUST be outside of any component (top-level)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('App Quit / Background - Message received:', remoteMessage);

  // Create notification channel
  const channelId = await notifee.createChannel({
    id: 'hanuman_chalisa',
    name: 'Hanuman Chalisa',
    importance: AndroidImportance.HIGH,
  });

  const { title, body, bigText } = remoteMessage.data || {};

  // Display notification
  await notifee.displayNotification({
    title: title || '🙏 Hanuman Chalisa',
    body: body || 'You have a new message',
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
      smallIcon: 'ic_notification', // make sure this icon exists
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
    },
  });
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === notifee.EventType?.PRESS || type === 1) {
    console.log('Notification pressed in background/quit state');
  }
  if (type === notifee.EventType?.DISMISSED || type === 2) {
    console.log('Notification dismissed in background');
  }
});

// ✅ Register app (ONLY ONCE)
AppRegistry.registerComponent(appName, () => App);