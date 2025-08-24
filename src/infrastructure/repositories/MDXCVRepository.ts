import { CV } from '@/domain/entities/CV'
import { CVRepository } from '@/application/interfaces/CVRepository'
import { promises as fs } from 'fs'
import path from 'path'

export class MDXCVRepository implements CVRepository {
  async getCV(): Promise<CV> {
    try {
      const cvFilePath = path.join(process.cwd(), 'content', 'cv.md')
      const cvContent = await fs.readFile(cvFilePath, 'utf-8')

      // Extraer metadata del frontmatter si existe, o parsear del contenido
      const { metadata, content } = this.parseCVContent(cvContent)

      return CV.create(metadata, content)
    } catch (error) {
      throw new Error(
        `Failed to load CV: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  private parseCVContent(content: string): { metadata: any; content: string } {
    // Buscar frontmatter al inicio del archivo
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (frontmatterMatch && frontmatterMatch[1] && frontmatterMatch[2]) {
      const frontmatter = frontmatterMatch[1]
      const markdownContent = frontmatterMatch[2]

      // Parsear el frontmatter
      const metadata = this.parseFrontmatter(frontmatter)

      return {
        metadata,
        content: markdownContent.trim(),
      }
    }

    // Si no hay frontmatter, extraer metadata del primer heading y líneas siguientes
    const lines = content.split('\n')
    const name = lines[0]?.replace('# ', '').trim() || 'Rubén González Aranda'

    // Buscar información de contacto en las líneas siguientes
    let title = ''
    let email = ''
    let location = ''
    let summary = ''

    for (let i = 1; i < Math.min(10, lines.length); i++) {
      const line = lines[i]?.trim() || ''

      if (line.includes('**') && line.includes('**')) {
        title = line.replace(/\*\*/g, '').trim()
      } else if (line.includes('@') && line.includes('.')) {
        const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/)
        email = emailMatch?.[0] || ''
      } else if (line.includes('Madrid') || line.includes('Spain')) {
        location = line.trim()
      } else if (line && !line.startsWith('---') && !line.startsWith('##')) {
        summary = line.trim()
        break
      }
    }

    // Extraer el contenido después del header (después de la línea con ---)
    const contentStartIndex = content.indexOf('---')
    let markdownContent = content

    if (contentStartIndex > 0) {
      const afterHeader = content.substring(contentStartIndex + 3)
      const nextHeaderIndex = afterHeader.indexOf('---')
      if (nextHeaderIndex > 0) {
        markdownContent = afterHeader.substring(nextHeaderIndex + 3).trim()
      } else {
        markdownContent = afterHeader.trim()
      }
    }

    return {
      metadata: {
        name,
        title: title || 'Engineering Manager / Full-Stack Tech Lead',
        email: email || 'rubenosaka@gmail.com',
        location: location || 'Madrid, Spain',
        summary:
          summary ||
          'Engineering Manager with over 18 years of experience leading teams and building digital products.',
      },
      content: markdownContent,
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
