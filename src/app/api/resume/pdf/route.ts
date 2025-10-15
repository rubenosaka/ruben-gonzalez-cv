import { NextRequest, NextResponse } from 'next/server'
import { RoleBasedPdfResumeGenerator } from '@/infrastructure/pdf/RoleBasedPdfResumeGenerator'
import { resumeFrontend } from '@/content/resume-frontend.data'
import { resumeFullstack } from '@/content/resume-fullstack.data'
import { resumeEngineeringManager } from '@/content/resume-engineering-manager.data'

export const runtime = 'nodejs'

const roleResumes = {
  frontend: resumeFrontend,
  fullstack: resumeFullstack,
  'engineering-manager': resumeEngineeringManager,
} as const

type Role = keyof typeof roleResumes

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') as Role

    if (!role || !roleResumes[role]) {
      return NextResponse.json(
        {
          error: 'Invalid or missing role parameter',
          availableRoles: Object.keys(roleResumes),
        },
        { status: 400 }
      )
    }

    const resume = roleResumes[role]
    const pdfGenerator = new RoleBasedPdfResumeGenerator()
    const pdfBuffer = await pdfGenerator.generatePDF(resume)

    const filename = `ruben-gonzalez-${role}-resume.pdf`

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
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
