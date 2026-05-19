import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, Zap } from 'lucide-react'
import { Card } from '../ui'
import { itemVariants } from '../../animations/variants'

const StatCard = ({ icon: Icon, label, value, change, delay = 0 }) => {
  const isPositive = change >= 0

  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay }}
    >
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-brand/20 flex items-center justify-center">
            <Icon className="text-brand-teal" size={24} />
          </div>
          <span className={`text-sm font-semibold ${isPositive ? 'text-brand-green' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </Card>
    </motion.div>
  )
}

const StatsGrid = () => {
  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '1,234',
      change: 12.5
    },
    {
      icon: Activity,
      label: 'Active Sessions',
      value: '456',
      change: 8.2
    },
    {
      icon: Zap,
      label: 'Performance',
      value: '98.5%',
      change: 3.1
    },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: '24.5%',
      change: 15.3
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} delay={index * 0.1} />
      ))}
    </div>
  )
}

export default StatsGrid
