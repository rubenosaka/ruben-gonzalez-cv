/**
 * This project is intentionally over-engineered (DDD, Hexagonal, SOLID) as part of a developer CV.
 * It demonstrates architectural thinking rather than being optimized for minimalism.
 *
 * This adapter implements the CVPdfGenerator port, showcasing the Hexagonal Architecture pattern.
 * It serves as an example of how external concerns (PDF generation) are isolated from the domain.
 */
import { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'
import puppeteer from 'puppeteer'

export class ReactPdfCVGenerator implements CVPdfGenerator {
  async generateFromHtml(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    try {
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
        printBackground: true,
        displayHeaderFooter: false,
      })

      return Buffer.from(pdfBuffer)
    } finally {
      await browser.close()
    }
  }
}
