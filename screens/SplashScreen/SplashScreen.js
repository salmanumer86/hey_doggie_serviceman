import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AUTH_SCREEN } from '../constants';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
    const timeout = setTimeout(() => {
      navigation.replace(AUTH_SCREEN);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoCircle, { opacity: fadeAnim }] }>
        <Icon name="shield" size={56} color="#1A237E" />
      </Animated.View>
      <Animated.Text style={[styles.appName, { opacity: fadeAnim }] }>
        Hey Doggie Serviceman
      </Animated.Text>
      <ActivityIndicator size="large" color="#3B5BDB" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 18,
    letterSpacing: 1,
  },
  spinner: {
    marginTop: 10,
  },
});

export default SplashScreen; 