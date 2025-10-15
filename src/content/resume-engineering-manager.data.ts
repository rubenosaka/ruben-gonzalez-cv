import { z } from 'zod'
import { RoleBasedResumeSchema } from '@/types/role-based-resume'

const resumeEngineeringManagerData = {
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Engineering Manager / Product-focused Tech Lead',
    email: 'rubenosaka@gmail.com',
    phone: '+34 639 176 921',
    linkedin: 'https://linkedin.com/in/rubengonzalez',
    location: 'Madrid, Spain',
  },
  summary:
    'Engineering Manager with 18+ years of experience leading teams and building SaaS products from concept to scale. Skilled at balancing delivery and mentoring, aligning technical decisions with product impact, and integrating AI and automation to improve efficiency. Strong focus on developer experience, measurable outcomes, and cross-functional collaboration in high-growth environments.',
  coreStrengths: [
    {
      category: 'Leadership & Strategy',
      skills:
        'Team management (3–10 engineers), mentoring, roadmap ownership, stakeholder alignment',
    },
    {
      category: 'Architecture & Development',
      skills:
        'TypeScript, Node.js, Vue 3, React, Astro, Hexagonal Architecture, PostgreSQL, REST APIs, DDD, SOLID',
    },
    {
      category: 'AI & Automation',
      skills:
        'OpenAI API, process automation, lifecycle optimization, content workflows, prompt engineering',
    },
    {
      category: 'Product & Analytics',
      skills:
        'PostHog, Mixpanel, data-driven roadmaps, observability dashboards, experiment tracking',
    },
    {
      category: 'DevOps & Quality',
      skills:
        'CI/CD, GitHub Actions, AWS (serverless), Railway, Docker, Vercel, Vitest, Playwright',
    },
  ],
  experience: [
    {
      company: 'Frenetic.ai (Startup)',
      role: 'Engineering Manager',
      period: '02/2021 – 09/2025 · Remote',
      description:
        'Led engineering for a SaaS platform for electromagnetic simulation, managing cross-functional teams.',
      bullets: [
        'Managed a team of 3–10 engineers, balancing delivery with mentoring and onboarding.',
        'Evolved engineering processes: Jira, Roadmap, semantic versioning, testing branches.',
        'Collaborated with Product, Business, Marketing, and Sales to ensure measurable outcomes.',
        'Conducted interviews for frontend, backend, QA, and DevOps roles.',
        'Introduced AI workflows automating user lifecycle and content generation (~8h/week saved).',
        'Implemented observability with PostHog and Mixpanel to track user engagement and growth.',
      ],
      stack:
        'PHP 8 (Laravel 9), Vue 3, TypeScript, Pinia, MySQL, Python (REST), Node.js/Express, AWS (serverless)',
    },
    {
      company: 'Isobar (Dentsu Group)',
      role: 'Team Lead / Full-Stack Developer',
      period: '04/2019 – 02/2021 · Madrid',
      description:
        'Led multiple web apps projects, defining standards and deployment workflows across teams.',
      bullets: [
        'Defined and enforced coding and CI/CD standards across heterogeneous tech stacks.',
        'Coordinated with QA, Product, and Design to ensure maintainable and scalable delivery.',
        'Mentored developers and contributed to cross-project architectural decisions.',
      ],
      stack:
        'Python, PHP, Node.js/Express, React, Material UI, Salesforce, WordPress, Drupal, Magento, AWS, DigitalOcean',
    },
    {
      company: 'Product School (Startup)',
      role: 'Full-Stack Developer',
      period: '06/2018 – 04/2019 · Remote',
      description:
        'Developed and optimized the company LMS platform with focus on SEO, performance, and maintainability.',
      bullets: [
        'Collaborated with Product and Marketing teams to align technical work with KPIs.',
        'Improved deployment automation and caching strategies.',
      ],
      stack: 'Node.js, React, TypeScript, PostgreSQL, AWS, PHP, Wordpress',
    },
    {
      company: 'Quodem (Healthcare)',
      role: 'Team Lead / Full-Stack Developer',
      period: '12/2015 – 06/2018 · Madrid',
      description:
        'Led teams building compliant and accessible platforms for global pharma clients (MSD, Pfizer, Bayer).',
      bullets: [
        'Introduced CI and code review practices, improving reliability and delivery time.',
        'Collaborated with business and medical teams to ensure compliance and UX quality.',
      ],
      stack:
        'JavaScript, Vue, jQuery, Bootstrap, Umbraco, Drupal, .NET, PHP, Angular, Wordpress',
    },
  ],
  technicalSkills: {
    Leadership:
      'Mentoring, hiring, roadmap planning, process improvement, stakeholder communication, cross-functional alignment',
    Architecture:
      'Node.js, TypeScript, Vue 3, React, Astro, Prisma, PostgreSQL, REST APIs, DDD, SOLID, modular monorepos',
    AI_Automation:
      'OpenAI API, prompt engineering, lifecycle automation, content generation, data enrichment',
    DevOps_QA_Tools:
      'GitHub Actions, CI/CD, Docker, AWS, Railway, Vercel, Vitest, Playwright, Jest, Cypress',
    Analytics:
      'PostHog, Mixpanel, event tracking, product analytics, data-driven insights',
    Practices:
      'Code reviews, performance optimization, automation, DX improvement, documentation',
  },
  projects: [
    {
      name: 'Trinuki',
      description:
        'AI-driven trip planner for Japan automating itineraries, city connections, and curated local data. Demonstrates scalable full-stack architecture, AI integration, and modern DX tooling.',
    },
  ],
  education: [
    {
      degree: "Master's in Big Data & Business Analytics",
      institution: 'Universidad Europea',
      period: '2017–2020',
    },
    {
      degree: 'Higher Technical Diploma in Graphic Design (2D/3D)',
      institution: 'EASD, Córdoba',
      period: '2005–2007',
    },
  ],
  languages: [
    {
      name: 'Spanish',
      level: 'native',
    },
    {
      name: 'English',
      level: 'professional working proficiency',
    },
  ],
}

export const resumeEngineeringManager = RoleBasedResumeSchema.parse(
  resumeEngineeringManagerData
)
