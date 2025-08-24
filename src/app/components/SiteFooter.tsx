export const SiteFooter = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Rubén González Aranda. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="mailto:rubenosaka@gmail.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
