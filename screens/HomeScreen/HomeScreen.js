
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import HomeTopTabs from './components/HomeTopTabs';
import { COLORS } from '../../constants/colors';

const HomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.headerBanner}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.greeting}>Welcome back, Alex!</Text>
        <Text style={styles.subGreeting}>Here’s your day at a glance</Text>
      </View>
    </View>
    <HomeTopTabs />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 18,
  },
  headerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  subGreeting: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default HomeScreen;
