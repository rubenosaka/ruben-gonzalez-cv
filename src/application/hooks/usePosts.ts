'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/domain/entities/Post'
import { PostService } from '@/application/services/PostService'

export const usePosts = (postService: PostService) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPublishedPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const publishedPosts = await postService.getPublishedPosts()
      const sortedPosts = await postService.getPostsSortedByDate(publishedPosts)
      setPosts(sortedPosts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const searchPosts = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const searchResults = await postService.searchPosts(query)
      const sortedResults = await postService.getPostsSortedByDate(searchResults)
      setPosts(sortedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search posts')
    } finally {
      setLoading(false)
    }
  }

  const getPostsByTag = async (tag: string) => {
    try {
      setLoading(true)
      setError(null)
      const taggedPosts = await postService.getPostsByTag(tag)
      const sortedPosts = await postService.getPostsSortedByDate(taggedPosts)
      setPosts(sortedPosts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts by tag')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublishedPosts()
  }, [])

  return {
    posts,
    loading,
    error,
    fetchPublishedPosts,
    searchPosts,
    getPostsByTag
  }
}
