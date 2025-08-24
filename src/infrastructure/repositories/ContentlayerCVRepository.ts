import { allCVs } from 'contentlayer/generated'
import { CV, CVMetadata } from '@/domain/entities/CV'
import { CVRepository } from '@/application/interfaces/CVRepository'

export class ContentlayerCVRepository implements CVRepository {
  async getCV(): Promise<CV> {
    const cvData = allCVs[0]
    
    if (!cvData) {
      throw new Error('CV not found')
    }

    const metadata: CVMetadata = {
      name: cvData.name,
      title: cvData.title,
      email: cvData.email,
      location: cvData.location,
      summary: cvData.summary
    }

    return CV.create(metadata, cvData.body.raw)
  }
}
