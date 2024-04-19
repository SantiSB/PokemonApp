'use client'
import { Pokemon } from '@/types/pokemonTypes'
import { usePokemonList } from '@/hooks/usePokemonList'

export default function FavoritesList() {
  const { favorites } = usePokemonList()

  return (
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        {/* Head */}
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-500">Favorite Pokemons: </span>
              <span className="dark:text-white">{favorites.length}</span>
            </h5>
          </div>
        </div>
        <div className="overflow-x-auto">
          {/* Table */}
          <table className="w-full text-sm text-left dark:text-gray-400">
            <thead className="text-xs uppercase bg-primary-500 dark:bg-primary-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-white">
                  ID
                </th>
                <th scope="col" className="px-4 py-3 text-white">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 text-white">
                  Height
                </th>
                <th scope="col" className="px-4 py-3 text-white">
                  Weight
                </th>
                <th scope="col" className="px-4 py-3 text-white">
                  Base Experience
                </th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((pokemon: Pokemon) => (
                <tr
                  key={pokemon.id}
                  className="border-b dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
                >
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.id}
                  </td>
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.name}
                  </td>
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.height}
                  </td>
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.weight}
                  </td>
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.base_experience}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
