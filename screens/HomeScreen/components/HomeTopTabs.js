import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OverviewTab from './OverviewTab';
import EarningsTab from './EarningsTab';
import ScheduleTab from './ScheduleTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TopTab = createMaterialTopTabNavigator();

const HomeTopTabs = () => (
  <TopTab.Navigator>
    <TopTab.Screen
      name="Overview"
      component={OverviewTab}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="view-dashboard-outline" color={color} size={22} />
        ),
        tabBarLabel: 'Overview',
      }}
    />
    <TopTab.Screen
      name="Earnings"
      component={EarningsTab}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="cash-multiple" color={color} size={22} />
        ),
        tabBarLabel: 'Earnings',
      }}
    />
    <TopTab.Screen
      name="Schedule"
      component={ScheduleTab}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="calendar-month-outline" color={color} size={22} />
        ),
        tabBarLabel: 'Schedule',
      }}
    />
  </TopTab.Navigator>
);

export default HomeTopTabs; 