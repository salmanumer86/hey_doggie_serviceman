import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import { AUTH_SCREEN, MAIN_TABS_SCREEN } from '../screens/constants';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import NotificationsScreen from '../screens/ProfileScreen/NotificationsScreen';
import PrivacyScreen from '../screens/ProfileScreen/PrivacyScreen';
import HelpScreen from '../screens/ProfileScreen/HelpScreen';
import AboutScreen from '../screens/ProfileScreen/AboutScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BookingDetailsScreen from '../screens/BookingDetailsScreen/BookingDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name={AUTH_SCREEN} component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name={MAIN_TABS_SCREEN} component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen 
          name="BookingDetails" 
          component={BookingDetailsScreen} 
          options={{ 
            title: 'Booking Details',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTitleStyle: {
              color: '#1A237E',
              fontSize: 18,
              fontWeight: '700',
            },
            headerTintColor: '#1A237E',
            headerBackTitleVisible: false,
          }} 
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="AccountScreen" component={ProfileScreen} options={{ title: 'Account' }} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: 'Notifications' }} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} options={{ title: 'Privacy' }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
