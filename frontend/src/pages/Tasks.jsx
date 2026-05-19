import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useTasks } from '../hooks/useTasks'
import { useToast } from '../hooks/useToast'
import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/dashboard/Sidebar'
import { TaskStats, TaskList, TaskModal } from '../components/tasks'
import DeleteConfirmModal from '../components/tasks/DeleteConfirmModal'
import { Button } from '../components/ui'
import { containerVariants, itemVariants } from '../animations/variants'

const Tasks = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const { user } = useAuth()
  const { tasks, stats, loading, createTask, updateTask, updateTaskStatus, deleteTask } = useTasks()
  const { showError, showSuccess } = useToast()

  const handleCreateTask = async (formData) => {
    try {
      setIsSubmitting(true)
      if (editingTask) {
        await updateTask(editingTask._id, formData)
        showSuccess('Task updated successfully!')
      } else {
        await createTask(formData)
        showSuccess('Task created successfully!')
      }
      setModalOpen(false)
      setEditingTask(null)
    } catch (err) {
      showError(err.message || 'Failed to save task')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status)
      showSuccess(`Task moved to ${status}`)
    } catch (err) {
      showError('Failed to update task status')
    }
  }

  const handleDeleteClick = (task) => {
    setTaskToDelete(task)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!taskToDelete) return
    
    try {
      setIsDeleting(true)
      await deleteTask(taskToDelete._id)
      showSuccess('Task deleted successfully')
      setDeleteModalOpen(false)
      setTaskToDelete(null)
    } catch (err) {
      showError('Failed to delete task')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

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
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Tasks 📋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your daily tasks and track your progress
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingTask(null)
                  setModalOpen(true)
                }}
                className="flex items-center gap-2"
              >
                <Plus size={20} />
                <span>New Task</span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mb-8">
              <TaskStats stats={stats} />
            </motion.div>

            {/* Task List */}
            <motion.div variants={itemVariants}>
              <TaskList
                tasks={tasks}
                loading={loading}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteClick}
                onEdit={handleEditTask}
                onTaskClick={handleEditTask}
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateTask}
        task={editingTask}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setTaskToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default Tasks
