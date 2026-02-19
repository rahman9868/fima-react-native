export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'admin';
  avatar?: string;
  phone?: string;
  department?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: 'present' | 'absent' | 'late';
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  notes?: string;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}

export interface LoginRequest {
  username: string;
  password: string;
  grant_type: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CheckInRequest {
  latitude: number;
  longitude: number;
  notes?: string;
}

export interface CheckOutRequest {
  latitude: number;
  longitude: number;
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}
