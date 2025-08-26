import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProjectService } from '@/application/services/ProjectService'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/PageLayout'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projectService = new ProjectService()
  const project = projectService.getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <PageLayout>
      <header className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">← Back to Projects</Link>
          </Button>
        </div>

        <h1 className="mb-2 text-4xl font-bold">{project.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{project.summary}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
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

      <div dangerouslySetInnerHTML={{ __html: project.bodyHtml }} />
    </PageLayout>
  )
}
