import PDFDocument from 'pdfkit'
import type { RoleBasedResume } from '@/types/role-based-resume'
type Point = { x: number; y: number }
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
  private currentPage = 1
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
        const doc = new PDFDocument({ size: 'A4', margin: this.page.margin })
        const chunks: Buffer[] = []
        doc.on('data', (c) => chunks.push(c))
        doc.on('end', () => resolve(Buffer.concat(chunks)))
        this.drawSidebar(doc, resume)
        this.drawContent(doc, resume)
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
    } catch (error) {
      console.log('Photo not found, continuing without it:', error)
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
    doc.text(resume.metadata.title, sidebarX - 0, y, {
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
    })
    y +=
      doc.heightOfString(this.sideProjects.trinuki.description, {
        width: sidebarWidth - 30,
      }) + 6
    doc.restore()
  }
  private drawContent(doc: PDFKit.PDFDocument, resume: RoleBasedResume) {
    const contentX =
      this.page.margin + this.layout.sidebarWidth + this.layout.gap
    const contentY = this.page.margin + 8
    const contentWidth = this.layout.contentWidth
    let y = contentY
    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.professionalSummary,
      contentX,
      y,
      contentWidth
    )
    y += 8
    doc.font(this.fonts.regular).fontSize(8).fillColor(this.colors.contentMuted)
    doc.text(resume.summary, contentX, y, { width: contentWidth, lineGap: 1 })
    y +=
      doc.heightOfString(resume.summary, { width: contentWidth, lineGap: 1 }) +
      15
    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.coreStrengths,
      contentX,
      y,
      contentWidth
    )
    y += 6
    resume.coreStrengths.forEach((strength) => {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
      doc.text(`${strength.category}:`, contentX, y, { width: contentWidth })
      y += 12
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.contentMuted)
      doc.text(strength.skills, contentX, y, { width: contentWidth })
      y += 16
    })
    y += 16
    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.experience,
      contentX,
      y,
      contentWidth
    )
    y += 8
    resume.experience.forEach((exp, index) => {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
      doc.text(exp.company, contentX, y, {
        width: contentWidth,
      })
      y += 12
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentSoft)
      doc.text(`${exp.role} - ${exp.period}`, contentX, y, {
        width: contentWidth,
      })
      y += 12
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.contentMuted)
      doc.text(exp.description, contentX, y, { width: contentWidth })
      y += 14
      if (exp.bullets) {
        const limitedBullets = exp.bullets.slice(0, 3)
        limitedBullets.forEach((bullet) => {
          doc.text(`• ${bullet}`, contentX + 8, y, {
            width: contentWidth - 8,
          })
          y += 12
        })
      }
      if (exp.stack) {
        y += 4
        doc.font(this.fonts.bold).fontSize(7).fillColor(this.colors.contentSoft)
        doc.text(`Stack: ${exp.stack}`, contentX, y, { width: contentWidth })
        y += 20
      }
      y += index < resume.experience.length - 1 ? 8 : 8
    })
    y = this.drawContentSection(
      doc,
      this.sectionTitles.content.technicalSkills,
      contentX,
      y,
      contentWidth
    )
    y += 12
    const skillKeys = Object.keys(resume.technicalSkills)
    const frontendKey = skillKeys.find((key) =>
      key.toLowerCase().includes('frontend')
    )
    const backendKey = skillKeys.find((key) =>
      key.toLowerCase().includes('backend')
    )
    const leadershipKey = skillKeys.find((key) =>
      key.toLowerCase().includes('leadership')
    )

    const primaryKey = backendKey || frontendKey
    const isEngineeringManager = !!leadershipKey

    if (primaryKey && resume.technicalSkills[primaryKey]) {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
      doc.text(`${primaryKey}:`, contentX, y, { width: contentWidth })
      y += isEngineeringManager ? 12 : 8
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.contentMuted)
      doc.text(resume.technicalSkills[primaryKey], contentX, y, {
        width: contentWidth,
      })
      y += 30
    }

    const remainingSkills = skillKeys.filter((key) => key !== primaryKey)
    const leftColumnSkills = remainingSkills.slice(
      0,
      Math.ceil(remainingSkills.length / 2)
    )
    const rightColumnSkills = remainingSkills.slice(
      Math.ceil(remainingSkills.length / 2)
    )
    let leftY = y
    leftColumnSkills.forEach((skill) => {
      if (resume.technicalSkills[skill]) {
        doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
        doc.text(`${skill}:`, contentX, leftY, { width: contentWidth / 2 - 10 })
        leftY += isEngineeringManager ? 10 : 8
        doc
          .font(this.fonts.regular)
          .fontSize(8)
          .fillColor(this.colors.contentMuted)
        doc.text(resume.technicalSkills[skill], contentX, leftY, {
          width: contentWidth / 2 - 10,
        })
        leftY += isEngineeringManager ? 35 : 30
      }
    })
    let rightY = y
    rightColumnSkills.forEach((skill) => {
      if (resume.technicalSkills[skill]) {
        doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
        doc.text(`${skill}:`, contentX + contentWidth / 2 + 10, rightY, {
          width: contentWidth / 2 - 10,
        })
        rightY += isEngineeringManager ? 10 : 8
        doc
          .font(this.fonts.regular)
          .fontSize(8)
          .fillColor(this.colors.contentMuted)
        doc.text(
          resume.technicalSkills[skill],
          contentX + contentWidth / 2 + 10,
          rightY,
          { width: contentWidth / 2 - 10 }
        )
        rightY += isEngineeringManager ? 35 : 30
      }
    })
    y += Math.max(leftY - y, rightY - y)
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
