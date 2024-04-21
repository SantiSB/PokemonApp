'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

interface User {
  id: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  register: (email: string, password: string) => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

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
    const newUser = { id: uuidv4(), email, password }
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
