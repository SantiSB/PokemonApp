export const calculateTotalPages = (total: number, limit: number): number => {
  if (limit <= 0) {
    throw new Error('Limit must be greater than zero.')
  }
  return Math.ceil(total / limit)
}
