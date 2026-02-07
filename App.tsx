/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


// App.tsx
// import React from 'react';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { ActivityIndicator, View } from 'react-native';

// import { store, persistor } from './src/store';
// import MainNavigator from './src/navigation/MainNavigator'; // Your navigation logic

// const LoadingMarkup = () => (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <ActivityIndicator size="large" color="#FF6B00" />
//   </View>
// );

// const App = () => {
//   return (
//     <Provider store={store}>
//       {/* PersistGate waits for AsyncStorage to load data into Redux before rendering */}
//       <PersistGate loading={<LoadingMarkup />} persistor={persistor}>
//         <MainNavigator />
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
