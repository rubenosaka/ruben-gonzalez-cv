import { PageService } from '../PageService'

describe('PageService', () => {
  let pageService: PageService

  beforeEach(() => {
    pageService = new PageService()
  })

  describe('getPageBySlug', () => {
    it('should return a page when found', () => {
      const result = pageService.getPageBySlug('about-me')

      expect(result).toBeDefined()
      expect(result?.slug).toBe('about-me')
      expect(result?.title).toBe('About Me')
    })

    it('should return null when page not found', () => {
      const result = pageService.getPageBySlug('non-existent')

      expect(result).toBeNull()
    })
  })

  describe('getAllPages', () => {
    it('should return all pages', () => {
      const result = pageService.getAllPages()

      expect(result).toHaveLength(2)
      expect(result[0].slug).toBe('about-me')
      expect(result[1].slug).toBe('now')
    })
  })

  describe('searchPages', () => {
    it('should return pages matching query', () => {
      const result = pageService.searchPages('About')

      expect(result).toHaveLength(1)
      expect(result[0].slug).toBe('about-me')
    })

    it('should return empty array when no matches', () => {
      const result = pageService.searchPages('non-existent')

      expect(result).toHaveLength(0)
    })
  })
})
