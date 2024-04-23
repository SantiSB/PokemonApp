import { login, logout, register } from '@/services/authContextService'

beforeEach(() => {
  localStorage.clear()
  jest.clearAllMocks()
})

describe('authService', () => {
  describe('login function', () => {
    test('should authenticate a user if credentials match', async () => {
      const users = [
        {
          id: '123',
          email: 'test@gmail.com',
          password: 'password123',
          favorites: [],
        },
      ]
      localStorage.setItem('users', JSON.stringify(users))
      const response = await login('test@gmail.com', 'password123')
      expect(response.user).toEqual(users[0])
      expect(response.success).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(users[0]),
      )
    })

    test('should return null if credentials do not match', async () => {
      const users = [
        {
          id: '123',
          email: 'test@gmail.com',
          password: 'password123',
          favorites: [],
        },
      ]
      localStorage.setItem('users', JSON.stringify(users))
      const response = await login('test@gmail.com', 'wrongpassword')
      expect(response.user).toBeNull()
      expect(response.success).toBe(false)
    })
  })

  describe('logout function', () => {
    test('should clear the user from localStorage', () => {
      logout()
      expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    })
  })

  describe('register function', () => {
    test('should add a new user if email does not exist already', async () => {
      const response = await register('new@gmail.com', 'password123')
      expect(response.user?.email).toBe('new@gmail.com')
      expect(response.success).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'users',
        expect.any(String),
      )
      const storedUsers = JSON.parse(localStorage.getItem('users') as string)
      expect(storedUsers.length).toBe(1)
      expect(storedUsers[0].email).toBe('new@gmail.com')
    })

    test('should return error message if email already exists', async () => {
      const existingUser = {
        id: '123',
        email: 'test@gmail.com',
        password: 'password123',
        favorites: [],
      }
      localStorage.setItem('users', JSON.stringify([existingUser]))
      const result = await register('test@gmail.com', 'password123')
      expect(result.message).toBe('User already exists with that email.')
      expect(result.success).toBe(false)
    })
  })
})
