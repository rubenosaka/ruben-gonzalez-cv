'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const navigationItems = [
  { href: '/cv', label: 'CV' },
  { href: '/projects', label: 'Projects' },
  { href: '/about-me', label: 'About Me' },
  { href: '/now', label: 'Now' },
]

export const SiteHeader = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-bold transition-colors hover:text-primary"
              aria-label="Go to homepage"
            >
              Rubén González Aranda
            </Link>

            <nav className="hidden items-center space-x-6 md:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={`Navigate to ${item.label} page`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
