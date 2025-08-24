import { CVRepository } from '@/application/interfaces/CVRepository'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import { PageRepository } from '@/application/interfaces/PageRepository'
import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'
import { PageService } from '@/application/services/PageService'
import { CVExportService } from '@/application/services/CVExportService'
import { MDXCVRepository } from '@/infrastructure/repositories/MDXCVRepository'
import { MDXProjectRepository } from '@/infrastructure/repositories/MDXProjectRepository'
import { MDXPageRepository } from '@/infrastructure/repositories/MDXPageRepository'
import { ReactPdfCVGenerator } from '@/infrastructure/pdf/ReactPdfCVGenerator'
import { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'

export class DependencyContainer {
  private static instance: DependencyContainer
  private cvRepository: CVRepository
  private projectRepository: ProjectRepository
  private pageRepository: PageRepository
  private cvPdfGenerator: CVPdfGenerator
  private cvService: CVService
  private projectService: ProjectService
  private pageService: PageService
  private cvExportService: CVExportService

  private constructor() {
    this.cvRepository = new MDXCVRepository()
    this.projectRepository = new MDXProjectRepository()
    this.pageRepository = new MDXPageRepository()
    this.cvPdfGenerator = new ReactPdfCVGenerator()

    this.cvService = new CVService(this.cvRepository)
    this.projectService = new ProjectService(this.projectRepository)
    this.pageService = new PageService(this.pageRepository)
    this.cvExportService = new CVExportService(
      this.cvService,
      this.cvPdfGenerator
    )
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer()
    }
    return DependencyContainer.instance
  }

  getCVService(): CVService {
    return this.cvService
  }

  getProjectService(): ProjectService {
    return this.projectService
  }

  getPageService(): PageService {
    return this.pageService
  }

  getCVExportService(): CVExportService {
    return this.cvExportService
  }

  getCVRepository(): CVRepository {
    return this.cvRepository
  }

  getProjectRepository(): ProjectRepository {
    return this.projectRepository
  }

  getPageRepository(): PageRepository {
    return this.pageRepository
  }

  getCVPdfGenerator(): CVPdfGenerator {
    return this.cvPdfGenerator
  }
}
