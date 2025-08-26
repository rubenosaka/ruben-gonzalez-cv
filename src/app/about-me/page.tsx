import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'

export default function AboutMePage() {
  return (
    <PageLayout>
      <AnimatedHero title="About Me" />

      <div className="prose prose-lg max-w-none">
        <p>
          I'm a passionate Engineering Manager and Full-Stack Developer with
          over 18 years of experience building scalable web applications and
          leading development teams.
        </p>

        <p>
          My expertise spans modern web technologies including React, Vue.js,
          TypeScript, Node.js, and PHP frameworks like Laravel. I'm a strong
          advocate for clean architecture principles, Domain-Driven Design, and
          SOLID practices.
        </p>

        <p>
          Throughout my career, I've led teams of 3-10 developers, balancing
          technical delivery with mentoring and career development. I've
          successfully delivered projects for clients ranging from startups to
          Fortune 500 companies.
        </p>

        <p>
          When I'm not coding, you can find me exploring new technologies,
          contributing to open source, or sharing knowledge with the developer
          community.
        </p>
      </div>
    </PageLayout>
  )
}
