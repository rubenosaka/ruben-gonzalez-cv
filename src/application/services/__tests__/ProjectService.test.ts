import { ProjectService } from '../ProjectService'
import type { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import { Project } from '@/domain/entities/Project'
import { Title } from '@/domain/value-objects/Title'
import { Summary } from '@/domain/value-objects/Summary'
import { Slug } from '@/domain/value-objects/Slug'

class MockProjectRepository implements ProjectRepository {
  private projects: Project[] = []

  constructor(projects: Project[] = []) {
    this.projects = projects
  }

  async listProjects(): Promise<Project[]> {
    return this.projects
  }

  async getProjectBySlug(slug: Slug): Promise<Project | null> {
    return this.projects.find(p => p.slug.value === slug.value) ?? null
  }
}

describe('ProjectService', () => {
  const mockProject = Project.create(
    {
      title: Title.create('Test Project'),
      slug: Slug.create('test-project'),
      role: 'Lead Developer',
      period: '2023-2024',
      stack: ['React', 'TypeScript'],
      links: [{ label: 'Demo', url: 'https://demo.com' }],
      summary: Summary.create('A test project')
    },
    'Test content'
  )

  it('should list all projects', async () => {
    const mockRepo = new MockProjectRepository([mockProject])
    const service = new ProjectService(mockRepo)

    const result = await service.listProjects()

    expect(result).toHaveLength(1)
    expect(result[0]).toBe(mockProject)
  })

  it('should get project by slug', async () => {
    const mockRepo = new MockProjectRepository([mockProject])
    const service = new ProjectService(mockRepo)

    const result = await service.getProjectBySlug('test-project')

    expect(result).toBe(mockProject)
  })

  it('should return null for non-existent project', async () => {
    const mockRepo = new MockProjectRepository([mockProject])
    const service = new ProjectService(mockRepo)

    const result = await service.getProjectBySlug('non-existent')

    expect(result).toBeNull()
  })

  it('should return empty array when no projects exist', async () => {
    const mockRepo = new MockProjectRepository([])
    const service = new ProjectService(mockRepo)

    const result = await service.listProjects()

    expect(result).toHaveLength(0)
  })
})
