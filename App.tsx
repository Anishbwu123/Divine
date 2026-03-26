/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import Loader from './src/components/common/Loader';
import toastConfig from './src/config/toastConfig';

import {
  requestPermission,
  setupNotificationHandlers,
  displayNotification,
} from './src/features/notifications/notificationService';

const AppContent = () => {
  useEffect(() => {
    const init = async () => {
      // ✅ 1. Request notification permission
      await requestPermission();
      messaging()
        .getToken()
        .then(token => console.log('\n🔥 MY FCM TOKEN: \n', token, '\n'));

      // ✅ 2. Setup background/quit handlers (if any custom logic)
      setupNotificationHandlers();

      // ✅ 3. Handle FOREGROUND Firebase messages
      const unsubscribeForeground = messaging().onMessage(
        async remoteMessage => {
          console.log('Foreground message:', remoteMessage);

          const { title, body, bigText } = remoteMessage.data as any;

          await displayNotification(
            title || '🙏 Hanuman Chalisa',
            body || '',
            bigText,
          );
        },
      );

      // ✅ 4. Handle Notifee foreground events (click, etc.)
      const unsubscribeNotifee = notifee.onForegroundEvent(
        ({ type, detail }) => {
          if (type === EventType.PRESS) {
            console.log('Notification pressed:', detail.notification);

            // 👉 You can navigate here if needed
          }
        },
      );

      return () => {
        unsubscribeForeground();
        unsubscribeNotifee();
      };
    };

    init();
  }, []);

  return (
    <>
      <RootNavigator />
      <Toast config={toastConfig} position="top" topOffset={50} />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
