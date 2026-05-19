import apiClient from './api'

export const authAPI = {
  // Sign up new user
  signup: (data) => apiClient.post('/auth/signup', data),

  // Login user
  login: (data) => apiClient.post('/auth/login', data),

  // Google login
  googleLogin: (data) => apiClient.post('/auth/google', data),

  // Get current user
  getCurrentUser: () => apiClient.get('/auth/me'),

  // Logout user
  logout: () => apiClient.post('/auth/logout')
}

export const userAPI = {
  // Get user profile
  getProfile: () => apiClient.get('/users/profile'),

  // Update user profile
  updateProfile: (data) => apiClient.put('/users/profile', data),

  // Change password
  changePassword: (data) => apiClient.post('/users/change-password', data)
}

export const dashboardAPI = {
  // Get dashboard stats
  getStats: () => apiClient.get('/dashboard/stats'),

  // Get recent activity
  getRecentActivity: () => apiClient.get('/dashboard/activity')
}

export const taskAPI = {
  // Create task
  createTask: (data) => apiClient.post('/tasks', data),

  // Get all tasks
  getTasks: (params) => apiClient.get('/tasks', { params }),

  // Get task by ID
  getTaskById: (id) => apiClient.get(`/tasks/${id}`),

  // Update task
  updateTask: (id, data) => apiClient.patch(`/tasks/${id}`, data),

  // Update task status
  updateTaskStatus: (id, status) => apiClient.patch(`/tasks/${id}/status`, { status }),

  // Delete task
  deleteTask: (id) => apiClient.delete(`/tasks/${id}`),

  // Get task statistics
  getTaskStats: () => apiClient.get('/tasks/stats')
}
