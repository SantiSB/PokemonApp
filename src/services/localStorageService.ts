import { User } from '@/types/authContextTypes'
import { Pokemon } from '@/types/pokemonTypes'

export const updateLocalStorageUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const updateLocalStorageUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users))
}

export const updateFavoriteForUser = (user: User, pokemon: Pokemon): void => {
  const isFavorite = user.favorites.some((fav) => fav.id === pokemon.id)
  user.favorites = isFavorite
    ? user.favorites.filter((fav) => fav.id !== pokemon.id)
    : [...user.favorites, pokemon]

  localStorage.setItem('user', JSON.stringify(user))
}

export const updateFavoriteForUsers = (
  users: User[],
  userId: string,
  pokemon: Pokemon,
): void => {
  const userIndex = users.findIndex(
    (u) => u.id.toString() === userId.toString(),
  )
  if (userIndex !== -1) {
    const isFavorite = users[userIndex].favorites.some(
      (fav) => fav.id === pokemon.id,
    )
    users[userIndex].favorites = isFavorite
      ? users[userIndex].favorites.filter((fav) => fav.id !== pokemon.id)
      : [...users[userIndex].favorites, pokemon]

    localStorage.setItem('users', JSON.stringify(users))
  }
}
