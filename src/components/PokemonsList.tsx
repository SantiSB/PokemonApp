'use client'
import { usePokemonContext } from '@/state/PokemonContext'
import { Pokemon } from '@/types/pokemonTypes'
import { fetchPokemonDetails, fetchPokemonList } from '@/utils/pokemonService'
import { useEffect } from 'react'

export default function PokemonsList() {
  const { state, dispatch } = usePokemonContext()

  useEffect(() => {
    const loadPokemon = async () => {
      const { page } = state
      const data = await fetchPokemonList({ page, limit: 10 })
      const promises = data.results.map((pokemon: { url: string }) =>
        fetchPokemonDetails(pokemon.url).then((detail) => ({
          ...detail,
          url: pokemon.url,
        })),
      )
      const details = await Promise.all(promises)

      dispatch({ type: 'SET_POKEMONS', payload: details })
      dispatch({ type: 'SET_TOTAL', payload: data.count })
    }

    loadPokemon()
  }, [state.page, dispatch])

  function handlePageChange(newPage: number) {
    dispatch({ type: 'SET_PAGE', payload: newPage })
  }

  const totalPages = Math.ceil(state.total / 10)

  console.log(state.pokemons)

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
              {state.pokemons.map((pokemon: Pokemon) => (
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
            <div
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, state.page - 1))
                    }
                    disabled={state.page === 1}
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {'<'}
                  </button>
                </li>
                {/* Dynamic pagination with ellipses */}
                {state.page > 2 && (
                  <li>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </button>
                  </li>
                )}
                {state.page > 3 && (
                  <li>
                    <span className="px-3 py-2">...</span>
                  </li>
                )}
                {Array.from({ length: 3 }, (_, i) => state.page - 1 + i)
                  .filter(
                    (pageNumber) => pageNumber >= 1 && pageNumber <= totalPages,
                  )
                  .map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        onClick={() => handlePageChange(pageNumber)}
                        className={`flex items-center justify-center px-3 py-2 text-sm leading-tight ${state.page === pageNumber ? 'text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                {state.page < totalPages - 2 && (
                  <li>
                    <span className="px-3 py-2">...</span>
                  </li>
                )}
                {state.page < totalPages - 1 && (
                  <li>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {totalPages}
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, state.page + 1))
                    }
                    disabled={state.page === totalPages}
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {'>'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
