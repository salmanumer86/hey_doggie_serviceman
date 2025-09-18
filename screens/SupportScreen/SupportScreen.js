import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';

const SUPPORT_CATEGORIES = [
  { id: '1', title: 'Technical Issues', icon: 'cog', description: 'App bugs, login problems, technical difficulties' },
  { id: '2', title: 'Booking Help', icon: 'calendar-question', description: 'Booking management, scheduling, cancellations' },
  { id: '3', title: 'Payment Issues', icon: 'credit-card', description: 'Payment problems, refunds, billing questions' },
  { id: '4', title: 'Account Support', icon: 'account-cog', description: 'Profile updates, account settings, verification' },
  { id: '5', title: 'General Inquiry', icon: 'help-circle', description: 'General questions, feedback, suggestions' },
];

const FAQ_ITEMS = [
  {
    id: '1',
    question: 'How do I update my availability?',
    answer: 'Go to your Profile > Settings > Availability to set your working hours and days.',
  },
  {
    id: '2',
    question: 'What if I need to cancel a booking?',
    answer: 'You can cancel bookings up to 2 hours before the scheduled time. Go to Bookings > Select booking > Cancel.',
  },
  {
    id: '3',
    question: 'How do I get paid?',
    answer: 'Payments are processed weekly every Friday. Check your Earnings tab for payment history.',
  },
  {
    id: '4',
    question: 'Can I change my service rates?',
    answer: 'Yes, go to Profile > Service Settings to update your rates for different services.',
  },
];

const SupportScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSendMessage = () => {
    if (!selectedCategory || !message.trim()) {
      Alert.alert('Required Fields', 'Please select a category and enter your message.');
      return;
    }

    Alert.alert(
      'Message Sent',
      'Your support request has been submitted. We\'ll get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setMessage('');
            setSelectedCategory(null);
          },
        },
      ]
    );
  };

  const handleCallSupport = () => {
    Alert.alert(
      'Call Support',
      'Call our support team at +1 (555) 123-4567',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling support...') },
      ]
    );
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const renderCategoryCard = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory?.id === category.id && styles.selectedCategoryCard,
      ]}
      onPress={() => handleCategorySelect(category)}
    >
      <View style={styles.categoryHeader}>
        <View style={[
          styles.categoryIcon,
          { backgroundColor: selectedCategory?.id === category.id ? COLORS.primary : '#F3F4F6' }
        ]}>
          <Icon
            name={category.icon}
            size={24}
            color={selectedCategory?.id === category.id ? '#FFFFFF' : COLORS.primary}
          />
        </View>
        <Text style={[
          styles.categoryTitle,
          selectedCategory?.id === category.id && styles.selectedCategoryTitle
        ]}>
          {category.title}
        </Text>
      </View>
      <Text style={styles.categoryDescription}>{category.description}</Text>
    </TouchableOpacity>
  );

  const renderFAQItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.faqItem}
      onPress={() => toggleFAQ(item.id)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Icon
          name={expandedFAQ === item.id ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.primary}
        />
      </View>
      {expandedFAQ === item.id && (
        <Text style={styles.faqAnswer}>{item.answer}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Icon name="headset" size={28} color={COLORS.primary} />
        <Text style={styles.headerTitle}>Support Center</Text>
        <Text style={styles.headerSubtitle}>We're here to help you succeed</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Contact</Text>
        <View style={styles.quickContactRow}>
          <TouchableOpacity style={styles.quickContactButton} onPress={handleCallSupport}>
            <Icon name="phone" size={20} color="#FFFFFF" />
            <Text style={styles.quickContactText}>Call Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickContactButton}>
            <Icon name="email" size={20} color="#FFFFFF" />
            <Text style={styles.quickContactText}>Email Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What can we help you with?</Text>
        <View style={styles.categoriesContainer}>
          {SUPPORT_CATEGORIES.map(renderCategoryCard)}
        </View>
      </View>

      {selectedCategory && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send us a message</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.selectedCategoryText}>
              Selected: {selectedCategory.title}
            </Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Describe your issue or question..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Icon name="send" size={20} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqContainer}>
          {FAQ_ITEMS.map(renderFAQItem)}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Need immediate assistance? Our support team is available 24/7.
        </Text>
        <Text style={styles.footerContact}>
          📞 +1 (555) 123-4567 | ✉️ support@heydoggie.com
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 18,
    backgroundColor: COLORS.card,
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
  },
  quickContactRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickContactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  quickContactText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCategoryCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0F4FF',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    flex: 1,
  },
  selectedCategoryTitle: {
    color: COLORS.primary,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  messageContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
  },
  selectedCategoryText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  messageInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.primary,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    minHeight: 100,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  faqContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 18,
    backgroundColor: COLORS.card,
    marginTop: 18,
  },
  footerText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerContact: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SupportScreen;
