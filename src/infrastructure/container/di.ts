import { CVRepository } from '@/application/interfaces/CVRepository'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import { PageRepository } from '@/application/interfaces/PageRepository'
import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'
import { PageService } from '@/application/services/PageService'
import { ContentlayerCVRepository } from '@/infrastructure/repositories/ContentlayerCVRepository'
import { ContentlayerProjectRepository } from '@/infrastructure/repositories/ContentlayerProjectRepository'
import { ContentlayerPageRepository } from '@/infrastructure/repositories/ContentlayerPageRepository'

export class DependencyContainer {
  private static instance: DependencyContainer
  private cvRepository: CVRepository
  private projectRepository: ProjectRepository
  private pageRepository: PageRepository
  private cvService: CVService
  private projectService: ProjectService
  private pageService: PageService

  private constructor() {
    this.cvRepository = new ContentlayerCVRepository()
    this.projectRepository = new ContentlayerProjectRepository()
    this.pageRepository = new ContentlayerPageRepository()
    
    this.cvService = new CVService(this.cvRepository)
    this.projectService = new ProjectService(this.projectRepository)
    this.pageService = new PageService(this.pageRepository)
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

  getCVRepository(): CVRepository {
    return this.cvRepository
  }

  getProjectRepository(): ProjectRepository {
    return this.projectRepository
  }

  getPageRepository(): PageRepository {
    return this.pageRepository
  }
}
