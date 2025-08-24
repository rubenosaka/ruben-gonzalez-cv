import { NextResponse } from 'next/server'
import { DependencyContainer } from '@/infrastructure/container/di'

export async function GET() {
  try {
    const container = DependencyContainer.getInstance()
    const cvExportService = container.getCVExportService()

    const pdfBuffer = await cvExportService.exportPdf()

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ruben-gonzalez-cv.pdf"',
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
