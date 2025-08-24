import { allPages } from 'contentlayer/generated'
import { Page, PageMetadata } from '@/domain/entities/Page'
import { PageRepository } from '@/application/interfaces/PageRepository'

export class ContentlayerPageRepository implements PageRepository {
  async findAll(): Promise<Page[]> {
    return allPages.map(this.mapToPage)
  }

  async findById(id: string): Promise<Page | null> {
    const page = allPages.find(p => p._id === id)
    return page ? this.mapToPage(page) : null
  }

  async findByUrl(url: string): Promise<Page | null> {
    const page = allPages.find(p => p.url === url)
    return page ? this.mapToPage(page) : null
  }

  async search(query: string): Promise<Page[]> {
    const lowercaseQuery = query.toLowerCase()
    return allPages
      .filter(page => 
        page.title.toLowerCase().includes(lowercaseQuery) ||
        page.description?.toLowerCase().includes(lowercaseQuery) ||
        page.body.raw.toLowerCase().includes(lowercaseQuery)
      )
      .map(this.mapToPage)
  }

  private mapToPage(contentlayerPage: any): Page {
    const metadata: PageMetadata = {
      title: contentlayerPage.title,
      description: contentlayerPage.description
    }

    return Page.create(
      contentlayerPage._id,
      metadata,
      contentlayerPage.body.raw,
      contentlayerPage.url
    )
  }
}
