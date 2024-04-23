import {
  updateFavoriteForUser,
  updateFavoriteForUsers,
  updateLocalStorageUser,
  updateLocalStorageUsers,
} from '@/services/localStorageService'
import { User } from '@/types/authContextTypes'
import { Pokemon } from '@/types/pokemonTypes'

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

  describe('updateFavoriteForUser', () => {
    it("should add or remove a pokemon from a user's favorites and update localStorage", () => {
      const user: User = {
        id: '1',
        email: 'user@example.com',
        password: 'securepassword',
        favorites: [],
      }
      const pokemon: Pokemon = {
        id: 101,
        name: 'Pikachu',
      }

      updateFavoriteForUser(user, pokemon)
      expect(user.favorites).toContain(pokemon)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(user),
      )

      updateFavoriteForUser(user, pokemon)
      expect(user.favorites).not.toContain(pokemon)
      expect(localStorage.setItem).toHaveBeenCalledTimes(2)
    })
  })

  describe('updateFavoriteForUsers', () => {
    it("should update a specific user's favorites in an array and update localStorage", () => {
      const users: User[] = [
        {
          id: '1',
          email: 'user1@example.com',
          password: 'securepassword1',
          favorites: [],
        },
        {
          id: '2',
          email: 'user2@example.com',
          password: 'securepassword2',
          favorites: [],
        },
      ]
      const pokemon: Pokemon = {
        id: 102,
        name: 'Charmander',
      }

      updateFavoriteForUsers(users, '1', pokemon)
      expect(users[0].favorites).toContain(pokemon)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'users',
        JSON.stringify(users),
      )

      updateFavoriteForUsers(users, '1', pokemon)
      expect(users[0].favorites).not.toContain(pokemon)
      expect(localStorage.setItem).toHaveBeenCalledTimes(2)
    })
  })
})
