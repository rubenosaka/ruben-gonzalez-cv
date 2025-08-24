import { DependencyContainer } from '@/infrastructure/container/di'
import { PageLayout } from '@/components/PageLayout'
import { TrinukiBanner } from '@/app/components/TrinukiBanner'

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
        <TrinukiBanner variant="project" />
        {projects.slice(0, 3).map((project, index) => (
          <div
            key={project.slug.value}
            className="rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold">
              {project.title.value || 'Project'}
            </h3>

            {(project.role || project.period) && (
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                {project.role && <span>{project.role}</span>}
                {project.role && project.period && <span>•</span>}
                {project.period && <span>{project.period}</span>}
              </div>
            )}

            <p className="mb-4 text-muted-foreground">
              {project.summary.value || ''}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {project.stack.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
              {project.stack.length > 3 && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  +{project.stack.length - 3} more
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {project.links?.map((link) => (
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
                href={`/projects/${project.slug.value}`}
                className="text-sm text-primary transition-colors hover:text-primary/80"
              >
                View Details →
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
