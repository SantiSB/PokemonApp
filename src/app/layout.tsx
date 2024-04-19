import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/state/ThemeContext'

const font = Orbitron({ subsets: ['latin'] })

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
          className={`${font.className} bg-gray-50 dark:bg-primary-800 text-primary-900 dark:text-primary-50 min-h-screen min-w-full m-0 p-0 overflow-hidden flex flex-col`}
        >
          <Header />
          <div className="mt-20"></div>
          {children}
        </body>
      </ThemeProvider>
    </html>
  )
}
