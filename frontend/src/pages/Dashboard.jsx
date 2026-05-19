import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import StatsGrid from '../components/dashboard/StatsGrid'
import RecentActivity from '../components/dashboard/RecentActivity'
import { TaskStats } from '../components/tasks'
import { Card } from '../components/ui'
import { containerVariants, itemVariants } from '../animations/variants'
import { ArrowRight } from 'lucide-react'

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { stats } = useTasks()

  return (
    <div className="min-h-screen bg-brand-lightGray dark:bg-brand-charcoal">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="fixed top-16 left-0 right-0 bottom-0 overflow-y-auto md:left-64 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your tasks today
              </p>
            </motion.div>

            {/* Task Stats */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Task Overview
                </h2>
              </div>
              <TaskStats stats={stats} />
            </motion.div>

            {/* Main Content Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity - Takes 2 columns */}
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>

              {/* Quick Actions */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Quick Actions
                </h2>

                <div className="space-y-4">
                  <Link to="/tasks" className="group">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-brand-purple/10 to-brand-teal/10 hover:from-brand-purple/20 hover:to-brand-teal/20 transition-all border border-brand-purple/30 hover:border-brand-purple/50">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">
                          View Tasks
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Manage your to-do list
                        </p>
                      </div>
                      <ArrowRight className="text-brand-purple group-hover:translate-x-1 transition-transform" size={20} />
                    </div>
                  </Link>

                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-gray-600 dark:text-gray-400">Tasks Completed</span>
                    <span className="font-bold text-brand-teal text-lg">{stats.complete || 0}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-gray-600 dark:text-gray-400">In Progress</span>
                    <span className="font-bold text-brand-orange text-lg">{stats.inProgress || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Planned</span>
                    <span className="font-bold text-blue-400 text-lg">{stats.planned || 0}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
