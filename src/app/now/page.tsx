import { notFound } from 'next/navigation'
import { DependencyContainer } from '@/infrastructure/container/di'
import { MarkdownContent } from '@/components/MarkdownContent'
import { Slug } from '@/domain/value-objects/Slug'

export default async function NowPage() {
  const container = DependencyContainer.getInstance()
  const pageService = container.getPageService()

  const page = await pageService.getPageBySlug(Slug.create('now'))

  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{page.title.value}</h1>
        </header>

        <MarkdownContent content={page.content} />
      </div>
    </div>
  )
}
