import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    {
      id: '1',
      title: 'New Service Request',
      message: 'You have a new dog walking request for Max',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'service_request'
    },
    {
      id: '2',
      title: 'Payment Received',
      message: 'Payment of $25.00 has been received for yesterday\'s service',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'payment'
    },
    {
      id: '3',
      title: 'Schedule Reminder',
      message: 'You have a dog walking appointment in 30 minutes',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      type: 'reminder'
    }
  ],
  unreadCount: 2
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    addNotification: (state, action) => {
      const newNotification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
    },
    removeNotification: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    }
  }
});

export const { markAsRead, markAllAsRead, addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
