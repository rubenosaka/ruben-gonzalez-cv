import { DependencyContainer } from '@/infrastructure/container/di'
import { notFound } from 'next/navigation'
import { DownloadCVButton } from '@/app/components/DownloadCVButton'
import { MarkdownContent } from '@/components/MarkdownContent'

export default async function CVPage() {
  const container = DependencyContainer.getInstance()
  const cvService = container.getCVService()

  try {
    const cv = await cvService.getCV()

    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="prose prose-gray max-w-none dark:prose-invert">
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

          <MarkdownContent content={cv.content} />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
