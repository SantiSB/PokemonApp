'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Props, Theme, ThemeContextType } from '@/types/themeTypes'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const storedTheme =
      typeof window !== 'undefined'
        ? (localStorage.getItem('theme') as Theme) || 'light'
        : 'light'
    setTheme(storedTheme)
    document.documentElement.className = storedTheme
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      document.documentElement.className = newTheme
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
