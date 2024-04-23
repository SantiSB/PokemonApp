import '@testing-library/jest-dom'
interface LocalStorageMock {
  getItem: jest.Mock
  setItem: jest.Mock
  removeItem: jest.Mock
  clear: jest.Mock
  store: Record<string, string>
}

const localStorageMock: LocalStorageMock = {
  store: {},
  getItem: jest.fn((key: string) => {
    return localStorageMock.store[key] || null
  }),
  setItem: jest.fn((key: string, value: string) => {
    localStorageMock.store[key] = value.toString()
  }),
  removeItem: jest.fn((key: string) => {
    delete localStorageMock.store[key]
  }),
  clear: jest.fn(() => {
    localStorageMock.store = {}
  }),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
