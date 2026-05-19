// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateName = (name) => {
  return name.trim().length >= 2
}

// Error response helper
export const errorResponse = (res, status, message) => {
  return res.status(status).json({ message })
}

// Success response helper
export const successResponse = (res, data, message = 'Success') => {
  return res.json({ message, ...data })
}
