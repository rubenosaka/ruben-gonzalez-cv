import { ProjectService } from '../ProjectService'

describe('ProjectService', () => {
  let projectService: ProjectService

  beforeEach(() => {
    projectService = new ProjectService()
  })

  describe('listProjects', () => {
    it('should return all projects', () => {
      const result = projectService.listProjects()

      expect(result).toHaveLength(4)
      expect(result[0].slug).toBe('frenetic')
      expect(result[1].slug).toBe('msd-spain')
      expect(result[2].slug).toBe('otras-politicas')
      expect(result[3].slug).toBe('psd')
    })
  })

  describe('getProjectBySlug', () => {
    it('should return a project when found', () => {
      const result = projectService.getProjectBySlug('frenetic')

      expect(result).toBeDefined()
      expect(result?.slug).toBe('frenetic')
      expect(result?.title).toBe('Frenetic.ai')
    })

    it('should return null when project not found', () => {
      const result = projectService.getProjectBySlug('non-existent')

      expect(result).toBeNull()
    })
  })

  describe('searchProjects', () => {
    it('should return projects matching title query', () => {
      const result = projectService.searchProjects('Frenetic')

      expect(result).toHaveLength(1)
      expect(result[0].slug).toBe('frenetic')
    })

    it('should return projects matching tag query', () => {
      const result = projectService.searchProjects('Healthcare')

      expect(result).toHaveLength(1)
      expect(result[0].slug).toBe('msd-spain')
    })

    it('should return empty array when no matches', () => {
      const result = projectService.searchProjects('non-existent')

      expect(result).toHaveLength(0)
    })
  })
})
