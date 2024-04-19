'use client'
import { usePokemonContext } from '@/state/PokemonContext'
import { Pokemon } from '@/types/pokemonTypes'
import FavoriteIcon from './assets/FavoriteIcon'
import Image from 'next/image'
import { usePokemonList } from '@/hooks/usePokemonList'
import Link from 'next/link'

export default function FavoritesList() {
  const { state } = usePokemonContext()
  const { favorites, toggleFavorite } = usePokemonList()

  return (
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] sm:max-h-[480px] overflow-y-auto ">
            <table className="w-full text-sm text-left dark:text-gray-400">
              <thead className="text-xs uppercase bg-primary-500 dark:bg-primary-700 sticky top-0">
                <tr className="text-center">
                  <th scope="col" className="px-4 py-3 max-w-2 text-white">
                    ★
                  </th>
                  <th scope="col" className="px-4 py-3 text-white">
                    Image
                  </th>
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
                {state.favorites.map((pokemon: Pokemon) => (
                  <tr
                    key={pokemon.id}
                    className="text-center border-b dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
                  >
                    <td className="px-3 py-2">
                      <button
                        onClick={() => toggleFavorite(pokemon)}
                        className={`text-lg  ${favorites.some((favorite: Pokemon) => favorite.id === pokemon.id) ? 'text-red-500' : 'text-gray-300'} hover:text-red-700`}
                      >
                        <FavoriteIcon />
                      </button>
                    </td>
                    <td className="flex justify-center px-3 py-2 text-primary-800 dark:text-primary-200">
                      <Link
                        href={`/pokemon/${pokemon.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={pokemon.image ? pokemon.image : '/pokeball.svg'}
                          alt={pokemon.name ?? ''}
                          width={50}
                          height={50}
                        />
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      <Link
                        href={`/pokemon/${pokemon.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pokemon.id}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      <Link
                        href={`/pokemon/${pokemon.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pokemon.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      {pokemon.height}
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      {pokemon.weight}
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      {pokemon.base_experience ?? 'unknown'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
