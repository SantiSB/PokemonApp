'use client'
import Error from '@/app/error'
import Loading from '@/app/loading'
import NotFound from '@/app/not-found'
import usePokemon from '@/hooks/usePokemon'
import Image from 'next/image'

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const { pokemon, isLoading, error } = usePokemon(id)

  if (isLoading) return <Loading />
  if (error) return <Error error={error} />
  if (!pokemon) return <NotFound />

  const renderStars = () => {
    const stars = []
    const rating = pokemon.base_experience
    let fullStars = 0

    if (rating) {
      if (rating >= 20 && rating <= 138) {
        fullStars = 1
      } else if (rating >= 139 && rating <= 256) {
        fullStars = 2
      } else if (rating >= 257 && rating <= 374) {
        fullStars = 3
      } else if (rating >= 375 && rating <= 492) {
        fullStars = 4
      } else if (rating >= 493) {
        fullStars = 5
      } else {
        fullStars = 0
      }
    }

    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i < fullStars ? 'text-yellow-300' : 'text-gray-300'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>,
      )
    }

    return stars
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
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
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {pokemon.name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {pokemon.base_experience}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">{renderStars()}</div>
                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  {pokemon.height} ft / {pokemon.weight} lbs
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {pokemon.moves?.length ?? 'unknown'} moves
                </a>
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
