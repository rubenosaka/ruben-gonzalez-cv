import { Page } from '@/domain/entities/Page'
import { Slug } from '@/domain/value-objects/Slug'

export interface PageRepository {
  getPageBySlug(slug: Slug): Promise<Page | null>
  getAllPages(): Promise<Page[]>
}
