import { allProjects } from 'contentlayer/generated'
import { Project, ProjectMetadata, ProjectLink } from '@/domain/entities/Project'
import { Title } from '@/domain/value-objects/Title'
import { Slug } from '@/domain/value-objects/Slug'
import { Summary } from '@/domain/value-objects/Summary'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'

export class ContentlayerProjectRepository implements ProjectRepository {
  async listProjects(): Promise<Project[]> {
    return allProjects.map(this.mapToProject)
  }

  async getProjectBySlug(slug: Slug): Promise<Project | null> {
    const projectData = allProjects.find(p => p.slug === slug.value)
    
    if (!projectData) {
      return null
    }

    return this.mapToProject(projectData)
  }

  private mapToProject(projectData: any): Project {
    const metadata: ProjectMetadata = {
      title: Title.create(projectData.title),
      slug: Slug.create(projectData.slug),
      role: projectData.role,
      period: projectData.period,
      stack: projectData.stack || [],
      links: (projectData.links || []).map((link: any): ProjectLink => ({
        label: link.label,
        url: link.url
      })),
      summary: Summary.create(projectData.summary)
    }

    return Project.create(metadata, projectData.body.raw)
  }
}
