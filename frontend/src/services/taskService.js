import { taskAPI } from './endpoints'

export const taskService = {
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await taskAPI.createTask(taskData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Fetch all tasks
  fetchTasks: async (filters = {}) => {
    try {
      const response = await taskAPI.getTasks(filters)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Fetch single task
  fetchTaskById: async (id) => {
    try {
      const response = await taskAPI.getTaskById(id)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update task
  updateTask: async (id, taskData) => {
    try {
      const response = await taskAPI.updateTask(id, taskData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update task status
  updateTaskStatus: async (id, status) => {
    try {
      const response = await taskAPI.updateTaskStatus(id, status)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Delete task
  deleteTask: async (id) => {
    try {
      const response = await taskAPI.deleteTask(id)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get task statistics
  fetchTaskStats: async () => {
    try {
      const response = await taskAPI.getTaskStats()
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}
