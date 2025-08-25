'use client'

import { ProjectCard } from './ProjectCard'
import { TrinukiBanner } from './TrinukiBanner'

interface ProjectsGridProps {
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

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <TrinukiBanner variant="project" />
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          title={project.title}
          summary={project.summary}
          tags={project.stack}
          href={`/projects/${project.slug}`}
          role={project.role}
          period={project.period}
          links={project.links || []}
        />
      ))}
    </div>
  )
}
