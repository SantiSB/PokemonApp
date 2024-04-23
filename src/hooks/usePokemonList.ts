'use client'
import { useEffect, useCallback, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import { usePokemonContext } from '@/state/PokemonContext'
import { calculateTotalPages } from '@/utils/helpers'
import { Pokemon } from '@/types/pokemonTypes'
import {
  fetchPokemonDetails,
  fetchPokemonList,
} from '@/services/pokemonService'
import {
  updateFavoriteForUser,
  updateFavoriteForUsers,
} from '@/services/localStorageService'
import { User } from '@/types/authContextTypes'

const TOTAL_PAGES = 20

export const usePokemonList = () => {
  const { state, dispatch } = usePokemonContext()

  const [user] = useLocalStorage<User | null>('user', null)
  const [users] = useLocalStorage<User[]>('users', [])

  const loadPokemon = useCallback(async () => {
    const { page } = state
    const data = await fetchPokemonList({ page, limit: 20 })
    const promises = data.results.map((pokemon) =>
      fetchPokemonDetails(pokemon.url ?? '').then((detail) => ({
        ...detail,
        url: pokemon.url,
        image: detail.sprites?.front_default,
      })),
    )
    const details = await Promise.all(promises)
    dispatch({ type: 'SET_POKEMONS', payload: details })
    dispatch({ type: 'SET_TOTAL', payload: data.count })
  }, [state.page, dispatch])

  useEffect(() => {
    loadPokemon()
  }, [loadPokemon])

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch({ type: 'SET_PAGE', payload: newPage })
    },
    [dispatch],
  )

  const toggleFavorite = useCallback(
    (pokemon: Pokemon) => {
      if (user) {
        updateFavoriteForUser(user, pokemon)
      }

      if (users.length > 0 && user) {
        updateFavoriteForUsers(users, user.id, pokemon)
      }

      dispatch({ type: 'TOGGLE_FAVORITE', payload: pokemon })
    },
    [dispatch, user, users],
  )

  const cleanFavorites = useCallback(() => {
    dispatch({ type: 'CLEAN_FAVORITES' })
  }, [dispatch])

  const loadFavorites = useCallback(() => {
    if (user) {
      dispatch({ type: 'SET_FAVORITES', payload: user.favorites })
    }
  }, [dispatch, user])

  const filteredPokemons = useMemo(() => {
    return state.pokemons.filter((pokemon) => {
      return !state.filter || pokemon.name?.includes(state.filter)
    })
  }, [state.pokemons, state.filter])

  const totalPages = calculateTotalPages(state.total, TOTAL_PAGES)

  return {
    pokemons: state.pokemons,
    total: state.total,
    page: state.page,
    favorites: state.favorites,
    handlePageChange,
    toggleFavorite,
    filteredPokemons,
    totalPages,
    cleanFavorites,
    loadFavorites,
  }
}

export default usePokemonList
