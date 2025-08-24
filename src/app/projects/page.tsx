import Link from 'next/link'
import { DependencyContainer } from '@/infrastructure/container/di'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ProjectsPage() {
  const container = DependencyContainer.getInstance()
  const projectService = container.getProjectService()
  
  const projects = await projectService.listProjects()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A collection of projects I've worked on, showcasing my skills and experience.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.slug.value} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{project.title.value}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{project.role}</span>
                    <span>•</span>
                    <span>{project.period}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.summary.value}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                      +{project.stack.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button asChild size="sm">
                    <Link href={`/projects/${project.slug.value}`}>
                      View Project
                    </Link>
                  </Button>
                  
                  {project.links.length > 0 && project.links[0] && (
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href={project.links[0].url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {project.links[0].label}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
