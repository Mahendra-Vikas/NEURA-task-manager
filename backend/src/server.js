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

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://neura-task-manager.vercel.app"
  ],
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to Database
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/tasks', taskRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error Handler
app.use(errorHandler)

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

export default app
