import ReactMarkdown from 'react-markdown'

interface MarkdownContentProps {
  content: string
  className?: string
}

export const MarkdownContent = ({
  content,
  className,
}: MarkdownContentProps) => {
  return (
    <div
      className={`prose prose-gray max-w-none dark:prose-invert ${className || ''}`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
