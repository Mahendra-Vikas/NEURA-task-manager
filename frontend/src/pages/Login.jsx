import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Button, Input, Card } from '../components/ui'
import { validateEmail, validatePassword } from '../utils/helpers'

const Login = () => {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
  const { showError, showSuccess } = useToast()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

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

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
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
      await login(formData.email, formData.password)
      showSuccess('Logged in successfully!')
      navigate('/dashboard')
    } catch (err) {
      showError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      await loginWithGoogle()
      showSuccess('Logged in with Google!')
      navigate('/dashboard')
    } catch (err) {
      showError(err.message || 'Google login failed')
    } finally {
      setIsGoogleLoading(false)
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
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          {/* Google Sign-In Button */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-6 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-400 border-t-brand-teal rounded-full animate-spin" />
                <span className="text-gray-900 dark:text-white font-medium">Signing in...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-gray-900 dark:text-white font-medium">Continue with Google</span>
              </>
            )}
          </motion.button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              containerClass="mb-6"
            />

            <div className="flex justify-end mb-6">
              <Link to="/forgot-password" className="text-sm text-brand-teal hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-teal hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )

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
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          {/* Google Sign-In Button */}
          <div className="mb-6">
            <div
              id="google_signin_button"
              className="flex justify-center"
              onLoad={() => {
                if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
                  window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleGoogleSuccess,
                    size: 'large',
                    width: '100%',
                    text: 'signin_with'
                  })
                  window.google.accounts.id.renderButton(
                    document.getElementById('google_signin_button'),
                    { theme: 'outline', size: 'large', width: '320' }
                  )
                }
              }}
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              containerClass="mb-6"
            />

            <div className="flex justify-end mb-6">
              <Link to="/forgot-password" className="text-sm text-brand-teal hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-teal hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Login
