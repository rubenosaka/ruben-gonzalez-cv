import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import Image from 'next/image'
import { CodeComment } from '../CodeComment'

interface ResumeMainInfoProps {
  name: string
  title: string
  location: string
  email: string
  summary: string
}

export function ResumeMainInfo({
  name,
  title,
  location,
  email,
  summary,
}: ResumeMainInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <DownloadResumeButton />
      </div>

      <div className="flex w-full justify-center">
        <Image
          src="/ruben-gonzalez.webp"
          alt="Rubén González Aranda"
          width={400}
          height={400}
          className="h-48 w-48 rounded-full object-cover sm:h-56 sm:w-56 md:h-64 md:w-64"
        />
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-lg dark:bg-black lg:mx-3">
        <CodeComment>problably not human</CodeComment>
        <h2 className="mb-3 text-xl font-bold text-foreground sm:text-xl">
          {name}
        </h2>

        <p className="mb-4 text-sm text-foreground">{location}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>

        <div className="mt-4">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
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
      </div>
    </div>
  )
}
