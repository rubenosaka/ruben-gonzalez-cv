interface HighlightsProps {
  children: React.ReactNode
  className?: string
}

export function Highlights({ children, className = '' }: HighlightsProps) {
  return <ul className={`mb-8 space-y-3 ${className}`}>{children}</ul>
}

interface HighlightItemProps {
  children: React.ReactNode
  className?: string
}

export function HighlightItem({
  children,
  className = '',
}: HighlightItemProps) {
  return (
    <li
      className={`flex items-start gap-3 leading-relaxed text-muted-foreground ${className}`}
    >
      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
      <span className="flex-1">{children}</span>
    </li>
  )
}
