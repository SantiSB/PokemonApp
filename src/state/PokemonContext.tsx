'use client'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'
import { Action, State } from '@/types/pokemonContextTypes'

const getUserFavorites = () => {
  const userItem = localStorage.getItem('user')
  if (userItem) {
    const user = JSON.parse(userItem)
    return user.favorites || []
  }
  return []
}

const savedFavorites = getUserFavorites()

const initialState: State = {
  pokemons: [],
  page: 1,
  total: 0,
  favorites: savedFavorites,
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
    case 'CLEAN_FAVORITES':
      return { ...state, favorites: [] }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload }
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
