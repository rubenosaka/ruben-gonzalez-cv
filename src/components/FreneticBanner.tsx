'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface FreneticBannerProps {
  variant: string
}

export function FreneticBanner({ variant }: FreneticBannerProps) {
  const backgroundImage = '/frenetic-ai-screenshot.webp'

  return (
    <motion.article
      className={` relative h-[300px] transition-all duration-200  hover:shadow-md md:h-auto ${
        variant === 'project' ? 'w-full' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl shadow-sm backdrop-blur-sm"
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
                Frenetic.ai
              </h2>
              <p className="mb-6 text-lg text-white/90">
                SaaS platform for magnet design and simulation
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://app.frenetic.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Live Demo
                </a>
                <a
                  href="https://simulator.frenetic.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Simulator
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-20px] right-[-10px] h-32 w-32 flex-shrink-0">
        <Image
          src="/open-ai-logo.png"
          alt="OpenAI logo"
          width={128}
          height={128}
          className="h-32 w-32 object-contain"
        />
      </div>
    </motion.article>
  )
}
