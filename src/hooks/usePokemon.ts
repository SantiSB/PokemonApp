import { useState, useEffect } from 'react'
import { Pokemon } from '@/types/pokemonTypes'
import { fetchPokemonById } from '@/utils/pokemonService'

function usePokemon(id: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPokemon = async () => {
      setIsLoading(true)
      try {
        const data = await fetchPokemonById(id)
        setPokemon(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch pokemon:', err)
        setError('Failed to load the Pokémon data.')
        setIsLoading(false)
      }
    }

    loadPokemon()
  }, [id])

  return { pokemon, isLoading, error }
}

export default usePokemon
