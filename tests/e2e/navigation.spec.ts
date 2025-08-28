import { test, expect } from '@playwright/test'

test.describe('Navigation Tests', () => {
  test('should render resume page', async ({ page }) => {
    await page.goto('/resume')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should render projects page', async ({ page }) => {
    await page.goto('/projects')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should render about-me page', async ({ page }) => {
    await page.goto('/about-me')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const main = page.locator('main').first()
    await expect(main).toBeVisible()

    const links = page.locator('a[href]')
    await expect(links.first()).toHaveAttribute('aria-label')
  })
})
