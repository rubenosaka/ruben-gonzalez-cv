export interface CVPdfGenerator {
  generateFromHtml(html: string): Promise<Buffer>
}
