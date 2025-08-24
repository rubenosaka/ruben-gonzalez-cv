import { Project } from '@/domain/entities/Project'
import { ProjectRepository } from '@/application/interfaces/ProjectRepository'
import { Title } from '@/domain/value-objects/Title'
import { Summary } from '@/domain/value-objects/Summary'
import { Slug } from '@/domain/value-objects/Slug'

// Datos estáticos de los proyectos
const projectsData = [
  {
    metadata: {
      title: 'Frenetic - Real-time Trading Platform',
      slug: 'frenetic',
      role: 'Lead Full Stack Developer',
      period: '2023 - 2024',
      stack: [
        'React',
        'TypeScript',
        'Node.js',
        'WebSocket',
        'Redis',
        'PostgreSQL',
        'Docker',
        'AWS',
      ],
      links: [
        { label: 'Live Demo', url: 'https://frenetic-demo.com' },
        { label: 'GitHub', url: 'https://github.com/rga/frenetic' },
      ],
      summary:
        'High-performance real-time trading platform built with modern web technologies and clean architecture principles.',
    },
    content: `
# Frenetic - Real-time Trading Platform

A high-performance, real-time trading platform designed for professional traders and financial institutions. Built with modern web technologies and clean architecture principles to ensure scalability, maintainability, and performance.

## Project Overview

Frenetic is a comprehensive trading platform that provides real-time market data, advanced charting capabilities, and automated trading features. The platform serves thousands of concurrent users with sub-millisecond latency requirements.

## Key Features

### Real-time Market Data
- **WebSocket Integration**: Real-time price feeds from multiple exchanges
- **Data Normalization**: Unified data format across different sources
- **Caching Strategy**: Redis-based caching for optimal performance

### Advanced Charting
- **Interactive Charts**: Built with TradingView integration
- **Technical Indicators**: 50+ technical analysis tools
- **Custom Timeframes**: Flexible chart period selection

### Trading Engine
- **Order Management**: Real-time order placement and tracking
- **Risk Management**: Automated risk controls and position sizing
- **Backtesting**: Historical strategy testing capabilities

## Technical Architecture

### Frontend Architecture
\`\`\`typescript
// Clean Architecture implementation
interface TradingService {
  placeOrder(order: Order): Promise<OrderResult>
  getPositions(): Promise<Position[]>
  subscribeToMarketData(symbol: string): Observable<MarketData>
}
\`\`\`

### Backend Services
- **Market Data Service**: Handles real-time data feeds
- **Order Management Service**: Processes trading orders
- **Risk Management Service**: Enforces trading limits
- **Notification Service**: Real-time user notifications

### Performance Optimizations
- **WebSocket Connections**: Efficient real-time communication
- **Database Optimization**: PostgreSQL with connection pooling
- **Caching Strategy**: Multi-layer Redis caching
- **CDN Integration**: Global content delivery

## Development Process

### Clean Code Practices
- **SOLID Principles**: Applied throughout the codebase
- **Domain-Driven Design**: Clear domain boundaries
- **Test-Driven Development**: 90%+ test coverage
- **Code Reviews**: Mandatory peer reviews

### Technology Stack

#### Frontend
- **React 18**: Latest features and performance improvements
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first styling approach
- **Zustand**: Lightweight state management

#### Backend
- **Node.js**: High-performance JavaScript runtime
- **Express.js**: Minimal and flexible web framework
- **PostgreSQL**: Reliable relational database
- **Redis**: In-memory data structure store

#### Infrastructure
- **Docker**: Containerized deployment
- **AWS**: Cloud infrastructure and services
- **CI/CD**: Automated testing and deployment
- **Monitoring**: Real-time performance tracking

## Results and Impact

### Performance Metrics
- **Latency**: Sub-10ms order execution
- **Throughput**: 10,000+ orders per second
- **Uptime**: 99.99% availability
- **Scalability**: Horizontal scaling support

### Business Impact
- **User Growth**: 500% increase in active traders
- **Revenue**: 300% increase in trading volume
- **Customer Satisfaction**: 4.8/5 rating
- **Technical Debt**: 60% reduction

## Lessons Learned

### Architecture Decisions
- **Microservices**: Improved scalability but increased complexity
- **Event Sourcing**: Better audit trail and debugging
- **CQRS**: Separated read and write models for optimization

### Development Practices
- **Clean Architecture**: Significantly improved maintainability
- **Domain-Driven Design**: Better alignment with business requirements
- **Continuous Integration**: Faster feedback and deployment cycles

## Future Enhancements

### Planned Features
- **AI-Powered Trading**: Machine learning algorithms
- **Mobile App**: Native iOS and Android applications
- **API Marketplace**: Third-party integrations
- **Advanced Analytics**: Predictive market analysis

### Technical Improvements
- **GraphQL**: More efficient data fetching
- **WebAssembly**: Performance-critical calculations
- **Edge Computing**: Reduced latency for global users
- **Blockchain Integration**: Decentralized trading capabilities

---

*This project demonstrates the power of clean architecture and modern web technologies in building high-performance financial applications.*
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
