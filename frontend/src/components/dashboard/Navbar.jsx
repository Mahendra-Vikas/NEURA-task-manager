import React from 'react'
import { motion } from 'framer-motion'
import { Menu, Sun, Moon, Bell, User } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const Navbar = ({ onMenuToggle }) => {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:hidden transition-colors"
          >
            <Menu size={24} className="text-gray-900 dark:text-gray-200" />
          </motion.button>

          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-teal to-brand-purple bg-clip-text text-transparent">
                NEURA
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Task Manager</p>
            </div>
            <div className="sm:hidden text-2xl font-bold bg-gradient-to-r from-brand-teal to-brand-purple bg-clip-text text-transparent">
              NEURA
            </div>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
          >
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-teal rounded-full" />
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isDark ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-blue-500" />
            )}
          </motion.button>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
