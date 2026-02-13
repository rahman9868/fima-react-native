import {apiClient} from './api';
import {AttendanceRecord, AttendanceStats, CheckInRequest, CheckOutRequest} from '../types';

export const attendanceService = {
  async checkIn(request: CheckInRequest) {
    return apiClient.post<AttendanceRecord>('/attendance/check-in', request);
  },

  async checkOut(request: CheckOutRequest) {
    return apiClient.post<AttendanceRecord>('/attendance/check-out', request);
  },

  async getTodayAttendance() {
    return apiClient.get<AttendanceRecord>('/attendance/today');
  },

  async getAttendanceHistory(params?: {startDate?: string; endDate?: string; status?: string}) {
    return apiClient.get<AttendanceRecord[]>('/attendance/history', params);
  },

  async getAttendanceStats(month?: string) {
    return apiClient.get<AttendanceStats>('/attendance/stats', {month});
  },

  async getAttendanceById(id: string) {
    return apiClient.get<AttendanceRecord>(`/attendance/${id}`);
  },
};
