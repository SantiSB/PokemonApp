import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import { ThemeProvider } from '@/state/ThemeContext'
import { PokemonProvider } from '@/state/PokemonContext'
import { AuthProvider } from '@/state/AuthContext.jsx'
import Header from '@/components/layout/Header'
import { ViewTransitions } from 'next-view-transitions'
import './globals.css'
import { AlertProvider } from '@/state/AlertContext'
import Alert from '@/components/Alert'

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
    <ViewTransitions>
      <html lang="en">
        <AuthProvider>
          <ThemeProvider>
            <AlertProvider>
              <Alert />
              <PokemonProvider>
                <body
                  className={`${font.className} bg-gray-50 dark:bg-primary-800 text-primary-900 dark:text-primary-50 min-h-screen min-w-full m-0 p-0 overflow-hidden flex flex-col`}
                >
                  <Header />
                  <div className="mt-20"></div>
                  {children}
                </body>
              </PokemonProvider>
            </AlertProvider>
          </ThemeProvider>
        </AuthProvider>
      </html>
    </ViewTransitions>
  )
}
