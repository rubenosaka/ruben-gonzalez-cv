import { Page } from '@/domain/entities/Page'
import { Slug } from '@/domain/value-objects/Slug'
import { PageRepository } from '@/application/interfaces/PageRepository'

export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}

  async getPageBySlug(slugValue: string): Promise<Page | null> {
    const slug = Slug.create(slugValue)
    return this.pageRepository.getPageBySlug(slug)
  }
}
