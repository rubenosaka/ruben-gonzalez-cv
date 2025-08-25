import { MDXRemote } from 'next-mdx-remote/rsc'
import ReactMarkdown from 'react-markdown'

interface MDXContentProps {
  content: string
  className?: string
  isMDX?: boolean
}

export const MDXContent = ({
  content,
  className,
  isMDX = false,
}: MDXContentProps) => {
  const baseClassName = `prose prose-gray dark:prose-invert max-w-none ${className || ''}`

  if (isMDX) {
    return (
      <div className={baseClassName}>
        <MDXRemote source={content} />
      </div>
    )
  }

  return (
    <div className={baseClassName}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
