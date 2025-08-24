'use client'

import { useState, useEffect } from 'react'
import { Page } from '@/domain/entities/Page'
import { PageService } from '@/application/services/PageService'

export const usePages = (pageService: PageService) => {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllPages = async () => {
    try {
      setLoading(true)
      setError(null)
      const allPages = await pageService.getAllPages()
      setPages(allPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pages')
    } finally {
      setLoading(false)
    }
  }

  const searchPages = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const searchResults = await pageService.searchPages(query)
      setPages(searchResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search pages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllPages()
  }, [])

  return {
    pages,
    loading,
    error,
    fetchAllPages,
    searchPages
  }
}
