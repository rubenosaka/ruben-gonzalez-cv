import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rubén González Aranda - Full Stack Developer',
  description:
    'Personal portfolio and CV showcasing clean architecture, DDD, and modern web development skills.',
  keywords: [
    'Full Stack Developer',
    'Clean Architecture',
    'DDD',
    'TypeScript',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Rubén González Aranda' }],
  creator: 'Rubén González Aranda',
  publisher: 'Rubén González Aranda',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rubengonzalez.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rubengonzalez.dev',
    title: 'Rubén González Aranda - Full Stack Developer',
    description:
      'Personal portfolio and CV showcasing clean architecture, DDD, and modern web development skills.',
    siteName: 'Rubén González Aranda',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Rubén González Aranda - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubén González Aranda - Full Stack Developer',
    description:
      'Personal portfolio and CV showcasing clean architecture, DDD, and modern web development skills.',
    images: ['/og-default.png'],
    creator: '@rubengonzalez',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
