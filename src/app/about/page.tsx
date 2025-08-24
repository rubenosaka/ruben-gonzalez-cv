import { notFound } from 'next/navigation'
import { DependencyContainer } from '@/infrastructure/container/di'
import { MDXContent } from '@/components/MDXContent'

export default async function AboutPage() {
  const container = DependencyContainer.getInstance()
  const pageService = container.getPageService()
  
  const page = await pageService.getPageBySlug('about')
  
  if (!page) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{page.title.value}</h1>
        </header>
        
        <MDXContent content={page.content} />
      </div>
    </div>
  )
}
