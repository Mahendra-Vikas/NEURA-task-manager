import express from 'express'
import { getStats, getRecentActivity } from '../controllers/dashboardController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/stats', authenticateToken, getStats)
router.get('/activity', authenticateToken, getRecentActivity)

export default router
