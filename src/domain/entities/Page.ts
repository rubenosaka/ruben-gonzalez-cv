import { Title } from '@/domain/value-objects/Title'

export interface PageMetadata {
  title: Title
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

  get content(): string {
    return this._content
  }

  get metadata(): Readonly<PageMetadata> {
    return { ...this._metadata }
  }
}
