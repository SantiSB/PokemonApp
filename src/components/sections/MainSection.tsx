'use client'
import PokemonsList from '@/components/PokemonsList'
import SearchInput from '../SearchInput'
import { usePokemonList } from '@/hooks/usePokemonList'
export default function MainSection() {
  const { setFilter } = usePokemonList()
  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-5">
      <SearchInput onSearchChange={setFilter} />
      <PokemonsList />
    </main>
  )
}
