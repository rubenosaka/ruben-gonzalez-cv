import { ResumeService } from '../ResumeService'

describe('ResumeService', () => {
  let resumeService: ResumeService

  beforeEach(() => {
    resumeService = new ResumeService()
  })

  describe('getResume', () => {
    it('should return resume data with correct structure', () => {
      const resume = resumeService.getResume()

      expect(resume).toBeDefined()
      expect(resume.metadata).toBeDefined()
      expect(resume.content).toBeDefined()
    })

    it('should return resume with correct metadata', () => {
      const resume = resumeService.getResume()

      expect(resume.metadata.name).toBe('Rubén González Aranda')
      expect(resume.metadata.title).toBe(
        'Engineering Manager · Product-focused Tech Lead · AI-driven Builder'
      )
      expect(resume.metadata.email).toBe('rubenosaka@gmail.com')
      expect(resume.metadata.location).toBe('Madrid, Spain')
      expect(resume.metadata.summary).toBeDefined()
      expect(resume.metadata.summary.length).toBeGreaterThan(0)
    })

    it('should return resume with highlights', () => {
      const resume = resumeService.getResume()

      expect(resume.content.highlights).toBeDefined()
      expect(Array.isArray(resume.content.highlights)).toBe(true)
      expect(resume.content.highlights.length).toBeGreaterThan(0)

      const firstHighlight = resume.content.highlights[0]
      expect(firstHighlight.title).toBeDefined()
      expect(firstHighlight.description).toBeDefined()
      expect(firstHighlight.title.length).toBeGreaterThan(0)
      expect(firstHighlight.description.length).toBeGreaterThan(0)
    })

    it('should return resume with experience', () => {
      const resume = resumeService.getResume()

      expect(resume.content.experience).toBeDefined()
      expect(Array.isArray(resume.content.experience)).toBe(true)
      expect(resume.content.experience.length).toBeGreaterThan(0)

      const firstExperience = resume.content.experience[0]
      expect(firstExperience.title).toBeDefined()
      expect(firstExperience.company).toBeDefined()
      expect(firstExperience.period).toBeDefined()
      expect(firstExperience.description).toBeDefined()
      expect(firstExperience.title.length).toBeGreaterThan(0)
      expect(firstExperience.company.length).toBeGreaterThan(0)
      expect(firstExperience.period.length).toBeGreaterThan(0)
      expect(firstExperience.description.length).toBeGreaterThan(0)
    })

    it('should return experience with optional fields', () => {
      const resume = resumeService.getResume()
      const experience = resume.content.experience

      experience.forEach((exp) => {
        expect(exp.title).toBeDefined()
        expect(exp.company).toBeDefined()
        expect(exp.period).toBeDefined()
        expect(exp.description).toBeDefined()

        if (exp.stack) {
          expect(Array.isArray(exp.stack)).toBe(true)
          exp.stack.forEach((skill) => {
            expect(typeof skill).toBe('string')
            expect(skill.length).toBeGreaterThan(0)
          })
        }

        if (exp.highlights) {
          expect(Array.isArray(exp.highlights)).toBe(true)
          exp.highlights.forEach((highlight) => {
            expect(typeof highlight).toBe('string')
            expect(highlight.length).toBeGreaterThan(0)
          })
        }
      })
    })

    it('should return highlights with optional color field', () => {
      const resume = resumeService.getResume()
      const highlights = resume.content.highlights

      highlights.forEach((highlight) => {
        expect(highlight.title).toBeDefined()
        expect(highlight.description).toBeDefined()

        if (highlight.color) {
          expect(typeof highlight.color).toBe('string')
          expect(highlight.color.length).toBeGreaterThan(0)
        }
      })
    })
  })
})
