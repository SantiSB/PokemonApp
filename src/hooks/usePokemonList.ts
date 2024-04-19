import { useEffect, useCallback } from 'react'
import { usePokemonContext } from '@/state/PokemonContext'
import { fetchPokemonDetails, fetchPokemonList } from '@/utils/pokemonService'
import { Pokemon } from '@/types/pokemonTypes'

export const usePokemonList = () => {
  const { state, dispatch } = usePokemonContext()

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
      dispatch({ type: 'TOGGLE_FAVORITE', payload: pokemon.id })
    },
    [dispatch],
  )

  return {
    pokemons: state.pokemons,
    total: state.total,
    page: state.page,
    favorites: state.favorites,
    handlePageChange,
    toggleFavorite,
  }
}
