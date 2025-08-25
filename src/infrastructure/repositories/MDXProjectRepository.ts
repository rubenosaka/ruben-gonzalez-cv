import { Project } from '@/domain/entities/Project'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import { Title } from '@/domain/value-objects/Title'
import { Summary } from '@/domain/value-objects/Summary'
import { Slug } from '@/domain/value-objects/Slug'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

export class MDXProjectRepository implements ProjectRepository {
  private projectsPath = join(process.cwd(), 'content', 'projects')

  async listProjects(): Promise<Project[]> {
    try {
      const files = readdirSync(this.projectsPath)
      const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

      const projects = await Promise.all(
        mdxFiles.map(async (file) => {
          const filePath = join(this.projectsPath, file)
          const content = readFileSync(filePath, 'utf-8')
          return this.parseMDXFile(content, file.replace('.mdx', ''))
        })
      )

      return projects.filter(Boolean) as Project[]
    } catch (error) {
      console.error('Error reading projects:', error)
      return []
    }
  }

  async getProjectBySlug(slug: Slug): Promise<Project | null> {
    try {
      const filePath = join(this.projectsPath, `${slug.value}.mdx`)
      const content = readFileSync(filePath, 'utf-8')
      return this.parseMDXFile(content, slug.value)
    } catch (error) {
      console.error('Error reading project:', error)
      return null
    }
  }

  private parseMDXFile(content: string, filename: string): Project | null {
    try {
      const startIndex = content.indexOf('export const metadata = {')
      if (startIndex === -1) {
        return null
      }

      const metadataStart = startIndex + 'export const metadata = '.length
      let braceCount = 0
      let metadataEnd = metadataStart

      for (let i = metadataStart; i < content.length; i++) {
        if (content[i] === '{') {
          braceCount++
        } else if (content[i] === '}') {
          braceCount--
          if (braceCount === 0) {
            metadataEnd = i
            break
          }
        }
      }

      if (braceCount !== 0) {
        return null
      }

      const metadataString = content.substring(metadataStart, metadataEnd + 1)
      const metadata = eval(`(${metadataString})`)

      const projectContent = content.substring(0, startIndex).trim()

      const projectData = {
        metadata: {
          title: metadata.title,
          slug: metadata.slug,
          role: metadata.role,
          period: metadata.period,
          stack: metadata.stack || [],
          links: metadata.links || [],
          summary: metadata.summary,
        },
        content: projectContent,
      }

      return this.mapToProject(projectData)
    } catch (error) {
      console.error(`Error parsing ${filename}.mdx:`, error)
      return null
    }
  }

  private mapToProject(projectData: any): Project {
    const metadata = {
      title: Title.create(projectData.metadata.title),
      slug: Slug.create(projectData.metadata.slug),
      role: projectData.metadata.role,
      period: projectData.metadata.period,
      stack: projectData.metadata.stack || [],
      links: projectData.metadata.links || [],
      summary: Summary.create(projectData.metadata.summary),
    }

    return Project.create(metadata, projectData.content)
  }
}
