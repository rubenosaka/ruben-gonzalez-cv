import PDFDocument from 'pdfkit'
import type { RoleBasedResume } from '@/types/role-based-resume'

type Point = { x: number; y: number }

export class RoleBasedPdfResumeGenerator {
  private page = { width: 595, height: 842, margin: 10 }
  private colors = {
    sidebarBg: '#000000', // black
    sidebarText: '#ffffff',
    sidebarAccent: '#f3f4f6', // gray-100
    contentBg: '#ffffff',
    contentText: '#0f172a', // slate-900
    contentMuted: '#475569', // slate-600
    contentSoft: '#64748b', // slate-500
    divider: '#e2e8f0', // slate-200
    accent: '#000000', // black
  }
  private fonts = { regular: 'Helvetica', bold: 'Helvetica-Bold' }
  private layout = {
    sidebarWidth: 180,
    contentWidth: 595 - 10 - 10 - 180 - 15, // page - margins - sidebar - gap
    gap: 15,
  }

  private currentPage = 1

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

    // Background
    doc.save()
    doc
      .rect(sidebarX, sidebarY, sidebarWidth, sidebarHeight)
      .fill(this.colors.sidebarBg)
    doc.restore()

    let y = sidebarY + 20

    // Photo
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
      // Si no encuentra la imagen, continúa sin ella
      console.log('Photo not found, continuing without it:', error)
    }

    // Name
    doc.save()
    doc.fillColor(this.colors.sidebarText)
    doc.font(this.fonts.bold).fontSize(12)
    doc.text(resume.metadata.name, sidebarX + 15, y, {
      width: sidebarWidth - 30,
      align: 'center',
    })
    y += 15

    // Title
    doc.font(this.fonts.regular).fontSize(8)
    doc.text(resume.metadata.title, sidebarX - 0, y, {
      width: sidebarWidth,
      align: 'center',
    })
    y += 45

    // Contact Section
    y = this.drawSidebarSection(
      doc,
      'Contact',
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 10

    // Email
    y = this.drawSidebarItem(
      doc,
      'Email',
      resume.metadata.email,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4

    // Phone
    y = this.drawSidebarItem(
      doc,
      'Phone',
      resume.metadata.phone,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4

    // Location
    y = this.drawSidebarItem(
      doc,
      'Location',
      resume.metadata.location,
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4

    // LinkedIn
    y = this.drawSidebarItem(
      doc,
      'LinkedIn',
      'linkedin.com/in/rubengonzalez',
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 30

    // Education Section
    y = this.drawSidebarSection(
      doc,
      'Education',
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 10

    resume.education.forEach((edu) => {
      // Degree
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

      // Period (year only)
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

    // Languages Section
    y = this.drawSidebarSection(
      doc,
      'Languages',
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4

    resume.languages.forEach((lang) => {
      // Language name
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.sidebarText)
      doc.text(lang.name, sidebarX + 15, y, { width: sidebarWidth - 30 })
      y += doc.heightOfString(lang.name, { width: sidebarWidth - 30 }) + 3

      // Language level
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.sidebarAccent)
      doc.text(lang.level, sidebarX + 15, y, { width: sidebarWidth - 30 })
      y += doc.heightOfString(lang.level, { width: sidebarWidth - 30 }) + 6
    })

    y += 20

    // Side Projects Section
    y = this.drawSidebarSection(
      doc,
      'Side Projects',
      sidebarX + 15,
      y,
      sidebarWidth - 30
    )
    y += 4

    // Trinuki project
    doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.sidebarText)
    doc.text('Trinuki', sidebarX + 15, y, { width: sidebarWidth - 30 })
    y += doc.heightOfString('Trinuki', { width: sidebarWidth - 30 }) + 3

    doc
      .font(this.fonts.regular)
      .fontSize(8)
      .fillColor(this.colors.sidebarAccent)
    doc.text(
      'AI-driven trip planner for Japan with automated itineraries and dynamic POI rendering (personal project demonstrating modern frontend architecture and AI integration).',
      sidebarX + 15,
      y,
      {
        width: sidebarWidth - 30,
      }
    )
    y +=
      doc.heightOfString(
        'AI-driven trip planner for Japan with automated itineraries and dynamic POI rendering (personal project demonstrating modern frontend architecture and AI integration).',
        {
          width: sidebarWidth - 30,
        }
      ) + 6

    doc.restore()
  }

  private drawContent(doc: PDFKit.PDFDocument, resume: RoleBasedResume) {
    const contentX =
      this.page.margin + this.layout.sidebarWidth + this.layout.gap
    const contentY = this.page.margin + 8
    const contentWidth = this.layout.contentWidth

    let y = contentY

    // Professional Summary
    y = this.drawContentSection(
      doc,
      'PROFESSIONAL SUMMARY',
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

    // Core Strengths
    y = this.drawContentSection(
      doc,
      'CORE STRENGTHS',
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

    // Experience
    y = this.drawContentSection(doc, 'EXPERIENCE', contentX, y, contentWidth)
    y += 8

    resume.experience.forEach((exp, index) => {
      // Company
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
      doc.text(exp.company, contentX, y, {
        width: contentWidth,
      })
      y += 12

      // Role - Period
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentSoft)
      doc.text(`${exp.role} - ${exp.period}`, contentX, y, {
        width: contentWidth,
      })
      y += 12

      // Description
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.contentMuted)
      doc.text(exp.description, contentX, y, { width: contentWidth })
      y += 14

      // Bullets (limit to 3 most important)
      if (exp.bullets) {
        const limitedBullets = exp.bullets.slice(0, 3)
        limitedBullets.forEach((bullet) => {
          doc.text(`• ${bullet}`, contentX + 8, y, {
            width: contentWidth - 8,
          })
          y += 12
        })
      }

      // Stack (more compact)
      if (exp.stack) {
        y += 4
        doc.font(this.fonts.bold).fontSize(7).fillColor(this.colors.contentSoft)
        doc.text(`Stack: ${exp.stack}`, contentX, y, { width: contentWidth })
        y += 20
      }

      // Add more space between experience entries
      y += index < resume.experience.length - 1 ? 8 : 8
    })

    // Technical Skills (more compact, inline format)
    y = this.drawContentSection(
      doc,
      'TECHNICAL SKILLS',
      contentX,
      y,
      contentWidth
    )
    y += 6

    // Frontend (full width)
    if (resume.technicalSkills.Frontend) {
      doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
      doc.text('Frontend:', contentX, y, { width: contentWidth })
      y += 8

      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.contentMuted)
      doc.text(resume.technicalSkills.Frontend, contentX, y, {
        width: contentWidth,
      })
      y += 30
    }

    // Two columns layout - Left column
    const leftColumnSkills = ['DevOps, QA & Tools', 'Backend']
    const rightColumnSkills = ['Analytics & Monitoring', 'Practices']

    // Left column (2 skills)
    let leftY = y
    leftColumnSkills.forEach((skill) => {
      if (resume.technicalSkills[skill]) {
        doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
        doc.text(`${skill}:`, contentX, leftY, { width: contentWidth / 2 - 10 })

        doc
          .font(this.fonts.regular)
          .fontSize(8)
          .fillColor(this.colors.contentMuted)
        doc.text(resume.technicalSkills[skill], contentX, leftY + 8, {
          width: contentWidth / 2 - 10,
        })
        leftY += 30
      }
    })

    // Right column (2 skills)
    let rightY = y
    rightColumnSkills.forEach((skill) => {
      if (resume.technicalSkills[skill]) {
        doc.font(this.fonts.bold).fontSize(8).fillColor(this.colors.contentText)
        doc.text(`${skill}:`, contentX + contentWidth / 2 + 10, rightY, {
          width: contentWidth / 2 - 10,
        })

        doc
          .font(this.fonts.regular)
          .fontSize(8)
          .fillColor(this.colors.contentMuted)
        doc.text(
          resume.technicalSkills[skill],
          contentX + contentWidth / 2 + 10,
          rightY + 8,
          { width: contentWidth / 2 - 10 }
        )
        rightY += 30
      }
    })

    // Use the maximum height from both columns
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

    // Underline
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
