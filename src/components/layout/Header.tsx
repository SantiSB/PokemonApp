import Image from 'next/image'
import { Press_Start_2P } from 'next/font/google'
import ThemeToggleButton from '@/components/layout/ThemeToggleButton'
import Link from 'next/link'

const font = Press_Start_2P({ weight: '400', subsets: ['latin'] })

const links = [
  { href: '/favorites', text: 'Favorites' },
  { href: '#login', text: 'Login' },
]

export default function Header() {
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
        ></Image>
      </Link>
      <nav className="flex flex-row gap-x-4 text-xs sm:text-base">
        {links.map((link) => (
          <Link
            key={link.href}
            className=" hover:text-primary-200 dark:hover:text-primary-700 focus:text-primary-300 dark:focus:text-primary-800 transition-colors font-semibold"
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
      </nav>
      <ThemeToggleButton />
    </header>
  )
}
