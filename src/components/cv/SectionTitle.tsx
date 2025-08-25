interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`mb-6 mt-12 text-2xl font-semibold text-foreground first:mt-0 ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-primary/30 to-primary/10" />
      </span>
    </h2>
  )
}
