import { notFound } from 'next/navigation'
import { DependencyContainer } from '@/infrastructure/container/di'
import { MarkdownContent } from '@/components/MarkdownContent'
import { PageLayout } from '@/components/PageLayout'
import { Slug } from '@/domain/value-objects/Slug'

export default async function AboutPage() {
  const container = DependencyContainer.getInstance()
  const pageService = container.getPageService()

  const page = await pageService.getPageBySlug(Slug.create('about-me'))

  if (!page) {
    notFound()
  }

  return (
    <PageLayout>
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{page.title.value}</h1>
      </header>

      <MarkdownContent content={page.content} />
    </PageLayout>
  )
}
