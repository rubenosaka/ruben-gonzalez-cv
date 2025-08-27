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
      'After an amazing journey leading the engineering team, today is my last day at Frenetic. Excited for what comes next!',
  },
  {
    date: '15/08/2025',
    title: 'Started working on Trinuki',
    content:
      'Finally diving into my AI-powered travel planner for Japan. The red panda mascot is ready to guide travelers!',
  },
  {
    date: '01/08/2025',
    title: 'Summer vacation in Japan',
    content:
      'Spent two weeks exploring Tokyo, Kyoto, and Osaka. Got tons of inspiration for Trinuki from the local culture.',
  },
  {
    date: '20/07/2025',
    title: 'Completed Clean Architecture course',
    content:
      'Finished an advanced course on Domain-Driven Design and Clean Architecture. Ready to apply these principles to new projects.',
  },
  {
    date: '10/07/2025',
    title: 'Built my own arcade machine',
    content:
      'Finally completed the retro arcade cabinet project. Running MAME with classic games from the 80s and 90s.',
  },
  {
    date: '01/07/2025',
    title: 'Moved to a new apartment',
    content:
      'Relocated to a bigger place with a dedicated home office. Perfect setup for remote work and side projects.',
  },
]

export const news = newsData.map((item) => NewsItemSchema.parse(item))
