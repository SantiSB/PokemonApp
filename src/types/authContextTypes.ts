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

export interface UseRegisterFormOutput {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
}

export interface UseLoginReturn {
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  loading: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
