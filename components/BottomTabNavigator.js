import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen, SettingsScreen } from '../screens';
import { HOME_SCREEN, SERVICE_REQUESTS_SCREEN, PROFILE_SCREEN, SETTINGS_SCREEN } from '../screens/constants';
import { COLORS } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const ACTIVE_BG = '#6544E7';
const ACTIVE_COLOR = '#fff';
const INACTIVE_COLOR = '#B0B9CC';

const icons = {
  [HOME_SCREEN]: 'home-variant',
  [SERVICE_REQUESTS_SCREEN]: 'clipboard-list-outline',
  [PROFILE_SCREEN]: 'account-circle-outline',
  [SETTINGS_SCREEN]: 'cog-outline',
};

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const iconName = icons[route.name];
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.8}
          >
            {isFocused ? (
              <View style={styles.activeTab}>
                <Icon name={iconName} size={24} color={ACTIVE_COLOR} />
                <Text style={styles.activeLabel} numberOfLines={1} ellipsizeMode='tail'>{label}</Text>
              </View>
            ) : (
              <Icon name={iconName} size={26} color={INACTIVE_COLOR} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: true }}
  >
    <Tab.Screen
      name={HOME_SCREEN}
      component={HomeScreen}
      options={{ title: 'Home' }}
    />
    <Tab.Screen
      name={PROFILE_SCREEN}
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <Tab.Screen
      name={SETTINGS_SCREEN}
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    height: 70,
    borderRadius: 18,
    margin: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 8,
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: ACTIVE_BG,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 70,
    minHeight: 36,
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 110,
  },
  activeLabel: {
    color: ACTIVE_COLOR,
    fontWeight: '600',
    fontSize: 13,
    marginTop: 2,
    marginLeft: 0,
  },
});

export default BottomTabNavigator; 