import { PostRepository } from '@/application/interfaces/PostRepository'
import { PageRepository } from '@/application/interfaces/PageRepository'
import { PostService } from '@/application/services/PostService'
import { PageService } from '@/application/services/PageService'
import { MDXPostRepository } from '@/infrastructure/repositories/MDXPostRepository'
import { MDXPageRepository } from '@/infrastructure/repositories/MDXPageRepository'

export class DependencyContainer {
  private static instance: DependencyContainer
  private postRepository: PostRepository
  private pageRepository: PageRepository
  private postService: PostService
  private pageService: PageService

  private constructor() {
    this.postRepository = new MDXPostRepository()
    this.pageRepository = new MDXPageRepository()
    this.postService = new PostService(this.postRepository)
    this.pageService = new PageService(this.pageRepository)
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer()
    }
    return DependencyContainer.instance
  }

  getPostService(): PostService {
    return this.postService
  }

  getPageService(): PageService {
    return this.pageService
  }

  getPostRepository(): PostRepository {
    return this.postRepository
  }

  getPageRepository(): PageRepository {
    return this.pageRepository
  }
}
