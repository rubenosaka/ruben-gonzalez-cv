import { CV } from '@/domain/entities/CV'
import { CVRepository } from '@/application/interfaces/CVRepository'

export class CVService {
  constructor(private readonly cvRepository: CVRepository) {}

  async getCV(): Promise<CV> {
    return this.cvRepository.getCV()
  }
}
