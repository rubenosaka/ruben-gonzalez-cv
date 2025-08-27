export interface Project {
  slug: string
  title: string
  summary: string
  bodyHtml: string
  tags: string[]
  links?: {
    url: string
    label: string
  }[] | undefined
  image?: string
  featured?: boolean
}
