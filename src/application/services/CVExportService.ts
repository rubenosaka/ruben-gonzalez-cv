import { CVService } from './CVService'
import { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'

export class CVExportService {
  constructor(
    private readonly cvService: CVService,
    private readonly cvPdfGenerator: CVPdfGenerator
  ) {}

  async exportPdf(): Promise<Buffer> {
    const cv = await this.cvService.getCV()
    return this.cvPdfGenerator.generateFromCV(cv)
  }


}
