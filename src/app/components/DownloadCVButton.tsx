'use client'

import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'
import { useState } from 'react'

export const DownloadCVButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/cv/pdf')
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ruben-gonzalez-cv.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Failed to download PDF, falling back to print')
        window.print()
      }
    } catch (error) {
      console.error('Error downloading PDF, falling back to print:', error)
      window.print()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      {isLoading ? 'Generating...' : 'Download PDF'}
    </Button>
  )
}
