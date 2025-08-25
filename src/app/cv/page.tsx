import { DependencyContainer } from '@/infrastructure/container/di'
import { notFound } from 'next/navigation'
import { DownloadCVButton } from '@/app/components/DownloadCVButton'
import { MDXContent } from '@/components/MDXContent'
import { PageLayout } from '@/components/PageLayout'
import { Timeline } from '@/components/Timeline'

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
        <header className="mb-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{cv.name}</h1>
              <p className="mb-2 text-xl text-muted-foreground">{cv.title}</p>
              <p className="mb-4 text-muted-foreground">{cv.location}</p>
            </div>
            <DownloadCVButton />
          </div>
          <p className="text-lg leading-relaxed">{cv.summary}</p>
          <div className="mt-4 flex gap-4">
            <a
              href={`mailto:${cv.email}`}
              className="text-primary transition-colors hover:text-primary/80"
            >
              {cv.email}
            </a>
          </div>
        </header>

        <Timeline items={timelineItems} />

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <MDXContent source={cv.content} format={cv.format} />
        </div>
      </PageLayout>
    )
  } catch (error) {
    notFound()
  }
}
