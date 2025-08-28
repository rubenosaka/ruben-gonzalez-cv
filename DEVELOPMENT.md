# Development Guide

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Git

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000

## Development Workflow

### 1. Feature Development

1. Create a feature branch from `main`
2. Implement the feature following architecture patterns
3. Write tests for new functionality
4. Update documentation if needed
5. Create a pull request

### 2. Code Review Process

- All code must be reviewed before merging
- Ensure clean code practices are followed
- Verify type safety and validation
- Check test coverage

### 3. Testing Strategy

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

## Architecture Guidelines

### 1. Adding New Features

#### Content Layer

1. **Data Modules**: Add TypeScript modules in `src/content/`
2. **Zod Schemas**: Define validation schemas for data integrity
3. **HTML Content**: Use HTML for rich content rendering

#### Application Layer

1. **Services**: Implement application logic with direct data access
2. **Validation**: Ensure all data is validated with Zod
3. **Type Safety**: Maintain full TypeScript coverage

#### Presentation Layer

1. **Components**: Create reusable UI components
2. **Pages**: Implement Next.js pages
3. **Layouts**: Define page layouts

### 2. Component Development

#### Component Structure

```typescript
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  prop1: string
  prop2: number
  className?: string
}

export const Component = ({ prop1, prop2, className, ...props }: ComponentProps) => {
  const handleClick = () => {
    console.log('Component clicked')
  }

  return (
    <div
      className={cn('base-styles', className)}
      onClick={handleClick}
      {...props}
    >
      <span>{prop1}</span>
      <span>{prop2}</span>
    </div>
  )
}
```

#### Responsive Component Example

```typescript
// Mobile-first responsive component
export const ResponsiveComponent = ({ children, className }: ComponentProps) => {
  return (
    <div className={cn(
      'w-full p-4',           // Mobile: full width, padding
      'md:w-auto md:p-6',     // Desktop: auto width, more padding
      'lg:max-w-4xl',         // Large screens: max width
      className
    )}>
      {children}
    </div>
  )
}
```

#### Theme-Aware Component

```typescript
// Component that adapts to theme changes
export const ThemeAwareComponent = ({ children }: ComponentProps) => {
  return (
    <div className="
      bg-white dark:bg-black
      text-gray-900 dark:text-white
      border border-gray-200 dark:border-pink-500
      rounded-lg p-4
    ">
      {children}
    </div>
  )
}
```

### 3. Content Management

The resume uses TypeScript modules with Zod validation for content management, ensuring type safety and data integrity.

#### Content Structure

**Resume Data** (`src/content/resume.data.ts`):

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

**Pages Data** (`src/content/pages.data.ts`):

```typescript
const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  bodyHtml: z.string(),
})

const pagesData = [
  /* ... */
]
export const pages = pagesData.map((page) => PageSchema.parse(page))
```

**Projects Data** (`src/content/projects.data.ts`):

```typescript
const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  bodyHtml: z.string(),
  links: z
    .array(z.object({ label: z.string(), url: z.string().url() }))
    .optional(),
})

const projectsData = [
  /* ... */
]
export const projects = projectsData.map((project) =>
  ProjectSchema.parse(project)
)
```

#### Service Access

Services directly import and expose data:

```typescript
// src/application/services/ResumeService.ts
import { cv } from '@/content/resume.data'

export class ResumeService {
  getResume() {
    return cv
  }
}
```

#### Component Usage

Components use services to access data:

```typescript
// src/app/resume/page.tsx
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

#### HTML Content Rendering

Rich content is rendered using `dangerouslySetInnerHTML`:

```typescript
// For pages and projects with HTML content
<div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
```

### 4. State Management

#### Local State

```typescript
const [state, setState] = useState(initialState)
```

#### Server State

```typescript
// Direct data access through services
const ResumeService = new ResumeService()
const cv = ResumeService.getResume()
```

### 5. Theme Management

#### Theme Provider Setup

```typescript
// src/components/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

#### Theme Usage in Components

```typescript
'use client'

import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
```

### 6. Mobile Navigation

#### Hamburger Menu Implementation

```typescript
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:opacity-70 dark:text-pink-500"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`absolute left-0 right-0 top-full z-50 bg-black shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        {/* Menu items */}
      </div>
    </div>
  )
}
```

### 7. PDF Generation

#### API Route Implementation

```typescript
// src/app/api/resume/pdf/route.ts
import { NextResponse } from 'next/server'
import { ResumeService } from '@/application/services/ResumeService'
import { ReactPdfResumeGenerator } from '@/infrastructure/pdf/ReactPdfResumeGenerator'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const resumeService = new ResumeService()
    const resume = resumeService.getResume()

    const pdfGenerator = new ReactPdfResumeGenerator()
    const pdfBuffer = await pdfGenerator.generatePDF(resume)

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="ruben-gonzalez-resume.pdf"',
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
```

#### Client-Side Download Component

```typescript
'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

export const DownloadResumeButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/resume/pdf', {
        method: 'GET',
        headers: {
          Accept: 'application/pdf',
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ruben-gonzalez-resume.pdf'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        window.open('/api/resume/pdf', '_blank')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      window.open('/api/resume/pdf', '_blank')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="btn-gradient flex w-full items-center gap-2"
    >
      <Download className="h-4 w-4" />
      {isLoading ? 'Generating...' : 'Download PDF'}
    </Button>
  )
}
```

### 5. Error Handling

#### Validation Errors

```typescript
try {
  export const cv = ResumeSchema.parse(resumeData)
} catch (error) {
  console.error('CV data validation failed:', error)
  process.exit(1)
}
```

#### Component Errors

```typescript
export class ErrorBoundary extends Component {
  // Error boundary implementation
}
```

## Code Quality Standards

### 1. General Principles

- **No Comments**: Write self-documenting code that explains itself
- **Clean Code**: Follow Uncle Bob's Clean Code principles
- **Type Safety**: Maintain full TypeScript coverage
- **Validation**: Use Zod for runtime validation
- **Consistent Naming**: Use clear, descriptive English names
- **Complete Code**: Provide full implementations, no code fragments

### 2. TypeScript

- **Strict Mode**: Enable all strict options
- **Type Safety**: Avoid `any` type
- **Interface First**: Define interfaces before implementation
- **Generic Types**: Use generics for reusable components

### 3. ESLint Configuration

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 4. Prettier Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 5. Naming Conventions

#### Files and Directories

- **Components**: PascalCase (`PostCard.tsx`)
- **Services**: PascalCase (`ResumeService.ts`)
- **Data Modules**: camelCase with `.data.ts` suffix (`resume.data.ts`)
- **Types**: PascalCase (`CVMetadata.ts`)

#### Variables and Functions

- **Variables**: camelCase (`resumeData`)
- **Functions**: camelCase (`getResume`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LENGTH`)
- **Classes**: PascalCase (`ResumeService`)

## Testing Guidelines

### 1. Unit Tests

#### Test Structure

```typescript
describe('ResumeService', () => {
  it('should return CV data', () => {
    const ResumeService = new ResumeService()
    const cv = ResumeService.getResume()

    expect(resume.metadata.name).toBe('Rubén González Aranda')
    expect(resume.content.highlights).toHaveLength(7)
  })
})
```

#### Testing Principles

- **Arrange**: Set up test data
- **Act**: Execute the function being tested
- **Assert**: Verify the expected outcome
- **No Comments**: Tests should be self-documenting
- **Complete Tests**: Full test implementations

### 2. Integration Tests

```typescript
describe('Resume Page Integration', () => {
  it('should render resume with all sections', () => {
    render(<ResumePage />)

    expect(screen.getByText('Rubén González Aranda')).toBeInTheDocument()
    expect(screen.getByText('Career Highlights')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })
})
```

### 3. Component Tests

```typescript
describe('ResumeMainInfo Component', () => {
  it('should display resume metadata', () => {
    const mockCV = {
      metadata: {
        name: 'Test Name',
        title: 'Test Title',
        location: 'Test Location',
        email: 'test@example.com',
        summary: 'Test Summary'
      }
    }

    render(<ResumeMainInfo {...mockresume.metadata} />)

    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

## Performance Guidelines

### 1. Code Splitting

```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

### 2. Memoization

```typescript
export const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }))
  }, [data])

  const handleDataChange = useCallback((newData) => {
    console.log('Data changed:', newData)
  }, [])

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
})
```

### 3. Bundle Optimization

- **Tree Shaking**: Use ES6 modules
- **Lazy Loading**: Load components on demand
- **Bundle Analysis**: Monitor bundle size

## Security Guidelines

### 1. Input Validation

```typescript
const ResumeSchema = z.object({
  metadata: z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100),
  }),
})
```

### 2. XSS Prevention

- Use React's built-in XSS protection
- Validate HTML content
- Use Content Security Policy

### 3. Type Safety

- Full TypeScript coverage
- Runtime validation with Zod
- Compile-time error detection

## Deployment Guidelines

### 1. Environment Configuration

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
```

### 2. Build Process

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### 3. Vercel Deployment

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

## Monitoring and Logging

### 1. Error Tracking

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  logger.error('Operation failed', { error, context })
  throw new Error('Operation failed')
}
```

### 2. Performance Monitoring

```typescript
const Component = () => {
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      logger.info('Component render time', { duration })
    }
  })
}
```

### 3. Analytics

- Track user interactions
- Monitor page performance
- Analyze user behavior

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Check type definitions and Zod schemas
2. **Build Failures**: Verify dependencies and validation
3. **Runtime Errors**: Check error boundaries and validation
4. **Performance Issues**: Use React DevTools

### Debug Tools

- **React DevTools**: Component inspection
- **TypeScript**: Type checking and IntelliSense
- **Network Tab**: API calls
- **Console**: Error logging

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

## Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)

### Tools

- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)

### Architecture

- [Clean Code](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Zod Validation](https://zod.dev)
