import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
  const baseClassName = `prose prose-gray dark:prose-invert max-w-none ${className}`

  // For now, treat both MDX and MD as markdown since the content is pure markdown
  // TODO: Add proper MDX support when React components are needed

  // Default markdown components with proper styling
  const markdownComponents = {
    h1: ({ children, ...props }: any) => (
      <h1
        className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2
        className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3
        className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: any) => (
      <p
        className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ children, ...props }: any) => (
      <ul
        className="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol
        className="mb-4 list-inside list-decimal text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    a: ({ href, children, ...props }: any) => (
      <a
        href={href}
        className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    strong: ({ children, ...props }: any) => (
      <strong
        className="font-semibold text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </em>
    ),
    code: ({ children, ...props }: any) => (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }: any) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
        {...props}
      >
        {children}
      </pre>
    ),
    blockquote: ({ children, ...props }: any) => (
      <blockquote
        className="mb-4 border-l-4 border-gray-300 pl-4 italic dark:border-gray-600"
        {...props}
      >
        {children}
      </blockquote>
    ),
    ...components,
  }

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
