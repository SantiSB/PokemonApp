import {
  buildUrl,
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonById,
} from '@/services/pokemonService'
import fetchMock from 'jest-fetch-mock'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

describe('Pokemon API service', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('buildUrl', () => {
    test('should construct a URL with query parameters', () => {
      const url = buildUrl(`${API_URL}`, {
        limit: 20,
        offset: 100,
      })
      expect(url).toBe(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=100`)
    })

    test('should construct a URL with a Pokemon ID', () => {
      const pokemonId = '25'
      const url = buildUrl(`${API_URL}/${pokemonId}`)
      expect(url).toBe('https://pokeapi.co/api/v2/pokemon/25')
    })

    test('should construct a URL without query parameters when none are provided', () => {
      const url = buildUrl(`${API_URL}`)
      expect(url).toBe('https://pokeapi.co/api/v2/pokemon')
    })
  })

  describe('fetchPokemonList', () => {
    test('should fetch pokemons with default pagination', async () => {
      const mockApiResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      }
      fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse))
      const result = await fetchPokemonList({})
      expect(result).toEqual(mockApiResponse)
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
      )
    })

    test('should fetch pokemons with specified pagination', async () => {
      const mockApiResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      }
      fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse))
      const result = await fetchPokemonList({ page: 2, limit: 10 })
      expect(result).toEqual(mockApiResponse)
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
      )
    })
  })

  describe('fetchPokemonDetails', () => {
    test('should fetch details of a specific pokemon', async () => {
      const mockPokemonDetails = {
        id: 1,
        name: 'bulbasaur',
        base_experience: 64,
        height: 7,
        weight: 7,
      }
      fetchMock.mockResponseOnce(JSON.stringify(mockPokemonDetails))
      const result = await fetchPokemonDetails(
        'https://pokeapi.co/api/v2/pokemon/25',
      )
      expect(result).toEqual(mockPokemonDetails)
    })
  })

  describe('fetchPokemonById', () => {
    test('should fetch a pokemon by ID', async () => {
      const mockPokemon = {
        id: 1,
        name: 'bulbasaur',
        base_experience: 64,
        height: 7,
        weight: 7,
      }
      fetchMock.mockResponseOnce(JSON.stringify(mockPokemon))
      const result = await fetchPokemonById('1')
      expect(result).toEqual(mockPokemon)
      expect(fetchMock).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/1',
      )
    })
  })
})
