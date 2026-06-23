export const trinukiStackItems = [
  'Node.js',
  'TypeScript',
  'Vue 3',
  'Pinia',
  'PostgreSQL',
  'Prisma',
  'Render',
  'Cloudflare R2',
  'Monorepo Architecture',
  'DDD',
  'SOLID',
]

export const trinukiProject = {
  name: 'Trinuki',
  description:
    'AI-powered travel platform for Japan combining intelligent itinerary generation, curated travel content and AI-assisted workflows.',
  bullets: [
    'Designed and built the platform from concept to production, defining product strategy, user experience, architecture and technical roadmap.',
    'Developed an AI-powered itinerary generation engine combining user preferences, travel logistics, points of interest and transportation data.',
    'Designed a scalable TypeScript monorepo architecture with shared frontend/backend domain models, applying DDD, SOLID and modular design principles.',
    'Built a custom content management platform enabling the creation and maintenance of cities, points of interest, restaurants, itineraries and transportation relationships across Japan.',
    'Integrated external services including Google Places, mapping and travel-related APIs to enrich travel recommendations and destination data.',
    'Applied AI-assisted workflows to content generation, data enrichment and operational automation, improving platform scalability and content management efficiency.',
  ],
  stack: trinukiStackItems.join(', '),
}
