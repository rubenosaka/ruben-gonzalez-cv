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
    return this.pages.find((p) => p.slug.value === slug.value) ?? null
  }

  async getAllPages(): Promise<Page[]> {
    return this.pages
  }
}

describe('PageService', () => {
  const mockPage = Page.create(
    {
      title: Title.create('About Me'),
      slug: Slug.create('about-me'),
      description: 'About Me page',
    },
    'About Me page content'
  )

  it('should get page by slug', async () => {
    const mockRepo = new MockPageRepository([mockPage])
    const service = new PageService(mockRepo)

    const result = await service.getPageBySlug(Slug.create('about-me'))

    expect(result).toBe(mockPage)
  })

  it('should return null for non-existent page', async () => {
    const mockRepo = new MockPageRepository([mockPage])
    const service = new PageService(mockRepo)

    const result = await service.getPageBySlug(Slug.create('non-existent'))

    expect(result).toBeNull()
  })

  it('should get all pages', async () => {
    const mockRepo = new MockPageRepository([mockPage])
    const service = new PageService(mockRepo)

    const result = await service.getAllPages()

    expect(result).toEqual([mockPage])
  })
})
