import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';
import { formatPrice } from '../constants/bookingConstants';

const BookingStats = ({ 
  stats, 
  onRefresh, 
  refreshing = false,
  style 
}) => {
  const statItems = [
    {
      key: 'totalBookings',
      label: 'Total Bookings',
      value: stats.totalBookings,
      icon: 'clipboard-list',
      color: COLORS.primary,
    },
    {
      key: 'pendingBookings',
      label: 'Pending',
      value: stats.pendingBookings,
      icon: 'clock-outline',
      color: '#F59E0B',
    },
    {
      key: 'todayBookings',
      label: 'Today',
      value: stats.todayBookings,
      icon: 'calendar-today',
      color: '#10B981',
    },
    {
      key: 'weeklyEarnings',
      label: 'Weekly Earnings',
      value: formatPrice(stats.weeklyEarnings),
      icon: 'currency-usd',
      color: '#8B5CF6',
    },
  ];

  const renderStatItem = (item) => (
    <View key={item.key} style={styles.statItem}>
      <View style={[styles.statIconContainer, { backgroundColor: `${item.color}15` }]}>
        <Icon name={item.icon} size={20} color={item.color} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{item.value}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Booking Overview</Text>
        {onRefresh && (
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={onRefresh}
            disabled={refreshing}
          >
            <Icon 
              name="refresh" 
              size={18} 
              color={COLORS.primary} 
              style={refreshing ? styles.refreshingIcon : null}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.statsGrid}>
        {statItems.map(renderStatItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  refreshingIcon: {
    transform: [{ rotate: '360deg' }],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default BookingStats;
