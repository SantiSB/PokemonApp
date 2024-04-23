import { login, logout, register } from '@/services/authContextService'

beforeEach(() => {
  localStorage.clear()
  jest.clearAllMocks()
})

describe('authService', () => {
  describe('login function', () => {
    it('should authenticate a user if credentials match', () => {
      const users = [
        {
          id: '123',
          email: 'test@gmail.com',
          password: 'password123',
          favorites: [],
        },
      ]
      localStorage.setItem('users', JSON.stringify(users))
      const user = login('test@gmail.com', 'password123')
      expect(user).toEqual(users[0])
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(users[0]),
      )
    })

    it('should return null if credentials do not match', () => {
      const users = [
        {
          id: '123',
          email: 'test@gmail.com',
          password: 'password123',
          favorites: [],
        },
      ]
      localStorage.setItem('users', JSON.stringify(users))
      const user = login('test@gmail.com', 'wrongpassword')
      expect(user).toBeNull()
    })
  })

  describe('logout function', () => {
    it('should clear the user from localStorage', () => {
      logout()
      expect(localStorage.removeItem).toHaveBeenCalledWith('user')
    })
  })

  describe('register function', () => {
    it('should add a new user if email does not exist already', () => {
      const newUser = register('new@gmail.com', 'password123')
      if (typeof newUser !== 'string') {
        expect(newUser.email).toBe('new@gmail.com')
      }
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'users',
        expect.any(String),
      )
      const storedUsers = JSON.parse(localStorage.store['users'])
      expect(storedUsers).toHaveLength(1)
      expect(storedUsers[0].email).toBe('new@gmail.com')
    })

    it('should return error message if email already exists', () => {
      const existingUser = {
        id: '123',
        email: 'test@gmail.com',
        password: 'password123',
        favorites: [],
      }
      localStorage.setItem('users', JSON.stringify([existingUser]))
      const result = register('test@gmail.com', 'password123')
      expect(result).toBe('User already exists with that email.')
    })
  })
})
