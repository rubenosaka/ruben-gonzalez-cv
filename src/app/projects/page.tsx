import { DependencyContainer } from '@/infrastructure/container/di'
import { PageLayout } from '@/components/PageLayout'
import { ProjectCard } from '@/components/ProjectCard'

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug.value}
            title={project.title.value || 'Project'}
            summary={project.summary.value || ''}
            tags={[...project.stack]}
            href={`/projects/${project.slug.value}`}
            role={project.role}
            period={project.period}
            links={[...project.links]}
          />
        ))}
      </div>
    </PageLayout>
  )
}
