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
    highlightBorder: '#ec4899',
    expAccent: '#2e1065',
  }
  private fonts = { regular: 'Helvetica', bold: 'Helvetica-Bold' }
  private layout = {
    colGap: 24,
    leftW: 180,
    rightW: 595 - 50 - 50 - 24 - 180,
  }

  private currentPage = 1

  async generatePDF(resume: Resume): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ size: 'A4', margin: this.page.margin })
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

        if (this.currentPage === 1) this.addPage(doc)

        this.drawExperienceFullWidth(doc, resume, { x: 50, y: 60 })

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

  private addPage(doc: PDFKit.PDFDocument) {
    doc.addPage()
    this.currentPage += 1
  }
  private bottomLimit() {
    return this.page.height - this.page.margin - 40
  }
  private ensureSpace(
    doc: PDFKit.PDFDocument,
    currentY: number,
    needed: number,
    onNewPage?: () => number
  ) {
    if (currentY + needed <= this.bottomLimit()) return currentY
    this.addPage(doc)
    return onNewPage ? onNewPage() : this.page.margin + 10
  }

  private drawHero(doc: PDFKit.PDFDocument, resume: Resume) {
    doc.save()
    doc.rect(0, 0, this.page.width, 120).fill(this.colors.bgHero)
    doc
      .fillColor(this.colors.fgOnHero)
      .font(this.fonts.bold)
      .fontSize(28)
      .text(resume.metadata.name, 50, 15, { width: 380 })
    doc
      .font(this.fonts.regular)
      .fillColor('#cbd5e1')
      .fontSize(14)
      .text(resume.metadata.title, 50, 50, { width: 380 })
    const lineY = 84
    const meta = `${resume.metadata.location}  •  ${resume.metadata.email}`
    doc.fontSize(10).fillColor('#e2e8f0').text(meta, 50, lineY)
    doc
      .moveTo(50, lineY + 20)
      .lineTo(545, lineY + 20)
      .lineWidth(2)
      .strokeColor(this.colors.highlightBorder)
      .stroke()
    doc.restore()

    doc.fillColor(this.colors.text).font(this.fonts.regular).fontSize(11)
    const summaryY = 148
    doc.text(resume.metadata.summary, 50, summaryY, { width: 495, lineGap: 2 })
    return (
      summaryY +
      doc.heightOfString(resume.metadata.summary, { width: 495 }) +
      12
    )
  }

  private drawSidebar(doc: PDFKit.PDFDocument, resume: Resume, start: Point) {
    let y = start.y
    y = this.sectionTitle(doc, 'Contact', 50, y, this.layout.leftW)
    y = this.kv(doc, 'Email', resume.metadata.email, 50, y)
    y = this.kv(doc, 'Telephone', '+34639176921', 50, y)
    y = this.kv(doc, 'Location', resume.metadata.location, 50, y)
    y += 12

    y = this.sectionTitle(doc, 'Skills', 50, y, this.layout.leftW)
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

    y = this.sectionTitle(doc, 'Education', 50, y, this.layout.leftW)
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
    start: { x: number; y: number }
  ) {
    let y = start.y
    const w = this.layout.rightW
    y = this.sectionTitle(doc, 'Career Highlights', start.x, y, w)

    const blocks = (resume.content.highlights || []) as Highlight[]
    blocks.forEach((h) => {
      const pad = 12
      const contentW = w - pad * 2

      doc.font(this.fonts.bold).fontSize(12)
      const titleH = doc.heightOfString(h.title || '', { width: contentW })
      doc.font(this.fonts.regular).fontSize(10)
      const descH = doc.heightOfString(h.description || '', {
        width: contentW,
        lineGap: 1,
      })

      const cardH = pad + titleH + 8 + descH + pad
      y = this.ensureSpace(doc, y, cardH)

      this.highlightCard(doc, start.x, y, w, cardH)
      let cy = y + pad
      const ix = start.x + pad
      doc
        .font(this.fonts.bold)
        .fontSize(12)
        .fillColor(this.colors.text)
        .text(h.title, ix, cy, { width: contentW })
      cy += titleH + 8
      doc
        .font(this.fonts.regular)
        .fontSize(10)
        .fillColor(this.colors.textMuted)
        .text(h.description, ix, cy, { width: contentW, lineGap: 1 })
      y += cardH + 8
    })

    return y
  }

  private sectionHeaderHeight(
    doc: PDFKit.PDFDocument,
    title: string,
    w: number
  ) {
    doc.save()
    doc.font(this.fonts.bold).fontSize(16)
    const titleH = doc.heightOfString(title, { width: w })
    doc.restore()
    return titleH + 12
  }

  private drawExperienceFullWidth(
    doc: PDFKit.PDFDocument,
    resume: Resume,
    start: { x: number; y: number }
  ) {
    const w = 545 - 50
    const pad = 12
    const contentW = w - pad * 2
    const headerH = this.sectionHeaderHeight(doc, 'Experience', w)

    const items = (resume.content.experience || []) as Experience[]
    let y = start.y
    let headerDrawn = false

    const measure = (
      set: () => void,
      text: string,
      width: number,
      opts?: any
    ) => {
      set()
      return doc.heightOfString(text || '', { width, ...opts })
    }

    for (const exp of items) {
      const companyH = measure(
        () => doc.font(this.fonts.bold).fontSize(13),
        exp.company || '',
        contentW
      )
      const periodH = measure(
        () => doc.font(this.fonts.regular).fontSize(10),
        exp.period || '',
        contentW
      )
      const roleH = measure(
        () => doc.font(this.fonts.bold).fontSize(11),
        exp.title || '',
        contentW
      )
      const descH = measure(
        () => doc.font(this.fonts.regular).fontSize(10),
        exp.description || '',
        contentW,
        { lineGap: 1 }
      )

      let bulletsH = 0
      if (Array.isArray(exp.highlights)) {
        exp.highlights.forEach((t) => {
          bulletsH +=
            measure(
              () => doc.font(this.fonts.regular).fontSize(9),
              t || '',
              contentW - 12
            ) + 2
        })
      }

      let stackH = 0
      if (Array.isArray(exp.stack) && exp.stack.length) {
        const h1 = measure(
          () => doc.font(this.fonts.bold).fontSize(9),
          'Stack:',
          contentW
        )
        const h2 = measure(
          () => doc.font(this.fonts.regular).fontSize(9),
          exp.stack.join(', '),
          contentW - 36
        )
        stackH = h1 + h2 + 4
      }

      const cardH =
        pad +
        companyH +
        4 +
        periodH +
        6 +
        roleH +
        8 +
        descH +
        6 +
        bulletsH +
        stackH +
        pad

      const need = (headerDrawn ? 0 : headerH) + cardH
      if (
        start.y + (headerDrawn ? y - start.y : 0) + need >
        this.bottomLimit()
      ) {
        this.addPage(doc)
        y = start.y
        headerDrawn = false
      }

      if (!headerDrawn) {
        y = this.sectionTitle(doc, 'Experience', start.x, y, w)
        headerDrawn = true
      }

      this.experienceCard(doc, start.x, y, w, cardH)
      let cy = y + pad
      const ix = start.x + pad

      doc
        .font(this.fonts.bold)
        .fontSize(13)
        .fillColor(this.colors.text)
        .text(exp.company, ix, cy, { width: contentW })
      cy += companyH + 4
      doc
        .font(this.fonts.regular)
        .fontSize(10)
        .fillColor(this.colors.textSoft)
        .text(exp.period, ix, cy, { width: contentW })
      cy += periodH + 6
      doc
        .font(this.fonts.bold)
        .fontSize(11)
        .fillColor(this.colors.text)
        .text(exp.title, ix, cy, { width: contentW })
      cy += roleH + 8
      doc
        .font(this.fonts.regular)
        .fontSize(10)
        .fillColor(this.colors.textMuted)
        .text(exp.description || '', ix, cy, { width: contentW, lineGap: 1 })
      cy += descH + 6

      if (Array.isArray(exp.highlights)) {
        exp.highlights.forEach((t) => {
          cy = this.bullet(doc, t, ix, cy, contentW)
        })
      }
      if (Array.isArray(exp.stack) && exp.stack.length) {
        cy += 4
        doc
          .font(this.fonts.bold)
          .fontSize(9)
          .fillColor(this.colors.textSoft)
          .text('Stack:', ix, cy, { width: contentW })
        doc
          .font(this.fonts.regular)
          .fontSize(9)
          .fillColor(this.colors.textSoft)
          .text(exp.stack.join(', '), ix + 36, doc.y, { width: contentW - 36 })
      }

      y += cardH + 10
    }

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
    let x = start.x,
      y = start.y
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
      .fillColor(this.colors.expAccent)
      .fill()
    doc
      .fillColor(this.colors.textMuted)
      .font(this.fonts.regular)
      .fontSize(9)
      .text(text, x + 12, y, { width: w - 12 })
    return doc.y + 2
  }

  private highlightCard(
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
      .strokeColor(this.colors.highlightBorder)
      .stroke()
    doc.restore()
  }

  private experienceCard(
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
    doc.rect(x, y, 4, h).fillColor(this.colors.expAccent).fill()
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
}
