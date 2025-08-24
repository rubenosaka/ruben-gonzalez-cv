import { Page } from '@/domain/entities/Page'
import { Slug } from '@/domain/value-objects/Slug'
import { PageRepository } from '@/application/interfaces/PageRepository'

export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}

  async getPageBySlug(slug: Slug): Promise<Page | null> {
    return this.pageRepository.getPageBySlug(slug)
  }

  async getAllPages(): Promise<Page[]> {
    return this.pageRepository.getAllPages()
  }

  async searchPages(query: string): Promise<Page[]> {
    // Since we don't have a search method in the repository,
    // we'll need to implement it or modify the hook
    return []
  }
}
