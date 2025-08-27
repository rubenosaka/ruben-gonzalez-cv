# Architecture Documentation

## Overview

This project implements a **simplified, lightweight architecture** focused on practical solutions and maintainable code. The architecture prioritizes type safety, validation, and direct data access over complex patterns.

> **Note**: This project intentionally uses a simplified architecture as part of a developer resume. It demonstrates practical engineering thinking rather than over-engineering.

## Architecture Layers

### 1. Presentation Layer (`src/app/`, `src/components/`)

**Responsibility**: User interface and user interaction handling.

**Components**:

- **Pages**: Next.js App Router pages
- **Components**: Reusable UI components
- **Layouts**: Page layout components

**Principles Applied**:

- **Single Responsibility**: Each component has one clear purpose
- **Direct Data Access**: Components directly import and use data services
- **Type Safety**: Full TypeScript coverage with proper typing

**Example**:

```typescript
// Clean component with direct data access
export default function ResumePage() {
  const ResumeService = new ResumeService()
  const cv = ResumeService.getResume()

  return (
    <PageLayout>
      <ResumeMainInfo
        name={resume.metadata.name}
        title={resume.metadata.title}
        location={resume.metadata.location}
        email={resume.metadata.email}
        summary={resume.metadata.summary}
      />
    </PageLayout>
  )
}
```

### 2. Application Layer (`src/application/`)

**Responsibility**: Application use cases and business workflows.

**Components**:

- **Services**: Application business logic with direct data access
- **Data Validation**: Zod schemas for runtime validation

**Principles Applied**:

- **Direct Imports**: Services directly import data modules
- **Validation**: Zod schemas ensure data integrity
- **Simplicity**: No dependency injection or complex abstractions

**Example**:

```typescript
// Simple service with direct data access
import { resume } from '@/content/resume.data'

export class ResumeService {
  getResume() {
    return cv
  }
}
```

### 3. Content Layer (`src/content/`)

**Responsibility**: Data storage and validation.

**Components**:

- **Data Modules**: TypeScript modules with structured data
- **Zod Schemas**: Validation schemas for type safety
- **HTML Content**: Rich content for direct rendering

**Principles Applied**:

- **Type Safety**: Zod validation at runtime
- **Fail Fast**: Validation errors caught early
- **Direct Access**: No repositories or abstractions

**Example**:

```typescript
import { z } from 'zod'

const ResumeSchema = z.object({
  metadata: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    location: z.string(),
    summary: z.string(),
  }),
  content: z.object({
    highlights: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    experience: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        period: z.string(),
        description: z.string(),
        stack: z.array(z.string()).optional(),
        highlights: z.array(z.string()).optional(),
      })
    ),
  }),
})

const resumeData = {
  /* ... */
}
export const cv = ResumeSchema.parse(resumeData)
```

## Data Flow

### 1. Content Definition

```typescript
// src/content/resume.data.ts
const resumeData = {
  metadata: {
    /* ... */
  },
  content: {
    /* ... */
  },
}
export const cv = ResumeSchema.parse(resumeData)
```

### 2. Service Access

```typescript
// src/application/services/ResumeService.ts
import { cv } from '@/content/resume.data'

export class ResumeService {
  getResume() {
    return cv
  }
}
```

### 3. Component Usage

```typescript
// src/app/resume/page.tsx
const ResumeService = new ResumeService()
const cv = ResumeService.getResume()
```

## Validation Strategy

### 1. Zod Schemas

**Runtime Validation**: All data is validated at import time using Zod schemas.

```typescript
const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  bodyHtml: z.string(),
})
```

### 2. Type Safety

**Compile-time Safety**: TypeScript ensures type correctness during development.

```typescript
interface CV {
  metadata: {
    name: string
    title: string
    email: string
    location: string
    summary: string
  }
  content: {
    highlights: Array<{
      title: string
      description: string
    }>
    experience: Array<{
      title: string
      company: string
      period: string
      description: string
      stack?: string[]
      highlights?: string[]
    }>
  }
}
```

### 3. Error Handling

**Fail Fast**: Validation errors are caught immediately at startup.

```typescript
try {
  export const cv = ResumeSchema.parse(resumeData)
} catch (error) {
  console.error('CV data validation failed:', error)
  process.exit(1)
}
```

## Content Management

### 1. Data Structure

**TypeScript Modules**: Content is stored in TypeScript modules for type safety.

- `src/content/resume.data.ts` - Resume data with validation
- `src/content/pages.data.ts` - Static pages data
- `src/content/projects.data.ts` - Projects data

### 2. HTML Content

**Direct Rendering**: Rich content uses HTML for direct rendering with `dangerouslySetInnerHTML`.

```typescript
const pageData = {
  slug: 'about-me',
  title: 'About Me',
  bodyHtml: '<p>This is <strong>rich</strong> content.</p>',
}
```

### 3. Structured Data

**Programmatic Access**: Structured data is easily accessible for components.

```typescript
const highlights = resume.content.highlights.map((h) => ({
  title: h.title,
  description: h.description,
}))
const experience = resume.content.experience.map((exp) => ({
  title: exp.title,
  company: exp.company,
  period: exp.period,
}))
```

## Testing Strategy

### 1. Unit Tests

- **Services**: Test data access and business logic
- **Components**: Test UI behavior and rendering
- **Validation**: Test Zod schemas and data integrity

### 2. Integration Tests

- **Data Flow**: Test complete data flow from content to components
- **PDF Generation**: Test PDF export functionality

### 3. E2E Tests

- **Navigation**: Test user navigation and interactions
- **Content Display**: Test content rendering across pages

## Performance Considerations

### 1. Bundle Size

- **Tree Shaking**: ES6 modules enable effective tree shaking
- **Code Splitting**: Next.js automatic code splitting
- **Minimal Dependencies**: Reduced bundle size through simplified architecture

### 2. Build Performance

- **Fast Builds**: Simplified architecture enables faster builds
- **Type Checking**: Efficient TypeScript compilation
- **Validation**: Runtime validation only at startup

### 3. Runtime Performance

- **Direct Access**: No abstraction layers for data access
- **Static Generation**: Next.js static generation where possible
- **Optimized Rendering**: Efficient React rendering

## Security Considerations

### 1. Input Validation

- **Zod Validation**: All data validated at runtime
- **Type Safety**: TypeScript prevents type-related errors
- **HTML Sanitization**: Content rendered safely with proper HTML

### 2. Content Security

- **Static Content**: All content is static and validated
- **No User Input**: No dynamic content from user input
- **XSS Protection**: React's built-in XSS protection

### 3. Type Safety

- **Full TypeScript**: Complete TypeScript coverage
- **Compile-time Errors**: Errors caught during development
- **Runtime Validation**: Additional validation at runtime

## Scalability

### 1. Content Management

- **Modular Data**: Easy to add new content types
- **Validation**: Consistent validation across all content
- **Type Safety**: Safe refactoring and changes

### 2. Component Architecture

- **Reusable Components**: Components can be easily reused
- **Composition**: Flexible component composition
- **Maintainability**: Clean, readable code

### 3. Development Experience

- **Fast Development**: Simplified architecture enables rapid development
- **Clear Data Flow**: Easy to understand and modify
- **Strong Tooling**: Excellent TypeScript and IDE support

## Best Practices

### 1. Clean Code

- **Self-documenting code**: Code explains itself through clear naming
- **No comments**: Avoid comments by writing expressive code
- **Meaningful names**: Use descriptive names for variables and functions
- **Small functions**: Keep functions focused and concise
- **Complete implementations**: Provide full code implementations
- **Consistent naming**: Use English naming conventions

### 2. Data Management

- **Single Source of Truth**: Each data type has one source
- **Validation**: All data validated with Zod
- **Type Safety**: Full TypeScript coverage
- **Direct Access**: No unnecessary abstraction layers

### 3. Component Design

- **Single Responsibility**: Each component has one purpose
- **Composition**: Use composition over inheritance
- **Props Interface**: Define clear prop interfaces
- **Default Props**: Provide sensible defaults

## Migration Benefits

### 1. Simplified Architecture

- **Removed Complexity**: No DI, repositories, or domain entities
- **Direct Access**: Services directly import data
- **Faster Development**: Reduced boilerplate and complexity
- **Easier Maintenance**: Simpler codebase to understand and modify

### 2. Improved Type Safety

- **Zod Validation**: Runtime validation ensures data integrity
- **TypeScript**: Compile-time type checking
- **Fail Fast**: Errors caught early in development
- **Better DX**: Improved developer experience

### 3. Reduced Dependencies

- **Fewer Packages**: Removed MDX, remark, rehype dependencies
- **Smaller Bundle**: Reduced bundle size
- **Faster Builds**: Simplified build process
- **Better Performance**: Improved runtime performance

## Future Enhancements

### 1. Content Management

- **Dynamic Content**: Add CMS integration if needed
- **Content Versioning**: Track content changes
- **Rich Text Editor**: Add visual content editing

### 2. Performance

- **Caching**: Add content caching strategies
- **Optimization**: Further performance optimizations
- **Monitoring**: Add performance monitoring

### 3. Features

- **Internationalization**: Add multi-language support
- **Analytics**: Add user analytics
- **SEO**: Enhanced SEO features
