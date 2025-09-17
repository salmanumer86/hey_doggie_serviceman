import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';
import { FILTER_OPTIONS } from '../constants/bookingConstants';

const BookingFilters = ({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  showServiceType = true,
  showDate = true,
  style 
}) => {
  const [expandedFilter, setExpandedFilter] = useState(null);

  const toggleFilter = (filterType) => {
    setExpandedFilter(expandedFilter === filterType ? null : filterType);
  };

  const handleFilterSelect = (filterType, value) => {
    onFilterChange({ [filterType]: value });
    setExpandedFilter(null);
  };

  const renderFilterButton = (filterType, currentValue, options, icon) => {
    const currentOption = options.find(opt => opt.value === currentValue);
    
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            expandedFilter === filterType && styles.filterButtonActive
          ]}
          onPress={() => toggleFilter(filterType)}
        >
          <Icon name={icon} size={18} color={COLORS.primary} style={styles.filterIcon} />
          <Text style={styles.filterButtonText}>
            {currentOption?.label || 'All'}
          </Text>
          <Icon 
            name={expandedFilter === filterType ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color={COLORS.primary}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
        {expandedFilter === filterType && (
          <View style={styles.filterDropdown}>
            <ScrollView style={styles.filterOptions} showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    currentValue === option.value && styles.filterOptionSelected
                  ]}
                  onPress={() => handleFilterSelect(filterType, option.value)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    currentValue === option.value && styles.filterOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                  {currentValue === option.value && (
                    <Icon name="check" size={16} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const hasActiveFilters = () => {
    return filters.status !== 'All' || 
           filters.serviceType !== 'All' || 
           filters.date !== null;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.filtersRow}>
        {renderFilterButton(
          'status',
          filters.status,
          FILTER_OPTIONS.STATUS,
          'filter-variant'
        )}
        
        {showServiceType && renderFilterButton(
          'serviceType',
          filters.serviceType,
          FILTER_OPTIONS.SERVICE_TYPE,
          'paw'
        )}
        {showDate && renderFilterButton(
          'date',
          filters.date,
          [
            { label: 'All Dates', value: null },
            { label: 'Today', value: new Date().toISOString().split('T')[0] },
            { label: 'Tomorrow', value: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
            { label: 'This Week', value: 'week' },
          ],
          'calendar'
        )}
      </View>
      {hasActiveFilters() && (
        <View style={styles.resetContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={onResetFilters}
          >
            <Icon name="refresh" size={16} color="#6B7280" />
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 1000,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterContainer: {
    flex: 1,
    position: 'relative',
    zIndex: 1000,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 40,
  },
  filterButtonActive: {
    backgroundColor: '#EFF6FF',
    borderColor: COLORS.primary,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
    textAlign: 'center',
  },
  filterDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 9999,
    zIndex: 9999,
    marginTop: 4,
  },
  filterOptions: {
    maxHeight: 200,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  filterOptionSelected: {
    backgroundColor: '#EFF6FF',
  },
  filterOptionText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  resetContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resetButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 6,
  },
});

export default BookingFilters;
