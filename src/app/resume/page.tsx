'use client'

import { CVService } from '@/application/services/CVService'
import { PageLayout } from '@/components/PageLayout'
import { AnimatedHero } from '@/components/AnimatedHero'
import { Timeline } from '@/components/Timeline'
import { ResumeMainInfo } from '@/components/resume/ResumeMainInfo'
import { Highlights } from '@/components/resume/Highlights'

export default function ResumePage() {
  const cvService = new CVService()
  const cv = cvService.getCV()

  const timelineItems = [
    {
      year: '2021 - Present',
      role: 'Engineering Manager',
      company: 'Frenetic.ai',
    },
    {
      year: '2019 - 2021',
      role: 'Team Lead / Full-Stack Developer',
      company: 'Isobar Spain (Dentsu Group)',
    },
    {
      year: '2017 - 2019',
      role: 'Senior Full-Stack Developer',
      company: 'Digital Agencies',
    },
    {
      year: '2015 - 2017',
      role: 'Full-Stack Developer',
      company: 'Startups & Freelance',
    },
    {
      year: '2010 - 2015',
      role: 'Web Developer',
      company: 'Various Companies',
    },
  ]

  return (
    <PageLayout>
      <AnimatedHero title="Resume" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Timeline items={timelineItems} />

          <div className="mt-12">
            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground first:mt-0">
              Career Highlights
            </h2>
            <Highlights items={cv.content.highlights} />

            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Experience
            </h2>
            {cv.content.experience.map((exp: any, index: number) => (
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
                    {exp.highlights.map((highlight: any, hIndex: number) => (
                      <li
                        key={hIndex}
                        className="leading-relaxed text-muted-foreground"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                {index < cv.content.experience.length - 1 && (
                  <hr className="my-8 border-border" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:h-fit lg:max-w-[320px]">
          <ResumeMainInfo
            name={cv.metadata.name}
            title={cv.metadata.title}
            location={cv.metadata.location}
            email={cv.metadata.email}
            summary={cv.metadata.summary}
          />
        </div>
      </div>
    </PageLayout>
  )
}
