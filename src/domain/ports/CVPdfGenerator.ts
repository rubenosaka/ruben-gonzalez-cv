/**
 * This project is intentionally over-engineered (DDD, Hexagonal, SOLID) as part of a developer CV.
 * It demonstrates architectural thinking rather than being optimized for minimalism.
 *
 * This port interface showcases the Hexagonal Architecture pattern by defining
 * a contract for PDF generation that can be implemented by different adapters.
 */
import { CV } from '@/domain/entities/CV'

export interface CVPdfGenerator {
  generateFromCV(cv: CV): Promise<Buffer>
  generateFromHtml(html: string): Promise<Buffer>
}
