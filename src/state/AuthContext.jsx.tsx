'use client'
import React, { createContext, useState, useEffect, useContext } from 'react'
import {
  AuthContextType,
  AuthProviderProps,
  LoginResponse,
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

  const handleLogin = async (
    email: string,
    password: string,
  ): Promise<LoginResponse> => {
    const result = await login(email, password)
    if (result.success) {
      setUser(result.user)
    } else {
      // Manejo del caso de fallo, como mostrar un mensaje de error.
      // Nota: Este bloque no afecta el tipo de retorno de `handleLogin`.
    }
    return result // Esto es crucial para asegurarte de que estás devolviendo un Promise<LoginResponse>
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  const handleRegister = async (email: string, password: string) => {
    const result = await register(email, password)
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
