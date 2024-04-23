import { User } from '@/types/authContextTypes'
import { Pokemon } from '@/types/pokemonTypes'

export const updateLocalStorageUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const updateLocalStorageUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users))
}

export const updateFavoriteForUser = (user: User, pokemonId: number): void => {
  const isFavorite = user.favorites.some((fav) => fav === pokemonId)
  user.favorites = isFavorite
    ? user.favorites.filter((fav) => fav !== pokemonId)
    : [...user.favorites, pokemonId]

  localStorage.setItem('user', JSON.stringify(user))
}

export const updateFavoriteForUsers = (
  users: User[],
  userId: string,
  pokemonId: number,
): void => {
  const userIndex = users.findIndex(
    (u) => u.id.toString() === userId.toString(),
  )
  if (userIndex !== -1) {
    const isFavorite = users[userIndex].favorites.some(
      (fav) => fav === pokemonId,
    )
    users[userIndex].favorites = isFavorite
      ? users[userIndex].favorites.filter((fav) => fav !== pokemonId)
      : [...users[userIndex].favorites, pokemonId]

    localStorage.setItem('users', JSON.stringify(users))
  }
}
