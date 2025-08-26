'use client'

import { HeaderMenu } from '@/components/HeaderMenu'

export const SiteHeader = () => {
  return (
    <header className="m-4 rounded-lg bg-black shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
