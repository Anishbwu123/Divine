import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ImageBackground,
} from 'react-native';

const SplashScreen = () => {
  // const user = useAppSelector(state => state.auth.user);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = new Animated.Value(0.5);
  const titleHindiSlide = useRef(new Animated.Value(-300)).current;
  const titleHindiOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
   
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

   
    // const timer = setTimeout(() => {
    //   if (user) {
    //     navigation.replace('AppStack');
    //   } else {
    //     navigation.replace('AuthStack');
    //   }
    // }, 2500);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../../../../assets/Images/ram_wallpaper.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.centerContent}>
        <Animated.Text
          style={[
            styles.titleHindi,
            {
              opacity: titleHindiOpacity,
              transform: [{ translateY: titleHindiSlide }],
            },
          ]}
        >
          श्री हनुमान चालीसा
        </Animated.Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    marginBottom: 30,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleHindi: {
    fontSize: 32,
    marginTop: 150,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  titleEnglish: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    fontSize: 18,
    color: 'rgba(255,255,255,0.85)',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default SplashScreen;
