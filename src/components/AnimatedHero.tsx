'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface AnimatedHeroProps {
  name: string
  title: string
}

export function AnimatedHero({ name, title }: AnimatedHeroProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="mb-4 bg-gradient-to-r from-pink-500 to-purple-900 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {name}
      </motion.h1>

      <motion.h2
        className="mb-4 text-2xl text-gray-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="mb-6 text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Engineering Manager with over 18 years of experience leading teams and
        building digital products.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button asChild size="lg">
          <a href="/cv">View CV</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="/projects">View Projects</a>
        </Button>
      </motion.div>
    </motion.section>
  )
}
