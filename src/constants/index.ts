export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'authToken',
  THEME: 'theme',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/oauth/token',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  ATTENDANCE: {
    CHECK_IN: '/attendance/check-in',
    CHECK_OUT: '/attendance/check-out',
    TODAY: '/attendance/today',
    HISTORY: '/attendance/history',
    STATS: '/attendance/stats',
    BY_ID: (id: string) => `/attendance/${id}`,
  },
} as const;

export const OFFICE_LOCATION = {
  latitude: 40.7128,
  longitude: -74.006,
  radius: 100, // meters
} as const;

export const WORKING_HOURS = {
  START: '09:00',
  END: '17:00',
} as const;

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;
