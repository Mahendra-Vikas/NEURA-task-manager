import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui'
import { Badge } from '../ui'
import { itemVariants, containerVariants } from '../../animations/variants'
import { useTasks } from '../../hooks/useTasks'

const RecentActivity = () => {
  const { tasks } = useTasks()

  // Get the 4 most recent tasks
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)

  // Get badge variant based on status
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Complete':
        return 'success'
      case 'In Progress':
        return 'warning'
      case 'Planned':
        return 'info'
      default:
        return 'info'
    }
  }

  // Format relative time
  const getRelativeTime = (date) => {
    const now = new Date()
    const taskDate = new Date(date)
    const diffMs = now - taskDate
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return taskDate.toLocaleDateString()
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Recent Tasks
      </h2>

      {recentTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No tasks yet. Create your first task to get started!
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {recentTasks.map((task) => (
            <motion.div
              key={task._id}
              variants={itemVariants}
              className="flex items-start justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-brand-teal/20"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                  {task.description || 'No description'}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                <Badge variant={getStatusBadgeVariant(task.status)}>
                  {task.status}
                </Badge>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {getRelativeTime(task.createdAt)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Card>
  )
}

export default RecentActivity
