import { z } from 'zod'

const PageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  bodyHtml: z.string(),
})

const pagesData = [
  {
    slug: 'about-me',
    title: 'About Me',
    excerpt: 'Learn more about my background and experience.',
    bodyHtml: `
      <h2>About Me</h2>
      <p>I'm an Engineering Manager with over 18 years of experience leading teams and building digital products. I specialize in full-stack development, team leadership, and product-driven engineering.</p>
      
      <h3>My Approach</h3>
      <p>I believe in balancing technical excellence with business impact. My teams focus on delivering measurable value while maintaining code quality and fostering a collaborative environment.</p>
      
      <h3>Key Strengths</h3>
      <ul>
        <li>Team leadership and mentoring</li>
        <li>Full-stack development</li>
        <li>Product-driven engineering</li>
        <li>Process improvement</li>
        <li>Cross-functional collaboration</li>
      </ul>
    `,
  },
  {
    slug: 'now',
    title: 'What I\'m Doing Now',
    excerpt: 'Current projects and focus areas.',
    bodyHtml: `
      <h2>What I'm Doing Now</h2>
      <p>Currently leading engineering at Frenetic.ai, a SaaS platform for magnet design and simulation.</p>
      
      <h3>Current Focus</h3>
      <ul>
        <li>Scaling the engineering team and processes</li>
        <li>Improving product performance and user experience</li>
        <li>Implementing AI and automation workflows</li>
        <li>Building observability and analytics capabilities</li>
      </ul>
      
      <h3>Learning</h3>
      <p>Exploring advanced AI/ML applications in engineering workflows and improving team productivity through better tooling and processes.</p>
    `,
  },
]

export const pages = pagesData.map(page => PageSchema.parse(page))
