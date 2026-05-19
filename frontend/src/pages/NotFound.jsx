import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-brand flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>

        <Link to="/dashboard">
          <Button className="w-full">
            Go to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
