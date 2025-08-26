'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { href: '/', label: 'HOME' },
  { href: '/resume', label: 'RESUME' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/about-me', label: 'ABOUT ME' },
  { href: '/now', label: 'NOW' },
]

export const HeaderMenu = () => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="hidden items-center space-x-6 md:flex">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`border-b-2 py-1 text-sm font-medium text-white ${
            isActive(item.href)
              ? 'cursor-auto border-white'
              : 'cursor-pointer border-black hover:opacity-70'
          }`}
          aria-label={`Navigate to ${item.label} page`}
          aria-current={isActive(item.href) ? 'page' : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
