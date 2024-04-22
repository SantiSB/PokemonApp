import { ReactNode } from 'react'

export interface User {
  id: string
  email: string
  password: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  register: (email: string, password: string) => void
  isLoggedIn: boolean
}

export interface AuthProviderProps {
  children: ReactNode
}
