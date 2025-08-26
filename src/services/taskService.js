import apiService from './api';

export const taskService = {
  // Get all tasks
  getTasks: () => apiService.get('/tasks'),
  
  // Get task by ID (unused, no backend route)
  getTask: (id) => apiService.get(`/tasks/${id}`),
  
  // Create new task
  createTask: (taskData) => apiService.post('/add/tasks', taskData),
  
  // Update task
  updateTask: (id, updateData) => apiService.put(`/update/${id}`, updateData),
  
  // Delete task
  deleteTask: (id) => apiService.delete(`/delete/${id}`),
  
  // Toggle task completion
  toggleTaskComplete: (id, completed) => apiService.put(
    completed ? `/incomplete/${id}` : `/complete/${id}`
  ),
  
  // Get tasks by status (unused, no backend route)
  getTasksByStatus: (status) => apiService.get(`/tasks?status=${status}`),
  
  // Get upcoming tasks (unused, no backend route)
  getUpcomingTasks: () => apiService.get('/tasks/upcoming'),
  
  // Get overdue tasks (unused, no backend route)
  getOverdueTasks: () => apiService.get('/tasks/overdue'),
};