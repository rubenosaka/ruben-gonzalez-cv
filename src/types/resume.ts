export interface ResumeMetadata {
  name: string
  title: string
  email: string
  location: string
  summary: string
}

export interface Highlight {
  title: string
  description: string
  icon?: 'teams' | 'roadmap' | 'efficiency' | 'ai' | 'analytics' | 'cross' | 'product' | undefined
  color?: string | undefined
}

export interface Experience {
  company: string
  title: string
  period: string
  description: string
  stack?: string[] | undefined
  highlights?: string[] | undefined
}

export interface Resume {
  metadata: ResumeMetadata
  content: {
    highlights: Highlight[]
    experience: Experience[]
  }
}
