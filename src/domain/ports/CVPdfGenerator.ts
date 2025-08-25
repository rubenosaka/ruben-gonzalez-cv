/**
 * This project is intentionally over-engineered (DDD, Hexagonal, SOLID) as part of a developer CV.
 * It demonstrates architectural thinking rather than being optimized for minimalism.
 *
 * This port interface showcases the Hexagonal Architecture pattern by defining
 * a contract for PDF generation that can be implemented by different adapters.
 */
export interface CVPdfGenerator {
  generateFromHtml(html: string): Promise<Buffer>
}
