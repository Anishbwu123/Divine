import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useAppSelector } from '../../../../store/hooks';
import { colors } from '../../../../theme';


const SplashScreen = ({ navigation }: any) => {
  const user = useAppSelector(state => state.auth.user);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 2.5 seconds
    const timer = setTimeout(() => {
      if (user) {
        navigation.replace('AppStack');
      } else {
        navigation.replace('AuthStack');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Replace with your Image */}
        <View style={styles.iconCircle}>
          <Text style={styles.om}>🙏</Text>
        </View>

        <Text style={styles.titleHindi}>श्री हनुमान चालीसा</Text>
        <Text style={styles.titleEnglish}>Hanuman Chalisa</Text>
      </Animated.View>

      <Animated.Text style={[styles.footer, { opacity: fadeAnim }]}>
        जय श्री राम
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  om: {
    fontSize: 60,
  },
  titleHindi: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 8,
  },
  titleEnglish: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
  },
});

export default SplashScreen;
