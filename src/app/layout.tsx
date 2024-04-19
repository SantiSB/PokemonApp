import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/state/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Technical test for 57Blocks',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${inter.className} bg-gray-50 dark:bg-primary-800 text-primary-900 dark:text-primary-50`}
        >
          <Header />
          <div className="mt-16"></div>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
