import { DependencyContainer } from '@/infrastructure/container/di'
import { notFound } from 'next/navigation'

export default async function CVPage() {
  const container = DependencyContainer.getInstance()
  const cvService = container.getCVService()
  
  try {
    const cv = await cvService.getCV()
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{cv.name}</h1>
            <p className="text-xl text-muted-foreground mb-2">{cv.title}</p>
            <p className="text-muted-foreground mb-4">{cv.location}</p>
            <p className="text-lg leading-relaxed">{cv.summary}</p>
            <div className="flex gap-4 mt-4">
              <a 
                href={`mailto:${cv.email}`}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {cv.email}
              </a>
            </div>
          </header>
          
          <div 
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: cv.content }}
          />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
