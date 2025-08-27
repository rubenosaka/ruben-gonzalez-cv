import { NextResponse } from 'next/server'
import { ResumeService } from '@/application/services/ResumeService'
import { ReactPdfResumeGenerator } from '@/infrastructure/pdf/ReactPdfResumeGenerator'

export const runtime = 'nodejs'

export async function GET() {
  try {
    console.log('Starting PDF generation...')
    const resumeService = new ResumeService()
    const resume = resumeService.getResume()
    console.log('Resume data loaded:', !!resume)

    const pdfGenerator = new ReactPdfResumeGenerator()
    console.log('PDF generator created')
    const pdfBuffer = await pdfGenerator.generatePDF(resume)
    console.log('PDF generated, buffer size:', pdfBuffer.length)

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="ruben-gonzalez-resume.pdf"',
        'Cache-Control': 'no-store',
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
