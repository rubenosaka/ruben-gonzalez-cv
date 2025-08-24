# Coding Standards

## General Instructions

### Core Principles

1. **No Comments**: Code should be self-documenting through clear naming and structure
2. **Clean Code**: Follow Uncle Bob's Clean Code principles
3. **SOLID Principles**: Apply all five SOLID principles consistently
4. **Hexagonal Architecture**: Clear separation between domain, application, and infrastructure layers
5. **Consistent Naming**: Use clear, descriptive names in English
6. **Complete Code**: Provide complete implementations, no code fragments

## Code Quality Standards

### 1. Self-Documenting Code

**❌ Avoid Comments**
```typescript
// This function calculates the total price including tax
function calculateTotal(price: number, tax: number): number {
  return price + (price * tax) // Add tax to price
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

### 3. SOLID Principles

#### Single Responsibility Principle (SRP)
```typescript
// ❌ Multiple responsibilities
class UserManager {
  saveUser(user: User) { /* database logic */ }
  sendEmail(user: User) { /* email logic */ }
  validateUser(user: User) { /* validation logic */ }
}

// ✅ Single responsibility
class UserRepository {
  save(user: User): Promise<void> { /* only database logic */ }
}

class EmailService {
  sendEmail(user: User): Promise<void> { /* only email logic */ }
}

class UserValidator {
  validate(user: User): ValidationResult { /* only validation logic */ }
}
```

#### Open/Closed Principle (OCP)
```typescript
// ❌ Closed for extension
class PaymentProcessor {
  processPayment(payment: Payment) {
    if (payment.type === 'credit') {
      // Credit card logic
    } else if (payment.type === 'debit') {
      // Debit card logic
    }
  }
}

// ✅ Open for extension
interface PaymentMethod {
  process(payment: Payment): Promise<void>
}

class CreditCardPayment implements PaymentMethod {
  async process(payment: Payment): Promise<void> {
    // Credit card logic
  }
}

class DebitCardPayment implements PaymentMethod {
  async process(payment: Payment): Promise<void> {
    // Debit card logic
  }
}

class PaymentProcessor {
  constructor(private paymentMethods: PaymentMethod[]) {}
  
  async processPayment(payment: Payment): Promise<void> {
    const method = this.paymentMethods.find(m => m.canProcess(payment))
    await method.process(payment)
  }
}
```

### 4. Hexagonal Architecture

#### Domain Layer
```typescript
// Pure business logic, no external dependencies
export class Post {
  private constructor(
    private readonly _id: string,
    private readonly _metadata: PostMetadata,
    private readonly _content: string,
    private readonly _url: string
  ) {}

  isPublished(): boolean {
    return this._metadata.published
  }

  hasTag(tag: string): boolean {
    return this._metadata.tags.includes(tag)
  }
}
```

#### Application Layer
```typescript
// Use cases and orchestration
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPublishedPosts(): Promise<Post[]> {
    return this.postRepository.findPublished()
  }
}
```

#### Infrastructure Layer
```typescript
// External concerns and implementations
export class ContentlayerPostRepository implements PostRepository {
  async findPublished(): Promise<Post[]> {
    return allPosts
      .filter(post => post.published)
      .map(this.mapToPost)
  }
}
```

### 5. Consistent Naming

#### Files and Directories
```
src/
├── domain/           # Business logic
│   ├── entities/     # Business objects
│   ├── value-objects/ # Immutable objects
│   └── services/     # Domain services
├── application/      # Use cases
│   ├── services/     # Application services
│   ├── interfaces/   # Contracts
│   └── hooks/        # Custom hooks
├── infrastructure/   # External concerns
│   ├── content/      # Content management
│   └── config/       # Configuration
└── components/       # UI components
    └── ui/           # Base components
```

#### Naming Conventions
```typescript
// Classes: PascalCase
class PostService {}
class UserRepository {}

// Interfaces: PascalCase with I prefix
interface IPostRepository {}
interface IUserService {}

// Functions: camelCase
function getPostById() {}
function validateUser() {}

// Variables: camelCase
const postTitle = 'My Post'
const userEmail = 'user@example.com'

// Constants: UPPER_SNAKE_CASE
const MAX_POST_LENGTH = 1000
const DEFAULT_PAGE_SIZE = 10

// Types: PascalCase
type PostMetadata = {
  title: string
  date: Date
}
```

### 6. Complete Implementations

#### ❌ Code Fragments
```typescript
// Missing implementation details
function processData(data: any) {
  // TODO: implement data processing
  return data
}
```

#### ✅ Complete Code
```typescript
function processUserData(userData: UserData): ProcessedUserData {
  const validatedData = userValidator.validate(userData)
  
  if (!validatedData.isValid) {
    throw new ValidationError(validatedData.errors)
  }
  
  const enrichedData = userEnricher.enrich(validatedData.data)
  const processedData = userProcessor.process(enrichedData)
  
  return processedData
}
```

## Examples

### Component Implementation
```typescript
interface PostCardProps {
  post: Post
  onPostClick?: (post: Post) => void
  className?: string
}

export const PostCard = ({ post, onPostClick, className }: PostCardProps) => {
  const handleClick = () => {
    onPostClick?.(post)
  }

  return (
    <Card className={cn('cursor-pointer hover:shadow-lg', className)} onClick={handleClick}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {post.getFormattedDate()}
          </span>
          <div className="flex gap-1">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Service Implementation
```typescript
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPublishedPosts(): Promise<Post[]> {
    const posts = await this.postRepository.findPublished()
    return this.sortPostsByDate(posts)
  }

  async getPostsByTag(tagValue: string): Promise<Post[]> {
    const tag = Tag.create(tagValue)
    const posts = await this.postRepository.findByTag(tag)
    return this.sortPostsByDate(posts)
  }

  private sortPostsByDate(posts: Post[]): Post[] {
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
  }
}
```

### Hook Implementation
```typescript
export const usePosts = (postService: PostService) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPublishedPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const publishedPosts = await postService.getPublishedPosts()
      setPosts(publishedPosts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublishedPosts()
  }, [])

  return {
    posts,
    loading,
    error,
    refetch: fetchPublishedPosts
  }
}
```

## Enforcement

### Code Review Checklist

- [ ] No comments in code
- [ ] Self-documenting variable and function names
- [ ] Single responsibility principle followed
- [ ] SOLID principles applied
- [ ] Hexagonal architecture maintained
- [ ] Complete implementations provided
- [ ] Consistent naming conventions used
- [ ] TypeScript types properly defined
- [ ] Error handling implemented
- [ ] Tests written for new functionality

### Automated Checks

- ESLint configuration enforces naming conventions
- Prettier ensures consistent formatting
- TypeScript strict mode catches type issues
- Pre-commit hooks validate code quality
