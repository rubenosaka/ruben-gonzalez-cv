import { pages } from '@/content/pages.data'

export class PageService {
  getPageBySlug(slug: string) {
    return pages.find(page => page.slug === slug) || null
  }

  getAllPages() {
    return pages
  }

  searchPages(query: string) {
    return pages.filter(page => 
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.excerpt?.toLowerCase().includes(query.toLowerCase())
    )
  }
}
