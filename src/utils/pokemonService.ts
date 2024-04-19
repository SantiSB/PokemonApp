import { Pokemon } from '@/types/pokemonTypes'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

interface FetchParams {
  page?: number
  limit?: number
}

export const fetchPokemonList = async ({
  page = 1,
  limit = 20,
}: FetchParams) => {
  const offset = (page - 1) * limit
  const url = `${API_URL}?offset=${offset}&limit=${limit}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error
  }
}

export const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return (await response.json()) as Pokemon
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error
  }
}

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const url = `${API_URL}/${id}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return (await response.json()) as Pokemon
  } catch (error) {
    console.error('Error fetching data: ', error)
    throw error
  }
}
