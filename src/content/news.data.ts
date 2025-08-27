import { z } from 'zod'

const NewsItemSchema = z.object({
  date: z.string(),
  title: z.string(),
  content: z.string(),
})

const newsData = [
  {
    date: '01/09/2025',
    title: 'My last day in Frenetic!',
    content:
      "After an amazing journey leading the engineering team, today is my last day at Frenetic. Looking forward to what's next!",
  },
  {
    date: '03/08/2025',
    title: 'Summer vacation in Prague!',
    content:
      "Brutal Assault 2025 and good beer — here we go! I'll be back in Spain in a few days.",
  },
  {
    date: '02/07/2025',
    title: 'I’ve started using Cursor',
    content:
      'I’ve been using Windsurf for a while, but recently switched to Cursor. It’s a great tool for writing code.',
  },
  {
    date: '20/06/2025',
    title: 'Started working on Trinuki',
    content:
      'Finally diving into my AI-powered app, Trinuki! Exploring AI and sharpening my prompting skills along the way.',
  },
]

export const news = newsData.map((item) => NewsItemSchema.parse(item))
