import type { CVService } from '@/application/services/CVService'
import type { ProjectService } from '@/application/services/ProjectService'
import type { PageService } from '@/application/services/PageService'
import type { CVExportService } from '@/application/services/CVExportService'
import type { CVRepository } from '@/application/interfaces/CVRepository'
import type { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import type { PageRepository } from '@/application/interfaces/PageRepository'
import type { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'

export interface DependencyContainer {
  getCVService(): CVService
  getProjectService(): ProjectService
  getPageService(): PageService
  getCVExportService(): CVExportService
  getCVRepository(): CVRepository
  getProjectRepository(): ProjectRepository
  getPageRepository(): PageRepository
  getCVPdfGenerator(): CVPdfGenerator
}

export interface IServiceFactories {
  createCVService(cvRepository: CVRepository): CVService
  createProjectService(projectRepository: ProjectRepository): ProjectService
  createPageService(pageRepository: PageRepository): PageService
  createCVExportService(
    cvService: CVService,
    cvPdfGenerator: CVPdfGenerator
  ): CVExportService
}
