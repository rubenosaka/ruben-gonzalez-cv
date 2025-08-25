import { DependencyContainer } from '@/infrastructure/container/di'
import { PageLayout } from '@/components/PageLayout'
import { ProjectsGrid } from '@/components/ProjectsGrid'

export default async function ProjectsPage() {
  const container = DependencyContainer.getInstance()
  const projectService = container.getProjectService()

  const projects = await projectService.listProjects()

  return (
    <PageLayout>
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Projects</h1>
        <p className="text-xl text-muted-foreground">
          A collection of projects I've worked on, showcasing my skills and
          experience.
        </p>
      </header>

      <ProjectsGrid
        projects={projects.map((project) => ({
          slug: project.slug.value,
          title: project.title.value,
          summary: project.summary.value || '',
          stack: [...project.stack],
          role: project.role,
          period: project.period,
          links: project.links ? [...project.links] : [],
        }))}
      />
    </PageLayout>
  )
}
