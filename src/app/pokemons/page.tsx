'use client'
import { useEffect } from 'react'
import { usePokemonList } from '@/hooks/usePokemonList'
import PokemonsList from '@/components/PokemonsList'
import SearchInput from '@/components/SearchInput'

export default function Home() {
  const { loadFavorites } = usePokemonList()
  useEffect(() => {
    loadFavorites()
  }, [])
  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-1">
      <SearchInput />
      <PokemonsList />
    </main>
  )
}
