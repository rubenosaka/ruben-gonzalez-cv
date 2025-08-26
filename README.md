# Rubén González – Developer Resume

A modern, scalable personal portfolio and resume built with Next.js 15, TypeScript, and following Clean Architecture principles. This repository serves as both a professional resume and a demonstration of engineering excellence.

## Project Goal

This resume is strategically designed to impress two distinct audiences:

- **Recruiters & HR**: Clear presentation of skills, experience, metrics, and professional achievements
- **Developers & CTOs**: Showcase of technical architecture, engineering practices, and code quality

The repository is intentionally public to demonstrate not just the content but also the engineering culture and practices that would be brought to any team.

## Strategy

### Dual-Audience Approach

The project implements a **two-route strategy** to serve different stakeholders:

1. **Recruiter View** (`/resume`): Traditional resume layout with clear skills, experience timeline, and downloadable PDF
2. **Developer View** (`/`): Technical portfolio showcasing projects, architecture decisions, and engineering practices

### Initial Disclaimer

A prominent disclaimer explains the dual-purpose nature, setting expectations for both audiences and demonstrating transparency in communication.

### PDF Export

Professional PDF generation for traditional resume distribution, maintaining consistency across digital and print formats.

## Key Decisions

### TypeScript Data with Zod Validation

**Content is managed through TypeScript modules with Zod validation** for type safety and runtime validation. This approach demonstrates:

- Strong typing and validation practices
- "Fail fast" validation with Zod schemas
- Simplified architecture without external content processing
- Direct data access without repositories or DI

### Lightweight Architecture

The project implements a **simplified, lightweight architecture** that demonstrates:

- Clean, maintainable code without over-engineering
- Direct data imports and service instantiation
- Removal of unnecessary complexity (DI, repositories, domain entities)
- Focus on practical, working solutions

### Content Strategy

- **Structured data** (Resume, pages, projects) stored in TypeScript modules with Zod validation
- **HTML content** for rich formatting and direct rendering
- **Type safety** ensured at both compile-time and runtime
- **Simplified data flow** from content modules to components

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
- Traditional resume format availability
- Contact information and availability

**How this resume serves them:**

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

**How this resume serves them:**

- Public repository with clean, practical architecture
- TypeScript with Zod validation
- Simplified, maintainable codebase
- Comprehensive testing strategy
- Modern tech stack demonstration

## Philosophy

This resume operates on the principle that **a developer's portfolio should be both a résumé and a demonstration of engineering culture**. The architecture focuses on practical solutions that work well and are easy to maintain, demonstrating real-world engineering skills.

The project demonstrates:

- **Technical Excellence**: Clean code, proper validation, comprehensive testing
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
- **Content**: TypeScript modules with Zod validation
- **Architecture**: Simplified, lightweight architecture
- **Testing**: Jest, Playwright
- **Deployment**: Vercel
- **PDF Generation**: pdfkit

## Documentation

This project includes comprehensive documentation:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Technical architecture details and design decisions
- **[DEVELOPMENT.md](./DEVELOPMENT.md)**: Development guidelines and best practices
- **[CODING_STANDARDS.md](./CODING_STANDARDS.md)**: Code quality standards and conventions
- **[MIGRATION.md](./MIGRATION.md)**: Migration from MDX to TypeScript data with Zod

## Getting Started

```bash
git clone <repository-url>
cd cv-rga
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the developer view or [http://localhost:3000/resume](http://localhost:3000/resume) for the recruiter view.

## License

MIT License - see LICENSE file for details
