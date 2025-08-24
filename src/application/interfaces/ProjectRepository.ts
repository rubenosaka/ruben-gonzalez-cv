import { Project } from '@/domain/entities/Project'
import { Slug } from '@/domain/value-objects/Slug'

export interface ProjectRepository {
  listProjects(): Promise<Project[]>
  getProjectBySlug(slug: Slug): Promise<Project | null>
}
