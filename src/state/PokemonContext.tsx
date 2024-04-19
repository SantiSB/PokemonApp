'use client'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import { Pokemon } from '@/types/pokemonTypes'

type State = {
  pokemons: Pokemon[]
  page: number
  total: number
  favorites: number[]
}

type Action =
  | { type: 'SET_POKEMONS'; payload: Pokemon[] }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'TOGGLE_FAVORITE'; payload: number }

const initialState: State = {
  pokemons: [],
  page: 1,
  total: 0,
  favorites: [],
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
      const { favorites } = state
      const pokemonId = action.payload
      const index = favorites.indexOf(pokemonId)
      const newFavorites = [...favorites]

      if (index !== -1) {
        newFavorites.splice(index, 1)
      } else {
        newFavorites.push(pokemonId)
      }
      return { ...state, favorites: newFavorites }
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
