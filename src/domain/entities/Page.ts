import { Title } from '@/domain/value-objects/Title'
import { Slug } from '@/domain/value-objects/Slug'

export interface PageMetadata {
  title: Title
  slug: Slug
  description?: string
}

export class Page {
  private constructor(
    private readonly _metadata: PageMetadata,
    private readonly _content: string
  ) {}

  static create(metadata: PageMetadata, content: string): Page {
    return new Page(metadata, content)
  }

  get title(): Title {
    return this._metadata.title
  }

  get slug(): Slug {
    return this._metadata.slug
  }

  get content(): string {
    return this._content
  }

  get metadata(): Readonly<PageMetadata> {
    return { ...this._metadata }
  }
}
