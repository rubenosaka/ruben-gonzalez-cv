import PDFDocument from 'pdfkit'

export class ReactPdfResumeGenerator {
  async generatePDF(resume: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 50,
          bufferPages: true,
        })

        const chunks: Buffer[] = []
        doc.on('data', (chunk) => chunks.push(chunk))
        doc.on('end', () => resolve(Buffer.concat(chunks)))

        this.generateContent(doc, resume)
        doc.end()
      } catch (error) {
        reject(
          new Error(
            `Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
          )
        )
      }
    })
  }

  private generateContent(doc: PDFKit.PDFDocument, resume: any): void {
    this.addHeader(doc, resume)
    this.addCareerHighlights(doc, resume)
    this.addExperience(doc, resume)
    this.addSkills(doc)
    this.addEducation(doc)
  }

  private addHeader(doc: PDFKit.PDFDocument, resume: any): void {
    // Background header
    doc.fillColor('#f8fafc').rect(0, 0, 595, 120).fill()

    // Name
    doc
      .fontSize(32)
      .fillColor('#1e293b')
      .font('Helvetica-Bold')
      .text(resume.metadata.name, 50, 30)

    // Title
    doc
      .fontSize(16)
      .fillColor('#64748b')
      .font('Helvetica')
      .text(resume.metadata.title, 50, 70)

    // Contact info
    doc
      .fontSize(12)
      .fillColor('#64748b')
      .text(`${resume.metadata.location} • ${resume.metadata.email}`, 50, 95)

    // Summary
    doc
      .fontSize(14)
      .fillColor('#334155')
      .text(resume.metadata.summary, 50, 140, { width: 495 })

    doc.moveDown(2)
  }

  private addCareerHighlights(doc: PDFKit.PDFDocument, resume: any): void {
    doc.moveDown(1)
    this.addSectionTitle(doc, 'Career Highlights')

    const colorMap: Record<string, string> = {
      'pink-400': '#f472b6',
      'pink-500': '#ec4899',
      'pink-600': '#db2777',
      'pink-700': '#be185d',
      'pink-800': '#9d174d',
    }

    let currentY = doc.y
    let currentX = 50
    const cardWidth = 240
    const cardHeight = 80
    const margin = 20

    resume.content.highlights.forEach((highlight: any, index: number) => {
      // Check if we need to move to next row
      if (currentX + cardWidth > 545) {
        currentX = 50
        currentY += cardHeight + margin
      }

      const highlightColor = (highlight.color && colorMap[highlight.color]) || '#1f2937'

      // Card background
      doc
        .fillColor('#ffffff')
        .strokeColor('#e2e8f0')
        .lineWidth(1)
        .roundedRect(currentX, currentY, cardWidth, cardHeight, 8)
        .fill()
        .stroke()

      // Colored border (top)
      doc
        .fillColor(highlightColor)
        .rect(currentX, currentY, cardWidth, 4)
        .fill()

      // Title
      doc
        .fontSize(10)
        .fillColor('#1e293b')
        .font('Helvetica-Bold')
        .text(highlight.title, currentX + 12, currentY + 12, {
          width: cardWidth - 24,
        })

      // Description
      doc
        .fontSize(8)
        .fillColor('#64748b')
        .font('Helvetica')
        .text(highlight.description, currentX + 12, currentY + 35, {
          width: cardWidth - 24,
        })

      currentX += cardWidth + margin
    })

    doc.y = currentY + cardHeight + 30
  }

  private addExperience(doc: PDFKit.PDFDocument, resume: any): void {
    this.addSectionTitle(doc, 'Experience')

    resume.content.experience.forEach((exp: any, index: number) => {
      if (index > 0) {
        doc.moveDown(2)
      }

      // Company name with background
      doc
        .fillColor('#f1f5f9')
        .rect(50, doc.y, 495, 25)
        .fill()

      doc
        .fontSize(16)
        .fillColor('#1e293b')
        .font('Helvetica-Bold')
        .text(exp.company, 60, doc.y + 5)

      doc
        .fontSize(12)
        .fillColor('#64748b')
        .font('Helvetica')
        .text(exp.period, 60, doc.y + 5, { align: 'right', width: 475 })

      doc.moveDown(1.5)

      // Job title
      doc
        .fontSize(14)
        .fillColor('#334155')
        .font('Helvetica-Bold')
        .text(exp.title, 60, doc.y)

      doc.moveDown(1)

      // Description
      doc
        .fontSize(11)
        .fillColor('#475569')
        .font('Helvetica')
        .text(exp.description, 60, doc.y, { width: 475 })

      // Stack
      if (exp.stack) {
        doc.moveDown(0.8)
        doc
          .fontSize(10)
          .fillColor('#64748b')
          .font('Helvetica-Bold')
          .text('Stack:', 60, doc.y)

        doc
          .fontSize(9)
          .fillColor('#64748b')
          .font('Helvetica')
          .text(exp.stack.join(', '), 80, doc.y, { width: 455 })
      }

      // Highlights
      if (exp.highlights && exp.highlights.length > 0) {
        doc.moveDown(1)
        exp.highlights.forEach((highlight: string) => {
          doc
            .fontSize(9)
            .fillColor('#475569')
            .font('Helvetica')
            .text(`• ${highlight}`, 60, doc.y, { width: 475 })
          doc.moveDown(0.3)
        })
      }
    })
  }

  private addSkills(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'Skills')

    const skills = [
      'JavaScript (ES6+)',
      'Vue 3',
      'React',
      'TypeScript',
      'Node.js/Express',
      'PHP (Laravel, Symfony)',
      'Python',
      'AWS',
      'Docker',
      'Clean Architecture',
      'DDD',
      'SOLID Principles',
    ]

    let currentX = 50
    let currentY = doc.y

    skills.forEach((skill, index) => {
      const skillWidth = doc.widthOfString(skill) + 16

      if (currentX + skillWidth > 545) {
        currentX = 50
        currentY += 20
      }

      doc
        .fontSize(9)
        .fillColor('#6b7280')
        .fillAndStroke('#f3f4f6', '#e5e7eb')
        .roundedRect(currentX, currentY, skillWidth, 16, 4)
        .fill()

      doc
        .fontSize(9)
        .fillColor('#6b7280')
        .text(skill, currentX + 8, currentY + 4)

      currentX += skillWidth + 8
    })

    doc.y = currentY + 30
  }

  private addEducation(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'Education')

    doc.moveDown(0.8)
    doc
      .fontSize(11)
      .fillColor('#374151')
      .text("Master's in Big Data & Business Analytics (2017-2020)", {
        align: 'left',
        width: 495,
      })

    doc.moveDown(0.8)
    doc
      .fontSize(11)
      .fillColor('#374151')
      .text('Higher Technical Diploma in Graphic Design 2D/3D (2005-2007)', {
        align: 'left',
        width: 495,
      })
  }

  private addSectionTitle(doc: PDFKit.PDFDocument, title: string): void {
    doc
      .fontSize(20)
      .fillColor('#1e293b')
      .font('Helvetica-Bold')
      .text(title, 50, doc.y)

    doc
      .strokeColor('#e2e8f0')
      .lineWidth(2)
      .moveTo(50, doc.y + 8)
      .lineTo(545, doc.y + 8)
      .stroke()

    doc.moveDown(1.5)
  }
}
