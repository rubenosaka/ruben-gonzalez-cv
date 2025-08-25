'use client'

import { motion } from 'framer-motion'

interface TrinukiBannerProps {
  variant: string
}

export function TrinukiBanner({ variant }: TrinukiBannerProps) {
  const backgroundImage = '/trinuki-screenshot.png'
  const nukiImage = '/trinuki-nuki.webp'

  return (
    <motion.article
      className={`overflow-hidden rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
        variant === 'project' ? 'w-full' : ''
      }`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative h-full bg-black/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold text-white">
              Trinuki – Coming Soon
            </h2>
            <p className="mb-6 text-lg text-white/90">
              AI-powered travel planner for Japan
            </p>
            <button
              disabled
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Coming soon
            </button>
          </div>

          <div className="relative h-32 w-32 flex-shrink-0 md:h-48 md:w-40">
            <img
              src={nukiImage}
              alt="Nuki mascot"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
