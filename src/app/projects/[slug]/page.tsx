import { notFound } from 'next/navigation'
import { DependencyContainer } from '@/infrastructure/container/di'
import { MDXContent } from '@/components/MDXContent'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/PageLayout'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const container = DependencyContainer.getInstance()
  const projectService = container.getProjectService()

  const project = await projectService.getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <PageLayout>
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="/projects">← Back to Projects</a>
          </Button>
        </div>

        <h1 className="mb-2 text-4xl font-bold">
          {project.title.value || 'Project'}
        </h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {project.summary.value || ''}
        </p>

        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{project.role}</span>
          <span>•</span>
          <span>{project.period}</span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="flex gap-3">
            {project.links.map((link) => (
              <Button key={link.label} variant="outline" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </header>

      <MDXContent source={project.content} format="mdx" />
    </PageLayout>
  )
}
