import PDFDocument from 'pdfkit'
import type { Resume, Highlight, Experience } from '@/types/resume'

type Point = { x: number; y: number }

export class ReactPdfResumeGenerator {
  private page = { width: 595, height: 842, margin: 50 }
  private colors = {
    bgHero: '#0b0b0f',
    fgOnHero: '#ffffff',
    text: '#0f172a',
    textMuted: '#475569',
    textSoft: '#64748b',
    divider: '#e2e8f0',
    cardBg: '#f8fafc',
    chipBg: '#eef2ff',
    chipText: '#334155',
    accent: '#ec4899',
    accentDark: '#db2777',
  }
  private fonts = {
    regular: 'Helvetica',
    bold: 'Helvetica-Bold',
  }
  private layout = {
    colGap: 24,
    leftW: 180,
    rightW: 595 - 50 - 50 - 24 - 180,
    line: 1.35,
  }

  async generatePDF(resume: Resume): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: this.page.margin,
          bufferPages: true,
        })
        const chunks: Buffer[] = []
        doc.on('data', (c) => chunks.push(c))
        doc.on('end', () => resolve(Buffer.concat(chunks)))

        let y = this.drawHero(doc, resume)
        this.drawDivider(doc, 50, 545, y + 12)
        y += 24

        const leftX = 50
        const rightX = 50 + this.layout.leftW + this.layout.colGap
        let leftY = y
        let rightY = y

        leftY = this.drawSidebar(doc, resume, { x: leftX, y: leftY })
        rightY = this.drawHighlights(doc, resume, { x: rightX, y: rightY })
        rightY = this.drawExperience(doc, resume, { x: rightX, y: rightY })

        const maxY = Math.max(leftY, rightY)
        this.drawFooter(doc)
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

  private drawHero(doc: PDFKit.PDFDocument, resume: Resume) {
    const { bgHero, fgOnHero, accent } = this.colors
    doc.save()
    doc.rect(0, 0, this.page.width, 160).fill(bgHero)
    doc
      .fillColor(fgOnHero)
      .font(this.fonts.bold)
      .fontSize(28)
      .text(resume.metadata.name, 50, 40, { width: 380 })
    doc
      .font(this.fonts.regular)
      .fillColor('#cbd5e1')
      .fontSize(14)
      .text(resume.metadata.title, 50, 78, { width: 380 })
    const lineY = 112
    const meta = `${resume.metadata.location}  •  ${resume.metadata.email}`
    doc.fontSize(10).fillColor('#e2e8f0').text(meta, 50, lineY)
    doc
      .moveTo(50, lineY + 22)
      .lineTo(545, lineY + 22)
      .lineWidth(2)
      .strokeColor(accent)
      .stroke()
    doc.restore()
    doc.fillColor(this.colors.text).font(this.fonts.regular).fontSize(11)
    const summaryY = 170
    doc.text(resume.metadata.summary, 50, summaryY, { width: 495, lineGap: 2 })
    return (
      summaryY +
      doc.heightOfString(resume.metadata.summary, { width: 495 }) +
      12
    )
  }

  private drawSidebar(doc: PDFKit.PDFDocument, resume: Resume, start: Point) {
    let y = start.y
    y = this.sectionTitleSmall(doc, 'Contact', 50, y)
    y = this.kv(doc, 'Email', resume.metadata.email, 50, y)
    y = this.kv(doc, 'Location', resume.metadata.location, 50, y)

    y += 12
    y = this.sectionTitleSmall(doc, 'Skills', 50, y)
    y = this.drawChips(
      doc,
      [
        'Vue 3',
        'React',
        'TypeScript',
        'Node.js',
        'PHP',
        'Python',
        'AWS',
        'Docker',
        'Clean Architecture',
        'DDD',
        'SOLID',
      ],
      { x: 50, y, maxW: this.layout.leftW }
    )

    y += 12
    y = this.sectionTitleSmall(doc, 'Education', 50, y)
    y = this.paragraph(
      doc,
      "Master's in Big Data & Business Analytics (2017–2020)",
      50,
      y,
      this.layout.leftW
    )
    y += 4
    y = this.paragraph(
      doc,
      'Higher Technical Diploma in Graphic Design 2D/3D (2005–2007)',
      50,
      y,
      this.layout.leftW
    )
    return y
  }

  private drawHighlights(
    doc: PDFKit.PDFDocument,
    resume: Resume,
    start: Point
  ) {
    let y = start.y
    y = this.sectionTitle(
      doc,
      'Career Highlights',
      start.x,
      y,
      this.layout.rightW
    )
    const blocks = resume.content.highlights || []
    blocks.forEach((h) => {
      const hY = this.card(doc, start.x, y, this.layout.rightW, 64)
      this.accentBar(doc, start.x, hY, 4, 64)
      doc
        .font(this.fonts.bold)
        .fontSize(12)
        .fillColor(this.colors.text)
        .text(h.title, start.x + 12, hY + 8, { width: this.layout.rightW - 24 })
      doc
        .font(this.fonts.regular)
        .fontSize(10)
        .fillColor(this.colors.textMuted)
        .text(h.description, start.x + 12, hY + 26, {
          width: this.layout.rightW - 24,
        })
      y = hY + 64 + 8
    })
    return y
  }

  private drawExperience(
    doc: PDFKit.PDFDocument,
    resume: Resume,
    start: Point
  ) {
    let y = this.sectionTitle(
      doc,
      'Experience',
      start.x,
      start.y,
      this.layout.rightW
    )
    const items: Experience[] = resume.content.experience || []
    items.forEach((exp, idx) => {
      const cardH = 110
      const baseY = this.card(doc, start.x, y, this.layout.rightW, cardH)
      this.accentBar(doc, start.x, baseY, 4, cardH)
      doc
        .font(this.fonts.bold)
        .fontSize(13)
        .fillColor(this.colors.text)
        .text(exp.company, start.x + 12, baseY + 8)
      doc
        .font(this.fonts.regular)
        .fontSize(10)
        .fillColor(this.colors.textSoft)
        .text(exp.period, start.x + 12, baseY + 28)
      doc
        .font(this.fonts.bold)
        .fontSize(11)
        .fillColor(this.colors.text)
        .text(exp.title, start.x + 12, baseY + 44)
      const descY = baseY + 60
      const descH = doc.heightOfString(exp.description || '', {
        width: this.layout.rightW - 24,
        lineGap: 1,
      })
      doc
        .font(this.fonts.regular)
        .fontSize(10)
        .fillColor(this.colors.textMuted)
        .text(exp.description || '', start.x + 12, descY, {
          width: this.layout.rightW - 24,
          lineGap: 1,
        })
      let listY = descY + descH + 4
      if (Array.isArray(exp.highlights)) {
        exp.highlights.forEach((t) => {
          listY = this.bullet(
            doc,
            t,
            start.x + 12,
            listY,
            this.layout.rightW - 24
          )
        })
      }
      if (Array.isArray(exp.stack) && exp.stack.length) {
        listY += 4
        doc
          .font(this.fonts.bold)
          .fontSize(9)
          .fillColor(this.colors.textSoft)
          .text('Stack:', start.x + 12, listY)
        doc
          .font(this.fonts.regular)
          .fontSize(9)
          .fillColor(this.colors.textSoft)
          .text(exp.stack.join(', '), start.x + 48, listY, {
            width: this.layout.rightW - 60,
          })
      }
      y = Math.max(listY + 10, baseY + cardH + 10)
      if (y > this.page.height - 140) {
        doc.addPage()
        y = 60
      }
    })
    return y
  }

  private sectionTitle(
    doc: PDFKit.PDFDocument,
    title: string,
    x: number,
    y: number,
    w: number
  ) {
    doc
      .font(this.fonts.bold)
      .fontSize(16)
      .fillColor(this.colors.text)
      .text(title, x, y, { width: w })
    this.drawDivider(doc, x, x + w, doc.y + 4)
    return doc.y + 12
  }

  private sectionTitleSmall(
    doc: PDFKit.PDFDocument,
    title: string,
    x: number,
    y: number
  ) {
    doc
      .font(this.fonts.bold)
      .fontSize(12)
      .fillColor(this.colors.text)
      .text(title, x, y)
    this.drawDivider(doc, x, x + this.layout.leftW, doc.y + 3)
    return doc.y + 10
  }

  private kv(
    doc: PDFKit.PDFDocument,
    k: string,
    v: string,
    x: number,
    y: number
  ) {
    doc
      .font(this.fonts.bold)
      .fontSize(10)
      .fillColor(this.colors.text)
      .text(k, x, y)
    doc
      .font(this.fonts.regular)
      .fontSize(10)
      .fillColor(this.colors.textMuted)
      .text(v, x, doc.y)
    return doc.y + 4
  }

  private drawChips(
    doc: PDFKit.PDFDocument,
    skills: string[],
    start: Point & { maxW: number }
  ) {
    let x = start.x
    let y = start.y
    skills.forEach((s) => {
      const w = doc.widthOfString(s) + 14
      if (x + w > start.x + start.maxW) {
        x = start.x
        y += 26
      }
      doc.save()
      doc.roundedRect(x, y, w, 20, 10).fillColor(this.colors.chipBg).fill()
      doc
        .fillColor(this.colors.chipText)
        .font(this.fonts.regular)
        .fontSize(9)
        .text(s, x + 7, y + 6)
      doc.restore()
      x += w + 8
    })
    return y + 28
  }

  private paragraph(
    doc: PDFKit.PDFDocument,
    text: string,
    x: number,
    y: number,
    w: number
  ) {
    doc
      .font(this.fonts.regular)
      .fontSize(10)
      .fillColor(this.colors.textMuted)
      .text(text, x, y, { width: w, lineGap: 1 })
    return doc.y + 2
  }

  private bullet(
    doc: PDFKit.PDFDocument,
    text: string,
    x: number,
    y: number,
    w: number
  ) {
    doc
      .circle(x + 3, y + 6, 2)
      .fillColor(this.colors.accent)
      .fill()
    doc
      .fillColor(this.colors.textMuted)
      .font(this.fonts.regular)
      .fontSize(9)
      .text(text, x + 12, y, { width: w - 12 })
    return doc.y + 2
  }

  private card(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    doc.save()
    doc.roundedRect(x, y, w, h, 10).fillColor(this.colors.cardBg).fill()
    doc
      .roundedRect(x, y, w, h, 10)
      .lineWidth(1)
      .strokeColor(this.colors.divider)
      .stroke()
    doc.restore()
    return y
  }

  private accentBar(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    doc.save()
    doc.rect(x, y, w, h).fillColor(this.colors.accentDark).fill()
    doc.restore()
  }

  private drawDivider(
    doc: PDFKit.PDFDocument,
    x1: number,
    x2: number,
    y: number
  ) {
    doc
      .moveTo(x1, y)
      .lineTo(x2, y)
      .lineWidth(1)
      .strokeColor(this.colors.divider)
      .stroke()
  }

  private drawFooter(doc: PDFKit.PDFDocument) {
    const range = doc.bufferedPageRange()
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(i)
      const pageNum = i + 1
      const label = `Page ${pageNum} of ${range.count}`
      doc
        .font(this.fonts.regular)
        .fontSize(8)
        .fillColor(this.colors.textSoft)
        .text(label, 50, this.page.height - 40, { width: 495, align: 'center' })
    }
  }
}
