import PDFDocument from 'pdfkit'
import type { Resume, Highlight, Experience } from '@/types/resume'

export class ReactPdfResumeGenerator {
  async generatePDF(resume: Resume): Promise<Buffer> {
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

  private generateContent(doc: PDFKit.PDFDocument, resume: Resume): void {
    this.addHeader(doc, resume)
    this.addCareerHighlights(doc, resume)
    this.addExperience(doc, resume)
    doc.moveDown(2)
    this.addSkills(doc)
    this.addEducation(doc)
  }

  private addHeader(doc: PDFKit.PDFDocument, resume: Resume): void {
    doc.fillColor('#f8fafc').rect(0, 0, 595, 120).fill()

    doc
      .fontSize(32)
      .fillColor('#1e293b')
      .font('Helvetica-Bold')
      .text(resume.metadata.name, 50, 30)

    doc
      .fontSize(16)
      .fillColor('#64748b')
      .font('Helvetica')
      .text(resume.metadata.title, 50, 70)

    doc
      .fontSize(12)
      .fillColor('#64748b')
      .text(`${resume.metadata.location} • ${resume.metadata.email}`, 50, 95)

    doc
      .fontSize(12)
      .fillColor('#334155')
      .text(resume.metadata.summary, 50, 140, { width: 495 })

    doc.moveDown(2)
  }

  private addCareerHighlights(doc: PDFKit.PDFDocument, resume: Resume): void {
    this.addSectionTitle(doc, 'Career Highlights')

    const colorMap: Record<string, string> = {
      'pink-400': '#f472b6',
      'pink-500': '#ec4899',
      'pink-600': '#db2777',
      'pink-700': '#be185d',
      'pink-800': '#9d174d',
    }

    resume.content.highlights.forEach((highlight: Highlight, index: number) => {
      const highlightColor =
        (highlight.color && colorMap[highlight.color]) || '#1f2937'

      doc
        .fillColor('#ffffff')
        .strokeColor('#e2e8f0')
        .lineWidth(1)
        .roundedRect(50, doc.y, 495, 60, 8)
        .fill()
        .stroke()

      doc.fillColor(highlightColor).rect(50, doc.y, 4, 60).fill()

      doc
        .fontSize(12)
        .fillColor('#1e293b')
        .font('Helvetica-Bold')
        .text(highlight.title, 70, doc.y + 5, { width: 465 })

      doc
        .fontSize(10)
        .fillColor('#64748b')
        .font('Helvetica')
        .text(highlight.description, 70, doc.y + 18, { width: 465 })

      doc.y += 30
    })

    doc.moveDown(1)
    doc.addPage()
  }

  private addExperience(doc: PDFKit.PDFDocument, resume: Resume): void {
    this.addSectionTitle(doc, 'Experience')

    resume.content.experience.forEach((exp: Experience, index: number) => {
      if (index > 0) {
        doc.moveDown(2)
      }

      doc.fillColor('#f1f5f9').rect(50, doc.y, 495, 25).fill()

      doc
        .fontSize(14)
        .fillColor('#1e293b')
        .font('Helvetica-Bold')
        .text(exp.company, 60, doc.y + 5)

      doc
        .fontSize(10)
        .fillColor('#64748b')
        .font('Helvetica')
        .text(exp.period, 60, doc.y + 10)

      doc.moveDown(0.8)

      doc
        .fontSize(12)
        .fillColor('#334155')
        .font('Helvetica-Bold')
        .text(exp.title, 60, doc.y)

      doc.moveDown(0.5)

      doc
        .fontSize(10)
        .fillColor('#475569')
        .font('Helvetica')
        .text(exp.description, 60, doc.y, { width: 475 })

      if (exp.stack) {
        doc.moveDown(0.5)
        doc
          .fontSize(9)
          .fillColor('#64748b')
          .font('Helvetica-Bold')
          .text('Stack:', 60, doc.y)

        doc
          .fontSize(8)
          .fillColor('#64748b')
          .font('Helvetica')
          .text(exp.stack.join(', '), 80, doc.y, { width: 455 })
      }

      if (exp.highlights && exp.highlights.length > 0) {
        doc.moveDown(0.3)
        exp.highlights.forEach((highlight: string) => {
          doc
            .fontSize(8)
            .fillColor('#475569')
            .font('Helvetica')
            .text(`• ${highlight}`, 60, doc.y, { width: 275 })
          doc.moveDown(0.15)
        })
      }
    })
  }

  private addSkills(doc: PDFKit.PDFDocument): void {
    this.addSectionTitle(doc, 'Skills')

    const skills = [
      'Vue 3',
      'React',
      'TypeScript',
      'JavaScript (ES6+)',
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
      const skillWidth = doc.widthOfString(skill) + 14

      if (currentX + skillWidth > 545) {
        currentX = 50
        currentY += 25
      }

      doc
        .fillColor('#f1f5f9')
        .strokeColor('#e2e8f0')
        .lineWidth(1)
        .roundedRect(currentX, currentY, skillWidth, 20, 10)
        .fill()
        .stroke()

      doc
        .fontSize(9)
        .fillColor('#475569')
        .font('Helvetica')
        .text(skill, currentX + 6, currentY + 5)

      currentX += skillWidth + 10
    })

    doc.y = currentY + 35
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
      .fontSize(18)
      .fillColor('#1e293b')
      .font('Helvetica-Bold')
      .text(title, 50, doc.y)

    doc
      .strokeColor('#e2e8f0')
      .lineWidth(1)
      .moveTo(50, doc.y + 5)
      .lineTo(545, doc.y + 5)
      .stroke()

    doc.moveDown(1)
  }
}
