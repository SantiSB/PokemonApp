export default function PokemonsList() {
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
                {/* {pokemons.map((pokemon: Pokemon) => (
                  <tr
                    key={pokemon.id}
                    className="text-center border-b dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900"
                  >
                    <td className="px-3 py-2">
                      <button
                        onClick={() => toggleFavorite(pokemon)}
                        className={`text-lg ${favorites.includes(pokemon.id) ? 'text-red-500' : 'text-gray-300'} hover:text-red-700`}
                      >
                        <FavoriteIcon />
                      </button>
                    </td>

                    <td className="flex justify-center px-3 py-2text-primary-800 dark:text-primary-200">
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={50}
                        height={50}
                      ></Image>
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      {pokemon.id}
                    </td>
                    <td className="px-3 py-2 text-primary-800 dark:text-primary-200">
                      <Link href={`/pokemon/${pokemon.id}`}>
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
                      {pokemon.base_experience}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
