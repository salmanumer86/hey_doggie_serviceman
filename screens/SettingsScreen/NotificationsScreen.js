import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    <Text style={styles.text}>Your notification preferences will appear here.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2563EB',
  },
  text: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default NotificationsScreen; 