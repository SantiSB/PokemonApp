'use client'
import {
  AuthContextType,
  AuthProviderProps,
  User,
} from '@/types/authContextTypes'
import React, { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]')
    const foundUser = users.find(
      (user: User) => user.email === email && user.password === password,
    )
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser))
      setUser(foundUser)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const register = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]')
    if (users.some((user: User) => user.email === email)) {
      alert('User already exists with that email.')
      return
    }
    const newUser = { id: uuidv4(), email, password, favorites: [] }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
  }

  const isLoggedIn = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
