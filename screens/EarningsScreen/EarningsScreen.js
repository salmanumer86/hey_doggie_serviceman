import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EarningsFilters from '../../components/EarningsFilters';
import { COLORS } from '../../constants/colors';

const RECENT_PAYMENTS = [
  {
    id: '1',
    label: 'Dog Walking',
    serviceType: 'Dog Walking',
    amount: 75,
    date: new Date(),
    icon: 'dog',
    status: 'completed'
  },
  {
    id: '2',
    label: 'Pet Grooming',
    serviceType: 'Grooming',
    amount: 120,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: 'scissors-cutting',
    status: 'completed'
  },
  {
    id: '3',
    label: 'Vet Visit',
    serviceType: 'Vet Visit',
    amount: 150,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    icon: 'hospital',
    status: 'completed'
  },
  {
    id: '4',
    label: 'Run Session',
    serviceType: 'Run Session',
    amount: 100,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    icon: 'run',
    status: 'completed'
  },
  {
    id: '5',
    label: 'Health Check',
    serviceType: 'Health Check',
    amount: 80,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    icon: 'medical-bag',
    status: 'completed'
  },
  {
    id: '6',
    label: 'Dog Walking',
    serviceType: 'Dog Walking',
    amount: 65,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    icon: 'dog',
    status: 'completed'
  },
];

const isDateInRange = (date, range) => {
  if (!range) return true;

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (range) {
    case 'today':
      return date >= startOfDay;
    case 'week':
      const weekAgo = new Date(startOfDay.getTime() - 7 * 24 * 60 * 60 * 1000);
      return date >= weekAgo;
    case 'month':
      const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      return date >= monthAgo;
    case 'quarter':
      const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      return date >= quarterAgo;
    case 'year':
      const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      return date >= yearAgo;
    default:
      return true;
  }
};

const isAmountInRange = (amount, range) => {
  if (range === 'All') return true;

  switch (range) {
    case 'under_50':
      return amount < 50;
    case '50_100':
      return amount >= 50 && amount <= 100;
    case '100_200':
      return amount > 100 && amount <= 200;
    case '200_500':
      return amount > 200 && amount <= 500;
    case 'over_500':
      return amount > 500;
    default:
      return true;
  }
};

const formatDate = (date) => {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Today';
  if (diffDays === 2) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  return date.toLocaleDateString();
};

const EarningsScreen = () => {
  const [filters, setFilters] = useState({
    serviceType: 'All',
    date: null,
    amountRange: 'All',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      serviceType: 'All',
      date: null,
      amountRange: 'All',
    });
  };

  const filteredPayments = useMemo(() => {
    return RECENT_PAYMENTS.filter(payment => {
      const serviceTypeMatch = filters.serviceType === 'All' || payment.serviceType === filters.serviceType;
      const dateMatch = isDateInRange(payment.date, filters.date);
      const amountMatch = isAmountInRange(payment.amount, filters.amountRange);

      return serviceTypeMatch && dateMatch && amountMatch;
    });
  }, [filters]);

  const totalEarnings = useMemo(() => {
    return filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }, [filteredPayments]);

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <EarningsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
      <View style={styles.summaryCard}>
        <Icon name="cash-multiple" size={32} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.summaryLabel}>Total Earnings</Text>
        <Text style={styles.summaryValue}>${totalEarnings}</Text>
        <Text style={styles.summarySub}>
          {filters.date ?
            (filters.date === 'today' ? 'Today' :
              filters.date === 'week' ? 'This Week' :
                filters.date === 'month' ? 'This Month' :
                  filters.date === 'quarter' ? 'Last 3 Months' :
                    filters.date === 'year' ? 'This Year' : 'Filtered')
            : 'All Time'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Payments ({filteredPayments.length})</Text>
      <FlatList
        data={filteredPayments}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <View style={styles.paymentCard}>
            <Icon name={item.icon} size={24} color={COLORS.primary} style={{ marginBottom: 6 }} />
            <Text style={styles.paymentLabel}>{item.label}</Text>
            <Text style={styles.paymentAmount}>${item.amount}</Text>
            <Text style={styles.paymentDate}>{formatDate(item.date)}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Earnings Trend</Text>
      <View style={styles.chartPlaceholder}>
        <Icon name="chart-line" size={40} color={COLORS.primary} style={{ marginBottom: 8 }} />
        <Text style={styles.chartText}>Earnings chart coming soon...</Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.earningRow}>
          <Icon name="calendar-week" size={20} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.label}>This Week:</Text>
          <Text style={styles.value}>$320</Text>
        </View>
        <View style={styles.earningRow}>
          <Icon name="calendar-month" size={20} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.label}>This Month:</Text>
          <Text style={styles.value}>$1,200</Text>
        </View>
        <View style={styles.earningRow}>
          <Icon name="credit-card" size={20} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.label}>Last Payment:</Text>
          <Text style={styles.value}>$150 (2 days ago)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 18,
    paddingTop: 10,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  summarySub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
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
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    width: 140,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 2,
  },
  paymentDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  chartPlaceholder: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  chartText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 22,
    shadowColor: COLORS.shadow,
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
    color: COLORS.text,
    fontWeight: '500',
    marginRight: 4,
  },
  value: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default EarningsScreen; 