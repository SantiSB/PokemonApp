import { ReactNode } from 'react'

export type Theme = 'light' | 'dark'
export type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}
export type Props = {
  children: ReactNode
}
