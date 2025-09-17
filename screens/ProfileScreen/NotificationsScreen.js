import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const notifications = [
  {
    id: '1',
    type: 'check-circle',
    title: 'Job Completed',
    message: 'You have successfully completed the job for Mrs. Smith.',
    time: '2h ago',
  },
  {
    id: '2',
    type: 'calendar',
    title: 'Upcoming Appointment',
    message: 'You have an appointment scheduled for tomorrow at 10:00 AM.',
    time: '5h ago',
  },
  {
    id: '3',
    type: 'cash',
    title: 'Payment Received',
    message: 'You received a payment of $120 for your last job.',
    time: '1d ago',
  },
  {
    id: '4',
    type: 'alert-circle',
    title: 'Profile Incomplete',
    message: 'Please update your address to receive more job requests.',
    time: '2d ago',
  },
];

const NotificationCard = ({ icon, title, message, time }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={28} color="#3B5BDB" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  </View>
);

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="bell-off-outline" size={48} color="#bfc9da" />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              icon={item.type}
              title={item.title}
              message={item.message}
              time={item.time}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 18,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#bfc9da',
    marginTop: 12,
    fontWeight: '500',
  },
});

export default NotificationsScreen; 