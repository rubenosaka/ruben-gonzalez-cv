'use client'

import { TrinukiBanner } from './TrinukiBanner'
import { FreneticBanner } from './FreneticBanner'
import { CodeComment } from './CodeComment'

export function HomeProjects() {
  return (
    <section className="mb-12">
      <h2 className=" text-3xl font-bold">Featured Projects</h2>
      <CodeComment>
        Ignore this… or maybe don&apos;t 🤔, anyway...enjoy my portfolio
      </CodeComment>
      <div className="mt-2 space-y-6">
        <TrinukiBanner variant="home" />
        <FreneticBanner variant="home" />
      </div>
    </section>
  )
}
