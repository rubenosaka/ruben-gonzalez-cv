import { CodeComment } from '@/components/CodeComment'

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="m-4 rounded-lg bg-black shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-white">
            © {currentYear} Rubén González Aranda. All rights reserved. -{' '}
            <CodeComment />
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="mailto:rubenosaka@gmail.com"
              className="text-sm text-white transition-colors hover:opacity-70"
              aria-label="Send email to rubenosaka@gmail.com"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
