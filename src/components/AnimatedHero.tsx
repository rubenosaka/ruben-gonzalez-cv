'use client'

import { motion } from 'framer-motion'

interface AnimatedHeroProps {
  title: string
  subtitle?: string
  description?: string
}

export function AnimatedHero({
  title,
  subtitle,
  description,
}: AnimatedHeroProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="to-purple mb-4 bg-gradient-to-r from-pink-500 to-purple-950 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.h2
          className="mb-4 text-2xl text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.h2>
      )}

      {description && (
        <motion.p
          className="mb-6 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </motion.section>
  )
}
