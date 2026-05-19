import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Circle, Zap } from 'lucide-react'
import { Card } from '../ui'
import { itemVariants } from '../../animations/variants'

const TaskStats = ({ stats = {} }) => {
  const statsData = [
    {
      label: 'Total Tasks',
      value: stats.total || 0,
      icon: Zap,
      color: 'brand-purple'
    },
    {
      label: 'Planned',
      value: stats.planned || 0,
      icon: Circle,
      color: 'blue'
    },
    {
      label: 'In Progress',
      value: stats.inProgress || 0,
      icon: Clock,
      color: 'brand-orange'
    },
    {
      label: 'Completed',
      value: stats.complete || 0,
      icon: CheckCircle2,
      color: 'green'
    }
  ]

  const getColorClass = (color) => {
    const colors = {
      'brand-purple': 'text-brand-purple dark:text-brand-purple bg-brand-purple/10 dark:bg-brand-purple/20',
      'blue': 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10',
      'brand-orange': 'text-brand-orange dark:text-brand-orange bg-brand-orange/10 dark:bg-brand-orange/20',
      'green': 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/10'
    }
    return colors[color] || colors['brand-purple']
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon
        const colorClass = getColorClass(stat.color)
        
        return (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="group"
          >
            <Card className="p-4 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`${colorClass} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TaskStats
