import PokemonsList from '@/components/PokemonsList'
import SearchInput from '@/components/SearchInput'

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 py-1">
      <SearchInput />
      <PokemonsList />
    </main>
  )
}
