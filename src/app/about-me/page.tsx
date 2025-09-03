import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { CodeComment } from '@/components/CodeComment'

export default function AboutMePage() {
  return (
    <PageLayout>
      <AnimatedHero title="About Me" />

      <div className="cv-prose">
        <p>
          I&apos;m a passionate Engineering Manager and Full-Stack Developer
          with over 18 years of experience building scalable web applications
          and leading development teams. I specialize in transforming technical
          challenges into business opportunities through clean architecture and
          product-driven engineering.
        </p>

        <p>
          My expertise spans modern web technologies including React, Vue.js,
          TypeScript, Node.js, and PHP frameworks like Laravel. I&apos;m a
          strong advocate for clean architecture principles, Domain-Driven
          Design, and SOLID practices that enable teams to deliver high-quality
          software consistently.
        </p>

        <p>
          Throughout my career, I&apos;ve led teams of 3-10 developers,
          balancing technical delivery with mentoring and career development.
          I&apos;ve successfully delivered projects for clients ranging from
          startups to Fortune 500 companies, always focusing on measurable
          business impact and user value.
        </p>

        <p>
          Currently, I&apos;m building Trinuki, an AI-powered trip planner for
          Japan, while continuing to mentor developers and contribute to the
          open source community. When I&apos;m not coding, you can find me
          exploring new technologies, sharing knowledge with the developer
          community, or planning my next adventure.
        </p>
        <CodeComment />
      </div>
    </PageLayout>
  )
}
