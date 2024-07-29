'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const path = usePathname()
  const links = [
    { href: '/', label: 'Mood' },
    { href: '/journal', label: 'Journal' },
    { href: '/history', label: 'History' },
  ]
  return (
    <nav className="flex items-center gap-4 ">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={`px-2 py-6 text-xl text-muted-foreground hover:text-foreground ${
            path === link.href && 'font-semibold'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar
