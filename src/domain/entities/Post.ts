export interface PostMetadata {
  title: string
  date: Date
  description: string
  tags: string[]
  published: boolean
}

export class Post {
  private constructor(
    private readonly _id: string,
    private readonly _metadata: PostMetadata,
    private readonly _content: string,
    private readonly _url: string
  ) {}

  static create(
    id: string,
    metadata: PostMetadata,
    content: string,
    url: string
  ): Post {
    return new Post(id, metadata, content, url)
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._metadata.title
  }

  get date(): Date {
    return this._metadata.date
  }

  get description(): string {
    return this._metadata.description
  }

  get tags(): readonly string[] {
    return [...this._metadata.tags]
  }

  get published(): boolean {
    return this._metadata.published
  }

  get content(): string {
    return this._content
  }

  get url(): string {
    return this._url
  }

  isPublished(): boolean {
    return this._metadata.published
  }

  hasTag(tag: string): boolean {
    return this._metadata.tags.includes(tag)
  }

  getFormattedDate(): string {
    return this._metadata.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
