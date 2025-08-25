import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SectionTitle } from './cv/SectionTitle'
import { Highlights, HighlightItem } from './cv/Highlights'
import { Callout } from './cv/Callout'

interface MDXContentProps {
  source: string
  format: 'mdx' | 'md'
  components?: Record<string, React.ComponentType<any>>
  className?: string
}

export const MDXContent = ({
  source,
  format,
  components = {},
  className = '',
}: MDXContentProps) => {
  const baseClassName = `cv-prose ${className}`

  // Componentes MDX disponibles
  const mdxComponents = {
    SectionTitle,
    Highlights,
    HighlightItem,
    Callout,
    ...components,
  }

  // Componentes para markdown
  const markdownComponents = {
    h1: ({ children, ...props }: any) => (
      <h1
        className="mb-6 mt-8 text-4xl font-semibold text-foreground first:mt-0"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2
        className="mb-4 mt-8 text-2xl font-semibold text-foreground first:mt-0"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="mb-3 mt-6 text-xl font-medium text-foreground" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => (
      <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul className="mb-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="mb-6 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="leading-relaxed text-muted-foreground" {...props}>
        {children}
      </li>
    ),
    a: ({ href, children, ...props }: any) => (
      <a
        href={href}
        className="text-primary underline decoration-primary/30 transition-colors hover:text-primary/80 hover:decoration-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold text-foreground" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic text-muted-foreground" {...props}>
        {children}
      </em>
    ),
    code: ({ children, ...props }: any) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-muted-foreground"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }: any) => (
      <pre
        className="mb-6 overflow-x-auto rounded-lg bg-muted p-4 text-muted-foreground"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="mb-6 border-l-4 border-primary/20 pl-4 italic text-muted-foreground"
        {...props}
      >
        {children}
      </blockquote>
    ),
    hr: ({ ...props }: any) => <hr className="my-8 border-border" {...props} />,
    ...components,
  }

  // Temporarily use markdown for both formats to avoid React version conflicts
  // TODO: Re-enable MDX support when React components are needed
  return (
    <div className={baseClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {source}
      </ReactMarkdown>
    </div>
  )

  return (
    <div className={baseClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}
