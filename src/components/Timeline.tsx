'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  year: string
  role: string
  company: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-3xl font-bold">Experience</h2>
      
      <div className="relative border-l border-muted pl-6">
        {items.map((item, index) => (
          <motion.div
            key={`${item.company}-${item.year}`}
            className="relative mb-6 last:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-background bg-primary"></div>
            
            <div className="mb-1 text-sm text-muted-foreground">
              {item.year}
            </div>
            
            <div className="font-medium">
              {item.role} · {item.company}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
