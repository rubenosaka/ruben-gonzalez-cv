import { notFound } from 'next/navigation'
import { DependencyContainer } from '@/infrastructure/container/di'
import { MDXContent } from '@/components/MDXContent'
import { Button } from '@/components/ui/button'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const container = DependencyContainer.getInstance()
  const projectService = container.getProjectService()
  
  const project = await projectService.getProjectBySlug(params.slug)
  
  if (!project) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <a href="/projects">← Back to Projects</a>
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{project.title.value}</h1>
          <p className="text-xl text-muted-foreground mb-4">{project.summary.value}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span>{project.role}</span>
            <span>•</span>
            <span>{project.period}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {project.links.length > 0 && (
            <div className="flex gap-3">
              {project.links.map((link) => (
                <Button key={link.label} variant="outline" asChild>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXContent content={project.content} />
        </div>
      </div>
    </div>
  )
}
