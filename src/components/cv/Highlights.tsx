import React from 'react'

type Accent = 'primary' | 'pink' | 'blue' | 'orange'

const accents: Record<Accent, string> = {
  primary: 'from-primary to-primary/60',
  pink: 'from-pink-500 to-pink-400',
  blue: 'from-blue-500 to-blue-400',
  orange: 'from-orange-500 to-orange-400',
}

const parse = (html: string) => {
  const m = html
    .replace(/\n/g, ' ')
    .match(/^\s*<strong>(.*?)<\/strong>\s*[,–-]?\s*(.*)$/i)
  if (m) return { title: m[1].trim(), meta: m[2].trim() }
  const plain = html.replace(/<\/?[^>]+>/g, '').trim()
  return { title: plain, meta: '' }
}

type Props = {
  items: string[]
  variant?: 'cards' | 'divided' | 'bullets'
  className?: string
}

export function Highlights({ items, className = '' }: Props) {
  return (
    <ul
      className={`mb-8 divide-y rounded-xl border bg-card shadow-md ${className}`}
    >
      {items.map((t, i) => {
        const { title, meta } = parse(t)
        return (
          <li key={i} className="flex items-start gap-3 p-4">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
            <div>
              <div className="text-sm font-medium text-foreground sm:text-base">
                {title}
              </div>
              {meta ? (
                <div className="text-xs text-muted-foreground sm:text-sm">
                  {meta}
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
