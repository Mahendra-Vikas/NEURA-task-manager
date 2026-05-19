import { useState, useEffect, useCallback } from 'react'
import { taskService } from '../services/taskService'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({
    planned: 0,
    inProgress: 0,
    complete: 0,
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch all tasks
  const fetchTasks = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.fetchTasks(filters)
      setTasks(data.tasks || [])
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks')
      console.error('Fetch tasks error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch task stats
  const fetchStats = useCallback(async () => {
    try {
      const data = await taskService.fetchTaskStats()
      setStats(data.stats || {})
    } catch (err) {
      console.error('Fetch stats error:', err)
    }
  }, [])

  // Create task
  const createTask = useCallback(async (taskData) => {
    try {
      setError(null)
      const data = await taskService.createTask(taskData)
      setTasks(prev => [data.task, ...prev])
      await fetchStats()
      return data
    } catch (err) {
      setError(err.message || 'Failed to create task')
      throw err
    }
  }, [fetchStats])

  // Update task
  const updateTask = useCallback(async (id, taskData) => {
    try {
      setError(null)
      const data = await taskService.updateTask(id, taskData)
      setTasks(prev =>
        prev.map(task => (task._id === id ? data.task : task))
      )
      await fetchStats()
      return data
    } catch (err) {
      setError(err.message || 'Failed to update task')
      throw err
    }
  }, [fetchStats])

  // Update task status
  const updateTaskStatus = useCallback(async (id, status) => {
    try {
      setError(null)
      const data = await taskService.updateTaskStatus(id, status)
      setTasks(prev =>
        prev.map(task => (task._id === id ? data.task : task))
      )
      await fetchStats()
      return data
    } catch (err) {
      setError(err.message || 'Failed to update task status')
      throw err
    }
  }, [fetchStats])

  // Delete task
  const deleteTask = useCallback(async (id) => {
    try {
      setError(null)
      await taskService.deleteTask(id)
      setTasks(prev => prev.filter(task => task._id !== id))
      await fetchStats()
    } catch (err) {
      setError(err.message || 'Failed to delete task')
      throw err
    }
  }, [fetchStats])

  // Initial load
  useEffect(() => {
    fetchTasks()
    fetchStats()
  }, [fetchTasks, fetchStats])

  return {
    tasks,
    stats,
    loading,
    error,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    fetchTasks,
    fetchStats
  }
}
