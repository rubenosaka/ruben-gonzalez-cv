export interface CVMetadata {
  name: string
  title: string
  email: string
  location: string
  summary: string
}

export class CV {
  private constructor(
    private readonly _metadata: CVMetadata,
    private readonly _content: string,
    private readonly _format: 'mdx' | 'md'
  ) {}

  static create(metadata: CVMetadata, content: string, format: 'mdx' | 'md' = 'md'): CV {
    return new CV(metadata, content, format)
  }

  get name(): string {
    return this._metadata.name
  }

  get title(): string {
    return this._metadata.title
  }

  get email(): string {
    return this._metadata.email
  }

  get location(): string {
    return this._metadata.location
  }

  get summary(): string {
    return this._metadata.summary
  }

  get content(): string {
    return this._content
  }

  get format(): 'mdx' | 'md' {
    return this._format
  }

  get metadata(): Readonly<CVMetadata> {
    return { ...this._metadata }
  }
}
