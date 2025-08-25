'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'

type Props = { children: React.ReactNode; className?: string }

export function Highlights({ children, className = '' }: Props) {
  return (
    <ul className={`mb-8 space-y-4 text-base leading-[1.65] ${className}`}>
      {children}
    </ul>
  )
}

type ItemProps = { children: React.ReactNode; className?: string }

export function HighlightItem({ children, className = '' }: ItemProps) {
  const isString =
    typeof children === 'string' ||
    (Array.isArray(children) && children.every((c) => typeof c === 'string'))

  return (
    <motion.li
      className={`flex items-start gap-3 text-muted-foreground ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
      <span className="flex-1 text-foreground/90">
        {isString ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <>{children}</>,
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="rounded-sm underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary/40"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              code: ({ children }) => (
                <code className="rounded bg-foreground/5 px-1.5 py-0.5 text-[0.85em]">
                  {children}
                </code>
              ),
            }}
          >
            {Array.isArray(children)
              ? (children as string[]).join('')
              : (children as string)}
          </ReactMarkdown>
        ) : (
          children
        )}
      </span>
    </motion.li>
  )
}
