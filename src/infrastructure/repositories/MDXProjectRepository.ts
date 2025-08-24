import { Project } from '@/domain/entities/Project'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import { Title } from '@/domain/value-objects/Title'
import { Summary } from '@/domain/value-objects/Summary'
import { Slug } from '@/domain/value-objects/Slug'

// Datos estáticos de los proyectos
const projectsData = [
  {
    metadata: {
      title: 'app.frenetic.ai - Electrical Engineer Assistant',
      slug: 'frenetic',
      role: 'Engineering Manager',
      period: '2025 - Present',
      stack: [
        'OpenAI',
        'Python',
        'Vue 3',
        'Astro',
        'Node.js',
        'TypeScript',
        'Laravel',
        'MySQL',
        'AWS',
      ],
      links: [
        { label: 'Live Demo', url: 'https://app.frenetic.ai' },
        { label: 'Company', url: 'https://frenetic.ai' },
      ],
      summary:
        'Electrical Engineer Assistant powered by AI, designing smart solutions for power electronics.',
    },
    content: `
# app.frenetic.ai - Electrical Engineer Assistant

An AI-powered platform for electrical engineers, designed to assist in the design and optimization of power electronics components and systems. Built with modern web technologies and integrated AI capabilities to provide intelligent design recommendations.

## Project Overview

app.frenetic.ai is a comprehensive SaaS platform that leverages artificial intelligence to help electrical engineers design and optimize magnetic components, transformers, and power electronics systems. The platform combines traditional engineering principles with cutting-edge AI technology to deliver smart, efficient design solutions.

## Key Features

### AI-Powered Design Assistance
- **OpenAI Integration**: Advanced AI models for design recommendations
- **Intelligent Optimization**: Automated parameter optimization for magnetic components
- **Design Validation**: AI-powered validation of engineering designs
- **Smart Suggestions**: Context-aware recommendations based on project requirements

### Engineering Tools
- **Magnetic Design**: Specialized tools for transformer and inductor design
- **Power Electronics**: Comprehensive power electronics design suite
- **Simulation Tools**: Built-in simulation capabilities for design verification
- **Component Library**: Extensive library of magnetic components and materials

### User Experience
- **Intuitive Interface**: Modern, responsive web application built with Vue 3
- **Real-time Collaboration**: Multi-user design collaboration features
- **Project Management**: Complete project lifecycle management
- **Export Capabilities**: Multiple export formats for manufacturing

## Technical Architecture

### Frontend Architecture
\`\`\`typescript
// Vue 3 Composition API with TypeScript
interface DesignService {
  createDesign(params: DesignParams): Promise<Design>
  optimizeDesign(design: Design): Promise<OptimizedDesign>
  validateDesign(design: Design): Promise<ValidationResult>
}
\`\`\`

### Backend Services
- **AI Service**: OpenAI API integration for intelligent recommendations
- **Design Engine**: Core engineering calculations and algorithms
- **User Management**: Authentication and user profile management
- **Project Service**: Project storage and collaboration features

### AI Integration
- **Langfuse**: Prompt tracking and optimization
- **Advanced Prompt Engineering**: Sophisticated prompt design for engineering tasks
- **Cursor Automation**: Automated workflows for design processes
- **Performance Monitoring**: AI model performance tracking and optimization

## Development Process

### Clean Architecture Implementation
- **Domain-Driven Design**: Clear separation of engineering and business domains
- **SOLID Principles**: Applied throughout the codebase
- **Test-Driven Development**: Comprehensive test coverage
- **Continuous Integration**: Automated testing and deployment

### Technology Stack

#### Frontend
- **Vue 3**: Progressive JavaScript framework with Composition API
- **Astro**: Modern static site generator for optimal performance
- **TypeScript**: Type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first styling approach
- **Pinia**: State management for Vue applications

#### Backend
- **Node.js**: High-performance JavaScript runtime
- **Python**: AI/ML processing and engineering calculations
- **Laravel**: PHP framework for robust backend services
- **MySQL**: Reliable relational database
- **Redis**: Caching and session management

#### AI & Automation
- **OpenAI APIs**: GPT models for intelligent assistance
- **Langfuse**: Prompt tracking and optimization
- **Cursor**: AI-powered development workflows
- **Custom AI Models**: Specialized models for engineering tasks

#### Infrastructure
- **AWS**: Cloud infrastructure and services
- **Serverless**: Scalable serverless deployment
- **Docker**: Containerized application deployment
- **CI/CD**: Automated testing and deployment pipelines

## Results and Impact

### Engineering Efficiency
- **Design Time**: 70% reduction in design iteration time
- **Accuracy**: 95% accuracy in design recommendations
- **User Productivity**: 3x increase in design throughput
- **Error Reduction**: 80% reduction in design errors

### Business Impact
- **User Growth**: 400% increase in active engineers
- **Customer Satisfaction**: 4.9/5 rating from engineering teams
- **Revenue Growth**: 250% increase in platform usage
- **Market Position**: Leading AI-powered engineering platform

## AI Integration Highlights

### OpenAI Implementation
- **GPT-4 Integration**: Advanced language models for design assistance
- **Custom Fine-tuning**: Specialized models for engineering domain
- **Prompt Engineering**: Sophisticated prompt design for optimal results
- **Context Management**: Intelligent context handling for complex designs

### Langfuse Integration
- **Prompt Tracking**: Comprehensive monitoring of AI interactions
- **Performance Optimization**: Continuous improvement of AI responses
- **Cost Management**: Efficient API usage and cost optimization
- **Quality Assurance**: Monitoring and improving AI output quality

### Cursor Automation
- **Development Workflows**: AI-assisted coding and development
- **Code Generation**: Automated code generation for repetitive tasks
- **Documentation**: AI-powered documentation generation
- **Testing**: Automated test case generation and validation

## Lessons Learned

### AI Integration Challenges
- **Prompt Engineering**: Critical importance of well-designed prompts
- **Context Management**: Handling complex engineering context effectively
- **Performance Optimization**: Balancing AI capabilities with response times
- **User Experience**: Integrating AI seamlessly into engineering workflows

### Technical Architecture
- **Microservices**: Effective separation of AI and engineering services
- **Event-Driven Architecture**: Real-time updates and collaboration
- **Caching Strategy**: Optimizing AI response times and costs
- **Scalability**: Handling growing user base and AI processing demands

## Future Enhancements

### Planned Features
- **Advanced AI Models**: Integration of specialized engineering AI models
- **3D Visualization**: Interactive 3D design visualization
- **Mobile Application**: Native mobile apps for field engineers
- **API Marketplace**: Third-party integrations and plugins

### Technical Improvements
- **Edge Computing**: Reduced latency for global users
- **Machine Learning**: Custom ML models for specific engineering domains
- **Real-time Collaboration**: Enhanced multi-user design capabilities
- **Advanced Analytics**: Predictive analytics for design optimization

---

*This project demonstrates the successful integration of AI technology with traditional engineering practices, creating a powerful platform that enhances the capabilities of electrical engineers worldwide.*
`,
  },
]

export class MDXProjectRepository implements ProjectRepository {
  async listProjects(): Promise<Project[]> {
    return projectsData.map((project) => this.mapToProject(project))
  }

  async getProjectBySlug(slug: Slug): Promise<Project | null> {
    const project = projectsData.find((p) => p.metadata.slug === slug.value)
    return project ? this.mapToProject(project) : null
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
