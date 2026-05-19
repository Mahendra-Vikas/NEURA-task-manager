import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error('Failed to parse user:', err)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', data.token)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Google Login function using Firebase
  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)

      // Open Google popup and get user credentials
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user

      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken()

      // Send token to backend for JWT generation
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleId: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          idToken: idToken // Send Firebase ID token for verification
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Google authentication failed')
      }

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', data.token)

      return data
    } catch (err) {
      console.error('Google login error:', err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar
      }

      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', data.token)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
