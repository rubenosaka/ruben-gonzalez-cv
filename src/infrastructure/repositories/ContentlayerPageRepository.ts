import { allPages } from 'contentlayer/generated'
import { Page, PageMetadata } from '@/domain/entities/Page'
import { Title } from '@/domain/value-objects/Title'
import { Slug } from '@/domain/value-objects/Slug'
import { PageRepository } from '@/application/interfaces/PageRepository'

export class ContentlayerPageRepository implements PageRepository {
  async getPageBySlug(slug: Slug): Promise<Page | null> {
    const pageData = allPages.find(p => this.getSlugFromPath(p._raw.flattenedPath) === slug.value)
    
    if (!pageData) {
      return null
    }

    return this.mapToPage(pageData)
  }

  private mapToPage(pageData: any): Page {
    const metadata: PageMetadata = {
      title: Title.create(pageData.title)
    }

    return Page.create(metadata, pageData.body.raw)
  }

  private getSlugFromPath(path: string): string {
    return path.replace('pages/', '')
  }
}
