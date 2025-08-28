'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navigationItems = [
  { href: '/', label: 'HOME' },
  { href: '/resume', label: 'RESUME' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/about-me', label: 'ABOUT ME' },
  { href: '/now', label: 'NOW' },
]

export const HeaderMenu = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="flex w-full items-center justify-between rounded-b-2xl">
      <nav className="hidden items-center space-x-6 md:flex">
        {navigationItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <Link
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
            {index < navigationItems.length - 1 && (
              <span className="mx-3 font-mono text-xs text-gray-400">
                {'</>'}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div className="flex w-full justify-end md:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center p-2 text-white hover:opacity-70 dark:text-pink-500"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full z-50 translate-y-4 rounded-xl border border-purple-950 bg-black shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex flex-col items-end space-y-4">
            {navigationItems.map((item) => (
              <div key={item.href} className="flex items-center">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`border-b-2 py-2 text-sm font-medium text-white ${
                    isActive(item.href)
                      ? 'cursor-auto border-white'
                      : 'cursor-pointer border-transparent hover:border-white hover:opacity-70'
                  }`}
                  aria-label={`Navigate to ${item.label} page`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
