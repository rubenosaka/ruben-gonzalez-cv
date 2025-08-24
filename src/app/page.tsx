import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DependencyContainer } from '@/infrastructure/container/di'

export const metadata: Metadata = {
  title: 'Rubén González Aranda - Full Stack Developer',
  description: 'Senior Full Stack Developer specializing in React, TypeScript, and clean architecture. View my CV, projects, and professional experience.',
}

export default async function HomePage() {
  const container = DependencyContainer.getInstance()
  const projectService = container.getProjectService()
  
  const projects = await projectService.listProjects()
  const featuredProject = projects.length > 0 ? projects[0] : null
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Rubén González Aranda
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Senior Full Stack Developer
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Passionate about clean architecture, domain-driven design, and creating exceptional digital experiences with modern web technologies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/cv" aria-label="View my CV">
                View CV
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects" aria-label="Browse my projects">
                Projects
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link 
              href="/about" 
              className="hover:text-foreground transition-colors"
              aria-label="Learn more about me"
            >
              About
            </Link>
            <Link 
              href="/now" 
              className="hover:text-foreground transition-colors"
              aria-label="See what I'm working on now"
            >
              Now
            </Link>
            <a 
              href="mailto:rubenosaka@gmail.com" 
              className="hover:text-foreground transition-colors"
              aria-label="Send me an email"
            >
              Contact
            </a>
          </div>
        </section>
        
        {featuredProject && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Project</h2>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{featuredProject.title.value}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{featuredProject.role}</span>
                    <span>•</span>
                    <span>{featuredProject.period}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {featuredProject.summary.value}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {featuredProject.stack.length > 4 && (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                      +{featuredProject.stack.length - 4} more
                    </span>
                  )}
                </div>
                
                <Button asChild>
                  <Link href={`/projects/${featuredProject.slug.value}`}>
                    View Project
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  )
}
