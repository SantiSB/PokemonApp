import { ReactNode } from 'react'
import { Pokemon } from './pokemonTypes'

export interface User {
  id: string
  email: string
  password: string
  favorites: Pokemon[]
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<LoginResponse>
  logout: () => void
  register: (email: string, password: string) => Promise<RegisterResponse>
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

export interface RegisterResponse {
  success: boolean
  message: string
  user: User | null
}

export interface LoginResponse {
  success: boolean
  message: string
  user: User | null
}
