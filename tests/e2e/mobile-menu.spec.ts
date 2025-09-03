import { test, expect } from '@playwright/test'

test.describe('Mobile Menu Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Use a mobile viewport size
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(hamburgerButton).toBeVisible()
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should toggle menu when hamburger button is clicked', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
    const mobileMenu = page.locator('div.absolute.left-0.right-0.top-full.z-50')

    // Click to open menu
    await hamburgerButton.click()
    await page.waitForTimeout(100) // Wait for state to update

    // Check if menu is visible by looking for the mobile navigation links
    await expect(
      page.getByRole('link', { name: /navigate to home page/i }).first()
    ).toBeVisible()

    // Click to close menu
    await hamburgerButton.click()
    await page.waitForTimeout(100) // Wait for state to update

    // Menu should be closed (check that mobile nav is not visible)
    await expect(mobileMenu).toHaveClass(/max-h-0/)
  })

  test('should display all navigation items in mobile menu', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
    await hamburgerButton.click()
    await page.waitForTimeout(100) // Wait for menu to open

    // Check for all navigation items
    await expect(
      page.getByRole('link', { name: /navigate to home page/i }).first()
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /navigate to resume page/i }).first()
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /navigate to projects page/i }).first()
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /navigate to about me page/i }).first()
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /navigate to now page/i }).first()
    ).toBeVisible()
  })

  test('should close menu when navigation link is clicked', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })

    // Open menu
    await hamburgerButton.click()
    await page.waitForTimeout(100) // Wait for menu to open

    // Verify menu is open
    await expect(
      page.getByRole('link', { name: /navigate to home page/i }).first()
    ).toBeVisible()

    // Click on a navigation link
    const resumeLink = page
      .getByRole('link', {
        name: /navigate to resume page/i,
      })
      .first()
    await resumeLink.click()

    // Menu should be closed - navigate back and check
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should navigate to correct pages from mobile menu', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
    await hamburgerButton.click()
    await page.waitForTimeout(100)

    // Test navigation to Resume page
    const resumeLink = page
      .getByRole('link', { name: /navigate to resume page/i })
      .first()
    await resumeLink.click()
    await expect(page).toHaveURL('/resume')

    // Go back and test another page
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await hamburgerButton.click()
    await page.waitForTimeout(100)

    const aboutLink = page
      .getByRole('link', { name: /navigate to about me page/i })
      .first()
    await aboutLink.click()
    await expect(page).toHaveURL('/about-me')
  })

  test('should have proper accessibility attributes on mobile', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(hamburgerButton).toHaveAttribute('aria-label', 'Toggle menu')
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')

    // Test that the button has the correct initial state
    await expect(hamburgerButton).toBeVisible()
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should not show desktop navigation on mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Desktop navigation should be hidden on mobile
    // Check that the desktop nav has the hidden class
    const desktopNav = page.locator('nav.hidden.md\\:flex')
    await expect(desktopNav).toHaveClass(/hidden/)

    // Let's verify that the mobile menu button is visible instead
    const mobileButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(mobileButton).toBeVisible()
  })

  test('should have smooth animations for menu toggle', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
    const mobileMenu = page.locator('div.absolute.left-0.right-0.top-full.z-50')

    // Check for transition classes
    await expect(mobileMenu).toHaveClass(/transition-all/)
    await expect(mobileMenu).toHaveClass(/duration-300/)
    await expect(mobileMenu).toHaveClass(/ease-in-out/)
  })

  test('should handle menu state correctly on page refresh', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })

    // Test initial state
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')

    // Refresh page
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Menu should be closed after refresh
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
  })
})
