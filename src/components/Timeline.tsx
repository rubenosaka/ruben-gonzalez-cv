interface TimelineItem {
  year: string
  role: string
  company: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-3xl font-bold">Experience</h2>

      <div className="relative border-l border-muted pl-6">
        {items.map((item, index) => (
          <div
            key={`${item.company}-${item.year}`}
            className="relative mb-4 last:mb-0"
          >
            <div className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-background bg-primary"></div>

            <div className="mb-1 text-sm text-muted-foreground">
              {item.year}
            </div>

            <div className="font-medium">
              {item.role} · {item.company}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
