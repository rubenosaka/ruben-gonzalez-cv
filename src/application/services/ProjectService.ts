import { projects } from '@/content/projects.data'

export class ProjectService {
  listProjects() {
    return projects
  }

  getProjectBySlug(slug: string) {
    return projects.find(project => project.slug === slug) || null
  }

  searchProjects(query: string) {
    return projects.filter(project => 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.summary.toLowerCase().includes(query.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
  }
}
