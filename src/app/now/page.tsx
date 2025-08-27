import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { CodeComment } from '@/components/CodeComment'

export default function NowPage() {
  return (
    <PageLayout>
      <AnimatedHero title="Now" />

      <div className="prose prose-lg max-w-none">
        <p>This is what I&apos;m currently focused on:</p>

        <ul>
          <li>
            <strong>Engineering Management:</strong> Leading the engineering
            team at Frenetic.ai, focusing on team growth and technical
            excellence.
          </li>
          <li>
            <strong>Technology Stack:</strong> Working with Vue 3, TypeScript,
            Laravel, and AWS to build scalable SaaS applications.
          </li>
          <li>
            <strong>AI Integration:</strong> Exploring AI and automation to
            optimize development workflows and user experiences.
          </li>
          <li>
            <strong>Clean Architecture:</strong> Implementing and advocating for
            clean architecture principles and DDD practices.
          </li>
          <li>
            <strong>Mentoring:</strong> Supporting junior developers and peers
            through code reviews, pair programming, and career guidance.
          </li>
        </ul>

        <p className="text-sm text-gray-500">
          <em>Last updated: August 2025</em>
        </p>
        <CodeComment />
      </div>
    </PageLayout>
  )
}
