'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface TrinukiBannerProps {
  variant: string
}

export function TrinukiBanner({ variant }: TrinukiBannerProps) {
  const backgroundImage = '/trinuki-screenshot.png'
  const nukiImage = '/trinuki-nuki.webp'

  return (
    <motion.article
      className={`relative transition-all duration-200 hover:shadow-md ${
        variant === 'project' ? 'w-full' : ''
      }`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl shadow-sm backdrop-blur-sm "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="h-full w-full bg-black/60 p-6">
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
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-20px] right-[-20px] h-48 w-40  flex-shrink-0">
        <Image
          src={nukiImage}
          alt="Nuki mascot"
          width={160}
          height={192}
          className="h-48 w-40 object-contain"
        />
      </div>
    </motion.article>
  )
}
