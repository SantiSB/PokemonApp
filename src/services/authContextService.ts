import { RegisterResponse, User } from '@/types/authContextTypes'
import { v4 as uuidv4 } from 'uuid'

export const login = (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem('users') ?? '[]')
  const foundUser = users.find(
    (user: User) => user.email === email && user.password === password,
  )
  if (foundUser) {
    localStorage.setItem('user', JSON.stringify(foundUser))
    return foundUser
  }
  return null
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const register = (email: string, password: string): RegisterResponse => {
  const users = JSON.parse(localStorage.getItem('users') ?? '[]')
  if (users.some((user: User) => user.email === email)) {
    return {
      success: false,
      message: 'User already exists with that email.',
      user: null,
    }
  }
  const newUser = { id: uuidv4(), email, password, favorites: [] }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  return { success: true, message: 'Registration successful.', user: newUser }
}
