import { User } from '@/types/authContextTypes'

export const updateLocalStorageUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const updateLocalStorageUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users))
}
