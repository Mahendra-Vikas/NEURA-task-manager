// Loading skeleton component for better UX
import React from 'react'

export const SkeletonCard = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    </div>
  )
}

export const SkeletonLine = ({ className = '' }) => {
  return (
    <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}></div>
  )
}

export const SkeletonGrid = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <SkeletonCard key={i} />
        ))}
    </div>
  )
}
