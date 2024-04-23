import { calculateTotalPages } from '@/utils/helpers'

describe('calculateTotalPages', () => {
  test('should return the correct number of total pages', () => {
    expect(calculateTotalPages(10, 5)).toBe(2)
    expect(calculateTotalPages(5, 2)).toBe(3)
    expect(calculateTotalPages(0, 5)).toBe(0)
    expect(calculateTotalPages(1, 5)).toBe(1)
  })

  test('should handle cases where limit is zero', () => {
    expect(() => calculateTotalPages(10, 0)).toThrow()
  })
})
