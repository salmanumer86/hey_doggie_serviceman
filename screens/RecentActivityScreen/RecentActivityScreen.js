import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { selectFilteredBookings } from '../../redux/bookingSlice';
import { formatDate } from '../../constants/bookingConstants';

const ACTIVITY_TYPES = {
  COMPLETED: 'completed',
  NEW_REQUEST: 'new_request',
  RATING: 'rating',
  CANCELLED: 'cancelled',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
};

const ACTIVITY_ICONS = {
  [ACTIVITY_TYPES.COMPLETED]: 'check-circle',
  [ACTIVITY_TYPES.NEW_REQUEST]: 'account-plus',
  [ACTIVITY_TYPES.RATING]: 'star',
  [ACTIVITY_TYPES.CANCELLED]: 'close-circle',
  [ACTIVITY_TYPES.ACCEPTED]: 'check-circle-outline',
  [ACTIVITY_TYPES.DECLINED]: 'close-circle-outline',
};

const ACTIVITY_COLORS = {
  [ACTIVITY_TYPES.COMPLETED]: '#10B981',
  [ACTIVITY_TYPES.NEW_REQUEST]: '#3B82F6',
  [ACTIVITY_TYPES.RATING]: '#F59E0B',
  [ACTIVITY_TYPES.CANCELLED]: '#EF4444',
  [ACTIVITY_TYPES.ACCEPTED]: '#10B981',
  [ACTIVITY_TYPES.DECLINED]: '#EF4444',
};

const RecentActivityScreen = () => {
  const navigation = useNavigation();
  const bookings = useSelector(selectFilteredBookings);
  const [refreshing, setRefreshing] = useState(false);

  const generateActivityData = () => {
    const activities = [];
    const today = new Date();
    
    bookings.slice(0, 5).forEach((booking, index) => {
      const activityDate = new Date(today);
      activityDate.setHours(today.getHours() - (index + 1) * 2);
      
      activities.push({
        id: `booking_${booking.id}`,
        type: ACTIVITY_TYPES.COMPLETED,
        title: `Completed ${booking.service.type} for ${booking.pet.name}`,
        description: `${booking.service.type} session completed successfully`,
        time: activityDate,
        bookingId: booking.id,
        petName: booking.pet.name,
        serviceType: booking.service.type,
      });
    });

    const mockActivities = [
      {
        id: '1',
        type: ACTIVITY_TYPES.NEW_REQUEST,
        title: 'New booking request from Max',
        description: 'Dog walking service requested for tomorrow',
        time: new Date(today.getTime() - 30 * 60 * 1000),
        petName: 'Max',
        serviceType: 'Dog Walking',
      },
      {
        id: '2',
        type: ACTIVITY_TYPES.RATING,
        title: 'Received 5-star rating from Charlie',
        description: 'Great service! Thank you for taking care of Bella',
        time: new Date(today.getTime() - 2 * 60 * 60 * 1000), 
        petName: 'Bella',
        serviceType: 'Pet Sitting',
        rating: 5,
      },
      {
        id: '3',
        type: ACTIVITY_TYPES.ACCEPTED,
        title: 'Accepted booking for Luna',
        description: 'Pet grooming appointment confirmed',
        time: new Date(today.getTime() - 4 * 60 * 60 * 1000),
        petName: 'Luna',
        serviceType: 'Pet Grooming',
      },
      {
        id: '4',
        type: ACTIVITY_TYPES.CANCELLED,
        title: 'Booking cancelled by owner',
        description: 'Dog walking cancelled due to weather',
        time: new Date(today.getTime() - 6 * 60 * 60 * 1000), 
        petName: 'Rocky',
        serviceType: 'Dog Walking',
      },
    ];

    return [...mockActivities, ...activities].sort((a, b) => b.time - a.time);
  };

  const [activities, setActivities] = useState(generateActivityData());

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActivities(generateActivityData());
    } catch (error) {
      console.error('Failed to refresh activities:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const formatActivityTime = (time) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return formatDate(time.toISOString());
  };

  const getActivityIcon = (type) => {
    return ACTIVITY_ICONS[type] || 'information';
  };

  const getActivityColor = (type) => {
    return ACTIVITY_COLORS[type] || COLORS.primary;
  };

  const handleActivityPress = (activity) => {
    if (activity.bookingId) {
      navigation.navigate('BookingDetails', { bookingId: activity.bookingId });
    }
  };

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.activityCard}
      onPress={() => handleActivityPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.activityHeader}>
        <View style={[styles.iconContainer, { backgroundColor: getActivityColor(item.type) + '15' }]}>
          <Icon 
            name={getActivityIcon(item.type)} 
            size={24} 
            color={getActivityColor(item.type)} 
          />
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDescription}>{item.description}</Text>
          <View style={styles.activityMeta}>
            <View style={styles.metaItem}>
              <Icon name="paw" size={14} color={COLORS.primary} />
              <Text style={styles.metaText}>{item.petName}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="tag" size={14} color={COLORS.primary} />
              <Text style={styles.metaText}>{item.serviceType}</Text>
            </View>
            {item.rating && (
              <View style={styles.metaItem}>
                <Icon name="star" size={14} color="#F59E0B" />
                <Text style={styles.metaText}>{item.rating} stars</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.activityTime}>{formatActivityTime(item.time)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="history" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No Recent Activity</Text>
      <Text style={styles.emptySubtitle}>
        Your recent activities and booking updates will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="history" size={28} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Recent Activity</Text>
        </View>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRefresh}
          disabled={refreshing}
        >
          <Icon 
            name="refresh" 
            size={20} 
            color={COLORS.primary} 
            style={refreshing ? styles.refreshing : null}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={activities}
        keyExtractor={item => item.id}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4FF',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 12,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
  },
  refreshing: {
    transform: [{ rotate: '180deg' }],
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  listContent: {
    paddingTop: 18,
    paddingBottom: 24,
  },
  activityCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F4FF',
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
    marginRight: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  activityMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
});

export default RecentActivityScreen;
