# Coding Standards

## General Instructions

### Core Principles

1. **No Comments**: Code should be self-documenting through clear naming and structure
2. **Clean Code**: Follow Uncle Bob's Clean Code principles
3. **Type Safety**: Maintain full TypeScript coverage with Zod validation
4. **Simplified Architecture**: Direct data access without unnecessary abstractions
5. **Consistent Naming**: Use clear, descriptive names in English
6. **Complete Code**: Provide complete implementations, no code fragments

## Code Quality Standards

### 1. Self-Documenting Code

**❌ Avoid Comments**

```typescript
// This function calculates the total price including tax
function calculateTotal(price: number, tax: number): number {
  return price + price * tax // Add tax to price
}
```

**✅ Write Expressive Code**

```typescript
function calculateTotalWithTax(basePrice: number, taxRate: number): number {
  const taxAmount = basePrice * taxRate
  return basePrice + taxAmount
}
```

### 2. Clean Code Principles

#### Meaningful Names

```typescript
// ❌ Poor naming
const d = new Date()
const fn = (x: number) => x * 2

// ✅ Clear naming
const currentDate = new Date()
const doubleValue = (value: number) => value * 2
```

#### Small Functions

```typescript
// ❌ Large function with multiple responsibilities
function processUserData(user: User): ProcessedUser {
  // 20+ lines of mixed logic
}

// ✅ Small, focused functions
function validateUser(user: User): ValidationResult {
  return userValidator.validate(user)
}

function enrichUserData(user: User): EnrichedUser {
  return userEnricher.enrich(user)
}

function processUserData(user: User): ProcessedUser {
  const validation = validateUser(user)
  if (!validation.isValid) {
    throw new ValidationError(validation.errors)
  }

  const enrichedUser = enrichUserData(user)
  return userProcessor.process(enrichedUser)
}
```

### 3. Type Safety and Validation

#### Zod Schemas

```typescript
// ❌ No validation
const userData = {
  name: 'John',
  email: 'invalid-email',
  age: 'not-a-number',
}

// ✅ Zod validation
const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).max(120),
})

const userData = UserSchema.parse({
  name: 'John',
  email: 'john@example.com',
  age: 30,
})
```

#### Type Safety

```typescript
// ❌ Any types
function processData(data: any): any {
  return data.map((item) => item.value)
}

// ✅ Proper typing
interface DataItem {
  id: string
  value: string
}

function processData(data: DataItem[]): string[] {
  return data.map((item) => item.value)
}
```

### 4. Simplified Architecture

#### Direct Data Access

```typescript
// ❌ Complex repository pattern
class UserRepository {
  async findById(id: string): Promise<User> {
    // Complex database logic
  }
}

class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: string): Promise<User> {
    return this.userRepository.findById(id)
  }
}

// ✅ Direct data access
import { users } from '@/content/users.data'

class UserService {
  getUser(id: string): User | undefined {
    return users.find((user) => user.id === id)
  }
}
```

#### Service Implementation

```typescript
// ❌ Dependency injection complexity
class ResumeService {
  constructor(private cvRepository: CVRepository) {}

  async getResume(): Promise<CV> {
    return this.cvRepository.getResume()
  }
}

// ✅ Simple service
import { cv } from '@/content/resume.data'

export class ResumeService {
  getResume() {
    return cv
  }
}
```

## Data Management Standards

### 1. Content Structure

#### Data Modules

```typescript
// src/content/resume.data.ts
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
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Engineering Manager',
    email: 'rubenosaka@gmail.com',
    location: 'Madrid, Spain',
    summary: 'Experienced engineering manager...',
  },
  content: {
    highlights: [
      {
        title: 'Team Leadership',
        description: 'Led engineering teams of 3–10 developers...',
      },
    ],
    experience: [
      {
        title: 'Engineering Manager',
        company: 'Frenetic.ai',
        period: '2021-Present',
        description: 'Leading engineering for SaaS platform...',
        stack: ['React', 'Node.js', 'TypeScript'],
        highlights: ['Led team of 8 developers', 'Improved performance by 40%'],
      },
    ],
  },
}

export const cv = ResumeSchema.parse(resumeData)
```

#### HTML Content

```typescript
// ❌ MDX processing
<MDXContent source={content} format="mdx" />

// ✅ Direct HTML rendering
<div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
```

### 2. Component Standards

#### Component Structure

```typescript
// ✅ Clean component with proper typing
interface ResumeMainInfoProps {
  name: string
  title: string
  location: string
  email: string
  summary: string
}

export function ResumeMainInfo({ name, title, location, email, summary }: ResumeMainInfoProps) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-xl text-muted-foreground">{title}</p>
      <p className="text-muted-foreground">{location} • {email}</p>
      <p className="mt-4 leading-relaxed">{summary}</p>
    </header>
  )
}
```

#### Page Components

```typescript
// ✅ Simple page with direct data access
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
      <Timeline items={timelineItems} />
      <Highlights>
        {resume.content.highlights.map((highlight, index) => (
          <HighlightItem key={index} title={highlight.title} description={highlight.description} />
        ))}
      </Highlights>
    </PageLayout>
  )
}
```

## Testing Standards

### 1. Unit Tests

#### Service Tests

```typescript
// ✅ Simple service tests
describe('ResumeService', () => {
  it('should return CV data', () => {
    const ResumeService = new ResumeService()
    const cv = ResumeService.getResume()

    expect(resume.metadata.name).toBe('Rubén González Aranda')
    expect(resume.content.highlights).toHaveLength(7)
  })
})
```

#### Component Tests

```typescript
// ✅ Component tests with proper mocking
describe('ResumeMainInfo', () => {
  it('should display resume metadata', () => {
    const props = {
      name: 'Test Name',
      title: 'Test Title',
      location: 'Test Location',
      email: 'test@example.com',
      summary: 'Test Summary'
    }

    render(<ResumeMainInfo {...props} />)

    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

### 2. Integration Tests

#### Page Tests

```typescript
// ✅ Integration tests
describe('Resume Page', () => {
  it('should render all sections', () => {
    render(<ResumePage />)

    expect(screen.getByText('Rubén González Aranda')).toBeInTheDocument()
    expect(screen.getByText('Career Highlights')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })
})
```

## File Organization

### 1. Directory Structure

```
src/
├── app/                    # Next.js pages
├── components/             # Reusable UI components
├── content/                # Data modules with Zod validation
│   ├── resume.data.ts
│   ├── pages.data.ts
│   └── projects.data.ts
├── application/            # Application services
│   └── services/
└── infrastructure/         # External integrations
    └── pdf/
```

### 2. Naming Conventions

#### Files

- **Components**: PascalCase (`ResumeMainInfo.tsx`)
- **Services**: PascalCase (`ResumeService.ts`)
- **Data Modules**: camelCase with `.data.ts` suffix (`resume.data.ts`)
- **Pages**: kebab-case (`resume/page.tsx`)

#### Variables and Functions

- **Variables**: camelCase (`resumeData`)
- **Functions**: camelCase (`getResume`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LENGTH`)
- **Classes**: PascalCase (`ResumeService`)

## Performance Standards

### 1. Bundle Optimization

```typescript
// ✅ Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

### 2. Memoization

```typescript
// ✅ Proper memoization
export const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }))
  }, [data])

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
})
```

## Error Handling

### 1. Validation Errors

```typescript
// ✅ Fail fast validation
try {
  export const cv = ResumeSchema.parse(resumeData)
} catch (error) {
  console.error('CV data validation failed:', error)
  process.exit(1)
}
```

### 2. Component Errors

```typescript
// ✅ Error boundaries
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

## Security Standards

### 1. Input Validation

```typescript
// ✅ Zod validation for all inputs
const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().min(0).max(120),
})
```

### 2. HTML Content

```typescript
// ✅ Safe HTML rendering
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
```

## Documentation Standards

### 1. Code Documentation

- **No comments**: Code should be self-documenting
- **Clear naming**: Use descriptive names
- **Type definitions**: Comprehensive TypeScript interfaces
- **Examples**: Include usage examples in tests

### 2. Architecture Documentation

- **README.md**: Project overview and setup
- **ARCHITECTURE.md**: Technical architecture details
- **DEVELOPMENT.md**: Development guidelines
- **MIGRATION.md**: Migration documentation

## Best Practices Summary

1. **Write self-documenting code** without comments
2. **Use Zod validation** for all data
3. **Maintain type safety** with TypeScript
4. **Keep architecture simple** with direct data access
5. **Write comprehensive tests** for all functionality
6. **Follow naming conventions** consistently
7. **Optimize for performance** and bundle size
8. **Handle errors gracefully** with proper validation
9. **Document architecture** and decisions
10. **Keep dependencies minimal** and focused
