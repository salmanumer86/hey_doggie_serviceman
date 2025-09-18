import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Linking 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { 
  selectSelectedBooking,
  acceptBooking,
  updateBookingStatus,
} from '../../redux/bookingSlice';
import {
  getServiceIcon, 
  formatPrice, 
  formatDate, 
  formatTime,
  getTimeUntilBooking 
} from '../../constants/bookingConstants';
import CustomButton from '../AuthScreen/components/CustomButton';

const BookingDetailsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const booking = useSelector(selectSelectedBooking);

  if (!booking) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={64} color="#EF4444" />
        <Text style={styles.errorTitle}>Booking Not Found</Text>
        <Text style={styles.errorSubtitle}>
          The booking you're looking for doesn't exist or has been removed.
        </Text>
        <CustomButton
          title="Go Back"
          onPress={() => navigation.goBack()}
          variant="primary"
        />
      </View>
    );
  }

  const serviceIcon = getServiceIcon(booking.service.type);
  const timeUntil = getTimeUntilBooking(booking.timing.date, booking.timing.time);

  const handleAccept = async () => {
    Alert.alert(
      'Accept Booking',
      'Are you sure you want to accept this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              await dispatch(acceptBooking({ 
                bookingId: booking.id, 
                servicemanId: 'serviceman_001' 
              })).unwrap();
              Alert.alert('Success', 'Booking accepted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to accept booking. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleDecline = () => {
    Alert.alert(
      'Decline Booking',
      'Are you sure you want to decline this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(updateBookingStatus({ 
                bookingId: booking.id, 
                status: 'Declined',
                servicemanId: 'serviceman_001'
              })).unwrap();
              Alert.alert('Success', 'Booking declined successfully!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to decline booking. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleCallCustomer = () => {
    const phoneNumber = booking.customer.phone.replace(/\s/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleNavigateToLocation = () => {
    const { lat, lng } = booking.location.coordinates;
    const url = `https://maps.google.com/?q=${lat},${lng}`;
    Linking.openURL(url);
  };

  const handleStartSession = () => {
    navigation.navigate('SessionScreen', { bookingId: booking.id });
  };

  const renderPetInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name="dog" size={20} color={COLORS.primary} />
        <Text style={styles.sectionTitle}>Pet Information</Text>
      </View>
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{booking.pet.name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Breed</Text>
          <Text style={styles.infoValue}>{booking.pet.breed}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{booking.pet.age} years</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Weight</Text>
          <Text style={styles.infoValue}>{booking.pet.weight}</Text>
        </View>
      </View>
      {booking.pet.specialNeeds !== 'None' && (
        <View style={styles.specialNeeds}>
          <Text style={styles.specialNeedsLabel}>Special Needs:</Text>
          <Text style={styles.specialNeedsText}>{booking.pet.specialNeeds}</Text>
        </View>
      )}
      {booking.pet.notes && (
        <View style={styles.notes}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{booking.pet.notes}</Text>
        </View>
      )}
    </View>
  );

  const renderServiceInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name={serviceIcon} size={20} color={COLORS.primary} />
        <Text style={styles.sectionTitle}>Service Details</Text>
      </View>
      <View style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceType}>{booking.service.type}</Text>
          <Text style={styles.servicePrice}>{formatPrice(booking.service.price)}</Text>
        </View>
        <Text style={styles.serviceDescription}>{booking.service.description}</Text>
        <View style={styles.serviceDetails}>
          <View style={styles.serviceDetail}>
            <Icon name="clock-outline" size={16} color="#6B7280" />
            <Text style={styles.serviceDetailText}>{booking.service.duration} minutes</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCustomerInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name="account" size={20} color={COLORS.primary} />
        <Text style={styles.sectionTitle}>Customer Information</Text>
      </View>
      <View style={styles.customerCard}>
        <View style={styles.customerHeader}>
          <Text style={styles.customerName}>{booking.customer.name}</Text>
          <TouchableOpacity style={styles.callButton} onPress={handleCallCustomer}>
            <Icon name="phone" size={16} color="#FFFFFF" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.customerPhone}>{booking.customer.phone}</Text>
        <Text style={styles.customerEmail}>{booking.customer.email}</Text>
      </View>
    </View>
  );

  const renderLocationInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name="map-marker" size={20} color={COLORS.primary} />
        <Text style={styles.sectionTitle}>Location</Text>
      </View>
      <View style={styles.locationCard}>
        <Text style={styles.locationAddress}>{booking.location.address}</Text>
        <Text style={styles.locationArea}>{booking.location.area}</Text>
        {booking.location.specialInstructions && (
          <View style={styles.locationInstructions}>
            <Text style={styles.locationInstructionsLabel}>Instructions:</Text>
            <Text style={styles.locationInstructionsText}>
              {booking.location.specialInstructions}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToLocation}>
          <Icon name="navigation" size={16} color={COLORS.primary} />
          <Text style={styles.navigateButtonText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTimingInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Icon name="calendar-clock" size={20} color={COLORS.primary} />
        <Text style={styles.sectionTitle}>Timing</Text>
      </View>
      <View style={styles.timingCard}>
        <View style={styles.timingRow}>
          <Text style={styles.timingDate}>{formatDate(booking.timing.date)}</Text>
          <Text style={styles.timingTime}>{formatTime(booking.timing.time)}</Text>
        </View>
        <Text style={styles.timeUntilText}>{timeUntil}</Text>
      </View>
    </View>
  );

  const renderSpecialInstructions = () => {
    if (!booking.specialInstructions) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="information" size={20} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Special Instructions</Text>
        </View>
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsText}>{booking.specialInstructions}</Text>
        </View>
      </View>
    );
  };

  const renderActions = () => {
    if (booking.status === 'Pending') {
      return (
        <View style={styles.actionsContainer}>
          <CustomButton
            title="Decline"
            onPress={handleDecline}
            variant="outline"
            customStyles={styles.actionButton}
          />
          <CustomButton
            title="Accept Booking"
            onPress={handleAccept}
            variant="primary"
            customStyles={styles.actionButton}
          />
        </View>
      );
    }

    if (booking.status === 'Accepted') {
      return (
        <View style={styles.actionsContainer}>
          <CustomButton
            title="Start Session"
            onPress={handleStartSession}
            variant="primary"
            customStyles={styles.actionButton}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderPetInfo()}
        {renderServiceInfo()}
        {renderCustomerInfo()}
        {renderLocationInfo()}
        {renderTimingInfo()}
        {renderSpecialInstructions()}
      </ScrollView>

      {renderActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: COLORS.background,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EF4444',
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    width: '45%',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  specialNeeds: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  specialNeedsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
  },
  specialNeedsText: {
    fontSize: 14,
    color: '#92400E',
  },
  notes: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  serviceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceType: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  serviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  customerCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  customerPhone: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  locationCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  locationAddress: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 4,
  },
  locationArea: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  locationInstructions: {
    marginBottom: 12,
  },
  locationInstructionsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  locationInstructionsText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  navigateButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  timingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timingDate: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  timingTime: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
  timeUntilText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  instructionsCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  instructionsText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});

export default BookingDetailsScreen;
