import { z } from 'zod'
import { RoleBasedResumeSchema } from '@/types/role-based-resume'

const resumeFullstackData = {
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Tech Lead / Senior Full Stack Developer',
    email: 'rubenosaka@gmail.com',
    phone: '+34 639 176 921',
    linkedin: 'https://linkedin.com/in/rubengonzalez',
    location: 'Madrid, Spain',
  },
  summary:
    'Tech Lead and Senior Full Stack Developer with 18+ years of experience building end-to-end web applications. Expert in modern JavaScript ecosystems (Vue 3, React, Node.js) and cloud-native architectures. Proven track record leading technical teams, architecting scalable solutions, and delivering high-impact products in startup environments.',
  coreStrengths: [
    {
      category: 'Full Stack Architecture',
      skills:
        'Vue 3, React, Node.js, TypeScript, Microservices, API Design, Database Design',
    },
    {
      category: 'Backend & Infrastructure',
      skills:
        'Express, Laravel, PostgreSQL, MongoDB, AWS, Docker, CI/CD, Serverless',
    },
    {
      category: 'Frontend & UX',
      skills:
        'Modern JS frameworks, TailwindCSS, Performance optimization, Accessibility',
    },
    {
      category: 'Leadership & Process',
      skills:
        'Team leadership, Technical mentoring, Code reviews, Agile methodologies',
    },
    {
      category: 'Product & Analytics',
      skills: 'PostHog, Mixpanel, Business metrics, User behavior analysis',
    },
  ],
  experience: [
    {
      company: 'Frenetic.ai (Startup)',
      role: 'Engineering Manager / Full-Stack Lead',
      period: '02/2021 – 09/2025 · Remote',
      description:
        'Led full-stack development for a SaaS platform in electromagnetics design and simulation.',
      bullets: [
        'Architected and maintained full-stack solutions with Vue 3 frontend and Node.js/PHP backend.',
        'Built RESTful APIs and microservices for internal tools and third-party integrations.',
        'Integrated AI workflows (OpenAI) to automate content generation and improve user experience.',
        'Improved system performance by 30% through optimization and caching strategies.',
        'Led team of 3-10 engineers, established code review processes and CI/CD pipelines.',
        'Collaborated with Product and Business teams to ensure technical solutions drive business value.',
      ],
      stack:
        'Vue 3, TypeScript, Node.js/Express, PHP/Laravel, PostgreSQL, Pinia, Vitest, AWS (serverless), OpenAI API, Puppeteer',
    },
    {
      company: 'Isobar (Dentsu Group)',
      role: 'Team Lead / Full-Stack Developer',
      period: '04/2019 – 02/2021 · Madrid',
      description:
        'Led full-stack development for multi-brand websites and e-commerce platforms.',
      bullets: [
        'Architected modern full-stack solutions transitioning from legacy PHP to Vue/React + Node.js.',
        'Established development standards, component libraries, and deployment workflows.',
        'Improved delivery predictability through automated testing and review processes.',
      ],
      stack:
        'Vue, React, Node.js/Express, PHP, Material UI, AWS, DigitalOcean, SQL, MongoDB',
    },
    {
      company: 'Product School (Startup)',
      role: 'Full-Stack Developer',
      period: '06/2018 – 04/2019 · Remote',
      description:
        "Developed and maintained the company's LMS platform and marketing infrastructure.",
      bullets: [
        'Built full-stack features for the learning management system and marketing site.',
        'Optimized performance and SEO through caching strategies and deployment automation.',
        'Collaborated with Product and Marketing teams to align technical features with business goals.',
      ],
      stack: 'Node.js, React, PostgreSQL, AWS',
    },
    {
      company: 'Quodem (Healthcare)',
      role: 'Team Lead / Full-Stack Developer',
      period: '12/2015 – 06/2018 · Madrid',
      description:
        'Led full-stack development for secure, compliant healthcare applications for global pharma clients.',
      bullets: [
        'Developed secure, compliant web applications for MSD, Pfizer, Bayer, and other pharma clients.',
        'Implemented responsive interfaces and backend systems within regulated healthcare environments.',
        'Established CI/CD practices and code review processes for improved quality and delivery.',
      ],
      stack: 'Vue, jQuery, PHP, Bootstrap, Umbraco, Drupal, MySQL',
    },
  ],
  technicalSkills: {
    Frontend:
      'Vue 3, React, Astro, TypeScript, JavaScript (ESNext), Vite, Pinia, TailwindCSS, HTML5, CSS3',
    Backend:
      'Node.js, Express, PHP, Laravel, REST APIs, GraphQL, Microservices',
    Databases:
      'PostgreSQL, MongoDB, MySQL, Prisma, Database design and optimization',
    'DevOps & Cloud':
      'AWS, Docker, GitHub Actions, Vercel, Railway, CI/CD, Serverless',
    'Testing & QA': 'Vitest, Playwright, Jest, Cypress, API testing',
    'Analytics & Monitoring': 'PostHog, Mixpanel, Performance monitoring',
  },
  projects: [
    {
      name: 'Trinuki',
      description:
        'AI-driven trip planner with full-stack architecture: Astro frontend, Node.js/Express backend, PostgreSQL database, and AI integration for automated itinerary generation.',
    },
    {
      name: 'Frenetic Platform Architecture',
      description:
        'Designed and implemented scalable full-stack architecture for SaaS platform with Vue 3 frontend, Laravel API, and AWS infrastructure.',
    },
    {
      name: 'Healthcare Compliance System',
      description:
        'Built secure, compliant full-stack applications for pharma clients with proper data handling and audit trails.',
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

export const resumeFullstack = RoleBasedResumeSchema.parse(resumeFullstackData)
