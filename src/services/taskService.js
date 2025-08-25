import apiService from './api';

export const taskService = {
  // Get all tasks
  getTasks: () => apiService.get('/tasks'),
  
  // Get task by ID
  getTask: (id) => apiService.get(`/tasks/${id}`),
  
  // Create new task
  createTask: (taskData) => apiService.post('/tasks', taskData),
  
  // Update task
  updateTask: (id, updateData) => apiService.put(`/tasks/${id}`, updateData),
  
  // Delete task
  deleteTask: (id) => apiService.delete(`/tasks/${id}`),
  
  // Toggle task completion
  toggleTaskComplete: (id) => apiService.put(`/tasks/${id}/toggle`),
  
  // Get tasks by status
  getTasksByStatus: (status) => apiService.get(`/tasks?status=${status}`),
  
  // Get upcoming tasks
  getUpcomingTasks: () => apiService.get('/tasks/upcoming'),
  
  // Get overdue tasks
  getOverdueTasks: () => apiService.get('/tasks/overdue'),
};
