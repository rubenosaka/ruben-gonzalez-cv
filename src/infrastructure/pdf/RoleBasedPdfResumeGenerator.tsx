import PDFDocument from 'pdfkit'
import type { RoleBasedResume } from '@/types/role-based-resume'
import type { ExperienceItem } from '@/types/role-based-resume'

export class RoleBasedPdfResumeGenerator {
  private page = { width: 595, height: 842, margin: 10 }
  private colors = {
    sidebarBg: '#000000',
    sidebarText: '#ffffff',
    sidebarAccent: '#f3f4f6',
    contentBg: '#ffffff',
    contentText: '#0f172a',
    contentMuted: '#475569',
    contentSoft: '#64748b',
    divider: '#e2e8f0',
    accent: '#000000',
  }
  private fonts = { regular: 'Helvetica', bold: 'Helvetica-Bold' }
  private layout = {
    sidebarWidth: 180,
    contentWidth: 595 - 10 - 10 - 180 - 15,
    gap: 15,
  }
  private experiencesOnFirstPage = 3
  private sectionTitles = {
    sidebar: {
      contact: 'Contact',
      education: 'Education',
      languages: 'Languages',
      sideProjects: 'Side Projects',
    },
    content: {
      professionalSummary: 'PROFESSIONAL SUMMARY',
      coreStrengths: 'CORE STRENGTHS',
      experience: 'EXPERIENCE',
      technicalSkills: 'TECHNICAL SKILLS',
    },
  }
  private sideProjects = {
    trinuki: {
      name: 'Trinuki',
      description:
        'AI-driven trip planner for Japan featuring automated itinerary generation, dynamic POI rendering, and Google Places integration. Demonstrates modern frontend architecture, Vue 3 + TypeScript, and AI-assisted UX.',
    },
  }
  private contactLabels = {
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    linkedin: 'LinkedIn',
  }

  async generatePDF(resume: RoleBasedResume): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: this.page.margin,
          autoFirstPage: true,
        })
        const chunks: Buffer[] = []
        doc.on('data', (c) => chunks.push(c))
        doc.on('end', () => resolve(Buffer.concat(chunks)))

        const firstPageExperiences = resume.experience.slice(
          0,
          this.experiencesOnFirstPage
        )
        const secondPageExperiences = resume.experience.slice(
          this.experiencesOnFirstPage
        )

        this.drawSidebar(doc, resume)
        this.drawContentPageOne(doc, resume, firstPageExperiences)

        doc.addPage({ size: 'A4', margin: this.page.margin })
        this.drawSidebar(doc, resume)
        this.drawContentPageTwo(doc, resume, secondPageExperiences)

        doc.end()
      } catch (e) {
        reject(
          new Error(
            `Failed to generate PDF: ${e instanceof Error ? e.message : 'Unknown error'}`
          )
        )
      }
    })
  }

  private getContentX(): number {
    return this.page.margin + this.layout.sidebarWidth + this.layout.gap
  }

  private drawSidebar(doc: PDFKit.PDFDocument, resume: RoleBasedResume) {
    const sidebarX = this.page.margin
    const sidebarY = this.page.margin
    const sidebarWidth = this.layout.sidebarWidth
    const sidebarHeight = this.page.height - this.page.margin * 2

    doc.save()
    doc
      .rect(sidebarX, sidebarY, sidebarWidth, sidebarHeight)
      .fill(this.colors.sidebarBg)
    doc.restore()

    let y = sidebarY + 20

    try {
      const photoPath = process.cwd() + '/public/ruben-gonzalez.png'
      const photoSize = 130
      const photoX = sidebarX + (sidebarWidth - photoSize) / 2
      doc.image(photoPath, photoX, y, {
        width: photoSize,
        height: photoSize,
        fit: [photoSize, photoSize],
        align: 'center',
      })
      y += photoSize + 15
    } catch {
      // Photo optional
    }

    doc.save()
    doc.fillColor(this.colors.sidebarText)
    doc.font(this.fonts.bold).fontSize(12)
    doc.text(resume.metadata.name, sidebarX + 15, y, {
      width: sidebarWidth - 30,
      align: 'center',
    })
    y += 15
    doc.font(this.fonts.regular).fontSize(8)
    doc.text(resume.metadata.title, sidebarX, y, {
      width: sidebarWidth,
      align: 'center',
    })
    y += 45

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.contact,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 10
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.email,
      resume.metadata.email,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.phone,
      resume.metadata.phone,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.location,
      resume.metadata.location,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.linkedin,
      resume.metadata.linkedin,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 30

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.education,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 10
    resume.education.forEach((edu) => {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.sidebarText)
      doc.text(edu.degree, sidebarX + 15, y, {
        width: sidebarWidth - 30,
        lineGap: 2,
      })
      y +=
        doc.heightOfString(edu.degree, {
          width: sidebarWidth - 30,
          lineGap: 2,
        }) + 4
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.sidebarAccent)
      doc.text(edu.period, sidebarX + 15, y, {
        width: sidebarWidth - 30,
        lineGap: 2,
      })
      y +=
        doc.heightOfString(edu.period, {
          width: sidebarWidth - 30,
          lineGap: 2,
        }) + 10
    })
    y += 30

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.languages,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4
    resume.languages.forEach((lang) => {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.sidebarText)
      doc.text(lang.name, sidebarX + 15, y, { width: sidebarWidth - 30 })
      y += doc.heightOfString(lang.name, { width: sidebarWidth - 30 }) + 3
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.sidebarAccent)
      doc.text(lang.level, sidebarX + 15, y, { width: sidebarWidth - 30 })
      y += doc.heightOfString(lang.level, { width: sidebarWidth - 30 }) + 6
    })
    y += 20

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.sideProjects,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4
    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.sidebarText)
    doc.text(this.sideProjects.trinuki.name, sidebarX + 15, y, {
      width: sidebarWidth - 30,
    })
    y +=
      doc.heightOfString(this.sideProjects.trinuki.name, {
        width: sidebarWidth - 30,
      }) + 3
    doc
      .font(this.fonts.regular)
      .fontSize(8)
      .fillColor(this.colors.sidebarAccent)
    doc.text(this.sideProjects.trinuki.description, sidebarX + 15, y, {
      width: sidebarWidth - 30,
      lineGap: 1,
    })

    doc.restore()
  }

  private drawContentPageOne(
    doc: PDFKit.PDFDocument,
    resume: RoleBasedResume,
    experiences: ExperienceItem[]
  ) {
    const contentX = this.getContentX()
    const contentWidth = this.layout.contentWidth
    let y = this.page.margin + 8

    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.professionalSummary,
      contentX,
      y,
      contentWidth
    )
    y += 8
    y = this.drawParagraph(
      doc,
      resume.summary,
      contentX,
      y,
      contentWidth,
      this.colors.contentMuted
    )
    y += 12

    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.coreStrengths,
      contentX,
      y,
      contentWidth
    )
    y += 6

    const isEMRole = resume.metadata.title
      .toLowerCase()
      .includes('engineering manager')

    resume.coreStrengths.forEach((strength) => {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
      doc.text(`${strength.category}:`, contentX, y, { width: contentWidth })
      y +=
        doc.heightOfString(`${strength.category}:`, { width: contentWidth }) +
        2

      y = this.drawParagraph(
        doc,
        strength.skills,
        contentX,
        y,
        contentWidth,
        this.colors.contentMuted
      )

      const isTeamLeading = strength.category
        .toLowerCase()
        .includes('team leading')
      y += isEMRole && isTeamLeading ? 8 : 4
    })

    y += 8
    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.experience,
      contentX,
      y,
      contentWidth
    )
    y += 8

    experiences.forEach((exp, index) => {
      y = this.drawExperienceItem(doc, exp, contentX, y, contentWidth)
      if (index < experiences.length - 1) {
        y += 6
      }
    })
  }

  private drawContentPageTwo(
    doc: PDFKit.PDFDocument,
    resume: RoleBasedResume,
    experiences: ExperienceItem[]
  ) {
    const contentX = this.getContentX()
    const contentWidth = this.layout.contentWidth
    let y = this.page.margin + 8

    if (experiences.length > 0) {
      y = this.drawContentSection(
        doc,
        this.sectionTitles.content.experience,
        contentX,
        y,
        contentWidth
      )
      y += 8

      experiences.forEach((exp, index) => {
        y = this.drawExperienceItem(doc, exp, contentX, y, contentWidth)
        if (index < experiences.length - 1) {
          y += 6
        }
      })
      y += 12
    }

    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.technicalSkills,
      contentX,
      y,
      contentWidth
    )
    y += 10

    y = this.drawTechnicalSkills(doc, resume, contentX, y, contentWidth)
  }

  private drawExperienceItem(
    doc: PDFKit.PDFDocument,
    exp: ExperienceItem,
    contentX: number,
    y: number,
    contentWidth: number
  ): number {
    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
    doc.text(exp.company, contentX, y, { width: contentWidth })
    y += doc.heightOfString(exp.company, { width: contentWidth }) + 2

    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentSoft)
    const roleLine = `${exp.role} - ${exp.period}`
    doc.text(roleLine, contentX, y, { width: contentWidth })
    y += doc.heightOfString(roleLine, { width: contentWidth }) + 4

    y = this.drawParagraph(
      doc,
      exp.description,
      contentX,
      y,
      contentWidth,
      this.colors.contentMuted
    )

    if (exp.bullets) {
      exp.bullets.slice(0, 3).forEach((bullet) => {
        const bulletText = `• ${bullet}`
        doc
          .font(this.fonts.regular)
          .fontSize(8)
          .fillColor(this.colors.contentMuted)
        doc.text(bulletText, contentX + 8, y, {
          width: contentWidth - 8,
          lineGap: 1,
        })
        y +=
          doc.heightOfString(bulletText, {
            width: contentWidth - 8,
            lineGap: 1,
          }) + 2
      })
    }

    if (exp.stack) {
      y += 2
      const stackLine = `Stack: ${exp.stack}`
      doc.font(this.fonts.bold).fontSize(7).fillColor(this.colors.contentSoft)
      doc.text(stackLine, contentX, y, { width: contentWidth, lineGap: 1 })
      y +=
        doc.heightOfString(stackLine, {
          width: contentWidth,
          lineGap: 1,
        }) + 4
    }

    return y
  }

  private drawTechnicalSkills(
    doc: PDFKit.PDFDocument,
    resume: RoleBasedResume,
    contentX: number,
    startY: number,
    contentWidth: number
  ): number {
    const skillKeys = Object.keys(resume.technicalSkills)
    const leadershipKey = skillKeys.find((key) =>
      key.toLowerCase().includes('leadership')
    )
    const isEngineeringManager = !!leadershipKey

    const columnWidth = contentWidth / 2 - 10
    const rightColumnX = contentX + contentWidth / 2 + 10
    const leftColumnSkills = skillKeys.slice(0, Math.ceil(skillKeys.length / 2))
    const rightColumnSkills = skillKeys.slice(Math.ceil(skillKeys.length / 2))

    let leftY = startY
    leftColumnSkills.forEach((skill) => {
      const value = resume.technicalSkills[skill]
      if (!value) return
      leftY = this.drawSkillBlock(
        doc,
        skill,
        value,
        contentX,
        leftY,
        columnWidth,
        isEngineeringManager
      )
    })

    let rightY = startY
    rightColumnSkills.forEach((skill) => {
      const value = resume.technicalSkills[skill]
      if (!value) return
      rightY = this.drawSkillBlock(
        doc,
        skill,
        value,
        rightColumnX,
        rightY,
        columnWidth,
        isEngineeringManager
      )
    })

    return Math.max(leftY, rightY)
  }

  private drawSkillBlock(
    doc: PDFKit.PDFDocument,
    label: string,
    value: string,
    x: number,
    y: number,
    width: number,
    isEngineeringManager: boolean
  ): number {
    if (!value) {
      return y
    }

    const title = `${label}:`
    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
    doc.text(title, x, y, { width })
    y += doc.heightOfString(title, { width }) + 2

    y = this.drawParagraph(doc, value, x, y, width, this.colors.contentMuted)
    return y + (isEngineeringManager ? 6 : 4)
  }

  private drawParagraph(
    doc: PDFKit.PDFDocument,
    text: string,
    x: number,
    y: number,
    width: number,
    color: string
  ): number {
    doc.font(this.fonts.regular).fontSize(8).fillColor(color)
    doc.text(text, x, y, { width, lineGap: 1 })
    return (
      y +
      doc.heightOfString(text, { width, lineGap: 1 }) +
      4
    )
  }

  private drawSidebarSection(
    doc: PDFKit.PDFDocument,
    title: string,
    x: number,
    y: number,
    width: number
  ): number {
    doc.save()
    doc.font(this.fonts.bold).fontSize(12).fillColor(this.colors.sidebarText)
    doc.text(title, x, y, { width, align: 'center' })
    doc.restore()
    return y + 15
  }

  private drawSidebarItem(
    doc: PDFKit.PDFDocument,
    label: string,
    value: string,
    x: number,
    y: number,
    width: number
  ): number {
    doc.save()
    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.sidebarText)
    doc.text(label, x, y, { width })
    y += doc.heightOfString(label, { width }) + 3
    doc
      .font(this.fonts.regular)
      .fontSize(8)
      .fillColor(this.colors.sidebarAccent)
    doc.text(value, x, y, { width })
    y += doc.heightOfString(value, { width }) + 6
    doc.restore()
    return y
  }

  private drawContentSection(
    doc: PDFKit.PDFDocument,
    title: string,
    x: number,
    y: number,
    width: number
  ): number {
    doc.save()
    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
    doc.text(title, x, y, { width })
    const textWidth = doc.widthOfString(title)
    doc.moveTo(x, y + 9)
    doc.lineTo(x + textWidth, y + 9)
    doc.lineWidth(1)
    doc.strokeColor(this.colors.accent)
    doc.stroke()
    doc.restore()
    return y + 12
  }
}
