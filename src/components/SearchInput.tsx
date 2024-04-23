'use client'
import { useState } from 'react'
import { usePokemonContext } from '@/state/PokemonContext'

export default function SearchInput() {
  const { state, dispatch } = usePokemonContext()
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (search: string) => {
    setInputValue(search)
    dispatch({ type: 'SET_FILTER', payload: search })
  }

  return (
    <form
      className="self-center mx-auto ml-auto max-w-80 mb-1 text-black "
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="mb-2 text-sm font-medium  sr-only ">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 dark:text-primary-50"
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
          list={inputValue ? 'pokemonList' : undefined}
          type="text"
          className="block w-full pl-10 pr-4 py-2 text-sm text-black dark:text-white border-primary-50 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm bg-primary-400 dark:bg-primary-700 placeholder-gray-700 dark:placeholder-primary-50"
          placeholder="Search Pokémon..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {inputValue && (
          <datalist id="pokemonList">
            {state.pokemons.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.name ?? ''} />
            ))}
          </datalist>
        )}
      </div>
    </form>
  )
}
