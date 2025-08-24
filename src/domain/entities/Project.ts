import { Slug } from '@/domain/value-objects/Slug'
import { Title } from '@/domain/value-objects/Title'
import { Summary } from '@/domain/value-objects/Summary'

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectMetadata {
  title: Title
  slug: Slug
  role: string
  period: string
  stack: string[]
  links: ProjectLink[]
  summary: Summary
}

export class Project {
  private constructor(
    private readonly _metadata: ProjectMetadata,
    private readonly _content: string
  ) {}

  static create(metadata: ProjectMetadata, content: string): Project {
    return new Project(metadata, content)
  }

  get title(): Title {
    return this._metadata.title
  }

  get slug(): Slug {
    return this._metadata.slug
  }

  get role(): string {
    return this._metadata.role
  }

  get period(): string {
    return this._metadata.period
  }

  get stack(): readonly string[] {
    return [...this._metadata.stack]
  }

  get links(): readonly ProjectLink[] {
    return [...this._metadata.links]
  }

  get summary(): Summary {
    return this._metadata.summary
  }

  get content(): string {
    return this._content
  }

  get metadata(): Readonly<ProjectMetadata> {
    return { ...this._metadata }
  }

  hasStackTechnology(technology: string): boolean {
    return this._metadata.stack.includes(technology)
  }

  getLinkByLabel(label: string): ProjectLink | undefined {
    return this._metadata.links.find(link => link.label === label)
  }
}
