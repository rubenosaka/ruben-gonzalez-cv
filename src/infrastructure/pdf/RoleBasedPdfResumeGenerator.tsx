import PDFDocument from 'pdfkit'
import type { ExperienceItem, Project, RoleBasedResume } from '@/types/role-based-resume'

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
  private typography = {
    body: 9,
    small: 7.5,
    sidebarName: 12,
    sidebarSubtitle: 8.5,
    sidebarSection: 12,
    contentSection: 9,
    lineGap: 1.5,
    sidebarSubtitleLineGap: 3,
    afterParagraph: 4,
  }
  private spacing = {
    xs: 3,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
    xxl: 12,
    section: 15,
    sidebarBlock: 28,
    sidebarAfterName: 14,
    sidebarAfterTitle: 32,
    afterContentTitle: 10,
    experienceBetween: 10,
  }
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
      technicalSkills: 'TECHNICAL SKILLS',
    },
    content: {
      professionalSummary: 'PROFESSIONAL SUMMARY',
      careerHighlights: 'CAREER HIGHLIGHTS',
      coreStrengths: 'CORE STRENGTHS',
      recentExperience: 'RECENT EXPERIENCE',
      remainingExperience: 'REMAINING EXPERIENCE',
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
        this.drawTechnicalSkillsSidebar(doc, resume)
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

  private getContentX(withSidebar = true): number {
    if (!withSidebar) {
      return this.page.margin
    }
    return this.page.margin + this.layout.sidebarWidth + this.layout.gap
  }

  private getContentWidth(withSidebar = true): number {
    if (!withSidebar) {
      return this.page.width - this.page.margin * 2
    }
    return this.layout.contentWidth
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

    let y = sidebarY + this.spacing.lg

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
      y += photoSize + this.spacing.lg
    } catch {
      // Photo optional
    }

    doc.save()
    doc.fillColor(this.colors.sidebarText)
    doc.font(this.fonts.bold).fontSize(this.typography.sidebarName)
    doc.text(resume.metadata.name, sidebarX + 15, y, {
      width: sidebarWidth - 30,
      align: 'center',
    })
    y +=
      doc.heightOfString(resume.metadata.name, {
        width: sidebarWidth - 30,
      }) + this.spacing.sidebarAfterName

    doc.font(this.fonts.regular).fontSize(this.typography.sidebarSubtitle)
    const titleWidth = sidebarWidth - 30
    const titleX = sidebarX + 15
    const titleText = resume.metadata.title.replace(' / ', '\n')
    doc.text(titleText, titleX, y, {
      width: titleWidth,
      align: 'center',
      lineGap: this.typography.sidebarSubtitleLineGap,
    })
    y +=
      doc.heightOfString(titleText, {
        width: titleWidth,
        lineGap: this.typography.sidebarSubtitleLineGap,
      }) + this.spacing.sidebarAfterTitle

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.contact,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.md
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.email,
      resume.metadata.email,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.xs
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.phone,
      resume.metadata.phone,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.xs
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.location,
      resume.metadata.location,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.xs
    y = this.drawSidebarItem(
      doc,
      this.contactLabels.linkedin,
      resume.metadata.linkedin,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.sidebarBlock

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.education,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.md
    resume.education.forEach((edu) => {
      doc
        .font(this.fonts.bold)
        .fontSize(this.typography.body)
        .fillColor(this.colors.sidebarText)
      doc.text(edu.degree, sidebarX + 15, y, {
        width: sidebarWidth - 30,
        lineGap: this.typography.lineGap,
      })
      y +=
        doc.heightOfString(edu.degree, {
          width: sidebarWidth - 30,
          lineGap: this.typography.lineGap,
        }) + this.spacing.sm
      doc
        .font(this.fonts.regular)
        .fontSize(this.typography.body)
        .fillColor(this.colors.sidebarAccent)
      doc.text(edu.period, sidebarX + 15, y, {
        width: sidebarWidth - 30,
        lineGap: this.typography.lineGap,
      })
      y +=
        doc.heightOfString(edu.period, {
          width: sidebarWidth - 30,
          lineGap: this.typography.lineGap,
        }) + this.spacing.md
    })
    y += this.spacing.sidebarBlock

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.languages,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += this.spacing.xs
    resume.languages.forEach((lang) => {
      doc
        .font(this.fonts.bold)
        .fontSize(this.typography.body)
        .fillColor(this.colors.sidebarText)
      doc.text(lang.name, sidebarX + 15, y, { width: sidebarWidth - 30 })
      y +=
        doc.heightOfString(lang.name, { width: sidebarWidth - 30 }) +
        this.spacing.sm
      doc
        .font(this.fonts.regular)
        .fontSize(this.typography.body)
        .fillColor(this.colors.sidebarAccent)
      doc.text(lang.level, sidebarX + 15, y, { width: sidebarWidth - 30 })
      y +=
        doc.heightOfString(lang.level, { width: sidebarWidth - 30 }) +
        this.spacing.md
    })
    doc.restore()
  }

  private drawTechnicalSkillsSidebar(
    doc: PDFKit.PDFDocument,
    resume: RoleBasedResume
  ) {
    const sidebarX = this.page.margin
    const sidebarY = this.page.margin
    const sidebarWidth = this.layout.sidebarWidth
    const sidebarHeight = this.page.height - this.page.margin * 2
    const textWidth = sidebarWidth - 30
    const textX = sidebarX + 15

    doc.save()
    doc
      .rect(sidebarX, sidebarY, sidebarWidth, sidebarHeight)
      .fill(this.colors.sidebarBg)
    doc.restore()

    let y = sidebarY + this.spacing.xl

    y = this.drawSidebarSection(
      doc,
      this.sectionTitles.sidebar.technicalSkills,
      textX,
      y,
      textWidth
    )
    y += this.spacing.md

    Object.entries(resume.technicalSkills).forEach(([label, value]) => {
      if (!value) return

      doc
        .font(this.fonts.bold)
        .fontSize(this.typography.body)
        .fillColor(this.colors.sidebarText)
      doc.text(`${label}:`, textX, y, { width: textWidth })
      y +=
        doc.heightOfString(`${label}:`, { width: textWidth }) + this.spacing.sm

      doc
        .font(this.fonts.regular)
        .fontSize(this.typography.body)
        .fillColor(this.colors.sidebarAccent)
      doc.text(value, textX, y, {
        width: textWidth,
        lineGap: this.typography.lineGap,
      })
      y +=
        doc.heightOfString(value, {
          width: textWidth,
          lineGap: this.typography.lineGap,
        }) + this.spacing.md
    })
  }

  private drawContentPageOne(
    doc: PDFKit.PDFDocument,
    resume: RoleBasedResume,
    experiences: ExperienceItem[]
  ) {
    const contentX = this.getContentX()
    const contentWidth = this.getContentWidth()
    let y = this.page.margin + this.spacing.md

    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.professionalSummary,
      contentX,
      y,
      contentWidth
    )
    y = this.drawParagraph(
      doc,
      resume.summary,
      contentX,
      y,
      contentWidth,
      this.colors.contentMuted
    )
    y += this.spacing.lg

    if (resume.careerHighlights?.length) {
      y = this.drawContentSection(
        doc,
        this.sectionTitles.content.careerHighlights,
        contentX,
        y,
        contentWidth
      )
      y = this.drawBulletList(
        doc,
        resume.careerHighlights,
        contentX,
        y,
        contentWidth,
        this.colors.contentMuted
      )
      y += this.spacing.lg
    }

    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.recentExperience,
      contentX,
      y,
      contentWidth
    )

    experiences.forEach((exp, index) => {
      y = this.drawExperienceItem(doc, exp, contentX, y, contentWidth)
      if (index < experiences.length - 1) {
        y += this.spacing.experienceBetween
      }
    })
  }

  private drawContentPageTwo(
    doc: PDFKit.PDFDocument,
    resume: RoleBasedResume,
    experiences: ExperienceItem[]
  ) {
    const contentX = this.getContentX()
    const contentWidth = this.getContentWidth()
    let y = this.page.margin + this.spacing.md

    const featuredProject = resume.projects?.[0]
    if (featuredProject) {
      y = this.drawProjectSection(
        doc,
        featuredProject,
        contentX,
        y,
        contentWidth
      )
      y += this.spacing.lg
    }

    if (experiences.length > 0) {
      y = this.drawContentSection(
        doc,
        this.sectionTitles.content.remainingExperience,
        contentX,
        y,
        contentWidth
      )

      experiences.forEach((exp, index) => {
        y = this.drawExperienceItem(doc, exp, contentX, y, contentWidth)
        if (index < experiences.length - 1) {
          y += this.spacing.experienceBetween
        }
      })
      y += this.spacing.lg
    }

    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.coreStrengths,
      contentX,
      y,
      contentWidth
    )

    const isEMRole = resume.metadata.title
      .toLowerCase()
      .includes('engineering manager')

    resume.coreStrengths.forEach((strength) => {
      doc
        .font(this.fonts.bold)
        .fontSize(this.typography.body)
        .fillColor(this.colors.contentText)
      doc.text(`${strength.category}:`, contentX, y, { width: contentWidth })
      y +=
        doc.heightOfString(`${strength.category}:`, { width: contentWidth }) +
        this.spacing.sm

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
      y += isEMRole && isTeamLeading ? this.spacing.md : this.spacing.xs
    })
  }

  private drawProjectSection(
    doc: PDFKit.PDFDocument,
    project: Project,
    contentX: number,
    y: number,
    contentWidth: number
  ): number {
    y = this.drawContentSection(
      doc,
      project.name.toUpperCase(),
      contentX,
      y,
      contentWidth
    )
    y = this.drawParagraph(
      doc,
      project.description,
      contentX,
      y,
      contentWidth,
      this.colors.contentMuted
    )

    if (project.bullets?.length) {
      y = this.drawBulletList(
        doc,
        project.bullets,
        contentX,
        y,
        contentWidth,
        this.colors.contentMuted
      )
    }

    if (project.stack) {
      y += this.spacing.sm
      const stackLine = `Stack: ${project.stack}`
      doc
        .font(this.fonts.bold)
        .fontSize(this.typography.small)
        .fillColor(this.colors.contentSoft)
      doc.text(stackLine, contentX, y, {
        width: contentWidth,
        lineGap: this.typography.lineGap,
      })
      y +=
        doc.heightOfString(stackLine, {
          width: contentWidth,
          lineGap: this.typography.lineGap,
        }) + this.spacing.xs
    }

    return y
  }

  private drawBulletList(
    doc: PDFKit.PDFDocument,
    bullets: string[],
    contentX: number,
    y: number,
    contentWidth: number,
    color: string
  ): number {
    bullets.forEach((bullet) => {
      const bulletText = `• ${bullet}`
      doc
        .font(this.fonts.regular)
        .fontSize(this.typography.body)
        .fillColor(color)
      doc.text(bulletText, contentX + 10, y, {
        width: contentWidth - 10,
        lineGap: this.typography.lineGap,
      })
      y +=
        doc.heightOfString(bulletText, {
          width: contentWidth - 10,
          lineGap: this.typography.lineGap,
        }) + this.spacing.sm
    })

    return y
  }

  private drawExperienceItem(
    doc: PDFKit.PDFDocument,
    exp: ExperienceItem,
    contentX: number,
    y: number,
    contentWidth: number
  ): number {
    doc
      .font(this.fonts.bold)
      .fontSize(this.typography.body)
      .fillColor(this.colors.contentText)
    doc.text(exp.company, contentX, y, { width: contentWidth })
    y +=
      doc.heightOfString(exp.company, { width: contentWidth }) + this.spacing.sm

    doc.font(this.fonts.bold).fontSize(this.typography.body).fillColor(this.colors.contentSoft)
    const roleLine = `${exp.role} - ${exp.period}`
    doc.text(roleLine, contentX, y, { width: contentWidth })
    y +=
      doc.heightOfString(roleLine, { width: contentWidth }) + this.spacing.xs

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
          .fontSize(this.typography.body)
          .fillColor(this.colors.contentMuted)
        doc.text(bulletText, contentX + 10, y, {
          width: contentWidth - 10,
          lineGap: this.typography.lineGap,
        })
        y +=
          doc.heightOfString(bulletText, {
            width: contentWidth - 10,
            lineGap: this.typography.lineGap,
          }) + this.spacing.sm
      })
    }

    if (exp.stack) {
      y += this.spacing.sm
      const stackLine = `Stack: ${exp.stack}`
      doc
        .font(this.fonts.bold)
        .fontSize(this.typography.small)
        .fillColor(this.colors.contentSoft)
      doc.text(stackLine, contentX, y, {
        width: contentWidth,
        lineGap: this.typography.lineGap,
      })
      y +=
        doc.heightOfString(stackLine, {
          width: contentWidth,
          lineGap: this.typography.lineGap,
        }) + this.spacing.xs
    }

    return y
  }

  private drawParagraph(
    doc: PDFKit.PDFDocument,
    text: string,
    x: number,
    y: number,
    width: number,
    color: string
  ): number {
    doc
      .font(this.fonts.regular)
      .fontSize(this.typography.body)
      .fillColor(color)
    doc.text(text, x, y, { width, lineGap: this.typography.lineGap })
    return (
      y +
      doc.heightOfString(text, {
        width,
        lineGap: this.typography.lineGap,
      }) +
      this.typography.afterParagraph
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
    doc
      .font(this.fonts.bold)
      .fontSize(this.typography.sidebarSection)
      .fillColor(this.colors.sidebarText)
    doc.text(title, x, y, { width, align: 'center' })
    doc.restore()
    return y + this.spacing.section
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
    doc
      .font(this.fonts.bold)
      .fontSize(this.typography.body)
      .fillColor(this.colors.sidebarText)
    doc.text(label, x, y, { width })
    y += doc.heightOfString(label, { width }) + this.spacing.sm
    doc
      .font(this.fonts.regular)
      .fontSize(this.typography.body)
      .fillColor(this.colors.sidebarAccent)
    doc.text(value, x, y, { width })
    y += doc.heightOfString(value, { width }) + this.spacing.md
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
    doc
      .font(this.fonts.bold)
      .fontSize(this.typography.contentSection)
      .fillColor(this.colors.contentText)
    doc.text(title, x, y, { width })
    const textWidth = doc.widthOfString(title)
    const underlineY = y + this.typography.contentSection + 1
    doc.moveTo(x, underlineY)
    doc.lineTo(x + textWidth, underlineY)
    doc.lineWidth(1)
    doc.strokeColor(this.colors.accent)
    doc.stroke()
    doc.restore()
    return (
      y +
      this.typography.contentSection +
      1 +
      this.spacing.afterContentTitle
    )
  }
}
