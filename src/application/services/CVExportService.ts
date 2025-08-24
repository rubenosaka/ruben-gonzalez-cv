import { CVService } from './CVService'
import { CVPdfGenerator } from '@/domain/ports/CVPdfGenerator'

export class CVExportService {
  constructor(
    private readonly cvService: CVService,
    private readonly cvPdfGenerator: CVPdfGenerator
  ) {}

  async exportPdf(): Promise<Buffer> {
    const cv = await this.cvService.getCV()
    const htmlContent = this.transformCvToHtml(cv)
    return this.cvPdfGenerator.generateFromHtml(htmlContent)
  }

  private transformCvToHtml(cv: any): string {
    const sections = this.parseCvSections(cv.content)
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${cv.name} - ${cv.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            h2 { color: #555; margin-top: 30px; margin-bottom: 15px; }
            h3 { color: #666; margin-top: 20px; margin-bottom: 10px; }
            .header { text-align: center; margin-bottom: 30px; }
            .contact { text-align: center; margin-bottom: 20px; color: #666; }
            .section { margin-bottom: 25px; }
            .experience-item, .education-item { margin-bottom: 15px; }
            .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin-bottom: 5px; }
            .period { color: #666; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${cv.name}</h1>
            <h2>${cv.title}</h2>
            <div class="contact">
              <p>${cv.location} • ${cv.email}</p>
            </div>
            <p>${cv.summary}</p>
          </div>
          
          ${sections.map(section => `
            <div class="section">
              <h2>${section.title}</h2>
              ${section.content}
            </div>
          `).join('')}
        </body>
      </html>
    `
  }

  private parseCvSections(content: string): Array<{title: string, content: string}> {
    const sections: Array<{title: string, content: string}> = []
    const lines = content.split('\n')
    let currentSection = { title: '', content: '' }
    let inSection = false

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (inSection && currentSection.title) {
          sections.push({ ...currentSection })
        }
        currentSection = { 
          title: line.replace('## ', '').trim(), 
          content: '' 
        }
        inSection = true
      } else if (inSection && line.trim()) {
        currentSection.content += this.parseMarkdownLine(line) + '\n'
      }
    }

    if (inSection && currentSection.title) {
      sections.push(currentSection)
    }

    return sections
  }

  private parseMarkdownLine(line: string): string {
    return line
      .replace(/^### (.+)$/, '<h3>$1</h3>')
      .replace(/^\*\*(.+)\*\* \| (.+)$/, '<div class="experience-item"><strong>$1</strong> | <span class="period">$2</span></div>')
      .replace(/^- (.+)$/, '<li>$1</li>')
      .replace(/^(.+)$/, '<p>$1</p>')
  }
}
