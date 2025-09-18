import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RECENT_PAYMENTS = [
  { id: '1', label: 'Dog Walking', amount: '$75', date: 'Today', icon: 'dog' },
  { id: '2', label: 'Pet Grooming', amount: '$120', date: 'Yesterday', icon: 'scissors-cutting' },
  { id: '3', label: 'Vet Visit', amount: '$150', date: '2 days ago', icon: 'hospital' },
];

const US_COLORS = {
  background: '#F5F6FA',
  card: '#FFFFFF',
  primary: '#2563EB',
  accent: '#FACC15',
  error: '#EF4444',
  shadow: '#000',
  text: '#1A202C',
  textSecondary: '#6B7280',
};

const EarningsScreen = () => (
  <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <View style={styles.summaryCard}>
      <Icon name="cash-multiple" size={32} color={US_COLORS.primary} style={{ marginBottom: 8 }} />
      <Text style={styles.summaryLabel}>Total Earnings</Text>
      <Text style={styles.summaryValue}>$1,200</Text>
      <Text style={styles.summarySub}>This Month</Text>
    </View>
    <Text style={styles.sectionTitle}>Recent Payments</Text>
    <FlatList
      data={RECENT_PAYMENTS}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalList}
      renderItem={({ item }) => (
        <View style={styles.paymentCard}>
          <Icon name={item.icon} size={24} color={US_COLORS.primary} style={{ marginBottom: 6 }} />
          <Text style={styles.paymentLabel}>{item.label}</Text>
          <Text style={styles.paymentAmount}>{item.amount}</Text>
          <Text style={styles.paymentDate}>{item.date}</Text>
        </View>
      )}
    />
    <Text style={styles.sectionTitle}>Earnings Trend</Text>
    <View style={styles.chartPlaceholder}>
      <Icon name="chart-line" size={40} color={US_COLORS.primary} style={{ marginBottom: 8 }} />
      <Text style={styles.chartText}>Earnings chart coming soon...</Text>
    </View>
    <View style={styles.detailsCard}>
      <View style={styles.earningRow}>
        <Icon name="calendar-week" size={20} color={US_COLORS.primary} style={{ marginRight: 6 }} />
        <Text style={styles.label}>This Week:</Text>
        <Text style={styles.value}>$320</Text>
      </View>
      <View style={styles.earningRow}>
        <Icon name="calendar-month" size={20} color={US_COLORS.primary} style={{ marginRight: 6 }} />
        <Text style={styles.label}>This Month:</Text>
        <Text style={styles.value}>$1,200</Text>
      </View>
      <View style={styles.earningRow}>
        <Icon name="credit-card" size={20} color={US_COLORS.primary} style={{ marginRight: 6 }} />
        <Text style={styles.label}>Last Payment:</Text>
        <Text style={styles.value}>$150 (2 days ago)</Text>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: US_COLORS.background,
    padding: 18,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: US_COLORS.card,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: US_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: US_COLORS.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: US_COLORS.primary,
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 13,
    color: US_COLORS.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: US_COLORS.primary,
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginTop: 8,
    paddingLeft: 4,
  },
  horizontalList: {
    paddingBottom: 8,
    marginBottom: 12,
  },
  paymentCard: {
    backgroundColor: US_COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    width: 140,
    shadowColor: US_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: US_COLORS.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: US_COLORS.primary,
    marginBottom: 2,
  },
  paymentDate: {
    fontSize: 12,
    color: US_COLORS.textSecondary,
    fontWeight: '500',
  },
  chartPlaceholder: {
    width: '100%',
    backgroundColor: US_COLORS.card,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: US_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  chartText: {
    fontSize: 14,
    color: US_COLORS.textSecondary,
    fontWeight: '500',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: US_COLORS.card,
    borderRadius: 16,
    padding: 22,
    shadowColor: US_COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  earningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    color: US_COLORS.text,
    fontWeight: '500',
    marginRight: 4,
  },
  value: {
    fontSize: 15,
    color: US_COLORS.primary,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: US_COLORS.primary,
  },
});

export default EarningsScreen; 