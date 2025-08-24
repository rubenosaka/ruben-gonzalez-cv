import { Page } from '@/domain/entities/Page'
import { PageRepository } from '@/application/interfaces/PageRepository'
import { Title } from '@/domain/value-objects/Title'
import { Slug } from '@/domain/value-objects/Slug'

// Datos estáticos de las páginas
const pagesData = [
  {
    metadata: {
      title: 'Acerca de',
      slug: 'about',
      description: 'Información sobre el proyecto y el desarrollador',
    },
    content: `
# Acerca de

Esta es una página de ejemplo creada con **Contentlayer** y **MDX**.

## El Proyecto

Este proyecto está construido con las siguientes tecnologías:

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de UI
- **Contentlayer** - Gestión de contenido

## Características

- ✅ App Router de Next.js 15
- ✅ Soporte completo para MD/MDX
- ✅ Modo oscuro/claro
- ✅ Componentes reutilizables
- ✅ SEO optimizado
- ✅ Listo para Vercel

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
`,
  },
  {
    metadata: {
      title: 'About',
      slug: 'about',
    },
    content: `
# About Me

I'm a passionate software engineer with over 8 years of experience building scalable web applications and digital products. My journey in software development has been driven by a deep curiosity for technology and a commitment to writing clean, maintainable code.

## My Philosophy

I believe in the power of clean architecture and well-designed systems. Every line of code should serve a purpose, and every architectural decision should be made with the future in mind. This philosophy has guided me through countless projects and continues to shape my approach to software development.

## What I Do

### Full Stack Development

I specialize in building end-to-end solutions using modern web technologies. From responsive user interfaces to robust backend services, I ensure that every component works together seamlessly.

### Architecture & Design

Clean architecture and domain-driven design are not just buzzwords to me—they're essential principles that guide every project I work on. I believe that good architecture makes code more maintainable, testable, and scalable.

### Team Leadership

I enjoy mentoring developers and helping teams adopt best practices. Whether it's code reviews, pair programming, or architectural discussions, I believe in sharing knowledge and fostering a culture of continuous learning.

## My Approach

### Clean Code

I write code that's self-documenting, well-structured, and easy to understand. Every function has a single responsibility, and every class serves a clear purpose.

### SOLID Principles

I apply SOLID principles consistently to create flexible, maintainable, and extensible code. These principles help me build systems that can evolve with changing requirements.

### Domain-Driven Design

I use DDD to align technical solutions with business requirements. By understanding the domain deeply, I can create software that truly serves its users.

### Test-Driven Development

I believe in writing tests first. This approach helps me think through requirements carefully and ensures that my code is reliable and well-designed.

## Technologies I Work With

### Frontend

- **React & Next.js**: Building modern, performant web applications
- **TypeScript**: Adding type safety and better developer experience
- **Tailwind CSS**: Creating beautiful, responsive interfaces
- **State Management**: Redux, Zustand, and React Context

### Backend

- **Node.js**: Building scalable server-side applications
- **Python**: Data processing and API development
- **Databases**: PostgreSQL, MongoDB, Redis
- **APIs**: REST, GraphQL, WebSocket

### DevOps & Cloud

- **AWS**: Cloud infrastructure and services
- **Docker**: Containerization and deployment
- **CI/CD**: Automated testing and deployment pipelines
- **Monitoring**: Performance tracking and error handling

## Beyond Code

When I'm not coding, you can find me:

- **Reading**: Technical books, architecture patterns, and industry blogs
- **Writing**: Blog posts about software development and best practices
- **Speaking**: Sharing knowledge at meetups and conferences
- **Contributing**: Open source projects and community initiatives

## Let's Connect

I'm always interested in new opportunities and interesting projects. Whether you want to discuss a potential collaboration, ask about my work, or just chat about technology, feel free to reach out.

- **Email**: ruben@example.com
- **LinkedIn**: [Rubén García Alonso](https://linkedin.com/in/ruben-garcia-alonso)
- **GitHub**: [@rga](https://github.com/rga)
- **Twitter**: [@ruben_dev](https://twitter.com/ruben_dev)

---

_Building software is not just about writing code—it's about creating solutions that make a difference._
`,
  },
  {
    metadata: {
      title: 'Now',
      slug: 'now',
    },
    content: `
# What I'm Doing Now

_Last updated: January 2024_

## Currently Working On

### Portfolio Website

I'm building this portfolio website using Next.js 15, TypeScript, and clean architecture principles. The goal is to showcase my work while demonstrating my commitment to writing maintainable, well-structured code.

**Technologies**: Next.js 15, TypeScript, Tailwind CSS, Contentlayer, shadcn/ui

### Open Source Contributions

I'm actively contributing to several open source projects, focusing on developer tools and libraries that improve the developer experience.

**Projects**: React ecosystem, TypeScript utilities, developer tooling

### Technical Writing

I'm writing blog posts and technical articles about software architecture, clean code practices, and modern web development techniques.

**Topics**: Clean Architecture, DDD, SOLID principles, React patterns

## Learning & Exploring

### Advanced TypeScript

I'm deepening my knowledge of TypeScript's advanced features, including conditional types, mapped types, and utility types.

**Focus**: Type safety, generic constraints, advanced patterns

### System Design

I'm studying system design principles and patterns to better understand how to build scalable, distributed systems.

**Areas**: Microservices, event-driven architecture, data modeling

### Performance Optimization

I'm exploring techniques for optimizing web application performance, from frontend rendering to backend database queries.

**Techniques**: Code splitting, lazy loading, caching strategies

## Personal Development

### Reading

Currently reading "Clean Architecture" by Robert C. Martin and "Domain-Driven Design" by Eric Evans to strengthen my architectural thinking.

### Fitness

Maintaining a regular exercise routine with a focus on strength training and cardiovascular health.

### Mindfulness

Practicing daily meditation and mindfulness techniques to improve focus and reduce stress.

## Goals for 2024

### Professional Goals

- **Master Clean Architecture**: Deepen understanding and apply consistently
- **Contribute to Open Source**: Regular contributions to meaningful projects
- **Technical Leadership**: Mentor more developers and lead architectural decisions
- **Conference Speaking**: Present at technical conferences about clean code practices

### Personal Goals

- **Health & Wellness**: Maintain consistent exercise and healthy eating habits
- **Learning**: Complete advanced courses in system design and architecture
- **Networking**: Attend more tech meetups and conferences
- **Writing**: Publish 12 technical articles this year

## What's Next

### Short Term (Next 3 Months)

- Complete portfolio website with full content management
- Write 3 technical articles about clean architecture
- Contribute to 2 open source projects
- Attend 2 technical conferences

### Medium Term (Next 6 Months)

- Launch a technical blog with regular content
- Create educational content about clean code practices
- Mentor 3 junior developers
- Speak at a local tech meetup

### Long Term (Next Year)

- Publish a book about clean architecture in modern web development
- Build a developer tool that helps teams adopt clean code practices
- Lead architectural decisions for a major project
- Establish myself as a thought leader in clean code and architecture

## How I Work

### Daily Routine

- **Morning**: Review goals, plan day, read technical content
- **Work Hours**: Focus on coding, architecture, and mentoring
- **Evening**: Reflect on progress, plan next day, personal development

### Weekly Review

Every Sunday, I review my progress, adjust goals, and plan the upcoming week. This helps me stay focused and make continuous improvements.

### Monthly Reflection

At the end of each month, I reflect on achievements, challenges, and lessons learned. This helps me grow both professionally and personally.

---

_This page is inspired by [Derek Sivers' "Now" page](https://sive.rs/now). It's a way to share what I'm currently focused on and what's important to me right now._

_Last updated: January 2024_
`,
  },
]

export class MDXPageRepository implements PageRepository {
  async getAllPages(): Promise<Page[]> {
    return pagesData.map((page) => this.mapToPage(page))
  }

  async getPageBySlug(slug: Slug): Promise<Page | null> {
    const page = pagesData.find((p) => p.metadata.slug === slug.value)
    return page ? this.mapToPage(page) : null
  }

  private mapToPage(pageData: any): Page {
    const metadata = {
      title: Title.create(pageData.metadata.title),
    }

    return Page.create(metadata, pageData.content)
  }
}
