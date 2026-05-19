import express from 'express'
import { signup, login, getCurrentUser, logout, googleAuth } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/google', googleAuth)
router.get('/me', authenticateToken, getCurrentUser)
router.post('/logout', logout)

export default router
