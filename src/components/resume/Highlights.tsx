import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Map,
  Timer,
  Bot,
  BarChart3,
  Link2,
  Target,
  LucideIcon,
} from 'lucide-react'

type HighlightIcon =
  | 'teams'
  | 'roadmap'
  | 'efficiency'
  | 'ai'
  | 'analytics'
  | 'cross'
  | 'product'

const ICONS: Record<HighlightIcon, LucideIcon> = {
  teams: Users,
  roadmap: Map,
  efficiency: Timer,
  ai: Bot,
  analytics: BarChart3,
  cross: Link2,
  product: Target,
}

const getIconColor = (color?: string) => {
  if (!color) return 'text-purple-900/20'
  return `text-${color}/20`
}

type HighlightItem = {
  title: string
  description?: string
  icon?: HighlightIcon | undefined
  color?: string | undefined
}

type Props = {
  items: HighlightItem[]
  className?: string
}

export function Highlights({ items, className = '' }: Props) {
  return (
    <ul
      className={[
        'mb-8 grid list-none gap-4 border-b pb-8',
        'md:[grid-template-columns:repeat(2,minmax(0,1fr))]',
        className,
      ].join(' ')}
    >
      {items.map((item, i) => {
        const Icon = item.icon ? ICONS[item.icon] : undefined
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: 'easeOut',
            }}
            className={`relative overflow-hidden rounded-xl border-4 bg-white p-6 shadow-md hover:shadow-lg dark:bg-black ${item.color ? `border-${item.color}` : 'border-black'}`}
          >
            {Icon ? (
              <Icon
                className={`pointer-events-none absolute right-3 top-3 h-20 w-20 ${getIconColor(item.color)}`}
              />
            ) : null}
            <div className="relative z-10">
              <div className="text-base font-semibold text-black dark:text-white sm:text-lg">
                {item.title}
              </div>
              {item.description ? (
                <div className="mt-1 text-sm text-black dark:text-white">
                  {item.description}
                </div>
              ) : null}
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
