import { Post } from '@/domain/entities/Post'
import { Tag } from '@/domain/value-objects/Tag'
import { PostRepository } from '@/application/interfaces/PostRepository'

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.findAll()
  }

  async getPublishedPosts(): Promise<Post[]> {
    return this.postRepository.findPublished()
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findById(id)
  }

  async getPostByUrl(url: string): Promise<Post | null> {
    return this.postRepository.findByUrl(url)
  }

  async getPostsByTag(tagValue: string): Promise<Post[]> {
    const tag = Tag.create(tagValue)
    return this.postRepository.findByTag(tag)
  }

  async getPostsByTags(tagValues: string[]): Promise<Post[]> {
    const tags = tagValues.map(value => Tag.create(value))
    return this.postRepository.findByTags(tags)
  }

  async searchPosts(query: string): Promise<Post[]> {
    if (!query || query.trim().length === 0) {
      return []
    }

    return this.postRepository.search(query.trim())
  }

  async getPostsSortedByDate(posts: Post[]): Promise<Post[]> {
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  async getUniqueTags(posts: Post[]): Promise<string[]> {
    const allTags = posts.flatMap(post => post.tags)
    return [...new Set(allTags)].sort()
  }
}
