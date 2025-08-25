import apiService from './api';

export const authService = {
  // Login user
  login: (credentials) => apiService.post('/auth/login', credentials),
  
  // Register user
  register: (userData) => apiService.post('/auth/register', userData),
  
  // Logout user
  logout: () => apiService.post('/auth/logout'),
  
  // Refresh token
  refreshToken: () => apiService.post('/auth/refresh'),
  
  // Validate token
  validateToken: () => apiService.get('/auth/validate'),
  
  // Get current user
  getCurrentUser: () => apiService.get('/auth/me'),
  
  // Update user profile
  updateProfile: (updateData) => apiService.put('/auth/profile', updateData),
  
  // Request password reset
  forgotPassword: (email) => apiService.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, newPassword) => 
    apiService.post('/auth/reset-password', { token, password: newPassword }),
};
