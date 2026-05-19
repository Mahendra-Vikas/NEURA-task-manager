import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import TaskCard from './TaskCard'
import { containerVariants } from '../../animations/variants'

const TaskList = ({ tasks = [], loading = false, onStatusChange, onDelete, onEdit, onTaskClick }) => {
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const statuses = ['All', 'Planned', 'In Progress', 'Complete']

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'All' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-teal transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                filter === status
                  ? 'bg-brand-teal text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 space-y-3"
              >
                <div className="h-6 bg-white/5 rounded animate-pulse" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-3/4" />
                <div className="h-12 bg-white/5 rounded animate-pulse" />
                <div className="h-4 bg-white/5 rounded animate-pulse w-1/2" />
              </motion.div>
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={(status) => onStatusChange(task._id, status)}
                  onDelete={() => onDelete(task)}
                  onEdit={() => onEdit(task)}
                  onClick={() => onTaskClick(task)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks yet</h3>
            <p className="text-gray-500 text-center max-w-xs">
              {searchTerm || filter !== 'All'
                ? `No tasks match your ${searchTerm ? 'search' : 'filter'} criteria. Try adjusting your filters.`
                : 'Create your first task to get started and stay organized!'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TaskList
