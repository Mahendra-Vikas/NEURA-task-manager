import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'sonner'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

// Components
import AIVoiceAssistant from './components/floating/AIVoiceAssistant'
import FloatingDoubts from './components/floating/FloatingDoubts'
import ErrorBoundary from './components/ErrorBoundary'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="bg-white dark:bg-brand-charcoal text-gray-900 dark:text-gray-100 transition-colors duration-300">
              {/* Floating Components - Always visible */}
              <AIVoiceAssistant />
              <FloatingDoubts />

              {/* Toast Notifications */}
              <Toaster position="top-right" />

              {/* Routes */}
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/dashboard/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
