'use client'

import { usePokemonContext } from '@/state/PokemonContext'

export default function SearchInput() {
  const { dispatch } = usePokemonContext()

  const handleSearch = (search: string) => {
    dispatch({ type: 'SET_FILTER', payload: search })
  }

  return (
    <form
      className="max-w-md mx-auto mb-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-2 text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
          placeholder="Search Pokémon..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </form>
  )
}
