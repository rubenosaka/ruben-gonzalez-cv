import { ProjectService } from '@/application/services/ProjectService'
import { PageLayout } from '@/components/PageLayout'
import { ProjectsGrid } from '@/components/ProjectsGrid'

export default function ProjectsPage() {
  const projectService = new ProjectService()
  const projects = projectService.listProjects()

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
