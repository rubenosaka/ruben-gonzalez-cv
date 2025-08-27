'use client'

import { ResumeService } from '@/application/services/ResumeService'
import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { ResumeMainInfo } from '@/components/resume/ResumeMainInfo'
import { Highlights } from '@/components/resume/Highlights'
import { CodeComment } from '@/components/CodeComment'
import type { Experience } from '@/types/resume'

export default function ResumePage() {
  const resumeService = new ResumeService()
  const resume = resumeService.getResume()

  return (
    <PageLayout>
      <AnimatedHero
        title="Resume"
        subtitle="Engineering Manager · Product-focused Tech Lead · AI-driven Builder"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-foreground first:mt-0">
              Career Highlights
            </h2>
            <CodeComment>
              loop with colors, yeah, why not, they&apos;re going to hate it
            </CodeComment>
          </div>
          <Highlights items={resume.content.highlights} />
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-foreground first:mt-0">
              Experience
            </h2>
            <CodeComment>it&apos;s like leveling up</CodeComment>
          </div>

          {resume.content.experience.map((exp: Experience, index: number) => (
            <div key={index} className="mb-8">
              <h3 className="mb-3 mt-6 text-xl font-medium text-foreground">
                <strong>{exp.title}</strong> — {exp.company} ({exp.period})
              </h3>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
              {exp.stack && (
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  <strong>Stack:</strong> {exp.stack.join(', ')}
                </p>
              )}
              {exp.highlights && (
                <ul className="mb-6 space-y-2">
                  {exp.highlights.map((highlight: string, hIndex: number) => (
                    <li
                      key={hIndex}
                      className="leading-relaxed text-muted-foreground"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              {index < resume.content.experience.length - 1 && (
                <hr className="my-8 border-border" />
              )}
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-8 lg:h-fit lg:max-w-[320px]">
          <ResumeMainInfo
            name={resume.metadata.name}
            title={resume.metadata.title}
            location={resume.metadata.location}
            email={resume.metadata.email}
            summary={resume.metadata.summary}
          />
        </div>
      </div>
    </PageLayout>
  )
}
