import { DownloadCVButton } from '@/app/components/DownloadCVButton'

interface CVHeaderProps {
  name: string
  title: string
  location: string
  email: string
  summary: string
}

export function CVHeader({
  name,
  title,
  location,
  email,
  summary,
}: CVHeaderProps) {
  return (
    <header className="mb-12">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <h1 className="mb-3 text-4xl font-bold text-foreground sm:text-5xl">
            {name}
          </h1>
          <p className="mb-2 text-xl font-medium text-muted-foreground">
            {title}
          </p>
          <p className="mb-4 text-muted-foreground">{location}</p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>
        <div className="flex-shrink-0">
          <DownloadCVButton />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-primary transition-colors hover:text-primary/80 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          aria-label={`Send email to ${email}`}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {email}
        </a>
      </div>
    </header>
  )
}
