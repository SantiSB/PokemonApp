export const calculateTotalPages = (total: number, limit: number) => {
  return Math.ceil(total / limit)
}
