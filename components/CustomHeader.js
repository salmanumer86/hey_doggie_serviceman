import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import NotificationIcon from './NotificationIcon';

const CustomHeader = ({
  title,
  userName = 'Alex',
  greeting = 'Welcome back',
  subtitle = "Here's your day at a glance",
  avatarUri = 'https://randomuser.me/api/portraits/men/32.jpg',
  onNotificationPress,
  showNotification = true,
  showUserInfo = true,
  notificationSize = 26,
  notificationColor = COLORS.primary
}) => {

  if (!showUserInfo) {
    return (
      <View style={styles.simpleContainer}>
        <Text style={styles.simpleTitle}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatarUri }}
        style={styles.avatar}
      />
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{greeting}, {userName}!</Text>
        <Text style={styles.subGreeting}>{subtitle}</Text>
      </View>
      {showNotification && (
        <NotificationIcon
          onPress={onNotificationPress}
          size={notificationSize}
          color={notificationColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    justifyContent: 'space-between',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
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
  simpleContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    margin: 15,
    marginTop: 25,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, 
  },
  simpleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader; 