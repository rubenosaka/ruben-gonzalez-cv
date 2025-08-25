import { z } from 'zod'

const HighlightSchema = z.object({
  text: z.string(),
})

const ExperienceItemSchema = z.object({
  title: z.string(),
  company: z.string(),
  period: z.string(),
  description: z.string(),
  stack: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
})

const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
})

const CVSchema = z.object({
  metadata: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    location: z.string(),
    summary: z.string(),
  }),
  content: z.object({
    highlights: z.array(HighlightSchema),
    experience: z.array(ExperienceItemSchema),
    skills: z.array(SkillSchema).optional(),
  }),
})

const cvData = {
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Engineering Manager / Full-Stack Tech Lead',
    email: 'rubenosaka@gmail.com',
    location: 'Madrid, Spain',
    summary:
      'Engineering Manager with over 18 years of experience leading teams and building digital products.',
  },
  content: {
    highlights: [
      {
        text: '<strong>Led engineering teams of 3–10 developers</strong>, balancing delivery with mentoring, onboarding and career development.',
      },
      {
        text: '<strong>Owned roadmap sizing and prioritization</strong>, estimating cost and timing, and aligning with business stakeholders.',
      },
      {
        text: '<strong>Saved ~4 hours/week by reducing production issues</strong> and accelerated release cadence (bi-weekly → weekly) via structured reviews, CI/CD and mentoring practices.',
      },
      {
        text: '<strong>Introduced AI and automation</strong> to optimize user lifecycle management and content generation workflows, saving ~8h/week and reducing operational risk.',
      },
      {
        text: '<strong>Built observability dashboards</strong> with PostHog and Mixpanel, enabling business and product teams to make data-driven decisions.',
      },
      {
        text: '<strong>Cross-team impact:</strong> Collaborated with Product, Marketing, Sales and QA to ensure measurable outcomes.',
      },
      {
        text: '<strong>Product-driven mindset:</strong> Partnered with business and product managers to translate technical solutions into growth and customer impact.',
      },
    ],
    experience: [
      {
        title: 'Engineering Manager',
        company: 'Frenetic.ai',
        period: '02/2021–Present',
        description:
          'Leading engineering for a SaaS platform for magnet design and simulation.',
        stack: [
          'PHP 8 (Laravel 9)',
          'Vue 3',
          'TypeScript',
          'Pinia',
          'MySQL',
          'Python (REST)',
          'AWS (serverless)',
          'Puppeteer (PDF)',
        ],
        highlights: [
          'Managed a team of 3–10 engineers, balancing delivery with mentoring and growth.',
          'Conducted interviews for frontend, backend, QA and DevOps roles.',
          'Mentored juniors and peers, collaborating on merge requests through pair programming.',
          'Worked with QA and PM/POs to evolve processes: Jira validation columns, dedicated testing branches, conventional commits and semantic versioning.',
          'Partnered with Product, Business, Marketing and Sales to ensure engineering output had measurable business impact.',
          'Optimized user lifecycle (sign-up/deactivation), eliminating manual DB queries.',
          'Built dashboards and event-driven tracking with PostHog and Mixpanel.',
        ],
      },
      {
        title: 'Team Lead / Full-Stack Developer',
        company: 'Isobar (Dentsu Group)',
        period: '04/2019–02/2021',
        description: 'Technical lead across multiple web and app projects.',
        stack: [
          'Python',
          'PHP',
          'Node.js/Express',
          'React/Material UI',
          'Salesforce',
          'WordPress',
          'Prestashop',
          'Drupal',
          'Magento',
          'AWS',
          'Google App Engine',
          'DigitalOcean',
        ],
        highlights: [
          'Led development squads delivering multi-brand websites and e-commerce integrations.',
          'Defined technical standards and collaborated with QA, product and design teams.',
          'Standardized deployment workflows across heterogeneous stacks, improving delivery predictability.',
          'Interviewed and mentored developers across frontend and backend roles.',
        ],
      },
      {
        title: 'Full-Stack Developer',
        company: 'Product School',
        period: '06/2018–04/2019',
        description: 'Built components and an LMS with Node.js and React.',
        highlights: [
          'Improved performance and SEO with caching and deployment strategies.',
          'Collaborated with product and marketing to align features with business impact.',
        ],
      },
      {
        title: 'Team Lead / Full-Stack Developer',
        company: 'Quodem (Healthcare)',
        period: '12/2015–06/2018',
        description:
          'Projects for pharma clients such as MSD, Pfizer, Bayer, GSK.',
        highlights: [
          'Led teams developing secure, compliant sites with Umbraco and Drupal.',
          'Established CI practices and code review culture.',
          'Coordinated with medical and business stakeholders to ensure compliance and usability.',
        ],
      },
      {
        title: 'CTO / Full-Stack Developer',
        company: 'PSD',
        period: '07/2012–07/2018',
        description:
          'Technology director for clients including Santander, BBVA, Ferrovial, BNP, CECABANK.',
        highlights: [
          'Directed projects from estimation to delivery with PHP, jQuery and WordPress.',
          'Owned roadmap sizing and cost estimation; balanced priorities with clients.',
        ],
      },
      {
        title: 'Front-End Developer',
        company: 'McCann Erickson',
        period: '10/2011–07/2012',
        description:
          'Projects for Coca-Cola, Disney, Opel, Madrid regional government, Ikea.',
        highlights: [
          'Delivered responsive web experiences using HTML5, CSS3, jQuery and PHP.',
        ],
      },
      {
        title: 'Webmaster / Web Developer',
        company: 'Guía del Ocio',
        period: '03/2008–10/2011',
        description:
          'Oversaw maintenance and development of <strong>guiadelocio.com</strong>.',
        highlights: [
          'Modernized site architecture with HTML, CSS, JavaScript, ColdFusion and PHP.',
          'Ensured stability and improved content workflows for editors.',
        ],
      },
    ],
  },
}

export const cv = CVSchema.parse(cvData)
