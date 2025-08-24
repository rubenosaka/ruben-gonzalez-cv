import { CV } from '@/domain/entities/CV'

export interface CVRepository {
  getCV(): Promise<CV>
}
