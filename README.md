# CV RGA - Personal Portfolio & Blog

A modern, scalable personal portfolio and blog built with Next.js 15, TypeScript, and following Clean Architecture principles.

## 🏗️ Architecture Overview

This project follows **Domain-Driven Design (DDD)** and **Hexagonal Architecture** principles, ensuring clean separation of concerns and maintainable code.

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │   Layouts   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Services  │  │   Hooks     │  │   Utils     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     Domain Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Entities   │  │  Value      │  │  Services   │        │
│  │             │  │  Objects    │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Contentlayer│  │   Config    │  │   External  │        │
│  │             │  │             │  │   APIs      │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

- **Next.js 15** with App Router for optimal performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** with dark mode support and typography plugin
- **shadcn/ui** for consistent, accessible UI components
- **Contentlayer** for type-safe content management
- **Clean Architecture** following SOLID principles
- **Domain-Driven Design** for better code organization
- **ESLint & Prettier** for code quality and consistency
- **Vercel-ready** deployment configuration

## 📁 Project Structure

```
cv-rga/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   └── page.tsx           # Home page component
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── button.tsx    # Button component with variants
│   │   │   ├── card.tsx      # Card component
│   │   │   └── dropdown-menu.tsx # Dropdown menu component
│   │   ├── theme-provider.tsx # Theme context provider
│   │   └── theme-toggle.tsx  # Theme switcher component
│   ├── lib/                  # Utility functions and configurations
│   │   └── utils.ts          # Common utility functions
│   ├── domain/               # Domain layer (DDD)
│   │   ├── entities/         # Business entities
│   │   ├── value-objects/    # Value objects
│   │   └── services/         # Domain services
│   ├── application/          # Application layer
│   │   ├── services/         # Application services
│   │   ├── hooks/           # Custom React hooks
│   │   └── interfaces/      # Service interfaces
│   └── infrastructure/       # Infrastructure layer
│       ├── content/          # Content management
│       └── config/          # External configurations
├── content/                  # Content files (MD/MDX)
│   ├── posts/               # Blog posts
│   └── pages/               # Static pages
├── public/                  # Static assets
└── config files...          # Configuration files
```

## 🏛️ Architecture Principles

### SOLID Principles

1. **Single Responsibility Principle (SRP)**: Each component has one reason to change
2. **Open/Closed Principle (OCP)**: Components are open for extension, closed for modification
3. **Liskov Substitution Principle (LSP)**: Components can be replaced with their subtypes
4. **Interface Segregation Principle (ISP)**: Components depend only on interfaces they use
5. **Dependency Inversion Principle (DIP)**: High-level modules don't depend on low-level modules

### Domain-Driven Design (DDD)

- **Entities**: Core business objects with identity
- **Value Objects**: Immutable objects without identity
- **Services**: Business logic that doesn't belong to entities
- **Repositories**: Data access abstraction
- **Aggregates**: Clusters of related entities

### Hexagonal Architecture

- **Ports**: Interfaces defining contracts
- **Adapters**: Implementations of ports
- **Domain**: Core business logic isolated from external concerns

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cv-rga
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Blog Posts

Create `.mdx` files in `content/posts/` with the following frontmatter:

```mdx
---
title: "Post Title"
date: "2024-01-15"
description: "Post description"
tags: ["tag1", "tag2"]
published: true
---

# Post content
```

### Static Pages

Create `.mdx` files in `content/pages/` with the following frontmatter:

```mdx
---
title: "Page Title"
description: "Page description"
---

# Page content
```

## 🎨 Theming System

The application supports light, dark, and system themes through CSS custom properties:

- **CSS Variables**: Defined in `globals.css` for consistent theming
- **Theme Provider**: React context for theme management
- **Theme Toggle**: Component for switching between themes

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js configuration
3. Deploy with zero configuration

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## 🧪 Testing Strategy

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Type Safety**: TypeScript provides compile-time error checking

## 📊 Performance Optimization

- **Next.js 15**: Latest performance optimizations
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting
- **Static Generation**: Pre-rendered pages for better performance
- **Incremental Static Regeneration**: Dynamic content with static benefits

## 🔒 Security Considerations

- **Content Security Policy**: Configured for XSS protection
- **Type Safety**: TypeScript prevents runtime errors
- **Input Validation**: Proper validation of user inputs
- **Secure Headers**: Security headers configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🏆 Best Practices Implemented

- **Clean Code**: Self-documenting code without comments
- **SOLID Principles**: Maintainable and extensible architecture
- **DDD**: Clear domain boundaries and business logic separation
- **Hexagonal Architecture**: Loose coupling between layers
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized for speed and user experience
- **Accessibility**: WCAG compliant components
- **SEO**: Optimized for search engines

## 📋 General Instructions

### Code Quality Standards

- **No Comments**: Code should be self-documenting through clear naming and structure
- **Clean Code**: Follow Uncle Bob's Clean Code principles
- **SOLID Principles**: Apply all five SOLID principles consistently
- **Hexagonal Architecture**: Clear separation between domain, application, and infrastructure layers
- **Consistent Naming**: Use clear, descriptive names in English
- **Complete Code**: Provide complete implementations, no code fragments

### Development Guidelines

- **Domain Layer**: Contains business logic and entities
- **Application Layer**: Contains use cases and orchestration
- **Infrastructure Layer**: Contains external concerns and implementations
- **Presentation Layer**: Contains UI components and pages
