import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen, DashboardScreen } from '../screens';
import BottomTabNavigator from '../components/BottomTabNavigator';
import { AUTH_SCREEN, MAIN_TABS_SCREEN } from '../screens/constants';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import NotificationsScreen from '../screens/ProfileScreen/NotificationsScreen';
import PrivacyScreen from '../screens/ProfileScreen/PrivacyScreen';
import HelpScreen from '../screens/ProfileScreen/HelpScreen';
import AboutScreen from '../screens/ProfileScreen/AboutScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen/BookingDetailsScreen';
import BookingOverviewScreen from '../screens/BookingOverviewScreen/BookingOverviewScreen';
import RecentActivityScreen from '../screens/RecentActivityScreen/RecentActivityScreen';
import SupportScreen from '../screens/SupportScreen/SupportScreen';
import EarningsScreen from '../screens/EarningsScreen/EarningsScreen';
import { COLORS } from '../constants/colors';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name={AUTH_SCREEN} component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name={MAIN_TABS_SCREEN} component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen 
          name="BookingOverview"
          component={BookingOverviewScreen}
          options={{
            title: 'Bookings',
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerTitleStyle: {
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: COLORS.primary,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="BookingDetails" 
          component={BookingDetailsScreen} 
          options={{ 
            title: 'Booking Details',
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerTitleStyle: {
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: COLORS.primary,
            headerBackTitleVisible: false,
          }} 
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: 'Notifications' }} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={{ title: 'Privacy' }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About' }} />
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ title: 'Dashboard' }} />

        <Stack.Screen
          name="EarningsScreen"
          component={EarningsScreen}
          options={{
            title: 'Earnings',
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerTitleStyle: {
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: COLORS.primary,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="RecentActivityScreen"
          component={RecentActivityScreen}
          options={{
            title: 'Recent Activity',
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerTitleStyle: {
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: COLORS.primary,
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="SupportScreen"
          component={SupportScreen}
          options={{
            title: 'Support',
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerTitleStyle: {
              color: COLORS.primary,
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: COLORS.primary,
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
