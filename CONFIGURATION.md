# Configuration Documentation

## Overview

This document provides detailed information about the configuration files and settings used in the CV-RGA project.

## Package Configuration

### package.json

The main package configuration file defines dependencies, scripts, and project metadata.

#### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest && playwright test",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

#### Dependencies

**Core Dependencies:**

- `next`: ^15.0.0 - React framework
- `react`: ^18.3.0 - UI library
- `typescript`: ^5.3.0 - Type safety
- `tailwindcss`: ^3.4.0 - CSS framework
- `zod`: ^3.23.8 - Runtime validation

**UI/UX Dependencies:**

- `framer-motion`: ^12.23.12 - Animations
- `lucide-react`: ^0.344.0 - Icons
- `next-themes`: ^0.2.1 - Theme management
- `@radix-ui/react-dropdown-menu`: ^2.0.6 - UI primitives
- `@radix-ui/react-slot`: ^1.0.2 - Component composition

**PDF Generation:**

- `pdfkit`: ^0.17.1 - PDF creation
- `@types/pdfkit`: ^0.17.2 - TypeScript types

**Development Dependencies:**

- `@playwright/test`: ^1.55.0 - E2E testing
- `jest`: ^30.0.5 - Unit testing
- `eslint`: ^8.57.0 - Code linting
- `prettier`: ^3.2.0 - Code formatting

## TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Key Configuration Options

- **strict**: Enables all strict type checking options
- **baseUrl**: Sets the base directory for module resolution
- **paths**: Configures path mapping for clean imports
- **jsx**: Preserves JSX for Next.js processing
- **incremental**: Enables incremental compilation for faster builds

## Next.js Configuration

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  serverExternalPackages: ['pdfkit'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
```

#### Configuration Options

- **pageExtensions**: Defines valid page file extensions
- **serverExternalPackages**: Includes pdfkit for server-side rendering
- **images**: Configures image optimization and remote patterns
- **experimental.optimizePackageImports**: Optimizes lucide-react imports

## Tailwind CSS Configuration

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

#### Key Features

- **darkMode**: Class-based dark mode implementation
- **content**: Defines files to scan for CSS classes
- **theme.extend**: Custom color scheme using CSS variables
- **plugins**: Typography plugin for rich text styling

## ESLint Configuration

### .eslintrc.json

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

#### Configuration Details

- **extends**: Inherits Next.js and TypeScript rules
- **rules**: Custom rule overrides for code quality
- **TypeScript**: Strict TypeScript linting rules

## Prettier Configuration

### .prettierrc

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

#### Formatting Rules

- **semi**: No semicolons
- **singleQuote**: Single quotes for strings
- **tabWidth**: 2 spaces for indentation
- **printWidth**: 80 characters line length
- **plugins**: Tailwind CSS class sorting

## Jest Configuration

### jest.config.js

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

#### Test Configuration

- **setupFilesAfterEnv**: Jest setup file for testing utilities
- **testEnvironment**: jsdom for DOM testing
- **moduleNameMapping**: Path mapping for clean imports

### jest.setup.js

```javascript
import '@testing-library/jest-dom'

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
```

#### Setup Features

- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **ResizeObserver**: Mock implementation for component testing

## Playwright Configuration

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

#### E2E Testing Configuration

- **testDir**: Directory containing E2E tests
- **projects**: Multiple browser configurations
- **webServer**: Development server for testing
- **reporter**: HTML report generation

## PostCSS Configuration

### postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### CSS Processing

- **tailwindcss**: Tailwind CSS processing
- **autoprefixer**: Automatic vendor prefixing

## Environment Configuration

### Environment Variables

The project uses environment variables for configuration:

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
```

### Vercel Configuration

For Vercel deployment, the following environment variables are configured:

- **NODE_ENV**: Set automatically by Vercel
- **NEXT*PUBLIC*\***: Public environment variables
- **Private variables**: Securely managed through Vercel dashboard

## Build Configuration

### Build Process

1. **Type Checking**: `tsc --noEmit`
2. **Linting**: `next lint`
3. **Testing**: `jest && playwright test`
4. **Build**: `next build`
5. **Optimization**: Automatic code splitting and optimization

### Output Configuration

- **Static Export**: Optimized for static hosting
- **Image Optimization**: Automatic image optimization
- **Bundle Analysis**: Built-in bundle analysis tools
- **Performance Monitoring**: Core Web Vitals tracking

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Quality Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npx prettier --write .

# Testing
npm run test:coverage
```

## Performance Configuration

### Bundle Optimization

- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: Route-based code splitting
- **Dynamic Imports**: Lazy loading for heavy components
- **Image Optimization**: Automatic image optimization

### Caching Strategy

- **Browser Caching**: Static assets cached appropriately
- **CDN Caching**: Vercel edge caching
- **API Caching**: Intelligent API response caching

## Security Configuration

### Content Security Policy

- **XSS Protection**: React's built-in XSS protection
- **HTTPS Only**: All connections use HTTPS in production
- **Input Validation**: Zod validation for all data
- **No User Input**: Static content only

### Environment Security

- **No Secrets in Code**: All secrets managed through environment
- **Secure Headers**: Automatic security headers
- **CORS Configuration**: Proper CORS settings

## Monitoring Configuration

### Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Core Web Vitals**: Real-time performance tracking
- **Error Tracking**: Automatic error collection
- **User Behavior**: Anonymous usage analytics

### Logging

- **Console Logging**: Development and debugging information
- **Error Boundaries**: React error boundary implementation
- **Performance Logging**: Custom performance metrics

## Conclusion

The configuration files in this project are designed to provide:

- **Type Safety**: Comprehensive TypeScript configuration
- **Code Quality**: ESLint and Prettier for consistent code
- **Testing**: Jest and Playwright for comprehensive testing
- **Performance**: Optimized build and runtime configuration
- **Security**: Secure defaults and best practices
- **Developer Experience**: Fast development and debugging tools

All configurations follow modern best practices and are optimized for the specific needs of a developer portfolio/resume application.
