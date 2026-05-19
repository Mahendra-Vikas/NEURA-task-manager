import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { Button } from '../ui'

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle, isLoading }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative w-full sm:max-w-sm bg-gray-900 border border-red-500/20 rounded-t-2xl sm:rounded-2xl p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Delete Task?</h2>
              </div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            {/* Message */}
            <div className="space-y-2 py-2">
              <p className="text-gray-300">
                Are you sure you want to delete this task?
              </p>
              {taskTitle && (
                <p className="text-sm text-gray-400 line-clamp-2">
                  <span className="font-semibold">"{taskTitle}"</span>
                </p>
              )}
              <p className="text-xs text-gray-500 pt-2">
                This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 bg-white/10 hover:bg-white/20 disabled:opacity-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={onConfirm}
                isLoading={isLoading}
                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default DeleteConfirmModal
