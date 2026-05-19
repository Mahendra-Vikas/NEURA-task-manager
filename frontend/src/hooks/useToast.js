import { useState } from 'react'
import { Toaster, toast } from 'sonner'

export const useToast = () => {
  const showSuccess = (message) => toast.success(message)
  const showError = (message) => toast.error(message)
  const showLoading = (message) => toast.loading(message)
  const showInfo = (message) => toast.info(message)

  return { showSuccess, showError, showLoading, showInfo, Toaster }
}
