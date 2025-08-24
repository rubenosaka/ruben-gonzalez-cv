import type { CVService } from '@/application/services/CVService'
import type { ProjectService } from '@/application/services/ProjectService'
import type { PageService } from '@/application/services/PageService'
import type { PostService } from '@/application/services/PostService'
import type { CVExportService } from '@/application/services/CVExportService'
import type { CVRepository } from '@/application/interfaces/CVRepository'
import type { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import type { PageRepository } from '@/application/interfaces/PageRepository'
import type { PostRepository } from '@/application/interfaces/PostRepository'
import type { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'

export interface DependencyContainer {
  getCVService(): CVService
  getProjectService(): ProjectService
  getPageService(): PageService
  getPostService(): PostService
  getCVExportService(): CVExportService
  getCVRepository(): CVRepository
  getProjectRepository(): ProjectRepository
  getPageRepository(): PageRepository
  getPostRepository(): PostRepository
  getCVPdfGenerator(): CVPdfGenerator
}

export interface IServiceFactories {
  createCVService(cvRepository: CVRepository): CVService
  createProjectService(projectRepository: ProjectRepository): ProjectService
  createPageService(pageRepository: PageRepository): PageService
  createPostService(postRepository: PostRepository): PostService
  createCVExportService(cvService: CVService, cvPdfGenerator: CVPdfGenerator): CVExportService
}
