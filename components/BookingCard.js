import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';
import { getStatusColor, getServiceIcon, formatPrice, getTimeUntilBooking } from '../constants/bookingConstants';

const BookingCard = ({ 
  booking, 
  onPress, 
  showActions = false, 
  onAccept, 
  onDecline, 
  onComplete,
  style 
}) => {
  const statusColors = getStatusColor(booking.status);
  const serviceIcon = getServiceIcon(booking.service.type);
  const timeUntil = getTimeUntilBooking(booking.timing.date, booking.timing.time);

  const renderStatusBadge = () => (
    <View style={[styles.statusBadge, { backgroundColor: statusColors.background }]}>
      <Text style={[styles.statusText, { color: statusColors.text }]}>
        {booking.status}
      </Text>
    </View>
  );

  const renderPriorityBadge = () => {
    if (booking.priority === 'High') {
      return (
        <View style={styles.priorityBadge}>
          <Icon name="alert-circle" size={12} color="#EF4444" />
          <Text style={styles.priorityText}>High</Text>
        </View>
      );
    }
    return null;
  };

  const renderActions = () => {
    if (!showActions) return null;

    return (
      <View style={styles.actionsContainer}>
        {booking.status === 'Pending' && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, styles.declineButton]}
              onPress={() => onDecline?.(booking.id)}
            >
              <Icon name="close" size={16} color="#EF4444" />
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.acceptButton]}
              onPress={() => onAccept?.(booking.id)}
            >
              <Icon name="check" size={16} color="#FFFFFF" />
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </>
        )}
        {booking.status === 'Accepted' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => onComplete?.(booking.id)}
          >
            <Icon name="check-circle" size={16} color="#FFFFFF" />
            <Text style={styles.completeButtonText}>Start Session</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => onPress?.(booking)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.petInfo}>
          <Icon name="dog" size={24} color={COLORS.primary} style={styles.petIcon} />
          <View style={styles.petDetails}>
            <Text style={styles.petName}>{booking.pet.name}</Text>
            <Text style={styles.petBreed}>{booking.pet.breed}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {renderPriorityBadge()}
          {renderStatusBadge()}
        </View>
      </View>
      <View style={styles.serviceInfo}>
        <View style={styles.serviceRow}>
          <Icon name={serviceIcon} size={18} color={COLORS.primary} style={styles.detailIcon} />
          <Text style={styles.serviceType}>{booking.service.type}</Text>
          <Text style={styles.servicePrice}>{formatPrice(booking.service.price)}</Text>
        </View>
      </View>
      <View style={styles.timingInfo}>
        <View style={styles.timingRow}>
          <Icon name="clock-outline" size={18} color={COLORS.primary} style={styles.detailIcon} />
          <Text style={styles.timingText}>
            {booking.timing.date} at {booking.timing.time}
          </Text>
          <Text style={styles.timeUntilText}>{timeUntil}</Text>
        </View>
      </View>
      <View style={styles.locationInfo}>
        <View style={styles.locationRow}>
          <Icon name="map-marker-outline" size={18} color={COLORS.primary} style={styles.detailIcon} />
          <Text style={styles.locationText} numberOfLines={2}>
            {booking.location.address}
          </Text>
        </View>
      </View>
      {booking.specialInstructions && (
        <View style={styles.instructionsInfo}>
          <Icon name="information-outline" size={18} color={COLORS.primary} style={styles.detailIcon} />
          <Text style={styles.instructionsText} numberOfLines={2}>
            {booking.specialInstructions}
          </Text>
        </View>
      )}
      {renderActions()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  petInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  petIcon: {
    marginRight: 12,
  },
  petDetails: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  petBreed: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 4,
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
  serviceInfo: {
    marginBottom: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceType: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
    flex: 1,
    marginLeft: 8,
  },
  servicePrice: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
  },
  timingInfo: {
    marginBottom: 8,
  },
  timingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timingText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  timeUntilText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  locationInfo: {
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
    lineHeight: 20,
  },
  instructionsInfo: {
    marginBottom: 12,
  },
  instructionsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionsText: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
    flex: 1,
    marginLeft: 8,
    lineHeight: 18,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  acceptButton: {
    backgroundColor: '#10B981',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  declineButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  declineButtonText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  detailIcon: {
    marginRight: 8,
  },
});

export default BookingCard;
