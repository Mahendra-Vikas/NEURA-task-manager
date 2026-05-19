import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { sidebarVariants, backdropVariants } from '../../animations/variants'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const { logout } = useAuth()
  const { isDark } = useTheme()

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Tasks',
      href: '/tasks',
      icon: CheckSquare
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings
    }
  ]

  const isActive = (href) => location.pathname === href

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={{ x: '-100%' }}
        animate={isOpen ? { x: 0 } : { x: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white dark:bg-gray-800 z-40 md:relative md:top-0 md:h-screen md:translate-x-0 md:rounded-none border-r border-gray-200 dark:border-gray-700 overflow-y-auto"
      >
        <nav className="p-6 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-brand-teal text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {active && <ChevronRight size={16} className="ml-auto" />}
                </motion.div>
              </Link>
            )
          })}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <motion.button
              whileHover={{ x: 5 }}
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </motion.button>
          </div>
        </nav>
      </motion.aside>
    </>
  )
}

export default Sidebar
