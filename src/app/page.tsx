import type { Metadata } from 'next'
import { DependencyContainer } from '@/infrastructure/container/di'
import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'
import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { ProjectCard } from '@/components/ProjectCard'
import { TrinukiBanner } from '@/app/components/TrinukiBanner'

export const metadata: Metadata = {
  title: 'Rubén García Alonso - Senior Full Stack Developer',
  description:
    'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
  keywords: [
    'Full Stack Developer',
    'React',
    'TypeScript',
    'Node.js',
    'Clean Architecture',
  ],
  authors: [{ name: 'Rubén García Alonso' }],
  openGraph: {
    title: 'Rubén García Alonso - Senior Full Stack Developer',
    description:
      'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubén García Alonso - Senior Full Stack Developer',
    description:
      'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
  },
}

export default async function HomePage() {
  const container = DependencyContainer.getInstance()
  const cvService = container.getCVService()
  const projectService = container.getProjectService()

  const cv = await cvService.getCV()
  const projects = await projectService.listProjects()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cv.name,
    jobTitle: cv.title,
    email: cv.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cv.location,
    },
    description: cv.summary,
    knowsAbout: [
      'React',
      'TypeScript',
      'Node.js',
      'Clean Architecture',
      'Domain-Driven Design',
      'SOLID Principles',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Senior Full Stack Developer',
      description:
        'Building scalable web applications with modern technologies',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout>
        <AnimatedHero name={cv.name} title={cv.title} />

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TrinukiBanner variant="home" />
            {projects.slice(0, 4).map((project: any, index: number) => (
              <ProjectCard
                key={project.slug.value}
                title={project.title.value}
                summary={project.summary.value}
                tags={project.stack}
                href={`/projects/${project.slug.value}`}
                role={project.role}
                period={project.period}
                links={project.links}
              />
            ))}
          </div>
        </section>
      </PageLayout>
    </>
  )
}
