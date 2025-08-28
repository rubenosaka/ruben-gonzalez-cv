'use client'

import { HeaderMenu } from '@/components/HeaderMenu'

export const SiteHeader = () => {
  return (
    <header className="relative m-4 rounded-lg bg-black shadow-md dark:border-2 dark:border-pink-500">
      <div className="container mx-auto px-6 py-4">
        <HeaderMenu />
      </div>
    </header>
  )
}
