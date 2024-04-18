import Image from 'next/image'

const links = [
  { href: '#favorites', text: 'Favorites' },
  { href: '#login', text: 'Login' },
  { href: '#register', text: 'Register' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-10 flex justify-between items-center py-5 w-full px-5 lg:px-32 xl:px-40 bg-dark-50 dark:bg-dark-800 shadow-md">
      <a href="#">
        <Image
          width={40}
          height={40}
          alt="Pokeball App - Logo"
          src="/pokeball.svg"
        ></Image>
      </a>
      <nav className="flex flex-row gap-x-4 text-sm sm:text-base">
        {links.map((link) => (
          <a
            key={link.href}
            className="text-dark-900 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 focus:text-gold-600 dark:focus:text-gold-400 transition-colors font-semibold"
            href={link.href}
          >
            {link.text}
          </a>
        ))}
      </nav>
    </header>
  )
}
