import PDFDocument from 'pdfkit'

export class ReactPdfCVGenerator {
  async generatePDF(cv: any): Promise<Buffer> {
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

        this.generateContent(doc, cv)
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
    doc
      .fontSize(28)
      .fillColor('#1f2937')
      .text(resume.metadata.name, { align: 'left' })

    doc
      .fontSize(18)
      .fillColor('#6b7280')
      .text(resume.metadata.title, { align: 'left' })

    doc
      .fontSize(11)
      .fillColor('#6b7280')
      .text(`${resume.metadata.location} • ${resume.metadata.email}`, {
        align: 'left',
      })

    doc.moveDown(0.5)
    doc
      .fontSize(12)
      .fillColor('#374151')
      .text(resume.metadata.summary, { align: 'left' })

    doc.moveDown(2)
    doc
      .strokeColor('#1f2937')
      .lineWidth(2)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke()
  }

  private addCareerHighlights(doc: PDFKit.PDFDocument, resume: any): void {
    doc.moveDown(1)
    this.addSectionTitle(doc, 'Career Highlights')

    resume.content.highlights.forEach((highlight: any) => {
      doc
        .fontSize(11)
        .fillColor('#1f2937')
        .font('Helvetica-Bold')
        .text(`• ${highlight.title}`, {
          align: 'left',
          continued: false,
        })
      doc.font('Helvetica')
      doc
        .fontSize(9)
        .fillColor('#374151')
        .text(highlight.description, {
          align: 'left',
          continued: false,
        })
      doc.moveDown(0.5)
    })

    doc.moveDown(1)
  }

  private addExperience(doc: PDFKit.PDFDocument, resume: any): void {
    this.addSectionTitle(doc, 'Experience')

    resume.content.experience.forEach((exp: any, index: number) => {
      if (index > 0) {
        doc.moveDown(1.5)
      }

      // Company and period on same line
      const startY = doc.y
      doc.fontSize(14).fillColor('#1f2937').text(exp.company, { align: 'left' })
      doc.fontSize(11).fillColor('#6b7280').text(exp.period, { align: 'right' })
      doc.y = startY

      doc.moveDown(0.8)
      doc.fontSize(12).fillColor('#374151').font('Helvetica-Bold').text(exp.title, { align: 'left' })
      doc.font('Helvetica')

      doc.moveDown(0.5)
      doc
        .fontSize(10)
        .fillColor('#374151')
        .text(exp.description, { align: 'left' })

      if (exp.stack) {
        doc.moveDown(0.5)
        doc
          .fontSize(9)
          .fillColor('#6b7280')
          .text(`Stack: ${exp.stack.join(', ')}`, { align: 'left' })
      }

      if (exp.highlights && exp.highlights.length > 0) {
        doc.moveDown(0.8)
        exp.highlights.forEach((highlight: string) => {
          doc
            .fontSize(9)
            .fillColor('#374151')
            .text(`• ${highlight}`, { align: 'left', indent: 20 })
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
    doc.fontSize(16).fillColor('#1f2937').text(title, { align: 'left' })

    doc
      .strokeColor('#e5e7eb')
      .lineWidth(1)
      .moveTo(50, doc.y + 5)
      .lineTo(545, doc.y + 5)
      .stroke()

    doc.moveDown(1.2)
  }
}
