'use client'
import { fetchPokemonList } from '@/utils/pokemonService'
import { useEffect, useState } from 'react'

export default function PokemonsList() {
  const [pokemonList, setPokemonList] = useState<
    {
      name: string
      url: string
    }[]
  >([])

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonList({ page: 1, limit: 10 })
      const mappedData = data.results.map(
        (pokemon: { name: string; url: string }) => {
          const id = pokemon.url.split('/').filter(Boolean).pop()
          return {
            ...pokemon,
            id: id,
          }
        },
      )
      setPokemonList(mappedData)
    }
    loadPokemon()
  }, [])

  return (
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        {/* Head */}
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-500">All Pokemons: </span>
              <span className="dark:text-white">123456</span>
            </h5>
            <h5>
              <span className="text-gray-500">Favorite Pokemons: </span>
              <span className="dark:text-white">10</span>
            </h5>
          </div>
        </div>
        <div className="overflow-x-auto">
          {/* Table */}
          <table className="w-full text-sm text-left dark:text-gray-400">
            <thead className="text-xs uppercase bg-primary-500 dark:bg-primary-700">
              <tr>
                <th scope="col" className="px-4 py-3 text-white">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 text-white">
                  Abilities
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
                <th scope="col" className="px-4 py-3 text-white">
                  Types
                </th>
              </tr>
            </thead>
            <tbody>
              {pokemonList.map((pokemon: { name: string; url: string }) => (
                <tr
                  key={pokemon.name}
                  className="border-b dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
                >
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.name}
                  </td>
                  <td className="px-4 py-2 text-primary-800 dark:text-primary-200">
                    {pokemon.url}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                1-20
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                123456
              </span>
            </span>
            {/* Pagination */}
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {'<'}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  {'>'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
