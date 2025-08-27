import type { Metadata } from 'next'
import { ResumeService } from '@/application/services/ResumeService'
import { ProjectService } from '@/application/services/ProjectService'
import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { ProjectsSection } from '@/components/ProjectsSection'
import { NewsSection } from '@/components/NewsSection'
import { CodeComment } from '@/components/CodeComment'
import type { Project } from '@/types/project'

export const metadata: Metadata = {
  title:
    'Rubén González Aranda - Engineering Manager · Product-focused Tech Lead · AI-driven Builder',
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
    title:
      'Rubén González Aranda - Engineering Manager · Product-focused Tech Lead · AI-driven Builder',
    description:
      'Experienced developer with 18+ years building scalable web applications using modern technologies and clean architecture principles.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/ruben-gonzalez-og.webp',
        width: 1200,
        height: 630,
        alt: 'Rubén González Aranda - Engineering Manager · Product-focused Tech Lead · AI-driven Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Rubén González Aranda - Engineering Manager · Product-focused Tech Lead · AI-driven Builder',
    description:
      'Experienced developer with 18+ years building scalable web applications using modern technologies and clean architecture principles.',
    images: ['/ruben-gonzalez-og.webp'],
  },
}

export default function HomePage() {
  const resumeService = new ResumeService()
  const projectService = new ProjectService()

  const resume = resumeService.getResume()
  const allProjects = projectService.listProjects()

  const featuredProjects = allProjects
    .filter((project: Project) => project.slug === 'trinuki' || project.slug === 'frenetic')
    .map((project: Project) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      stack: project.tags,
      links: project.links || [],
    }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resume.metadata.name,
    jobTitle: resume.metadata.title,
    email: resume.metadata.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: resume.metadata.location,
    },
    description: resume.metadata.summary,
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
      name: 'Engineering Manager · Product-focused Tech Lead · AI-driven Builder',
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
          title={resume.metadata.name}
          subtitle={resume.metadata.title}
          description={resume.metadata.summary}
        />
        <CodeComment />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ProjectsSection projects={featuredProjects} />
          </div>
          <div className="lg:col-span-4">
            <NewsSection />
          </div>
        </div>
      </PageLayout>
    </>
  )
}
