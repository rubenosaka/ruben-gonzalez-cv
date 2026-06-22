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
    'Engineering Manager and Product-focused Tech Lead with 18+ years of experience building digital products, leading engineering teams, and driving cross-functional initiatives. Experienced in scaling teams, improving engineering practices, and introducing AI-driven workflows that increase productivity and business impact. Combines hands-on technical leadership with strong product thinking and stakeholder alignment.',
  coreStrengths: [
    {
      category: 'Team Leading and guiding',
      skills:
        'Experienced in hiring, onboarding, mentoring, performance management, and guiding team members through their full employee lifecycle. Experienced in scaling teams, defining career paths, and implementing feedback frameworks that drive engagement and accountability.',
    },
    {
      category: 'Architecture & Development',
      skills:
        'TypeScript, Node.js, Vue 3, React, Astro, Hexagonal Architecture, PostgreSQL, REST APIs, DDD, SOLID',
    },
    {
      category: 'AI Adoption & Automation',
      skills:
        'AI-assisted workflows, OpenAI API, prompt engineering, process automation, productivity optimization, content generation, developer enablement',
    },
    {
      category: 'Product & Analytics',
      skills:
        'PostHog, Mixpanel, data-driven roadmaps, observability dashboards, experiment tracking',
    },
  ],
  experience: [
    {
      company: 'Multiverse',
      role: 'AI Mentor / Technical Mentor',
      period: '10/2025 – Present · Part-time',
      description:
        'Mentoring software engineers in AI-assisted development workflows and modern software engineering practices.',
      bullets: [
        'Guided engineers in adopting AI-assisted development workflows to improve productivity and delivery speed.',
        'Reviewed technical projects and provided feedback on architecture, maintainability, and engineering best practices.',
        'Mentored developers across frontend, backend, and full-stack technologies including TypeScript, JavaScript, and modern web architectures.',
        'Promoted effective use of AI tools throughout the software development lifecycle.',
        'Supported learners in building practical engineering skills through project-based feedback and coaching.',
      ],
      stack:
        'AI-assisted development, TypeScript, JavaScript, Node.js, React, Vue, Software Architecture, Technical Mentoring',
    },
    {
      company: 'Frenetic.ai (Startup)',
      role: 'Engineering Manager',
      period: '02/2021 – 09/2025 · Remote',
      description:
        'Led engineering for a SaaS platform for electromagnetic simulation, managing cross-functional teams.',
      bullets: [
        'Managed and mentored a team of 3–10 engineers across frontend, backend, QA, and DevOps disciplines.',
        'Led hiring processes, onboarding, and career development initiatives.',
        'Improved delivery cadence through engineering process improvements, CI/CD practices, and structured code reviews.',
        'Collaborated with Product, Business, Marketing, and Sales to align engineering output with business objectives.',
        'Introduced AI-driven workflows automating user lifecycle and content generation processes (~8h/week saved).',
        'Implemented observability and analytics using PostHog and Mixpanel to support data-driven decision making.',
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
    'AI & Automation':
      'OpenAI API, prompt engineering, lifecycle automation, content generation, data enrichment',
    'DevOps & QA Tools':
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
