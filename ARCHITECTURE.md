# Architecture Documentation

## Overview

This project implements a **Clean Architecture** approach with **Domain-Driven Design (DDD)** and **Hexagonal Architecture** principles. The architecture is designed to be maintainable, testable, and scalable.

> **Note**: This project is intentionally over-engineered (DDD, Hexagonal, SOLID) as part of a developer CV. It demonstrates architectural thinking rather than being optimized for minimalism.

## Architecture Layers

### 1. Presentation Layer (`src/app/`, `src/components/`)

**Responsibility**: User interface and user interaction handling.

**Components**:

- **Pages**: Next.js App Router pages
- **Components**: Reusable UI components
- **Layouts**: Page layout components

**Principles Applied**:

- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components are extensible without modification
- **Dependency Inversion**: Components depend on abstractions, not concretions

**Example**:

```typescript
// Clean component with single responsibility
export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
```

### 2. Application Layer (`src/application/`)

**Responsibility**: Application use cases and business workflows.

**Components**:

- **Services**: Application business logic
- **Hooks**: Custom React hooks for state management
- **Interfaces**: Contracts for infrastructure layer

**Principles Applied**:

- **Interface Segregation**: Services depend only on interfaces they use
- **Dependency Inversion**: High-level modules don't depend on low-level modules

**Example**:

```typescript
// Application service following SOLID principles
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPublishedPosts(): Promise<Post[]> {
    return this.postRepository.findPublished()
  }
}
```

### 3. Domain Layer (`src/domain/`)

**Responsibility**: Core business logic and domain rules.

**Components**:

- **Entities**: Business objects with identity
- **Value Objects**: Immutable objects without identity
- **Domain Services**: Business logic that doesn't belong to entities

**Principles Applied**:

- **Encapsulation**: Business rules are encapsulated within entities
- **Immutability**: Value objects are immutable
- **Rich Domain Model**: Entities contain business logic

**Example**:

```typescript
// Rich domain entity with business logic
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

### 4. Infrastructure Layer (`src/infrastructure/`)

**Responsibility**: External concerns and technical implementations.

**Components**:

- **Content Management**: Contentlayer integration
- **Configuration**: External service configurations
- **Adapters**: Implementations of application interfaces

**Principles Applied**:

- **Dependency Inversion**: Implements interfaces defined in application layer
- **Adapter Pattern**: Adapts external services to internal interfaces

**Example**:

```typescript
// Infrastructure adapter implementing application interface
export class ContentlayerPostRepository implements PostRepository {
  async findPublished(): Promise<Post[]> {
    return allPosts.filter((post) => post.published).map(this.mapToPost)
  }
}
```

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

Each class and component has one reason to change:

- **Post Entity**: Manages post business logic
- **PostService**: Handles post application workflows
- **ContentlayerPostRepository**: Manages post data access

### 2. Open/Closed Principle (OCP)

Components are open for extension, closed for modification:

- **Repository Pattern**: New data sources can be added without changing services
- **Component Composition**: UI components can be extended through props

### 3. Liskov Substitution Principle (LSP)

Subtypes can be substituted for their base types:

- **Repository Interfaces**: Any implementation can be substituted
- **Value Objects**: Immutable and substitutable

### 4. Interface Segregation Principle (ISP)

Clients depend only on interfaces they use:

- **PostRepository**: Contains only post-related methods
- **PageRepository**: Contains only page-related methods

### 5. Dependency Inversion Principle (DIP)

High-level modules don't depend on low-level modules:

- **Services depend on interfaces**: Not concrete implementations
- **Dependency Injection**: Dependencies are injected, not created

## Domain-Driven Design (DDD) Implementation

### 1. Entities

**Post Entity**:

- Has identity (id)
- Contains business logic
- Manages its own state

**Page Entity**:

- Has identity (id)
- Represents static content
- Encapsulates page-specific logic

### 2. Value Objects

**Tag Value Object**:

- Immutable
- Self-validating
- No identity

**Url Value Object**:

- Immutable
- Validates URL format
- Provides utility methods

### 3. Domain Services

Business logic that doesn't belong to entities is placed in domain services.

### 4. Repositories

Data access abstraction following repository pattern.

## Hexagonal Architecture Implementation

### 1. Ports (Interfaces)

**Input Ports**:

- `PostRepository` interface
- `PageRepository` interface

**Output Ports**:

- Service interfaces for external integrations

### 2. Adapters

**Primary Adapters**:

- React components
- Next.js pages

**Secondary Adapters**:

- `ContentlayerPostRepository`
- `ContentlayerPageRepository`

### 3. Domain

Core business logic isolated from external concerns.

## Dependency Injection

### Dependency Container

```typescript
export class DependencyContainer {
  private static instance: DependencyContainer

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer()
    }
    return DependencyContainer.instance
  }
}
```

### Usage

```typescript
const container = DependencyContainer.getInstance()
const postService = container.getPostService()
```

## Testing Strategy

### 1. Unit Tests

- **Domain Entities**: Test business logic
- **Value Objects**: Test validation and behavior
- **Services**: Test application logic

### 2. Integration Tests

- **Repository Implementations**: Test data access
- **Service Integration**: Test service interactions

### 3. Component Tests

- **React Components**: Test UI behavior
- **Custom Hooks**: Test state management

## Performance Considerations

### 1. Code Splitting

- Next.js automatic code splitting
- Dynamic imports for heavy components

### 2. Caching

- Contentlayer caching
- React query for data caching

### 3. Optimization

- Static generation where possible
- Image optimization
- Bundle analysis

## Security Considerations

### 1. Input Validation

- Value objects validate input
- TypeScript provides compile-time safety

### 2. Content Security

- Contentlayer sanitizes content
- XSS protection through React

### 3. Type Safety

- Full TypeScript coverage
- Compile-time error detection

## Scalability

### 1. Modular Architecture

- Clear separation of concerns
- Easy to add new features

### 2. Extensibility

- Repository pattern allows new data sources
- Component composition for UI flexibility

### 3. Maintainability

- Clean code principles
- Self-documenting code
- Consistent patterns

## Best Practices

### 1. Clean Code

- **Self-documenting code**: Code should explain itself through clear naming and structure
- **No comments**: Avoid comments by writing expressive code
- **Meaningful names**: Use descriptive names for variables, functions, and classes
- **Small functions**: Keep functions focused and concise
- **Complete implementations**: Provide full code implementations, not fragments
- **Consistent naming**: Use English naming conventions throughout the codebase

### 2. Error Handling

- Domain-specific exceptions
- Graceful error handling
- User-friendly error messages

### 3. Logging

- Structured logging
- Error tracking
- Performance monitoring

## Future Enhancements

### 1. CQRS Pattern

- Separate read and write models
- Optimized for different use cases

### 2. Event Sourcing

- Audit trail
- Temporal queries
- Event-driven architecture

### 3. Microservices

- Service decomposition
- Independent deployment
- Technology diversity
