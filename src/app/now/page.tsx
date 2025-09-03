import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { CodeComment } from '@/components/CodeComment'

export default function NowPage() {
  return (
    <PageLayout>
      <AnimatedHero title="Now" />

      <div className="cv-prose">
        <p>This is what I&apos;m currently focused on:</p>

        <ul>
          <li>
            <strong>AI-Powered Product Development:</strong> Building Trinuki,
            an AI-driven trip planner for Japan that combines automated
            itinerary generation with curated local content. Exploring how AI
            can enhance user experiences and streamline content creation
            workflows.
          </li>
          <li>
            <strong>Engineering Leadership & Mentoring:</strong> Continuing to
            mentor developers and share knowledge about clean architecture, DDD
            practices, and building scalable SaaS applications. Focused on
            helping teams balance technical excellence with business impact.
          </li>
          <li>
            <strong>Modern Tech Stack Mastery:</strong> Deep diving into Vue 3,
            TypeScript, Astro, and modern backend technologies. Building with
            Prisma, PostgreSQL, and exploring serverless architectures for
            optimal performance and scalability.
          </li>
          <li>
            <strong>Product-Driven Engineering:</strong> Applying product
            thinking to technical decisions, ensuring that engineering solutions
            directly contribute to user value and business growth. Collaborating
            closely with product teams to align technical architecture with
            business objectives.
          </li>
          <li>
            <strong>Open Source & Community:</strong> Contributing to the
            developer community through open source projects, technical writing,
            and knowledge sharing. Building in public to demonstrate engineering
            practices and learn from the community.
          </li>
        </ul>

        <p className="text-sm text-gray-500">
          <em>Last updated: September 2025</em>
        </p>
        <CodeComment />
      </div>
    </PageLayout>
  )
}
