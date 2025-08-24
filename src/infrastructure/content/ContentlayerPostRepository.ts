import { allPosts } from 'contentlayer/generated'
import { Post, PostMetadata } from '@/domain/entities/Post'
import { Tag } from '@/domain/value-objects/Tag'
import { PostRepository } from '@/application/interfaces/PostRepository'

export class ContentlayerPostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    return allPosts.map(this.mapToPost)
  }

  async findPublished(): Promise<Post[]> {
    return allPosts
      .filter(post => post.published)
      .map(this.mapToPost)
  }

  async findById(id: string): Promise<Post | null> {
    const post = allPosts.find(p => p._id === id)
    return post ? this.mapToPost(post) : null
  }

  async findByUrl(url: string): Promise<Post | null> {
    const post = allPosts.find(p => p.url === url)
    return post ? this.mapToPost(post) : null
  }

  async findByTag(tag: Tag): Promise<Post[]> {
    return allPosts
      .filter(post => post.tags?.includes(tag.value))
      .map(this.mapToPost)
  }

  async findByTags(tags: Tag[]): Promise<Post[]> {
    const tagValues = tags.map(tag => tag.value)
    return allPosts
      .filter(post => post.tags?.some(tag => tagValues.includes(tag)))
      .map(this.mapToPost)
  }

  async search(query: string): Promise<Post[]> {
    const lowercaseQuery = query.toLowerCase()
    return allPosts
      .filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.description.toLowerCase().includes(lowercaseQuery) ||
        post.body.raw.toLowerCase().includes(lowercaseQuery) ||
        post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
      .map(this.mapToPost)
  }

  private mapToPost(contentlayerPost: any): Post {
    const metadata: PostMetadata = {
      title: contentlayerPost.title,
      date: new Date(contentlayerPost.date),
      description: contentlayerPost.description,
      tags: contentlayerPost.tags || [],
      published: contentlayerPost.published
    }

    return Post.create(
      contentlayerPost._id,
      metadata,
      contentlayerPost.body.raw,
      contentlayerPost.url
    )
  }
}
