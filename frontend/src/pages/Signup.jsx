import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Button, Input, Card } from '../components/ui'
import { validateEmail, validatePassword, validateName } from '../utils/helpers'

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { showError, showSuccess } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)
      await signup(formData.name, formData.email, formData.password)
      showSuccess('Account created successfully!')
      navigate('/dashboard')
    } catch (err) {
      showError(err.message || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-brand flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white dark:bg-gray-900">
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-teal to-brand-purple bg-clip-text text-transparent mb-1">
                NEURA
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Task Manager</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-4">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join our SaaS platform today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              containerClass="mb-4"
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              containerClass="mb-4"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              containerClass="mb-4"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              containerClass="mb-6"
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-teal hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Signup
