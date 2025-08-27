import { z } from 'zod'

const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  bodyHtml: z.string(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
})

const projectsData = [
  {
    slug: 'frenetic',
    title: 'Frenetic.ai',
    summary: 'SaaS platform for magnet design and simulation',
    tags: ['Engineering Management', 'Full-Stack', 'SaaS', 'AI/ML'],
    bodyHtml: `
      <h2>Frenetic.ai</h2>
      <p>Leading engineering for a SaaS platform that revolutionizes magnet design and simulation through AI-powered tools.</p>
      
      <h3>Key Achievements</h3>
      <ul>
        <li>Managed team of 3-10 engineers across frontend, backend, and DevOps</li>
        <li>Implemented AI and automation workflows saving 8+ hours/week</li>
        <li>Built observability dashboards enabling data-driven decisions</li>
        <li>Accelerated release cadence from bi-weekly to weekly</li>
      </ul>
      
      <h3>Tech Stack</h3>
      <p>PHP 8 (Laravel 9), Vue 3, TypeScript, Pinia, MySQL, Python (REST), AWS (serverless), Puppeteer (PDF)</p>
    `,
    links: [
      { label: 'Live Demo', url: 'https://app.frenetic.ai' },
      { label: 'Simulator', url: 'https://simulator.frenetic.ai' },
    ],
  },
  {
    slug: 'msd-spain',
    title: 'MSD Spain',
    summary: 'Healthcare platform for pharmaceutical company',
    tags: ['Healthcare', 'Compliance', 'Drupal', 'Umbraco'],
    bodyHtml: `
      <h2>MSD Spain</h2>
      <p>Developed secure, compliant healthcare platforms for MSD Spain, ensuring regulatory compliance and user accessibility.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>HIPAA-compliant data handling</li>
        <li>Accessibility compliance (WCAG 2.1)</li>
        <li>Multi-language support</li>
        <li>Integration with medical databases</li>
      </ul>
    `,
  },
  {
    slug: 'otras-politicas',
    title: 'Otras Políticas',
    summary: 'Political analysis and data visualization platform',
    tags: ['Data Visualization', 'Politics', 'React', 'Node.js'],
    bodyHtml: `
      <h2>Otras Políticas</h2>
      <p>Built a platform for political analysis and data visualization, helping users understand complex political data through interactive charts and insights.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Interactive data visualizations</li>
        <li>Real-time political data updates</li>
        <li>User-generated content and analysis</li>
        <li>Mobile-responsive design</li>
      </ul>
    `,
  },
  {
    slug: 'psd',
    title: 'PSD Projects',
    summary: 'Technology consulting and development services',
    tags: ['Consulting', 'Full-Stack', 'WordPress', 'PHP'],
    bodyHtml: `
      <h2>PSD Projects</h2>
      <p>Led technology consulting and development services for major clients including Santander, BBVA, Ferrovial, BNP, and CECABANK.</p>
      
      <h3>Services</h3>
      <ul>
        <li>Custom web application development</li>
        <li>E-commerce platform implementation</li>
        <li>Digital transformation consulting</li>
        <li>Technical architecture planning</li>
      </ul>
    `,
  },
]

export const projects = projectsData.map((project) =>
  ProjectSchema.parse(project)
)
