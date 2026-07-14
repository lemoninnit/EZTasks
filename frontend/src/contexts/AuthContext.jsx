import React, { createContext, useContext, useState, useEffect } from 'react'
import apiClient from '../lib/apiClient.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('ct_user')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUser(parsed)
      } catch {
        localStorage.removeItem('ct_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const userData = response.data
      // Backend returns { token, user: userDto }
      const formatted = {
        token: userData.token,
        userDto: userData.user || userData.userDto
      }
      localStorage.setItem('ct_user', JSON.stringify(formatted))
      setUser(formatted)
      return { success: true, data: formatted }
    } catch (error) {
      return { success: false, error: error.response?.data || 'Invalid credentials' }
    }
  }

  const register = async (name, email, password) => {
    try {
      await apiClient.post('/auth/register', { name, email, password })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('ct_user')
    setUser(null)
    window.location.href = '/login'
  }

  const updateUser = (userData) => {
    const current = JSON.parse(localStorage.getItem('ct_user') || '{}')
    const updated = { ...current, userDto: userData }
    localStorage.setItem('ct_user', JSON.stringify(updated))
    setUser(updated)
  }

  const isAuthenticated = !!user && !!user.token
  const isTeacher = user?.userDto?.role === 'teacher'
  const isStudent = user?.userDto?.role === 'student'

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isTeacher, 
      isStudent, 
      login, 
      register, 
      logout, 
      updateUser,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
