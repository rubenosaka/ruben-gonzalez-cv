import type { Metadata } from 'next'
import { DependencyContainer } from '@/infrastructure/container/di'
import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { ProjectsSection } from '@/components/ProjectsSection'

export const metadata: Metadata = {
  title: 'Rubén González Aranda - Senior Full Stack Developer',
  description:
    'Experienced developer with 18+ years building scalable web applications using modern technologies and clean architecture principles.',
  keywords: [
    'Full Stack Developer',
    'React',
    'TypeScript',
    'Node.js',
    'Clean Architecture',
  ],
  authors: [{ name: 'Rubén González Aranda' }],
  openGraph: {
    title: 'Rubén González Aranda - Senior Full Stack Developer',
    description:
      'Experienced developer with 18+ years building scalable web applications using modern technologies and clean architecture principles.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubén González Aranda - Senior Full Stack Developer',
    description:
      'Experienced developer with 18+ years building scalable web applications using modern technologies and clean architecture principles.',
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

        <ProjectsSection
          projects={projects.map((project) => ({
            slug: project.slug.value,
            title: project.title.value,
            summary: project.summary.value || '',
            stack: [...project.stack],
            role: project.role,
            period: project.period,
            links: [...project.links],
          }))}
        />
      </PageLayout>
    </>
  )
}
