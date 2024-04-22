'use client'
import { useEffect, useCallback } from 'react'
import { usePokemonContext } from '@/state/PokemonContext'
import { fetchPokemonDetails, fetchPokemonList } from '@/utils/pokemonService'
import { Pokemon } from '@/types/pokemonTypes'
import { useAuth } from './useAuth'
import { User } from '@/types/authContextTypes'

const TOTAL_PAGES = 20

export const usePokemonList = () => {
  const { state, dispatch } = usePokemonContext()
  const { user } = useAuth()

  console.log(user)

  const loadPokemon = useCallback(async () => {
    const { page } = state
    const data = await fetchPokemonList({ page, limit: 20 })
    const promises = data.results.map((pokemon: Pokemon) =>
      fetchPokemonDetails(pokemon.url ?? '')?.then((detail) => ({
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
      dispatch({ type: 'TOGGLE_FAVORITE', payload: pokemon })

      const usersString = localStorage.getItem('users')
      const users = usersString ? JSON.parse(usersString) : []

      const userLoggedString = localStorage.getItem('user')
      const userLogged = userLoggedString ? JSON.parse(userLoggedString) : null

      if (userLogged) {
        const isFavorite = userLogged.favorites.some(
          (fav: Pokemon) => fav.id === pokemon.id,
        )

        if (isFavorite) {
          userLogged.favorites = userLogged.favorites.filter(
            (fav: Pokemon) => fav.id !== pokemon.id,
          )
        } else {
          userLogged.favorites.push(pokemon)
        }

        localStorage.setItem('user', JSON.stringify(userLogged))
      }

      const userIndex = users.findIndex((u: User) => u.id === user?.id)
      if (userIndex !== -1) {
        const currentUser = users[userIndex]
        const isFavorite = currentUser.favorites.some(
          (fav: Pokemon) => fav.id === pokemon.id,
        )

        if (isFavorite) {
          currentUser.favorites = currentUser.favorites.filter(
            (fav: Pokemon) => fav.id !== pokemon.id,
          )
        } else {
          currentUser.favorites.push(pokemon)
        }

        users[userIndex] = currentUser
        localStorage.setItem('users', JSON.stringify(users))
      }
    },
    [dispatch, user],
  )

  const cleanFavorites = useCallback(() => {
    dispatch({ type: 'CLEAN_FAVORITES' })
  }, [dispatch])

  const loadFavorites = useCallback(() => {
    const userString = localStorage.getItem('user')
    const user = userString ? JSON.parse(userString) : null

    if (user) {
      dispatch({ type: 'SET_FAVORITES', payload: user.favorites })
    }
  }, [dispatch])

  const filteredPokemons = state.pokemons.filter((pokemon) => {
    return !state.filter || pokemon.name?.includes(state.filter)
  })

  const totalPages = Math.ceil(state.total / TOTAL_PAGES)

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
