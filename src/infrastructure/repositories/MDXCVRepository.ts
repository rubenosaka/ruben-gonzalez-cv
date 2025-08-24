import { CV } from '@/domain/entities/CV'
import { CVRepository } from '@/application/interfaces/CVRepository'

// Datos estáticos del CV
const cvData = {
  metadata: {
    name: 'Rubén García Alonso',
    title: 'Senior Full Stack Developer',
    email: 'ruben@example.com',
    location: 'Madrid, Spain',
    summary:
      'Experienced developer with 8+ years building scalable web applications using modern technologies and clean architecture principles.',
  },
  content: `
## Profile

Passionate software engineer with expertise in modern web development, clean architecture, and domain-driven design. Specialized in React, TypeScript, Node.js, and cloud technologies. Committed to writing maintainable, scalable code following SOLID principles and best practices.

## Experience

### Senior Full Stack Developer

**TechCorp** | 2022 - Present

- Led development of microservices architecture serving 100K+ users
- Implemented clean architecture patterns reducing technical debt by 40%
- Mentored junior developers in SOLID principles and DDD
- Technologies: React, TypeScript, Node.js, AWS, Docker

### Full Stack Developer

**StartupXYZ** | 2020 - 2022

- Built and maintained multiple React applications with TypeScript
- Implemented CI/CD pipelines reducing deployment time by 60%
- Collaborated with UX team to improve user experience
- Technologies: React, TypeScript, Python, PostgreSQL, Redis

### Frontend Developer

**DigitalAgency** | 2018 - 2020

- Developed responsive web applications for enterprise clients
- Optimized performance achieving 90+ Lighthouse scores
- Implemented accessibility standards (WCAG 2.1)
- Technologies: React, JavaScript, CSS3, HTML5

## Education

### Bachelor's Degree in Computer Science

**Universidad Complutense de Madrid** | 2014 - 2018

- Specialized in Software Engineering
- Final project: E-commerce platform with microservices architecture

## Skills

### Programming Languages

- TypeScript/JavaScript (Expert)
- Python (Advanced)
- Java (Intermediate)
- Go (Intermediate)

### Frontend Technologies

- React (Expert)
- Next.js (Expert)
- Vue.js (Advanced)
- Tailwind CSS (Expert)
- HTML5/CSS3 (Expert)

### Backend Technologies

- Node.js (Expert)
- Express.js (Expert)
- FastAPI (Advanced)
- PostgreSQL (Advanced)
- MongoDB (Advanced)
- Redis (Intermediate)

### DevOps & Cloud

- Docker (Advanced)
- AWS (Advanced)
- CI/CD (Advanced)
- Kubernetes (Intermediate)
- Terraform (Intermediate)

### Architecture & Design

- Clean Architecture (Expert)
- Domain-Driven Design (Advanced)
- SOLID Principles (Expert)
- Microservices (Advanced)
- REST APIs (Expert)
- GraphQL (Intermediate)

### Tools & Practices

- Git (Expert)
- Agile/Scrum (Advanced)
- TDD/BDD (Advanced)
- Code Review (Expert)
- Technical Documentation (Advanced)
`,
}

export class MDXCVRepository implements CVRepository {
  async getCV(): Promise<CV> {
    return this.mapToCV(cvData)
  }

  private mapToCV(cvData: any): CV {
    return CV.create(cvData.metadata, cvData.content)
  }
}
