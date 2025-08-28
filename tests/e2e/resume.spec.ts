import { test, expect } from '@playwright/test'

test.describe('Resume Page Tests', () => {
  test('should render resume page with all sections', async ({ page }) => {
    await page.goto('/resume')

    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()

    // Check for main sections using more specific selectors
    await expect(
      page.getByRole('heading', { name: 'Career Highlights' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Experience' })
    ).toBeVisible()
  })

  test('should display resume main info', async ({ page }) => {
    await page.goto('/resume')

    // Check for profile information using more specific selectors
    await expect(
      page.getByRole('heading', { name: 'Rubén González Aranda' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'Engineering Manager · Product-focused Tech Lead · AI-driven Builder',
      })
    ).toBeVisible()
    await expect(page.getByText('Madrid, Spain')).toBeVisible()
    await expect(page.getByText('rubenosaka@gmail.com')).toBeVisible()
  })

  test('should have download PDF button', async ({ page }) => {
    await page.goto('/resume')

    const downloadButton = page.getByRole('button', { name: /download pdf/i })
    await expect(downloadButton).toBeVisible()
    await expect(downloadButton).toBeEnabled()
  })

  test('should have contact links', async ({ page }) => {
    await page.goto('/resume')

    // Check email link - use the first one found (in the main info section)
    const emailLinks = page.getByRole('link', {
      name: /send email to rubenosaka@gmail\.com/i,
    })
    const firstEmailLink = emailLinks.first()
    await expect(firstEmailLink).toBeVisible()
    await expect(firstEmailLink).toHaveAttribute(
      'href',
      'mailto:rubenosaka@gmail.com'
    )

    // Check phone link
    const phoneLink = page.getByRole('link', { name: /call \+34639176921/i })
    await expect(phoneLink).toBeVisible()
    await expect(phoneLink).toHaveAttribute('href', 'tel:+34639176921')
  })

  test('should display profile image', async ({ page }) => {
    await page.goto('/resume')

    const profileImage = page.getByAltText('Rubén González Aranda')
    await expect(profileImage).toBeVisible()
    // Next.js optimizes images, so we check for the base path instead of exact URL
    await expect(profileImage).toHaveAttribute(
      'src',
      /.*ruben-gonzalez\.webp.*/
    )
  })

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/resume')

    // Check that the layout adapts to mobile using specific selectors
    await expect(
      page.getByRole('heading', { name: 'Rubén González Aranda' })
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Career Highlights' })
    ).toBeVisible()
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/resume')

    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3')
    await expect(headings.first()).toBeVisible()

    // Check for proper link attributes
    const links = page.locator('a[href]')
    await expect(links.first()).toHaveAttribute('aria-label')
  })
})
