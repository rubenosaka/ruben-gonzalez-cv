import { Page } from '@/domain/entities/Page'
import { PageRepository } from '@/application/interfaces/PageRepository'
import { Title } from '@/domain/value-objects/Title'
import { Slug } from '@/domain/value-objects/Slug'
import { promises as fs } from 'fs'
import path from 'path'

export class MDXPageRepository implements PageRepository {
  async getAllPages(): Promise<Page[]> {
    try {
      const pagesDir = path.join(process.cwd(), 'content', 'pages')
      const files = await fs.readdir(pagesDir)

      const pages: Page[] = []

      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = path.join(pagesDir, file)
          const content = await fs.readFile(filePath, 'utf-8')

          const { metadata, markdownContent } = this.parsePageContent(
            content,
            file
          )
          const page = Page.create(metadata, markdownContent)
          pages.push(page)
        }
      }

      return pages
    } catch (error) {
      throw new Error(
        `Failed to load pages: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  async getPageBySlug(slug: Slug): Promise<Page | null> {
    try {
      const pagesDir = path.join(process.cwd(), 'content', 'pages')
      const files = await fs.readdir(pagesDir)

      for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = path.join(pagesDir, file)
          const content = await fs.readFile(filePath, 'utf-8')

          const { metadata, markdownContent } = this.parsePageContent(
            content,
            file
          )

          if (metadata.slug === slug.value) {
            return Page.create(metadata, markdownContent)
          }
        }
      }

      return null
    } catch (error) {
      throw new Error(
        `Failed to load page: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private parsePageContent(
    content: string,
    filename: string
  ): { metadata: any; markdownContent: string } {
    // Normalizar saltos de línea
    const normalizedContent = content.replace(/\r\n/g, '\n')

    // Buscar frontmatter al inicio del archivo
    const frontmatterMatch = normalizedContent.match(
      /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
    )

    if (frontmatterMatch && frontmatterMatch[1] && frontmatterMatch[2]) {
      const frontmatter = frontmatterMatch[1]
      const markdownContent = frontmatterMatch[2]

      // Parsear el frontmatter
      const metadata = this.parseFrontmatter(frontmatter)

      return {
        metadata,
        markdownContent: markdownContent.trim(),
      }
    }

    // Si no hay frontmatter, extraer metadata del primer heading y el nombre del archivo
    const lines = normalizedContent.split('\n')
    const title = lines[0]?.replace('# ', '').trim() || 'Untitled Page'
    const slug = filename.replace(/\.(md|mdx)$/, '')

    return {
      metadata: {
        title,
        slug,
        description: title,
      },
      markdownContent: normalizedContent,
    }
  }

  private parseFrontmatter(frontmatter: string): any {
    const metadata: any = {}
    const lines = frontmatter.split('\n')

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/)
      if (match && match[1] && match[2]) {
        const [, key, value] = match
        // Eliminar comillas del YAML
        const cleanValue = value.trim().replace(/^['"`]|['"`]$/g, '')
        metadata[key] = cleanValue
      }
    }

    return metadata
  }
}
