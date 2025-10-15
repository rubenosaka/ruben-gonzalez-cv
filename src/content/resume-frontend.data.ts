import { z } from 'zod'
import { RoleBasedResumeSchema } from '@/types/role-based-resume'

const resumeFrontendData = {
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Frontend Tech Lead / Senior Frontend Engineer',
    email: 'rubenosaka@gmail.com',
    phone: '+34 639 176 921',
    linkedin: 'https://linkedin.com/in/rubengonzalez',
    location: 'Madrid, Spain',
  },
  summary:
    'Frontend Tech Lead with 18+ years of experience building and scaling web applications. Specialized in modern frontend architecture (Vue 3, React, Astro) and developer experience optimization. Proven record leading teams, mentoring developers, and designing fast, maintainable, and accessible interfaces. Strong focus on performance, DX, and collaboration with Product and Design teams in high-impact startup environments.',
  coreStrengths: [
    {
      category: 'Frontend Architecture',
      skills:
        'Vue 3, React, Astro, TypeScript, Vite, SSR/SSG, Component-driven Design',
    },
    {
      category: 'UI/UX & DX',
      skills:
        'TailwindCSS, Accessibility (a11y), performance optimization, design systems',
    },
    {
      category: 'Leadership & Collaboration',
      skills: 'Mentoring, code reviews, technical direction, team enablement',
    },
    {
      category: 'Tooling & Testing',
      skills: 'Pinia, Vitest, Playwright, CI/CD pipelines, Git-based workflows',
    },
    {
      category: 'Product & Analytics',
      skills: 'PostHog, Mixpanel, automation, user behavior insights',
    },
  ],
  experience: [
    {
      company: 'Frenetic.ai (Startup)',
      role: 'Engineering Manager / Frontend & Full-Stack Lead',
      period: '02/2021 – 09/2025 · Remote',
      description:
        'Led engineering team for a SaaS platform in electromagnetics design and simulation.',
      bullets: [
        'Frontend architecture with Vue 3 + TypeScript and modularized legacy codebases.',
        'Contributed to Node.js / Express microservices for internal tools and API extensions.',
        'Integrated OpenAI workflows and improved product UX.',
        'Improved UI performance and rendering times by 30%.',
        'Mentored 3–10 engineers, conducted code reviews, and evolved engineering processes (Jira flows, CI/CD).',
        'Partnered with Product, Marketing, and Sales to ensure measurable business impact.',
      ],
      stack:
        'Vue 3, TypeScript, Node.js/Express, Pinia, Vitest, Laravel 9 (REST backend), OpenAI API, AWS (serverless), Puppeteer, Python, PHP + Laravel',
    },
    {
      company: 'Isobar (Dentsu Group)',
      role: 'Team Lead / Senior Frontend Developer',
      period: '04/2019 – 02/2021 · Madrid',
      description:
        'Led frontend squads delivering multi-brand websites and e-commerce platforms.',
      bullets: [
        'Led the transition from jQuery/PHP to modern Vue and React stacks.',
        'Established coding standards, component libraries, and CI/CD workflows.',
        'Improved release predictability through automated testing and review pipelines.',
      ],
      stack:
        'Vue, React, Node.js/Express, Material UI, AWS, DigitalOcean, SQL, MongoDB, PHP, Wordpress, Salesforce',
    },
    {
      company: 'Product School (Startup)',
      role: 'Full-Stack Developer',
      period: '06/2018 – 04/2019 · Remote',
      description:
        "Developed and optimized the company's LMS platform and marketing site.",
      bullets: [
        'Built reusable frontend components and improved performance and SEO.',
        'Collaborated with Product and Marketing to align features with business metrics.',
        'Contributed to deployment automation and caching strategies.',
      ],
      stack: 'Node.js, Typescript, React, PostgreSQL, AWS, PHP',
    },
    {
      company: 'Quodem (Healthcare)',
      role: 'Team Lead / Frontend Developer',
      period: '12/2015 – 06/2018 · Madrid',
      description:
        'Led healthcare web applications projects for global pharma clients (MSD, Pfizer, Bayer).',
      bullets: [
        'Implemented responsive and accessible interfaces within regulated environments.',
        'Front-end CI and review practices, improving quality and delivery consistency.',
      ],
      stack:
        'javascript, Vue, jQuery, Bootstrap, Umbraco, Drupal, .net, Wordpress, PHP, Angular',
    },
  ],
  technicalSkills: {
    Frontend:
      'Vue 3, React, Astro, TypeScript, JavaScript (ESNext), Vite, Pinia, TailwindCSS, Material UI, HTML5, CSS3 (SCSS)',
    Backend:
      'Node.js, Express, Prisma, PostgreSQL, MongoDB, REST APIs, PHP, Laravel',
    'DevOps, QA & Tools':
      'GitHub Actions, Vercel, Railway, Docker, AWS, Vitest, Playwright, Jest, Cypress',
    'Analytics & Monitoring': 'PostHog, Mixpanel',
    Practices:
      'Component-driven design, performance optimization, DX, CI/CD, mentoring',
  },
  projects: [
    {
      name: 'Trinuki',
      description:
        'AI-driven trip planner for Japan with automated itineraries and dynamic POI rendering (personal project demonstrating modern frontend architecture and AI integration).',
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

export const resumeFrontend = RoleBasedResumeSchema.parse(resumeFrontendData)
