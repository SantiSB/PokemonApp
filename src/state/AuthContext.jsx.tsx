'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import {
  AuthContextType,
  AuthProviderProps,
  User,
} from '@/types/authContextTypes'
import { login, logout, register } from '@/services/authContextService'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (email: string, password: string) => {
    const result = login(email, password)
    if (result) {
      setUser(result)
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  const handleRegister = (email: string, password: string) => {
    const result = register(email, password)
    return result
  }

  const isLoggedIn = user !== null

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
        isLoggedIn,
      }}
    >
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
