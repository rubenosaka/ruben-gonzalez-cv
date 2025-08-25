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
              {projects.map((project, index) => {
          const props: any = {
            title: project.title,
            summary: project.summary,
            tags: project.stack,
            href: `/projects/${project.slug}`,
            links: project.links || [],
          }
          
          if (project.role) props.role = project.role
          if (project.period) props.period = project.period
          
          return <ProjectCard key={project.slug} {...props} />
        })}
    </div>
  )
}
