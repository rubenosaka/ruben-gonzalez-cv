import type { Metadata } from 'next'
import { DependencyContainer } from '@/infrastructure/container/di'
import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'

export const metadata: Metadata = {
  title: 'Rubén García Alonso - Senior Full Stack Developer',
  description: 'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
  keywords: ['Full Stack Developer', 'React', 'TypeScript', 'Node.js', 'Clean Architecture'],
  authors: [{ name: 'Rubén García Alonso' }],
  openGraph: {
    title: 'Rubén García Alonso - Senior Full Stack Developer',
    description: 'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubén García Alonso - Senior Full Stack Developer',
    description: 'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
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
      description: 'Building scalable web applications with modern technologies',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{cv.name}</h1>
          <h2 className="text-2xl text-gray-600 mb-4">{cv.title}</h2>
          <p className="text-lg text-gray-700 mb-6">{cv.summary}</p>
          <div className="flex gap-4">
            <a
              href="/cv"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              aria-label="View full CV"
            >
              View CV
            </a>
            <a
              href="/projects"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
              aria-label="View projects"
            >
              View Projects
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project: any) => (
              <article
                key={project.slug.value}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title.value}</h3>
                <p className="text-gray-600 mb-4">{project.summary.value}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.slice(0, 3).map((tech: string) => (
                    <span
                      key={tech}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={`/projects/${project.slug.value}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label={`View details of ${project.title.value}`}
                >
                  View Details →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
