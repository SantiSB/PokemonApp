'use client'
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { Action, State } from '@/types/pokemonContextTypes'

const initialState: State = {
  pokemons: [],
  page: 1,
  total: 0,
  favorites: [],
  favoritesDetails: [],
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
      const pokemonId = action.payload
      return {
        ...state,
        favorites: state.favorites.includes(pokemonId)
          ? state.favorites.filter((f) => f !== pokemonId)
          : [...state.favorites, pokemonId],
      }
    case 'SET_FAVORITES_DETAILS':
      return {
        ...state,
        favoritesDetails: action.payload,
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

  useEffect(() => {
    const userItem = localStorage.getItem('user')
    if (userItem) {
      const user = JSON.parse(userItem)
      const favorites = user.favorites || []
      dispatch({ type: 'SET_FAVORITES', payload: favorites })
    }
  }, [])

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => useContext(PokemonContext)
