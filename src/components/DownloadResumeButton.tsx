'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

export const DownloadResumeButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/resume/pdf?role=engineering-manager', {
        method: 'GET',
        headers: {
          Accept: 'application/pdf',
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ruben-gonzalez-engineering-manager-resume.pdf'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Failed to download PDF - Status:', response.status)
        window.open('/api/resume/pdf?role=engineering-manager', '_blank')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      window.open('/api/resume/pdf?role=engineering-manager', '_blank')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="btn-gradient flex w-full items-center gap-2"
    >
      <Download className="h-4 w-4" data-testid="download-icon" />
      {isLoading ? 'Generating...' : 'Download PDF'}
    </Button>
  )
}
