import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const settingsOptions = [
    { icon: 'bell-outline', label: 'Notifications', screen: 'NotificationsScreen' },
    { icon: 'lock-outline', label: 'Privacy', screen: 'PrivacyScreen' },
    { icon: 'help-circle-outline', label: 'Help', screen: 'HelpScreen' },
    { icon: 'information-outline', label: 'About', screen: 'AboutScreen' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.settingsCard}>
          {settingsOptions.map((option, idx) => (
            <TouchableOpacity
              key={option.label}
              style={[styles.settingRow, idx === settingsOptions.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => navigation.navigate(option.screen)}
            >
              <Icon name={option.icon} size={22} color={COLORS.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>{option.label}</Text>
              <Icon name="chevron-right" size={22} color="#9CA3AF" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 28,
    marginBottom: 18,
    width: '100%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  profileIcon: {
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  settingsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 8,
    marginBottom: 18,
    width: '100%',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 8,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 10,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '600',
  },
});

export default SettingsScreen;
