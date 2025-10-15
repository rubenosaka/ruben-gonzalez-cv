import { z } from 'zod'
import { RoleBasedResumeSchema } from '@/types/role-based-resume'

const resumeEngineeringManagerData = {
  metadata: {
    name: 'Rubén González Aranda',
    title: 'Engineering Manager',
    email: 'rubenosaka@gmail.com',
    phone: '+34 639 176 921',
    linkedin: 'https://linkedin.com/in/rubengonzalez',
    location: 'Madrid, Spain',
  },
  summary:
    'Engineering Manager with 18+ years of experience leading technical teams and building scalable products. Proven track record managing teams of 3-10 engineers, driving technical strategy, and delivering business impact through engineering excellence. Strong focus on team development, process optimization, and cross-functional collaboration in high-growth startup environments.',
  coreStrengths: [
    {
      category: 'Team Leadership',
      skills:
        'Team management, Mentoring, Career development, Performance reviews, Hiring',
    },
    {
      category: 'Technical Strategy',
      skills:
        'Architecture decisions, Technology roadmap, Technical debt management, Code quality',
    },
    {
      category: 'Process & Operations',
      skills:
        'Agile methodologies, CI/CD, Code reviews, Engineering metrics, Release management',
    },
    {
      category: 'Cross-functional Collaboration',
      skills:
        'Product partnership, Business alignment, Stakeholder management, Technical communication',
    },
    {
      category: 'Product & Business Impact',
      skills:
        'PostHog, Mixpanel, Business metrics, User analytics, ROI measurement',
    },
  ],
  experience: [
    {
      company: 'Frenetic.ai (Startup)',
      role: 'Engineering Manager',
      period: '02/2021 – 09/2025 · Remote',
      description:
        'Led engineering team for a SaaS platform in electromagnetics design and simulation.',
      bullets: [
        'Managed team of 3-10 engineers across frontend, backend, and DevOps roles.',
        'Conducted technical interviews and hiring for frontend, backend, QA, and DevOps positions.',
        'Mentored junior and senior engineers, fostering career growth and technical excellence.',
        'Evolved engineering processes: Jira validation columns, testing branches, conventional commits, semantic versioning.',
        'Partnered with Product, Business, Marketing, and Sales to ensure engineering output had measurable business impact.',
        'Optimized user lifecycle management, eliminating manual database queries and reducing operational overhead.',
        'Built observability dashboards with PostHog and Mixpanel, enabling data-driven business decisions.',
        'Reduced production issues by ~4 hours/week and accelerated release cadence from bi-weekly to weekly.',
      ],
      stack:
        'Team Leadership, Vue 3, TypeScript, Node.js, PHP/Laravel, AWS, CI/CD, PostHog, Mixpanel',
    },
    {
      company: 'Isobar (Dentsu Group)',
      role: 'Team Lead / Technical Lead',
      period: '04/2019 – 02/2021 · Madrid',
      description:
        'Led technical teams across multiple web and app projects for major brands.',
      bullets: [
        'Led development squads delivering multi-brand websites and e-commerce integrations.',
        'Defined technical standards and collaborated with QA, product, and design teams.',
        'Standardized deployment workflows across heterogeneous technology stacks.',
        'Interviewed and mentored developers across frontend and backend roles.',
      ],
      stack:
        'Team Leadership, Python, PHP, Node.js, React, Vue, AWS, Google App Engine',
    },
    {
      company: 'Product School (Startup)',
      role: 'Technical Lead',
      period: '06/2018 – 04/2019 · Remote',
      description:
        'Led technical development for LMS platform and marketing infrastructure.',
      bullets: [
        'Improved performance and SEO through strategic caching and deployment optimizations.',
        'Collaborated with product and marketing teams to align technical features with business impact.',
      ],
      stack: 'Node.js, React, PostgreSQL, AWS, Performance optimization',
    },
    {
      company: 'Quodem (Healthcare)',
      role: 'Team Lead',
      period: '12/2015 – 06/2018 · Madrid',
      description:
        'Led technical teams developing secure, compliant healthcare applications.',
      bullets: [
        'Led teams developing secure, compliant sites for pharma clients (MSD, Pfizer, Bayer, GSK).',
        'Established CI practices and code review culture for improved quality and delivery.',
        'Coordinated with medical and business stakeholders to ensure compliance and usability.',
      ],
      stack: 'Team Leadership, Umbraco, Drupal, Healthcare compliance, CI/CD',
    },
  ],
  technicalSkills: {
    Leadership:
      'Team management, Mentoring, Hiring, Performance reviews, Career development',
    Technical:
      'Vue 3, React, TypeScript, Node.js, PHP/Laravel, AWS, CI/CD, Database design',
    'Process & Tools':
      'Agile, Scrum, Jira, Git workflows, Code reviews, Engineering metrics',
    'Analytics & Monitoring':
      'PostHog, Mixpanel, Business metrics, Performance monitoring',
    Communication:
      'Technical writing, Stakeholder management, Cross-functional collaboration',
  },
  projects: [
    {
      name: 'Engineering Process Evolution @Frenetic',
      description:
        'Transformed engineering processes: implemented structured code reviews, CI/CD pipelines, and release management, reducing production issues by 4 hours/week.',
    },
    {
      name: 'Team Scaling & Hiring',
      description:
        'Built and scaled engineering team from 3 to 10 engineers, establishing hiring processes and onboarding programs.',
    },
    {
      name: 'Business Impact Analytics',
      description:
        'Implemented PostHog and Mixpanel analytics, enabling data-driven product decisions and measuring engineering ROI.',
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
