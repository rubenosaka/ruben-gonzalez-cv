'use client'

import { ProjectCard } from './ProjectCard'
import { TrinukiBanner } from './TrinukiBanner'
import { FreneticBanner } from './FreneticBanner'
import { CodeComment } from './CodeComment'

interface ProjectsSectionProps {
  projects: Array<{
    slug: string
    title: string
    summary: string
    stack: string[]
    role?: string
    period?: string
    links?: Array<{ label: string; url: string }>
  }>
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="mb-12">
      <h2 className=" text-3xl font-bold">Featured Projects</h2>
      <CodeComment>
        Ignore this… or maybe don’t 🤔, anyway...enjoy my portfolio
      </CodeComment>
      <div className="mt-2 space-y-6">
        <TrinukiBanner variant="home" />
        <FreneticBanner variant="home" />
      </div>
    </section>
  )
}
