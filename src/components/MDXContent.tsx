import { MDXRemote } from 'next-mdx-remote/rsc'

interface MDXContentProps {
  content: string
  className?: string
}

export const MDXContent = ({ content, className }: MDXContentProps) => {
  return (
    <div className={`prose prose-gray dark:prose-invert max-w-none ${className || ''}`}>
      <MDXRemote source={content} />
    </div>
  )
}
