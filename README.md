# Rubén González – Developer CV

A modern, scalable personal portfolio and CV built with Next.js 15, TypeScript, and following Clean Architecture principles. This repository serves as both a professional CV and a demonstration of engineering excellence.

## Project Goal

This CV is strategically designed to impress two distinct audiences:

- **Recruiters & HR**: Clear presentation of skills, experience, metrics, and professional achievements
- **Developers & CTOs**: Showcase of technical architecture, engineering practices, and code quality

The repository is intentionally public to demonstrate not just the content but also the engineering culture and practices that would be brought to any team.

## Strategy

### Dual-Audience Approach

The project implements a **two-route strategy** to serve different stakeholders:

1. **Recruiter View** (`/cv`): Traditional CV layout with clear skills, experience timeline, and downloadable PDF
2. **Developer View** (`/`): Technical portfolio showcasing projects, architecture decisions, and engineering practices

### Initial Disclaimer

A prominent disclaimer explains the dual-purpose nature, setting expectations for both audiences and demonstrating transparency in communication.

### PDF Export

Professional PDF generation for traditional CV distribution, maintaining consistency across digital and print formats.

## Key Decisions

### MDX as Technical Differentiator

**MDX is intentionally maintained** despite adding complexity. This decision serves as a cultural and technical differentiator, demonstrating:

- Content management expertise
- Developer experience (DX) considerations
- Integration capabilities with modern tooling

### Architecture Over-Engineering

The project implements **Domain-Driven Design (DDD), Hexagonal Architecture, and SOLID principles** as a deliberate showcase of engineering excellence. While this level of architecture might be overkill for a simple CV, it demonstrates:

- Understanding of enterprise patterns
- Commitment to maintainable code
- Ability to scale technical decisions

### Content Strategy

- **Structured data** (skills, timelines, metrics) remains in TypeScript/JSON for programmatic access
- **Narrative content** (project descriptions, personal statements) uses MDX for rich formatting
- This separation ensures both human readability and machine processability

### Creative Theme System

The theme switcher goes beyond standard light/dark modes, featuring creative themes like:

- Death Metal
- Unicorns
- Horror Movies
- Musical

This demonstrates both technical capability and personality, making the portfolio memorable.

## Target Audiences

### Recruiters & HR Professionals

**What they care about:**

- Clear presentation of skills and experience
- Quantifiable achievements and metrics
- Professional appearance and accessibility
- Traditional CV format availability
- Contact information and availability

**How this CV serves them:**

- Clean, professional layout
- Downloadable PDF format
- Clear skill categorization
- Experience timeline
- Contact details prominently displayed

### Developers & CTOs

**What they care about:**

- Code quality and architecture
- Engineering practices and principles
- Technical decision-making
- Scalability and maintainability
- Problem-solving approach

**How this CV serves them:**

- Public repository with clean architecture
- SOLID principles implementation
- Domain-driven design patterns
- Comprehensive testing strategy
- Modern tech stack demonstration

## Philosophy

This CV operates on the principle that **a developer's portfolio should be both a résumé and a demonstration of engineering culture**. The complexity introduced by MDX and architectural patterns is a conscious decision to showcase technical depth, not a necessity for the core functionality.

The project demonstrates:

- **Technical Excellence**: Clean code, proper architecture, comprehensive testing
- **User Experience**: Intuitive navigation, responsive design, accessibility
- **Professional Communication**: Clear messaging for different audiences
- **Continuous Improvement**: Living repository that evolves with skills

## Future Work

### Planned Enhancements

- **Expanded Creative Themes**: More personality-driven theme options
- **Project Case Studies**: Transform project descriptions into detailed case studies (Problem → Solution → Outcome)
- **Living Portfolio**: Continuous evolution of the repository as a demonstration of ongoing learning and improvement

### Technical Roadmap

- Enhanced PDF generation with better styling
- Improved content management system
- Advanced analytics and performance monitoring
- Integration with professional networks and APIs

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Content**: MDX with custom parsing
- **Architecture**: Domain-Driven Design, Hexagonal Architecture
- **Testing**: Jest, Playwright
- **Deployment**: Vercel
- **PDF Generation**: Puppeteer (planned migration to @react-pdf/renderer)

## Getting Started

```bash
git clone <repository-url>
cd cv-rga
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the developer view or [http://localhost:3000/cv](http://localhost:3000/cv) for the recruiter view.

## License

MIT License - see LICENSE file for details
