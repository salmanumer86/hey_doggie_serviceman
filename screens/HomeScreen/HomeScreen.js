import { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../../components/CustomHeader';
import { COLORS } from '../../constants/colors';
import { initializeBookings } from '../../redux/bookingSlice';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 66) / 2;

const DashboardButton = ({ icon, title, subtitle, onPress, color }) => (
  <TouchableOpacity style={styles.dashboardButton} onPress={onPress} activeOpacity={0.8}>
    <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.buttonTitle}>{title}</Text>
    <Text style={styles.buttonSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBookings());
  }, [dispatch]);

  const handleNotificationPress = () => {
    navigation.navigate('NotificationsScreen');
  };

  const handleDashboardPress = () => {
    navigation.navigate('DashboardScreen');
  };

  const handleBookingsPress = () => {
    navigation.navigate('BookingOverview');
  };

  const handleEarningsPress = () => {
    navigation.navigate('EarningsScreen');
  };

  const handleActivityPress = () => {
    navigation.navigate('RecentActivityScreen');
  };

  const handleSupportPress = () => {
    navigation.navigate('SupportScreen');
  };




  return (
    <View style={styles.container}>
      <CustomHeader
        userName="Alex"
        greeting="Welcome back"
        subtitle="Here's your day at a glance"
        onNotificationPress={handleNotificationPress}
        showUserInfo={true}
      />

      <ScrollView
        style={styles.scrollableArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.buttonGrid}>
          <DashboardButton
            icon="view-dashboard"
            title="Dashboard"
            subtitle="Overview"
            onPress={handleDashboardPress}
            color={COLORS.primary}
          />
          <DashboardButton
            icon="calendar-clock"
            title="Bookings"
            subtitle="3 scheduled"
            onPress={handleBookingsPress}
            color={COLORS.secondary}
          />
          <DashboardButton
            icon="currency-usd"
            title="Earnings"
            subtitle="$245.00"
            onPress={handleEarningsPress}
            color={COLORS.accent}
          />
          <DashboardButton
            icon="clock-outline"
            title="Activity"
            subtitle="Last 24h"
            onPress={handleActivityPress}
            color={COLORS.info}
          />
          <DashboardButton
            icon="headset"
            title="Support"
            subtitle="Get help"
            onPress={handleSupportPress}
            color={COLORS.error}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollableArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
  },
  dashboardButton: {
    width: buttonWidth,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 3,
    textAlign: 'center',
  },
  buttonSubtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
});