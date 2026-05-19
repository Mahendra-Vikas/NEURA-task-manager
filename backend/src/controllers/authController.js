import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' })
}

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Create new user
    const user = new User({ name, email, password, authProvider: 'email' })
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check password
    if (!user.password) {
      return res.status(401).json({ message: 'Please use Google login for this account' })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (error) {
    next(error)
  }
}

// Google OAuth callback
export const googleAuth = async (req, res, next) => {
  try {
    const { googleId, name, email, avatar } = req.body

    if (!googleId || !email) {
      return res.status(400).json({ message: 'Invalid Google authentication data' })
    }

    // Find or create user
    let user = await User.findOne({ email })

    if (!user) {
      // Create new user from Google data
      user = new User({
        name,
        email,
        googleId,
        avatar,
        authProvider: 'google'
      })
      await user.save()
    } else {
      // Update existing user with Google info if needed
      if (!user.googleId) {
        user.googleId = googleId
        user.authProvider = 'google'
      }
      if (avatar && !user.avatar) {
        user.avatar = avatar
      }
      await user.save()
    }

    // Generate token
    const token = generateToken(user._id)

    res.json({
      message: 'Google authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    })
  } catch (error) {
    next(error)
  }
}

export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' })
}
