import { Post } from '@/domain/entities/Post'
import { Tag } from '@/domain/value-objects/Tag'

export interface PostRepository {
  findAll(): Promise<Post[]>
  findPublished(): Promise<Post[]>
  findById(id: string): Promise<Post | null>
  findByUrl(url: string): Promise<Post | null>
  findByTag(tag: Tag): Promise<Post[]>
  findByTags(tags: Tag[]): Promise<Post[]>
  search(query: string): Promise<Post[]>
}
