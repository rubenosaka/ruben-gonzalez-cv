import type { Metadata } from 'next'
import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'
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

export default function HomePage() {
  const cvService = new CVService()
  const projectService = new ProjectService()

  const cv = cvService.getCV()
  const allProjects = projectService.listProjects()

  const featuredProjects = allProjects
    .filter((project: any) => project.slug === 'frenetic')
    .map((project: any) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      stack: project.tags,
      links: project.links || [],
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: cv.metadata.name,
    jobTitle: cv.metadata.title,
    email: cv.metadata.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cv.metadata.location,
    },
    description: cv.metadata.summary,
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
        <AnimatedHero
          title={cv.metadata.name}
          subtitle={cv.metadata.title}
          description={cv.metadata.summary}
        />

        <ProjectsSection projects={featuredProjects} />
      </PageLayout>
    </>
  )
}
