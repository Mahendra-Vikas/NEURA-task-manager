import Task from '../models/Task.js'
import mongoose from 'mongoose'

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body
    const userId = req.user.id

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const task = new Task({
      userId,
      title,
      description,
      dueDate,
      priority: priority || 'Medium'
    })

    await task.save()

    res.status(201).json({
      message: 'Task created successfully',
      task
    })
  } catch (error) {
    console.error('Create task error:', error)
    res.status(500).json({ message: 'Error creating task', error: error.message })
  }
}

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id
    const { status, sortBy = '-createdAt' } = req.query

    let query = { userId }
    if (status) {
      query.status = status
    }

    const tasks = await Task.find(query).sort(sortBy).lean()

    res.json({
      message: 'Tasks fetched successfully',
      tasks,
      total: tasks.length
    })
  } catch (error) {
    console.error('Get tasks error:', error)
    res.status(500).json({ message: 'Error fetching tasks', error: error.message })
  }
}

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const task = await Task.findOne({ _id: id, userId })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({
      message: 'Task fetched successfully',
      task
    })
  } catch (error) {
    console.error('Get task error:', error)
    res.status(500).json({ message: 'Error fetching task', error: error.message })
  }
}

// Update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const updates = req.body

    // Allow only specific fields to be updated
    const allowedUpdates = ['title', 'description', 'status', 'priority', 'dueDate']
    const actualUpdates = {}

    allowedUpdates.forEach(field => {
      if (field in updates) {
        actualUpdates[field] = updates[field]
      }
    })

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { ...actualUpdates, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({
      message: 'Task updated successfully',
      task
    })
  } catch (error) {
    console.error('Update task error:', error)
    res.status(500).json({ message: 'Error updating task', error: error.message })
  }
}

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const userId = req.user.id

    if (!['Planned', 'In Progress', 'Complete'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      { status, updatedAt: new Date() },
      { new: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({
      message: 'Task status updated successfully',
      task
    })
  } catch (error) {
    console.error('Update status error:', error)
    res.status(500).json({ message: 'Error updating task status', error: error.message })
  }
}

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const task = await Task.findOneAndDelete({ _id: id, userId })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({
      message: 'Task deleted successfully',
      task
    })
  } catch (error) {
    console.error('Delete task error:', error)
    res.status(500).json({ message: 'Error deleting task', error: error.message })
  }
}

// Get task statistics
export const getTaskStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id)

    const stats = await Task.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const formattedStats = {
      planned: 0,
      inProgress: 0,
      complete: 0,
      total: 0
    }

    stats.forEach(stat => {
      if (stat._id === 'Planned') formattedStats.planned = stat.count
      if (stat._id === 'In Progress') formattedStats.inProgress = stat.count
      if (stat._id === 'Complete') formattedStats.complete = stat.count
      formattedStats.total += stat.count
    })

    res.json({
      message: 'Task statistics fetched successfully',
      stats: formattedStats
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Error fetching statistics', error: error.message })
  }
}
