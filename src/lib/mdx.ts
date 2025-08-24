import type { CompileOptions } from '@mdx-js/mdx'
import { compile } from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

interface MDXCache {
  [key: string]: {
    compiled: string
    metadata: Record<string, unknown>
    timestamp: number
  }
}

const mdxCache: MDXCache = {}
const CACHE_TTL = process.env.NODE_ENV === 'development' ? 5000 : 300000

const compileOptions: CompileOptions = {
  remarkPlugins: [remarkFrontmatter, remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }]
  ],
  format: 'mdx'
}

export async function compileMdx(
  source: string,
  filePath: string
): Promise<{ compiled: string; metadata: Record<string, unknown> }> {
  const cacheKey = `${filePath}:${Buffer.from(source).toString('base64').slice(0, 32)}`
  const now = Date.now()
  
  const cached = mdxCache[cacheKey]
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return {
      compiled: cached.compiled,
      metadata: cached.metadata
    }
  }

  try {
    const compiled = await compile(source, compileOptions)
    const metadata = extractMetadata(source)
    
    mdxCache[cacheKey] = {
      compiled: String(compiled),
      metadata,
      timestamp: now
    }

    return {
      compiled: String(compiled),
      metadata
    }
  } catch (error) {
    throw new Error(`Failed to compile MDX for ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

function extractMetadata(source: string): Record<string, unknown> {
  const metadataMatch = source.match(/export const metadata = ({[\s\S]*?});/)
  if (!metadataMatch) {
    return {}
  }

  try {
    const metadataString = metadataMatch[1]
    return eval(`(${metadataString})`) as Record<string, unknown>
  } catch {
    return {}
  }
}

export function clearMdxCache(): void {
  Object.keys(mdxCache).forEach(key => {
    delete mdxCache[key]
  })
}
