import React, { useState, useEffect } from 'react'

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
  'Smile and the world will smile with you',
  'I prefer Midsommar over The Witch',
  'Code Vibing is the Pair Programming of freelancers',
  'Zelda: Link to the Past is the best Zelda game',
  'Donatello is my favorite ninja turtle',
  'I made my own arcade machine',
]

export function CodeComment({ children, className = '' }: CodeCommentProps) {
  const [randomComment, setRandomComment] = useState<string>('')

  useEffect(() => {
    const comment = randomComments[Math.floor(Math.random() * randomComments.length)] || ''
    setRandomComment(comment)
  }, [])

  const content = children || randomComment

  return (
    <span className={`font-mono text-xs text-gray-400 ${className}`}>
      {'{/* '}
      {content}
      {' */}'}
    </span>
  )
}
