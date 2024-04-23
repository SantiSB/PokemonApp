export const calculateTotalPages = (total: number, limit: number): number => {
  if (limit <= 0) {
    throw new Error('Limit must be greater than zero.')
  }
  return Math.ceil(total / limit)
}

export const calculateStars = (rating: number) => {
  if (rating >= 20 && rating <= 138) {
    return 1
  } else if (rating >= 139 && rating <= 256) {
    return 2
  } else if (rating >= 257 && rating <= 374) {
    return 3
  } else if (rating >= 375 && rating <= 492) {
    return 4
  } else if (rating >= 493) {
    return 5
  }
  return 0
}
