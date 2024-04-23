import { calculateStars, calculateTotalPages } from '@/utils/helpers'

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

describe('calculateStars', () => {
  test('returns 0 for ratings less than 20', () => {
    expect(calculateStars(19)).toBe(0)
    expect(calculateStars(-1)).toBe(0)
    expect(calculateStars(0)).toBe(0)
  })

  test('returns 1 for ratings between 20 and 138', () => {
    expect(calculateStars(20)).toBe(1)
    expect(calculateStars(50)).toBe(1)
    expect(calculateStars(138)).toBe(1)
  })

  test('returns 2 for ratings between 139 and 256', () => {
    expect(calculateStars(139)).toBe(2)
    expect(calculateStars(200)).toBe(2)
    expect(calculateStars(256)).toBe(2)
  })

  test('returns 3 for ratings between 257 and 374', () => {
    expect(calculateStars(257)).toBe(3)
    expect(calculateStars(300)).toBe(3)
    expect(calculateStars(374)).toBe(3)
  })

  test('returns 4 for ratings between 375 and 492', () => {
    expect(calculateStars(375)).toBe(4)
    expect(calculateStars(400)).toBe(4)
    expect(calculateStars(492)).toBe(4)
  })

  test('returns 5 for ratings 493 or higher', () => {
    expect(calculateStars(493)).toBe(5)
    expect(calculateStars(500)).toBe(5)
    expect(calculateStars(1000)).toBe(5)
  })

  test('boundary conditions', () => {
    expect(calculateStars(138)).toBe(1)
    expect(calculateStars(139)).toBe(2)
    expect(calculateStars(256)).toBe(2)
    expect(calculateStars(257)).toBe(3)
    expect(calculateStars(374)).toBe(3)
    expect(calculateStars(375)).toBe(4)
    expect(calculateStars(492)).toBe(4)
    expect(calculateStars(493)).toBe(5)
  })
})
