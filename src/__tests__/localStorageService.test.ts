import {
  updateLocalStorageUser,
  updateLocalStorageUsers,
} from '@/services/localStorageService'
import { User } from '@/types/authContextTypes'

describe('Local Storage Functions', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  describe('updateLocalStorageUser', () => {
    it('should save a single user to localStorage', () => {
      const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        favorites: [],
      }

      updateLocalStorageUser(mockUser)

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockUser),
      )
    })
  })

  describe('updateLocalStorageUsers', () => {
    it('should save multiple users to localStorage', () => {
      const mockUsers = [
        {
          id: '1',
          email: 'test1@example.com',
          password: 'password123',
          favorites: [],
        },
        {
          id: '2',
          email: 'test2@example.com',
          password: 'password456',
          favorites: [],
        },
      ]

      updateLocalStorageUsers(mockUsers)

      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'users',
        JSON.stringify(mockUsers),
      )
    })
  })
})
