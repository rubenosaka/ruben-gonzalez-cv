import { test, expect } from '@playwright/test'

test.describe('Navigation Tests', () => {
  test('should render CV page', async ({ page }) => {
    await page.goto('/cv')
    
    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should render projects page', async ({ page }) => {
    await page.goto('/projects')
    
    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should render individual project page', async ({ page }) => {
    await page.goto('/projects/frenetic')
    
    await expect(page).toHaveTitle(/Rubén González Aranda/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/')
    
    const main = page.locator('main').first()
    await expect(main).toBeVisible()
    
    const links = page.locator('a[href]')
    await expect(links.first()).toHaveAttribute('aria-label')
  })
})
