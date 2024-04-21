'use client'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import { Pokemon } from '@/types/pokemonTypes'

type State = {
  pokemons: Pokemon[]
  page: number
  total: number
  favorites: Pokemon[]
  filter: string
}
type Action =
  | { type: 'SET_POKEMONS'; payload: Pokemon[] }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'TOGGLE_FAVORITE'; payload: Pokemon }
  | { type: 'SET_FILTER'; payload: string }

const initialState: State = {
  pokemons: [],
  page: 1,
  total: 0,
  favorites: [],
  filter: '',
}

const pokemonReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_POKEMONS':
      return { ...state, pokemons: action.payload }
    case 'SET_PAGE':
      return { ...state, page: action.payload }
    case 'SET_TOTAL':
      return { ...state, total: action.payload }
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.some((f) => f.id === action.payload.id)
          ? state.favorites.filter((f) => f.id !== action.payload.id)
          : [...state.favorites, action.payload],
      }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

const PokemonContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => undefined,
})

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState)

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => useContext(PokemonContext)
