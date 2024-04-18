import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

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
    <html lang="es">
      <body
        className={`${inter.className} bg-white dark:bg-black text-black dark:text-white`}
      >
        <Header />
        <div className="mt-16"></div>
        {children}
      </body>
    </html>
  )
}
