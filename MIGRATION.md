# Migration Documentation: MDX to TypeScript Data with Zod

## Overview

This document describes the complete migration from MDX-based content management to TypeScript data modules with Zod validation. This migration simplified the architecture, improved type safety, and reduced dependencies.

## Migration Goals

### Primary Objectives

1. **Eliminate MDX Complexity**: Remove MDX processing and related dependencies
2. **Improve Type Safety**: Add Zod validation for runtime type checking
3. **Simplify Architecture**: Remove DI, repositories, and domain entities
4. **Reduce Dependencies**: Remove unnecessary packages and complexity
5. **Maintain Functionality**: Ensure all features work as before

### Success Criteria

- ✅ All tests pass (unit + e2e)
- ✅ Build succeeds without errors
- ✅ PDF generation works correctly
- ✅ All pages render properly
- ✅ No MDX dependencies remain
- ✅ Reduced bundle size

## Migration Steps

### 1. Content Structure Migration

#### Before: MDX Files
```
content/
├── cv.mdx
├── pages/
│   ├── about-me.md
│   └── now.md
└── projects/
    ├── frenetic.mdx
    ├── msd-spain.mdx
    ├── otras-politicas.mdx
    └── psd.mdx
```

#### After: TypeScript Data Modules
```
src/content/
├── cv.data.ts
├── pages.data.ts
└── projects.data.ts
```

### 2. Data Schema Definition

#### CV Schema
```typescript
const CVSchema = z.object({
  metadata: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    location: z.string(),
    summary: z.string(),
  }),
  content: z.object({
    highlights: z.array(z.object({ text: z.string() })),
    experience: z.array(z.object({
      title: z.string(),
      company: z.string(),
      period: z.string(),
      description: z.string(),
      stack: z.array(z.string()).optional(),
      highlights: z.array(z.string()).optional(),
    })),
  }),
})
```

#### Page Schema
```typescript
const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  bodyHtml: z.string(),
})
```

#### Project Schema
```typescript
const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  bodyHtml: z.string(),
  links: z.array(z.object({ 
    label: z.string(), 
    url: z.string().url() 
  })).optional(),
})
```

### 3. Service Layer Simplification

#### Before: Repository Pattern with DI
```typescript
// Complex repository pattern
export class MDXCVRepository implements CVRepository {
  async getCV(): Promise<CV> {
    // Complex MDX parsing logic
  }
}

// Dependency injection
const container = DependencyContainer.getInstance()
const cvService = container.getCVService()
```

#### After: Direct Data Access
```typescript
// Simple service with direct imports
import { cv } from '@/content/cv.data'

export class CVService {
  getCV() {
    return cv
  }
}

// Direct instantiation
const cvService = new CVService()
```

### 4. Component Updates

#### Before: MDX Processing
```typescript
// Complex MDX processing
<MDXContent source={cv.content} format={cv.format} />
```

#### After: Direct Rendering
```typescript
// Direct HTML rendering
<div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />

// Structured data mapping
{cv.content.highlights.map((highlight, index) => (
  <HighlightItem key={index} text={highlight.text} />
))}
```

### 5. Content Conversion

#### MDX to HTML Conversion
```mdx
// Before: MDX with custom components
<Highlights>
  <HighlightItem>
    **Led engineering teams of 3–10 developers**, balancing delivery with mentoring.
  </HighlightItem>
</Highlights>
```

```typescript
// After: HTML in data
{
  text: '<strong>Led engineering teams of 3–10 developers</strong>, balancing delivery with mentoring.'
}
```

## Files Removed

### Components
- `src/components/MDXContent.tsx`
- `src/components/MDXContentWrapper.tsx`

### Infrastructure
- `src/infrastructure/repositories/MDXCVRepository.ts`
- `src/infrastructure/repositories/MDXPageRepository.ts`
- `src/infrastructure/repositories/MDXProjectRepository.ts`
- `src/infrastructure/container/di.ts`
- `src/infrastructure/container/types.ts`

### Domain Layer
- `src/domain/entities/CV.ts`
- `src/domain/entities/Page.ts`
- `src/domain/entities/Project.ts`
- `src/domain/value-objects/Slug.ts`
- `src/domain/value-objects/Title.ts`
- `src/domain/value-objects/Summary.ts`
- `src/domain/value-objects/Tag.ts`
- `src/domain/value-objects/Url.ts`
- `src/domain/ports/CVPdfGenerator.ts`

### Interfaces
- `src/application/interfaces/CVRepository.ts`
- `src/application/interfaces/PageRepository.ts`
- `src/application/interfaces/ProjectRepository.ts`

### Utilities
- `src/lib/mdx.ts`
- `src/application/hooks/usePages.ts`
- `src/application/services/CVExportService.ts`

### Content Files
- `content/cv.mdx`
- `content/pages/about-me.md`
- `content/pages/now.md`
- `content/projects/frenetic.mdx`
- `content/projects/msd-spain.mdx`
- `content/projects/otras-politicas.mdx`
- `content/projects/psd.mdx`

## Files Created

### Data Modules
- `src/content/cv.data.ts` - CV data with Zod validation
- `src/content/pages.data.ts` - Pages data with Zod validation
- `src/content/projects.data.ts` - Projects data with Zod validation

### Configuration Updates
- Updated `tsconfig.json` with correct path mappings
- Updated `next.config.js` to remove MDX configuration
- Updated `package.json` to remove MDX dependencies

## Dependencies Removed

### MDX and Related
- `@mdx-js/mdx`
- `@next/mdx`
- `next-mdx-remote`
- `remark-frontmatter`
- `rehype-autolink-headings`
- `rehype-slug`

### Infrastructure
- `tsyringe` (DI container)
- `puppeteer` (replaced with @react-pdf/renderer)

### Total Reduction
- **276 packages removed** (from 901 to 625)
- **Bundle size reduced** significantly
- **Build time improved** due to simplified processing

## Dependencies Added

### Validation
- `zod` - Runtime validation and type safety

## Configuration Changes

### TypeScript Configuration
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/content/*": ["./src/content/*"]
  }
}
```

### Next.js Configuration
```javascript
// Removed MDX configuration
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // ... other config
}
```

## Testing Updates

### Unit Tests
- Updated service tests to work with direct data access
- Removed repository mocking
- Added validation tests for Zod schemas

### E2E Tests
- All navigation tests continue to work
- PDF generation tests updated for new structure
- Content rendering tests updated

## Performance Improvements

### Build Performance
- **Faster builds** due to simplified processing
- **Reduced bundle size** from removed dependencies
- **Better tree shaking** with ES6 modules

### Runtime Performance
- **Direct data access** without abstraction layers
- **No MDX processing** at runtime
- **Optimized rendering** with direct HTML

## Validation Benefits

### Type Safety
- **Compile-time validation** with TypeScript
- **Runtime validation** with Zod
- **Fail fast** validation at startup

### Data Integrity
- **Schema validation** ensures data consistency
- **Type checking** prevents runtime errors
- **Clear error messages** for validation failures

## Migration Verification

### Build Verification
```bash
npm run build  # ✅ Success
npm run type-check  # ✅ Success
```

### Test Verification
```bash
npm test  # ✅ All tests pass
npx playwright test  # ✅ E2E tests pass
```

### Functionality Verification
- ✅ CV page renders correctly
- ✅ PDF generation works
- ✅ All navigation works
- ✅ Content displays properly
- ✅ No console errors

## Rollback Plan

If rollback is needed:

1. **Restore MDX files** from git history
2. **Reinstall MDX dependencies**
3. **Restore repository pattern**
4. **Update configuration files**
5. **Revert component changes**

## Lessons Learned

### What Worked Well
- **Zod validation** provides excellent type safety
- **Direct data access** simplifies the codebase
- **HTML content** is more flexible than MDX
- **Reduced dependencies** improve performance

### Challenges Faced
- **Content conversion** required careful HTML formatting
- **Type definitions** needed updates for new structure
- **Component updates** required testing and validation

### Best Practices
- **Fail fast validation** catches errors early
- **Direct imports** reduce complexity
- **HTML content** provides more flexibility
- **Type safety** prevents runtime errors

## Future Considerations

### Potential Enhancements
- **CMS Integration**: Add dynamic content management
- **Content Versioning**: Track content changes
- **Rich Text Editor**: Add visual content editing
- **Internationalization**: Add multi-language support

### Monitoring
- **Performance monitoring** for build and runtime
- **Error tracking** for validation failures
- **Bundle analysis** to maintain small size

## Conclusion

The migration from MDX to TypeScript data with Zod validation was successful and achieved all objectives:

- ✅ **Simplified architecture** with reduced complexity
- ✅ **Improved type safety** with Zod validation
- ✅ **Reduced dependencies** and bundle size
- ✅ **Maintained functionality** across all features
- ✅ **Better performance** in build and runtime
- ✅ **Enhanced developer experience** with better tooling

The new architecture is more maintainable, performant, and developer-friendly while preserving all existing functionality.
