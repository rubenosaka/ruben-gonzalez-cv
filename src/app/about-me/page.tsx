import { notFound } from 'next/navigation'
import { PageService } from '@/application/services/PageService'
import { PageLayout } from '@/components/PageLayout'

export default function AboutPage() {
  const pageService = new PageService()
  const page = pageService.getPageBySlug('about-me')

  if (!page) {
    notFound()
  }

  return (
    <PageLayout>
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{page.title}</h1>
      </header>

      <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
    </PageLayout>
  )
}
