import React from 'react'

type HighlightItem = {
  title: string
  description: string
}

type Props = {
  items: HighlightItem[]
  className?: string
}

export function Highlights({ items, className = '' }: Props) {
  return (
    <ul
      className={`mb-8 divide-y rounded-xl border bg-card shadow-md ${className}`}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 p-4">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
          <div>
            <div className="text-sm font-medium text-foreground sm:text-base">
              <strong>{item.title}</strong>
            </div>
            {item.description ? (
              <div className="text-xs text-muted-foreground sm:text-sm">
                {item.description}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
