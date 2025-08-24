import { CVService } from '@/application/services/CVService'
import { ProjectService } from '@/application/services/ProjectService'
import { PageService } from '@/application/services/PageService'
import { PostService } from '@/application/services/PostService'
import { CVExportService } from '@/application/services/CVExportService'
import { MDXCVRepository } from '@/infrastructure/repositories/MDXCVRepository'
import { MDXProjectRepository } from '@/infrastructure/repositories/MDXProjectRepository'
import { MDXPageRepository } from '@/infrastructure/repositories/MDXPageRepository'
import { MDXPostRepository } from '@/infrastructure/repositories/MDXPostRepository'
import { ReactPdfCVGenerator } from '@/infrastructure/pdf/ReactPdfCVGenerator'
import type { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'
import type { DependencyContainer as IDependencyContainer, IServiceFactories } from './types'

export class DependencyContainer implements IDependencyContainer {
  private static instance: DependencyContainer | null = null
  private readonly cvRepository: MDXCVRepository
  private readonly projectRepository: MDXProjectRepository
  private readonly pageRepository: MDXPageRepository
  private readonly postRepository: MDXPostRepository
  private readonly cvPdfGenerator: CVPdfGenerator
  private readonly cvService: CVService
  private readonly projectService: ProjectService
  private readonly pageService: PageService
  private readonly postService: PostService
  private readonly cvExportService: CVExportService

  private constructor() {
    this.cvRepository = new MDXCVRepository()
    this.projectRepository = new MDXProjectRepository()
    this.pageRepository = new MDXPageRepository()
    this.postRepository = new MDXPostRepository()
    this.cvPdfGenerator = new ReactPdfCVGenerator()

    this.cvService = ServiceFactories.createCVService(this.cvRepository)
    this.projectService = ServiceFactories.createProjectService(this.projectRepository)
    this.pageService = ServiceFactories.createPageService(this.pageRepository)
    this.postService = ServiceFactories.createPostService(this.postRepository)
    this.cvExportService = ServiceFactories.createCVExportService(
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

  getPostService(): PostService {
    return this.postService
  }

  getCVExportService(): CVExportService {
    return this.cvExportService
  }

  getCVRepository(): MDXCVRepository {
    return this.cvRepository
  }

  getProjectRepository(): MDXProjectRepository {
    return this.projectRepository
  }

  getPageRepository(): MDXPageRepository {
    return this.pageRepository
  }

  getPostRepository(): MDXPostRepository {
    return this.postRepository
  }

  getCVPdfGenerator(): CVPdfGenerator {
    return this.cvPdfGenerator
  }
}

export const ServiceFactories: IServiceFactories = {
  createCVService(cvRepository) {
    return new CVService(cvRepository)
  },

  createProjectService(projectRepository) {
    return new ProjectService(projectRepository)
  },

  createPageService(pageRepository) {
    return new PageService(pageRepository)
  },

  createPostService(postRepository) {
    return new PostService(postRepository)
  },

  createCVExportService(cvService, cvPdfGenerator) {
    return new CVExportService(cvService, cvPdfGenerator)
  }
}
