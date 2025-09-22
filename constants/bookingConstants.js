import { COLORS } from './colors';

export const BOOKING_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  DECLINED: 'Declined',
};

export const SERVICE_TYPES = {
  RUN_SESSION: 'Run Session',
  GROOMING: 'Grooming',
  HEALTH_CHECK: 'Health Check',
  VET_VISIT: 'Vet Visit',
  DOG_WALKING: 'Dog Walking',
};

export const FILTER_OPTIONS = {
  STATUS: [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: BOOKING_STATUS.PENDING },
    { label: 'Accepted', value: BOOKING_STATUS.ACCEPTED },
    { label: 'In Progress', value: BOOKING_STATUS.IN_PROGRESS },
    { label: 'Completed', value: BOOKING_STATUS.COMPLETED },
    { label: 'Cancelled', value: BOOKING_STATUS.CANCELLED },
  ],
  SERVICE_TYPE: [
    { label: 'All', value: 'All' },
    { label: 'Run Session', value: SERVICE_TYPES.RUN_SESSION },
    { label: 'Grooming', value: SERVICE_TYPES.GROOMING },
    { label: 'Health Check', value: SERVICE_TYPES.HEALTH_CHECK },
    { label: 'Vet Visit', value: SERVICE_TYPES.VET_VISIT },
    { label: 'Dog Walking', value: SERVICE_TYPES.DOG_WALKING },
  ],
};

export const EARNINGS_FILTER_OPTIONS = {
  SERVICE_TYPE: [
    { label: 'All', value: 'All' },
    { label: 'Run Session', value: SERVICE_TYPES.RUN_SESSION },
    { label: 'Grooming', value: SERVICE_TYPES.GROOMING },
    { label: 'Health Check', value: SERVICE_TYPES.HEALTH_CHECK },
    { label: 'Vet Visit', value: SERVICE_TYPES.VET_VISIT },
    { label: 'Dog Walking', value: SERVICE_TYPES.DOG_WALKING },
  ],
  DATE_RANGE: [
    { label: 'All Time', value: null },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Last 3 Months', value: 'quarter' },
    { label: 'This Year', value: 'year' },
  ],
  AMOUNT_RANGE: [
    { label: 'All', value: 'All' },
    { label: 'Under $50', value: 'under_50' },
    { label: '$50 - $100', value: '50_100' },
    { label: '$100 - $200', value: '100_200' },
    { label: '$200 - $500', value: '200_500' },
    { label: 'Over $500', value: 'over_500' },
  ],
};

export const STATUS_COLORS = {
  [BOOKING_STATUS.PENDING]: {
    background: COLORS.warningLight,
    text: COLORS.warningDark,
    border: COLORS.warning,
  },
  [BOOKING_STATUS.ACCEPTED]: {
    background: COLORS.successLight,
    text: COLORS.successDark,
    border: COLORS.success,
  },
  [BOOKING_STATUS.IN_PROGRESS]: {
    background: COLORS.infoLight,
    text: COLORS.infoDark,
    border: COLORS.info,
  },
  [BOOKING_STATUS.COMPLETED]: {
    background: COLORS.successLight,
    text: COLORS.successDark,
    border: COLORS.success,
  },
  [BOOKING_STATUS.CANCELLED]: {
    background: COLORS.errorLight,
    text: COLORS.errorDark,
    border: COLORS.error,
  },
  [BOOKING_STATUS.DECLINED]: {
    background: COLORS.border,
    text: COLORS.textSecondary,
    border: COLORS.divider,
  },
};

export const SERVICE_ICONS = {
  [SERVICE_TYPES.RUN_SESSION]: 'run',
  [SERVICE_TYPES.GROOMING]: 'content-cut',
  [SERVICE_TYPES.HEALTH_CHECK]: 'medical-bag',
  [SERVICE_TYPES.VET_VISIT]: 'hospital',
  [SERVICE_TYPES.DOG_WALKING]: 'walk',
};

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

export const SERVICE_AREAS = [
  'Gulberg-III',
  'Gulberg-IV',
  'Askari-II',
  'Askari-IV',
  'Model Town',
  'Johar Town',
  'Wapda Town',
  'Bahria Town',
  'DHA Phase-II',
  'DHA Phase-III',
];

export const MOCK_BOOKINGS = [
  {
    id: 'booking_001',
    customer: {
      name: 'John Doe',
      phone: '+92 321 444 5656',
      email: 'john.doe@example.com',
    },
    pet: {
      name: 'Bella',
      breed: 'Golden Retriever',
      age: 3,
      weight: '25kg',
      specialNeeds: 'None',
      notes: 'Loves treats, very friendly',
    },
    service: {
      type: SERVICE_TYPES.RUN_SESSION,
      duration: 30,
      price: 1000,
      description: '30-minute running session with mobile gym',
    },
    location: {
      address: '29-A DHA Phase-2, Lahore, Pakistan',
      coordinates: { lat: 31.5204, lng: 74.3587 },
      area: 'DHA Phase-II',
      specialInstructions: 'Ring doorbell twice, dog will bark but is friendly',
    },
    timing: {
      date: '2024-11-14',
      time: '12:00 PM',
      timeSlot: '12:00 PM',
      estimatedDuration: 30,
    },
    status: BOOKING_STATUS.PENDING,
    specialInstructions: 'Dog loves treats, bring some if possible',
    createdAt: '2024-11-13T10:00:00Z',
    servicemanId: null,
    priority: 'Normal',
  },
  {
    id: 'booking_002',
    customer: {
      name: 'Sarah Ahmed',
      phone: '+92 300 123 4567',
      email: 'sarah.ahmed@example.com',
    },
    pet: {
      name: 'Max',
      breed: 'German Shepherd',
      age: 5,
      weight: '30kg',
      specialNeeds: 'Hip issues - gentle exercise only',
      notes: 'Very energetic but needs careful handling',
    },
    service: {
      type: SERVICE_TYPES.GROOMING,
      duration: 60,
      price: 1500,
      description: 'Full grooming service including bath, trim, and nail clipping',
    },
    location: {
      address: '45 Model Town, Lahore, Pakistan',
      coordinates: { lat: 31.5204, lng: 74.3587 },
      area: 'Model Town',
      specialInstructions: 'Park in front of house, use side gate',
    },
    timing: {
      date: '2024-11-14',
      time: '02:00 PM',
      timeSlot: '02:00 PM',
      estimatedDuration: 60,
    },
    status: BOOKING_STATUS.ACCEPTED,
    specialInstructions: 'Please be gentle with Max, he has hip issues',
    createdAt: '2024-11-13T08:30:00Z',
    servicemanId: 'serviceman_001',
    acceptedAt: '2024-11-13T09:15:00Z',
    priority: 'High',
  },
  {
    id: 'booking_003',
    customer: {
      name: 'Ahmed Khan',
      phone: '+92 333 987 6543',
      email: 'ahmed.khan@example.com',
    },
    pet: {
      name: 'Charlie',
      breed: 'Labrador',
      age: 2,
      weight: '22kg',
      specialNeeds: 'None',
      notes: 'Very playful, loves water',
    },
    service: {
      type: SERVICE_TYPES.RUN_SESSION,
      duration: 30,
      price: 1000,
      description: '30-minute running session with mobile gym',
    },
    location: {
      address: '78 Johar Town, Lahore, Pakistan',
      coordinates: { lat: 31.5204, lng: 74.3587 },
      area: 'Johar Town',
      specialInstructions: 'Call when you arrive, will come out to meet you',
    },
    timing: {
      date: '2024-11-14',
      time: '04:00 PM',
      timeSlot: '04:00 PM',
      estimatedDuration: 30,
    },
    status: BOOKING_STATUS.COMPLETED,
    specialInstructions: 'Charlie loves water, bring a water bowl',
    createdAt: '2024-11-12T14:20:00Z',
    servicemanId: 'serviceman_001',
    acceptedAt: '2024-11-12T15:00:00Z',
    completedAt: '2024-11-14T16:30:00Z',
    completionNotes: 'Great session! Charlie was very energetic and enjoyed the workout.',
    priority: 'Normal',
  },
];

export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || STATUS_COLORS[BOOKING_STATUS.PENDING];
};

export const getServiceIcon = (serviceType) => {
  return SERVICE_ICONS[serviceType] || 'paw';
};

export const formatPrice = (price) => {
  return `PKR ${price.toLocaleString()}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeString) => {
  return timeString;
};

export const getTimeUntilBooking = (dateString, timeString) => {
  const bookingDateTime = new Date(`${dateString}T${timeString}`);
  const now = new Date();
  const diffMs = bookingDateTime - now;
  
  if (diffMs < 0) return 'Overdue';
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 24) {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} away`;
  } else if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m away`;
  } else {
    return `${diffMinutes}m away`;
  }
};
