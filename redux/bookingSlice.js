import { createSlice } from '@reduxjs/toolkit';
import { MOCK_BOOKINGS } from '../constants/bookingConstants';

const initialState = {
  allBookings: [],
  filteredBookings: [],
  selectedBooking: null,
  filters: {
    status: 'All', 
    serviceType: 'All', 
    date: null, 
  },
  stats: {
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    completedBookings: 0,
    todayBookings: 0,
    weeklyEarnings: 0,
  },
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    initializeBookings: (state) => {
      state.allBookings = MOCK_BOOKINGS;
      state.filteredBookings = MOCK_BOOKINGS;
      calculateStats(state);
    },

    addBooking: (state, action) => {
      state.allBookings.push(action.payload);
      applyFilters(state);
      calculateStats(state);
    },

    updateBookingStatus: (state, action) => {
      const { bookingId, status, servicemanId, notes } = action.payload;
      const booking = state.allBookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = status;
        if (servicemanId) booking.servicemanId = servicemanId;
        if (notes) booking.notes = notes;
        applyFilters(state);
        calculateStats(state);
      }
    },

    // Accept booking
    acceptBooking: (state, action) => {
      const { bookingId, servicemanId } = action.payload;
      const booking = state.allBookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'Accepted';
        booking.servicemanId = servicemanId;
        applyFilters(state);
        calculateStats(state);
      }
    },

    // Decline booking
    declineBooking: (state, action) => {
      const { bookingId } = action.payload;
      const booking = state.allBookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'Cancelled';
        applyFilters(state);
        calculateStats(state);
      }
    },

    // Start session
    startSession: (state, action) => {
      const { bookingId } = action.payload;
      const booking = state.allBookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'In Progress';
        applyFilters(state);
        calculateStats(state);
      }
    },

    // Complete booking
    completeBooking: (state, action) => {
      const { bookingId, notes } = action.payload;
      const booking = state.allBookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'Completed';
        if (notes) booking.completionNotes = notes;
        applyFilters(state);
        calculateStats(state);
      }
    },

    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },

    resetFilters: (state) => {
      state.filters = {
        status: 'All',
        serviceType: 'All',
        date: null,
      };
      applyFilters(state);
    },

    setSelectedBooking: (state, action) => {
      state.selectedBooking = action.payload;
    },

    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

const applyFilters = (state) => {
  let filtered = [...state.allBookings];

  if (state.filters.status !== 'All') {
    filtered = filtered.filter(booking => booking.status === state.filters.status);
  }

  if (state.filters.serviceType !== 'All') {
    filtered = filtered.filter(booking => booking.service.type === state.filters.serviceType);
  }

  if (state.filters.date) {
    const today = new Date().toISOString().split('T')[0];
    if (state.filters.date === 'today') {
      filtered = filtered.filter(booking => booking.timing.date === today);
    } else if (state.filters.date === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(booking => new Date(booking.timing.date) >= weekAgo);
    } else {
      filtered = filtered.filter(booking => booking.timing.date === state.filters.date);
    }
  }

  state.filteredBookings = filtered;
};

const calculateStats = (state) => {
  const bookings = state.allBookings;
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  state.stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'Pending').length,
    acceptedBookings: bookings.filter(b => b.status === 'Accepted').length,
    completedBookings: bookings.filter(b => b.status === 'Completed').length,
    todayBookings: bookings.filter(b => 
      b.timing.date === today && 
      (b.status === 'Accepted' || b.status === 'In Progress')
    ).length,
    weeklyEarnings: bookings
      .filter(b => 
        b.status === 'Completed' && 
        new Date(b.timing.date) >= weekAgo
      )
      .reduce((sum, b) => sum + b.service.price, 0),
  };
};

export const {
  initializeBookings,
  addBooking,
  updateBookingStatus,
  acceptBooking,
  declineBooking,
  startSession,
  completeBooking,
  setFilter,
  resetFilters,
  setSelectedBooking,
  clearSelectedBooking,
  setLoading,
  setError,
  clearError,
} = bookingSlice.actions;

export default bookingSlice.reducer;

export const selectAllBookings = (state) => state.bookings.allBookings;
export const selectFilteredBookings = (state) => state.bookings.filteredBookings;
export const selectSelectedBooking = (state) => state.bookings.selectedBooking;
export const selectBookingFilters = (state) => state.bookings.filters;
export const selectBookingStats = (state) => state.bookings.stats;
export const selectBookingLoading = (state) => state.bookings.loading;
export const selectBookingError = (state) => state.bookings.error;