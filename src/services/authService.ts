import {apiClient} from './api';
import {User, LoginRequest, RegisterRequest} from '../types';

export const authService = {
  async login(request: LoginRequest) {
    return apiClient.post<{user: User; token: string}>('/auth/login', request);
  },

  async register(request: RegisterRequest) {
    return apiClient.post<{user: User; token: string}>('/auth/register', request);
  },

  async logout() {
    return apiClient.post('/auth/logout');
  },

  async getCurrentUser() {
    return apiClient.get<User>('/auth/me');
  },

  async updateProfile(data: Partial<User>) {
    return apiClient.put<User>('/auth/profile', data);
  },

  async changePassword(oldPassword: string, newPassword: string) {
    return apiClient.post('/auth/change-password', {oldPassword, newPassword});
  },
};
