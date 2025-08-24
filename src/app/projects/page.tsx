import Link from 'next/link'
import { DependencyContainer } from '@/infrastructure/container/di'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/PageLayout'

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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.slug.value}
            className="transition-shadow hover:shadow-lg"
          >
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
              <p className="mb-4 line-clamp-3 text-muted-foreground">
                {project.summary.value}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                    +{project.stack.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {project.links.map((link) => (
                  <Button key={link.label} asChild size="sm" variant="outline">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </Button>
                ))}

                {/* Temporarily commented until we have detailed project pages */}
                {/* <Button asChild size="sm">
                  <Link href={`/projects/${project.slug.value}`}>
                    View Project
                  </Link>
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
