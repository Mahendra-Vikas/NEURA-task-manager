import React from 'react'
import { motion } from 'framer-motion'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-brand-teal text-white hover:bg-brand-teal/80 focus:ring-brand-teal',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600',
    ghost: 'bg-transparent text-brand-teal hover:bg-brand-teal/10',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        (isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}

export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={`rounded-lg p-6 transition-smooth bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-md ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const Input = ({
  label,
  error,
  containerClass = '',
  ...props
}) => {
  return (
    <div className={containerClass}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-smooth focus:outline-none focus:ring-2 focus:ring-brand-teal ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-brand-teal/10 text-brand-teal',
    success: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    warning: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    info: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    purple: 'bg-brand-purple/10 text-brand-purple'
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizes[size]} border-3 border-brand-teal border-t-transparent rounded-full animate-spin ${className}`} />
  )
}
