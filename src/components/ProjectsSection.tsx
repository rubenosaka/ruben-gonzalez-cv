'use client'

import { ProjectCard } from './ProjectCard'
import { TrinukiBanner } from './TrinukiBanner'

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
      <h2 className="mb-6 text-3xl font-bold">Featured Projects</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TrinukiBanner variant="home" />
        {projects.slice(0, 1).map((project: any, index: number) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            summary={project.summary}
            tags={project.stack}
            href={`/projects/${project.slug}`}
            role={project.role}
            period={project.period}
            links={project.links}
          />
        ))}
      </div>
    </section>
  )
}
