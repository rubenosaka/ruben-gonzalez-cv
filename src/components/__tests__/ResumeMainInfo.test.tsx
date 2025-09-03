import { render, screen } from '@testing-library/react'
import { ResumeMainInfo } from '../resume/ResumeMainInfo'

const mockProps = {
  name: 'Test Name',
  title: 'Test Title',
  location: 'Test Location',
  email: 'test@example.com',
  summary: 'Test summary description',
}

describe('ResumeMainInfo', () => {
  it('should render all resume information', () => {
    render(<ResumeMainInfo {...mockProps} />)

    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByText('Test Location')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('Test summary description')).toBeInTheDocument()
  })

  it('should render download button', () => {
    render(<ResumeMainInfo {...mockProps} />)

    expect(screen.getByText('Download PDF')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render profile image', () => {
    render(<ResumeMainInfo {...mockProps} />)

    const image = screen.getByAltText('Rubén González Aranda')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('ruben-gonzalez.webp')
    )
  })

  it('should render email link with correct href', () => {
    render(<ResumeMainInfo {...mockProps} />)

    const emailLink = screen.getByRole('link', {
      name: /send email to test@example\.com/i,
    })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com')
  })

  it('should render telephone link with correct href', () => {
    render(<ResumeMainInfo {...mockProps} />)

    const phoneLink = screen.getByRole('link', { name: /call \+34639176921/i })
    expect(phoneLink).toBeInTheDocument()
    expect(phoneLink).toHaveAttribute('href', 'tel:+34639176921')
    expect(phoneLink).toHaveTextContent('+34 639 176 921')
  })

  it('should render code comment', () => {
    render(<ResumeMainInfo {...mockProps} />)

    // The comment is rendered as a span with the text
    expect(screen.getByText(/problably not human/)).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<ResumeMainInfo {...mockProps} />)

    const emailLink = screen.getByRole('link', {
      name: /send email to test@example\.com/i,
    })
    expect(emailLink).toHaveAttribute(
      'aria-label',
      'Send email to test@example.com'
    )

    const phoneLink = screen.getByRole('link', { name: /call \+34639176921/i })
    expect(phoneLink).toHaveAttribute('aria-label', 'Call +34639176921')
  })

  it('should render social media links', () => {
    render(<ResumeMainInfo {...mockProps} />)

    // Check GitHub link
    const githubLink = screen.getByRole('link', {
      name: /visit github profile/i,
    })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rubenosaka')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check LinkedIn link
    const linkedinLink = screen.getByRole('link', {
      name: /visit linkedin profile/i,
    })
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ruben-gonzalez-trinuki/'
    )
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')

    // Check Instagram link
    const instagramLink = screen.getByRole('link', {
      name: /visit instagram profile/i,
    })
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/vinylosaka?igsh=MWRuMTFnNnd3a244Zg=='
    )
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render social media icons', () => {
    render(<ResumeMainInfo {...mockProps} />)

    // Check that all social media icons are present
    expect(
      screen.getByRole('link', { name: /visit github profile/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /visit linkedin profile/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /visit instagram profile/i })
    ).toBeInTheDocument()
  })
})
