import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/database.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

import errorHandler from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// =========================
// CORS Configuration
// =========================
const allowedOrigins = [
  'http://localhost:5173',
  'https://neura-task-manager.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Handle Preflight Requests
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// =========================
// Middleware
// =========================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// =========================
// Database Connection
// =========================
connectDB()

// =========================
// API Routes
// =========================
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/tasks', taskRoutes)

// =========================
// Health Check
// =========================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  })
})

// =========================
// 404 Route Handler
// =========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// =========================
// Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

// Optional Custom Middleware
app.use(errorHandler)

// =========================
// Start Server
// =========================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})

export default app
