import { ProjectService } from '@/application/services/ProjectService'
import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { ProjectsGrid } from '@/components/ProjectsGrid'

export default function ProjectsPage() {
  const projectService = new ProjectService()
  const projects = projectService.listProjects()

  return (
    <PageLayout>
      <AnimatedHero title="Projects" />

      <ProjectsGrid
        projects={projects.map((project: any) => ({
          slug: project.slug,
          title: project.title,
          summary: project.summary,
          stack: project.tags,
          links: project.links || [],
        }))}
      />
    </PageLayout>
  )
}
