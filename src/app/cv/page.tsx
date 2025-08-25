import { DependencyContainer } from '@/infrastructure/container/di'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/MDXContent'
import { PageLayout } from '@/components/PageLayout'
import { Timeline } from '@/components/Timeline'
import { CVHeader } from '@/components/cv/CVHeader'

export default async function CVPage() {
  const container = DependencyContainer.getInstance()
  const cvService = container.getCVService()

  try {
    const cv = await cvService.getCV()

    const timelineItems = [
      {
        year: '2021 - Present',
        role: 'Engineering Manager',
        company: 'Frenetic.ai',
      },
      {
        year: '2019 - 2021',
        role: 'Team Lead / Full-Stack Developer',
        company: 'Isobar Spain (Dentsu Group)',
      },
      {
        year: '2017 - 2019',
        role: 'Senior Full-Stack Developer',
        company: 'Digital Agencies',
      },
      {
        year: '2015 - 2017',
        role: 'Full-Stack Developer',
        company: 'Startups & Freelance',
      },
      {
        year: '2010 - 2015',
        role: 'Web Developer',
        company: 'Various Companies',
      },
    ]

    return (
      <PageLayout>
        <div className="mx-auto max-w-4xl">
          <CVHeader
            name={cv.name}
            title={cv.title}
            location={cv.location}
            email={cv.email}
            summary={cv.summary}
          />

          <Timeline items={timelineItems} />

          <div className="mt-12">
            <MDXContent source={cv.content} format={cv.format} />
          </div>
        </div>
      </PageLayout>
    )
  } catch (error) {
    notFound()
  }
}
