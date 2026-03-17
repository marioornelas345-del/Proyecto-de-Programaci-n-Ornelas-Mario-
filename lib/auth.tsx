'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('luxe_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser = {
      id: 'user_123',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
    }
    
    setUser(mockUser)
    localStorage.setItem('luxe_user', JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, _password: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
    }
    
    setUser(mockUser)
    localStorage.setItem('luxe_user', JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('luxe_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
