import { configureStore } from '@reduxjs/toolkit';
import servicemanReducer from './servicemanSlice';
import bookingReducer from './bookingSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    serviceman: servicemanReducer,
    bookings: bookingReducer,
    notifications: notificationReducer,
  },
});

export default store;
