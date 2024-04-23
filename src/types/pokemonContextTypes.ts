import { Pokemon } from '@/types/pokemonTypes'

export type State = {
  pokemons: Pokemon[]
  page: number
  total: number
  favorites: number[]
  favoritesDetails: Pokemon[]
  filter: string
}

export type Action =
  | { type: 'SET_POKEMONS'; payload: Pokemon[] }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'TOGGLE_FAVORITE'; payload: number }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'CLEAN_FAVORITES' }
  | { type: 'SET_FAVORITES'; payload: number[] }
  | { type: 'SET_FAVORITES_DETAILS'; payload: Pokemon[] }
