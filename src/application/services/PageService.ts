import { Page } from '@/domain/entities/Page'
import { Slug } from '@/domain/value-objects/Slug'
import { PageRepository } from '@/application/interfaces/PageRepository'

export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}

  async getPageBySlug(slugValue: string): Promise<Page | null> {
    const slug = Slug.create(slugValue)
    return this.pageRepository.getPageBySlug(slug)
  }

  async getAllPages(): Promise<Page[]> {
    // Since we don't have a getAllPages method in the repository,
    // we'll need to implement it or modify the hook
    return []
  }

  async searchPages(query: string): Promise<Page[]> {
    // Since we don't have a search method in the repository,
    // we'll need to implement it or modify the hook
    return []
  }
}
