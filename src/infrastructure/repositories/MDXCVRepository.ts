import { CV } from '@/domain/entities/CV'
import { CVRepository } from '@/application/interfaces/CVRepository'
import { promises as fs } from 'fs'
import path from 'path'

export class MDXCVRepository implements CVRepository {
  async getCV(): Promise<CV> {
    try {
      const possiblePaths = [
        path.join(process.cwd(), 'content', 'cv.mdx'),
        path.join(process.cwd(), 'content', 'cv.md'),
      ]

      let cvFilePath: string | undefined
      let format: 'mdx' | 'md' | undefined

      for (const filePath of possiblePaths) {
        try {
          await fs.access(filePath)
          cvFilePath = filePath
          format = filePath.endsWith('.mdx') ? 'mdx' : 'md'
          break
        } catch {
          continue
        }
      }

      if (!cvFilePath || !format) {
        throw new Error('CV file not found (tried cv.mdx and cv.md)')
      }

      const cvContent = await fs.readFile(cvFilePath, 'utf-8')

      const { metadata, content } = this.parseCVContent(cvContent, format)

      return CV.create(metadata, content, format)
    } catch (error) {
      throw new Error(
        `Failed to load CV: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private parseCVContent(
    content: string,
    format: 'mdx' | 'md'
  ): { metadata: any; content: string } {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (frontmatterMatch && frontmatterMatch[1] && frontmatterMatch[2]) {
      const frontmatter = frontmatterMatch[1]
      const markdownContent = frontmatterMatch[2]

      const metadata = this.parseFrontmatter(frontmatter)

      return {
        metadata,
        content: markdownContent.trim(),
      }
    }

    // Si no hay frontmatter, usar metadata por defecto y todo el contenido como markdown
    return {
      metadata: {
        name: 'Rubén González Aranda',
        title: 'Engineering Manager / Full-Stack Tech Lead',
        email: 'rubenosaka@gmail.com',
        location: 'Madrid, Spain',
        summary:
          'Engineering Manager with over 18 years of experience leading teams and building digital products.',
      },
      content: content.trim(),
    }
  }

  private parseFrontmatter(frontmatter: string): any {
    const metadata: any = {}
    const lines = frontmatter.split('\n')

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/)
      if (match && match[1] && match[2]) {
        const [, key, value] = match
        metadata[key] = value.trim()
      }
    }

    return metadata
  }
}
