import { PageService } from '../PageService'
import type { PageRepository } from '@/application/interfaces/PageRepository'
import { Page } from '@/domain/entities/Page'
import { Title } from '@/domain/value-objects/Title'
import { Slug } from '@/domain/value-objects/Slug'

class MockPageRepository implements PageRepository {
  private pages: Page[] = []

  constructor(pages: Page[] = []) {
    this.pages = pages
  }

  async getPageBySlug(slug: Slug): Promise<Page | null> {
    return this.pages.find(p => p.title.value.toLowerCase() === slug.value) ?? null
  }
}

describe('PageService', () => {
  const mockPage = Page.create(
    { title: Title.create('About') },
    'About page content'
  )

  it('should get page by slug', async () => {
    const mockRepo = new MockPageRepository([mockPage])
    const service = new PageService(mockRepo)

    const result = await service.getPageBySlug('about')

    expect(result).toBe(mockPage)
  })

  it('should return null for non-existent page', async () => {
    const mockRepo = new MockPageRepository([mockPage])
    const service = new PageService(mockRepo)

    const result = await service.getPageBySlug('non-existent')

    expect(result).toBeNull()
  })

  it('should handle case-insensitive slug matching', async () => {
    const mockRepo = new MockPageRepository([mockPage])
    const service = new PageService(mockRepo)

    const result = await service.getPageBySlug('ABOUT')

    expect(result).toBe(mockPage)
  })
})
