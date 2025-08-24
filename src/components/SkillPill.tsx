import { ReactNode } from 'react'

interface SkillPillProps {
  children: ReactNode
  className?: string
}

export function SkillPill({ children, className = '' }: SkillPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground ${className}`}
    >
      {children}
    </span>
  )
}
