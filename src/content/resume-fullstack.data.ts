import { z } from 'zod'
import { RoleBasedResumeSchema } from '@/types/role-based-resume'

const resumeFullstackData = {
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Full-Stack Tech Lead / Engineering Manager',
    email: 'rubenosaka@gmail.com',
    phone: '+34 639 176 921',
    linkedin: 'https://linkedin.com/in/rubengonzalez',
    location: 'Madrid, Spain',
  },
  summary:
    'Full-Stack Tech Lead with 18+ years of experience leading engineering teams and building scalable digital products. Specialized in modern JavaScript ecosystems (Vue 3, React, Node.js, TypeScript) and product-focused architectures. Experienced in roadmap ownership, developer enablement, and cross-functional collaboration with Product, Design, and Business teams. Passionate about clean architecture, AI automation, and developer experience optimization.',
  coreStrengths: [
    {
      category: 'Architecture & Engineering',
      skills:
        'TypeScript, Node.js, Vue 3, React, Astro, Prisma, PostgreSQL, REST APIs, modular monorepos',
    },
    {
      category: 'Leadership & Product',
      skills:
        'Team mentoring, roadmap ownership, agile delivery, cost estimation, stakeholder alignment',
    },
    {
      category: 'DevOps & Quality',
      skills:
        'CI/CD, GitHub Actions, Railway, Vercel, AWS, Docker, test automation, observability dashboards',
    },
    {
      category: 'AI & Automation',
      skills:
        'OpenAI API, automation pipelines, workflow optimization, data-driven feature delivery',
    },
    {
      category: 'Analytics & Monitoring',
      skills: 'PostHog, Mixpanel, user lifecycle tracking, behavioral insights',
    },
  ],
  experience: [
    {
      company: 'Frenetic.ai (Startup)',
      role: 'Engineering Manager / Full-Stack Lead',
      period: '02/2021 – 09/2025 · Remote',
      description:
        'Led engineering team for a SaaS platform in electromagnetics design and simulation.',
      bullets: [
        'Managed a team of 3–10 engineers across frontend, backend, QA, and DevOps roles.',
        'Defined technical direction and code standards for Vue 3 + TypeScript and Node.js services.',
        'Evolved engineering processes (Jira flows, CI/CD, semantic versioning) improving delivery cadence.',
        'Introduced AI automation workflows to optimize user lifecycle and internal processes.',
        'Implemented analytics and event-driven dashboards using PostHog and Mixpanel.',
        'Partnered with Product, Marketing, and Sales to align engineering output with measurable business impact.',
      ],
      stack:
        'Vue 3, TypeScript, Node.js/Express, Laravel 9 (REST backend), MySQL, AWS (serverless), Puppeteer, Python, PHP',
    },
    {
      company: 'Isobar (Dentsu Group)',
      role: 'Team Lead / Full-Stack Developer',
      period: '04/2019 – 02/2021 · Madrid',
      description:
        'Technical lead for web and e-commerce projects across multiple brands and markets.',
      bullets: [
        'Led development squads delivering multi-brand, multi-country websites and integrations.',
        'Implemented CI/CD pipelines and automated testing to improve release predictability.',
      ],
      stack:
        'Node.js/Express, React/Material UI, Vue, PHP, Python, Salesforce, WordPress, Drupal, Magento, AWS, DigitalOcean',
    },
    {
      company: 'Product School (Startup)',
      role: 'Full-Stack Developer',
      period: '06/2018 – 04/2019 · Remote',
      description:
        "Developed and optimized the company's LMS platform and marketing site.",
      bullets: [
        'Built reusable components and improved SEO, caching, and overall performance.',
        'Collaborated with Product and Marketing to align features with growth metrics.',
        'Contributed to CI/CD pipelines and deployment automation on AWS.',
      ],
      stack: 'Node.js, TypeScript, React, PostgreSQL, AWS, PHP',
    },
    {
      company: 'Quodem (Healthcare)',
      role: 'Team Lead / Full-Stack Developer',
      period: '12/2015 – 06/2018 · Madrid',
      description:
        'Led healthcare applications for global pharma clients (MSD, Pfizer, Bayer, GSK).',
      bullets: [
        'Developed secure and compliant applications within regulated healthcare environments.',
        'Implemented CI practices and review processes to ensure quality and delivery consistency.',
      ],
      stack:
        'JavaScript, Vue, jQuery, Bootstrap, Umbraco, Drupal, .NET, WordPress, PHP, Angular',
    },
  ],
  technicalSkills: {
    Frontend:
      'Vue 3, React, Astro, TypeScript, JavaScript, Vite, Pinia, TailwindCSS, Material UI, HTML5, SCSS',
    Backend:
      'Node.js, Express, Prisma, PostgreSQL, MongoDB, REST APIs, PHP, Laravel, Python (Flask/Django), MySQL',
    'DevOps, QA & Tools':
      'GitHub Actions, CI/CD, Vercel, Railway, Docker, AWS, Vitest, Playwright, Jest, Cypress',
    'Analytics & Monitoring':
      'PostHog, Mixpanel, event tracking, performance dashboards',
    Practices:
      'Clean architecture, modular monorepos, DDD, SOLID principles, DX optimization, mentoring, agile workflows',
  },
  projects: [
    {
      name: 'Trinuki',
      description:
        'AI-powered trip planner for Japan featuring automated itinerary generation, POI rendering, and Google Places integration. Demonstrates scalable fullstack architecture with Astro + Node.js and AI-assisted UX workflows.',
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
    { name: 'Spanish', level: 'native' },
    { name: 'English', level: 'professional working proficiency' },
  ],
}

export const resumeFullstack = RoleBasedResumeSchema.parse(resumeFullstackData)
