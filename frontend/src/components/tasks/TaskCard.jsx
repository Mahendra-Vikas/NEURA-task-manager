import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, Edit2, Trash2 } from 'lucide-react'

const TaskCard = ({ task, onStatusChange, onDelete, onEdit, onClick }) => {
  const statusConfig = {
    'Planned': { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-600 dark:text-blue-400', icon: Circle },
    'In Progress': { bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400', icon: Clock },
    'Complete': { bg: 'bg-green-100 dark:bg-green-500/20', text: 'text-green-600 dark:text-green-400', icon: CheckCircle2 }
  }

  const config = statusConfig[task.status] || statusConfig['Planned']
  const IconComponent = config.icon

  const getNextStatus = () => {
    const statusOrder = ['Planned', 'In Progress', 'Complete']
    const currentIndex = statusOrder.indexOf(task.status)
    return statusOrder[(currentIndex + 1) % statusOrder.length]
  }

  const priorityColors = {
    'Low': 'text-blue-600 dark:text-blue-400',
    'Medium': 'text-yellow-600 dark:text-yellow-400',
    'High': 'text-red-600 dark:text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -2 }}
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-gray-900 dark:text-white font-semibold text-lg flex-1 line-clamp-2 group-hover:text-brand-teal transition-colors">
            {task.title}
          </h3>
          <div className={`${config.bg} px-3 py-1 rounded-full flex items-center gap-2 flex-shrink-0`}>
            <IconComponent size={14} className={config.text} />
            <span className={`text-xs font-semibold ${config.text}`}>
              {task.status}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.priority && (
              <span className={`text-xs font-semibold ${priorityColors[task.priority] || 'text-gray-500 dark:text-gray-400'}`}>
                {task.priority}
              </span>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onStatusChange(getNextStatus())
              }}
              className="text-xs px-2 py-1 bg-orange-100 dark:bg-brand-orange/20 text-orange-600 dark:text-brand-orange hover:bg-orange-200 dark:hover:bg-brand-orange/30 rounded transition-colors flex items-center gap-1"
              title="Move to next status"
            >
              <Clock size={12} />
              Next
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="text-xs px-2 py-1 bg-teal-100 dark:bg-brand-teal/20 text-teal-600 dark:text-brand-teal hover:bg-teal-200 dark:hover:bg-brand-teal/30 rounded transition-colors flex items-center gap-1"
              title="Edit task"
            >
              <Edit2 size={12} />
              Edit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="text-xs px-2 py-1 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-500/30 rounded transition-colors flex items-center gap-1"
              title="Delete task"
            >
              <Trash2 size={12} />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard
