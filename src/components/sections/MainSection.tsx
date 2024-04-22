'use client'
import PokemonsList from '@/components/PokemonsList'
import SearchInput from '../SearchInput'
export default function MainSection() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-1">
      <SearchInput />
      <PokemonsList />
    </main>
  )
}
