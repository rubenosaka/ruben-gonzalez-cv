import React from 'react'

interface CodeCommentProps {
  children?: React.ReactNode
  className?: string
}

const randomComments = [
  'hello, I m Skynet',
  "Don't tell recruiters that I don't like Game of Thrones.",
  'they seem nice, I hope they hire me',
  'In The Sixth Sense, Bruce Willis is dead',
  'Pizza without pineapple',
  'My cats are named Fox and Dana after Mulder and Scully.',
  'Silent HIll 2 is the best Silent HIll',
]

export function CodeComment({ children, className = '' }: CodeCommentProps) {
  const randomComment =
    randomComments[Math.floor(Math.random() * randomComments.length)]
  const content = children || randomComment

  return (
    <span className={`font-mono text-xs text-gray-400 ${className}`}>
      {'{/* '}
      {content}
      {' */}'}
    </span>
  )
}
