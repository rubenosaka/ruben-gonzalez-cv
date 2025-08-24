import type { Metadata } from 'next'
import { DependencyContainer } from '@/infrastructure/container/di'
import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'
import { PageLayout } from '@/components/PageLayout'

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
        <section className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">{cv.name}</h1>
          <h2 className="mb-4 text-2xl text-gray-600">{cv.title}</h2>
          <p className="mb-6 text-lg text-gray-700">{cv.summary}</p>
          <div className="flex gap-4">
            <a
              href="/cv"
              className="rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              aria-label="View full CV"
            >
              View CV
            </a>
            <a
              href="/projects"
              className="rounded bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700"
              aria-label="View projects"
            >
              View Projects
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project: any) => (
              <article
                key={project.slug.value}
                className="rounded-lg border p-6 transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 text-xl font-semibold">
                  {project.title.value}
                </h3>
                <p className="mb-4 text-gray-600">{project.summary.value}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded bg-gray-200 px-2 py-1 text-sm text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={`/projects/${project.slug.value}`}
                  className="text-blue-600 transition-colors hover:text-blue-800"
                  aria-label={`View details of ${project.title.value}`}
                >
                  View Details →
                </a>
              </article>
            ))}
          </div>
        </section>
      </PageLayout>
    </>
  )
}
