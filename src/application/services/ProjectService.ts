import { Project } from '@/domain/entities/Project'
import { Slug } from '@/domain/value-objects/Slug'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async listProjects(): Promise<Project[]> {
    return this.projectRepository.listProjects()
  }

  async getProjectBySlug(slugValue: string): Promise<Project | null> {
    const slug = Slug.create(slugValue)
    return this.projectRepository.getProjectBySlug(slug)
  }
}
