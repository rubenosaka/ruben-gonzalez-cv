import { NextResponse } from 'next/server'
import { ResumeService } from '@/application/services/ResumeService'
import { ReactPdfCVGenerator } from '@/infrastructure/pdf/ReactPdfCVGenerator'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const resumeService = new ResumeService()
    const resume = resumeService.getResume()

    const pdfGenerator = new ReactPdfCVGenerator()
    const pdfBuffer = await pdfGenerator.generatePDF(resume)

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
