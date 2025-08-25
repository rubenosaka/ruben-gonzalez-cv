'use client'

import { motion } from 'framer-motion'
import { SkillPill } from './SkillPill'

interface ProjectCardProps {
  title: string
  summary: string
  tags: string[]
  href: string
  role?: string
  period?: string
  links?: Array<{ label: string; url: string }>
}

export function ProjectCard({
  title,
  summary,
  tags,
  href,
  role,
  period,
  links,
}: ProjectCardProps) {
  return (
    <motion.article
      className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>

      {(role || period) && (
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          {role && <span>{role}</span>}
          {role && period && <span>•</span>}
          {period && <span>{period}</span>}
        </div>
      )}

      <p className="mb-4 text-muted-foreground">{summary}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <SkillPill key={tag}>{tag}</SkillPill>
        ))}
        {tags.length > 3 && (
          <SkillPill className="text-xs">+{tags.length - 3} more</SkillPill>
        )}
      </div>

      <div className="flex gap-2">
        {links?.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary transition-colors hover:text-primary/80"
          >
            {link.label}
          </a>
        ))}

        <a
          href={href}
          className="text-sm text-primary transition-colors hover:text-primary/80"
        >
          View Details →
        </a>
      </div>
    </motion.article>
  )
}
