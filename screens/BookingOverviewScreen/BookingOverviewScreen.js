import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,  RefreshControl, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { 
  selectFilteredBookings, 
  selectBookingStats, 
  selectBookingFilters,
  setFilter,
  resetFilters,
  initializeBookings,
  acceptBooking,
  declineBooking,
  setSelectedBooking
} from '../../redux/bookingSlice';
import BookingCard from '../../components/BookingCard';
import BookingFilters from '../../components/BookingFilters';
import BookingStats from '../../components/BookingStats';

const BookingOverviewScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const bookings = useSelector(selectFilteredBookings);
  const stats = useSelector(selectBookingStats);
  const filters = useSelector(selectBookingFilters);

  useEffect(() => {
    dispatch(initializeBookings());
  }, [dispatch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
    } catch (error) {
      console.error('Failed to refresh bookings:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilter(newFilters));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleBookingPress = (booking) => {
    dispatch(setSelectedBooking(booking));
    navigation.navigate('BookingDetails');
  };

  const handleAcceptBooking = (bookingId) => {
    dispatch(acceptBooking({ 
      bookingId, 
      servicemanId: 'serviceman_001' 
    }));
  };

  const handleDeclineBooking = (bookingId) => {
    dispatch(declineBooking({ bookingId }));
  };

  const handleCompleteBooking = (bookingId) => {
    navigation.navigate('SessionScreen', { bookingId });
  };

  const renderBooking = ({ item }) => (
    <BookingCard
      booking={item}
      onPress={handleBookingPress}
      showActions={true}
      onAccept={handleAcceptBooking}
      onDecline={handleDeclineBooking}
      onComplete={handleCompleteBooking}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="clipboard-list-outline" size={64} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No Bookings Found</Text>
      <Text style={styles.emptySubtitle}>
        {filters.status !== 'All' || filters.serviceType !== 'All' 
          ? 'Try adjusting your filters to see more bookings'
          : 'New booking requests will appear here'
        }
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <BookingStats 
          stats={stats} 
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
        
        <BookingFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </View>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBooking}
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
  headerSection: {
    padding: 18,
    paddingBottom: 0,
    zIndex: 1000,
    elevation: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  listContent: {
    paddingTop: 18,
    paddingBottom: 24,
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

export default BookingOverviewScreen;
