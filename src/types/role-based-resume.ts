import { z } from 'zod'

const CoreStrengthSchema = z.object({
  category: z.string(),
  skills: z.string(),
})

const ExperienceItemSchema = z.object({
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
  bullets: z.array(z.string()).optional(),
  stack: z.string().optional(),
})

const TechnicalSkillsSchema = z.record(z.string(), z.string())

const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
})

const EducationItemSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  period: z.string(),
})

const LanguageSchema = z.object({
  name: z.string(),
  level: z.string(),
})

const RoleBasedResumeSchema = z.object({
  metadata: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    phone: z.string(),
    linkedin: z.string().url(),
    location: z.string(),
  }),
  summary: z.string(),
  coreStrengths: z.array(CoreStrengthSchema),
  experience: z.array(ExperienceItemSchema),
  technicalSkills: TechnicalSkillsSchema,
  projects: z.array(ProjectSchema).optional(),
  education: z.array(EducationItemSchema),
  languages: z.array(LanguageSchema),
})

export type RoleBasedResume = z.infer<typeof RoleBasedResumeSchema>
export type CoreStrength = z.infer<typeof CoreStrengthSchema>
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>
export type TechnicalSkills = z.infer<typeof TechnicalSkillsSchema>
export type Project = z.infer<typeof ProjectSchema>
export type EducationItem = z.infer<typeof EducationItemSchema>
export type Language = z.infer<typeof LanguageSchema>

export { RoleBasedResumeSchema }
