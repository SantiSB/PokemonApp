import {
  ApiResponse,
  FetchParams,
  UrlParams,
} from '@/types/pokemonServiceTypes'
import { Pokemon } from '@/types/pokemonTypes'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'
const NETWORK_ERROR_MSG = 'Network response was not ok'

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(NETWORK_ERROR_MSG)
  }
  return response.json() as Promise<T>
}

export const buildUrl = (endpoint: string, params: UrlParams = {}): string => {
  const query = new URLSearchParams()
  for (const key in params) {
    query.append(key, params[key].toString())
  }
  return `${endpoint}${query.toString() ? '?' + query.toString() : ''}`
}

export const fetchPokemonList = async ({
  page = 1,
  limit = 20,
}: FetchParams): Promise<ApiResponse<Pokemon>> => {
  const url = buildUrl(API_URL, { offset: (page - 1) * limit, limit })
  const response = await fetch(url)
  return handleResponse<ApiResponse<Pokemon>>(response)
}

export const fetchPokemonDetails = async (url: string): Promise<Pokemon> => {
  const response = await fetch(url)
  return handleResponse<Pokemon>(response)
}

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const url = buildUrl(`${API_URL}/${id}`)
  const response = await fetch(url)
  return handleResponse<Pokemon>(response)
}
