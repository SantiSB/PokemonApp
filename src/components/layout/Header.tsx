'use client'
import Image from 'next/image'
import { Press_Start_2P } from 'next/font/google'
import ThemeToggleButton from '@/components/layout/ThemeToggleButton'
import Link from 'next/link'
import { useAuth } from '@/state/AuthContext.jsx'

const font = Press_Start_2P({ weight: '400', subsets: ['latin'] })

export default function Header() {
  const { isLoggedIn, logout } = useAuth()
  return (
    <header
      className={`${font.className} fixed top-0 left-0 z-10 flex justify-between items-center py-5 w-full px-5 lg:px-32 xl:px-40 bg-primary-800 dark:bg-primary-200 shadow-md text-primary-50 dark:text-primary-900`}
    >
      <Link href="/">
        <Image
          width={40}
          height={40}
          alt="Pokeball App - Logo"
          src="/pokeball.svg"
        />
      </Link>
      <nav className="flex flex-row gap-x-4 text-xs sm:text-base">
        {isLoggedIn && (
          <>
            <Link
              href="/favorites"
              className="hover:text-primary-200 dark:hover:text-primary-700 focus:text-primary-300 dark:focus:text-primary-800 transition-colors font-semibold"
            >
              Favorites
            </Link>
            <Link
              href={'/login'}
              onClick={logout}
              className="hover:text-primary-200 dark:hover:text-primary-700 focus:text-primary-300 dark:focus:text-primary-800 transition-colors font-semibold"
            >
              Logout
            </Link>
          </>
        )}
      </nav>
      <ThemeToggleButton />
    </header>
  )
}
