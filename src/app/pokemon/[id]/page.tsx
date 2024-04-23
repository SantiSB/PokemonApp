'use client'
import Image from 'next/image'
import Error from '@/app/error'
import Loading from '@/app/loading'
import NotFound from '@/app/not-found'
import RenderStars from '@/components/RatingStars'
import usePokemon from '@/hooks/usePokemon'

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const { pokemon, isLoading, error } = usePokemon(id)

  if (isLoading) return <Loading />
  if (error) return <Error error={error} />
  if (!pokemon) return <NotFound />

  return (
    <section className="bg-white dark:bg-gray-900 h-screen overflow-auto py-8 md:py-16">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <Image
              src={
                pokemon.sprites?.other?.dream_world?.front_default ??
                pokemon.sprites?.other?.home?.front_default ??
                '/pokeball.svg'
              }
              alt={pokemon.name ?? ''}
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {pokemon.name}
            </h1>
            <div className="mt-4 sm:flex sm:items-center sm:gap-4">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {pokemon.base_experience}
              </p>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <RenderStars rating={pokemon.base_experience ?? 0} />
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  {pokemon.height} ft / {pokemon.weight} lbs
                </p>
                <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                  {pokemon.moves?.length ?? 'unknown'} moves
                </p>
              </div>
            </div>
            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="mb-2 text-gray-700 dark:text-gray-300 font-semibold">
              Abilities:
            </p>
            <p className="mb-6 text-gray-500 dark:text-gray-400 overflow-y-auto h-10">
              {pokemon.abilities
                ?.map((ability) => ability.ability?.name)
                .join(', ')}
            </p>
            <p className="mb-2 text-gray-700 dark:text-gray-300 font-semibold">
              Moves:
            </p>
            <p className="text-gray-500 dark:text-gray-400 overflow-y-auto h-44">
              {pokemon.moves?.map((move) => move.move?.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
