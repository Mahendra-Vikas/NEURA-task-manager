import express from 'express'
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Task routes
router.post('/', createTask)                      // Create task
router.get('/', getTasks)                         // Get all tasks
router.get('/stats', getTaskStats)                // Get task statistics
router.get('/:id', getTaskById)                   // Get task by ID
router.patch('/:id', updateTask)                  // Update task
router.patch('/:id/status', updateTaskStatus)     // Update task status
router.delete('/:id', deleteTask)                 // Delete task

export default router
