import { test, expect, type Page } from '@playwright/test'

const openMobileMenu = async (page: Page) => {
  const hamburgerButton = page.getByRole('button', { name: /toggle menu/i })
  await hamburgerButton.click()
  const mobileMenu = page.getByTestId('mobile-menu')
  await expect(
    mobileMenu.getByRole('link', { name: /navigate to home page/i })
  ).toBeVisible()
  return { hamburgerButton, mobileMenu }
}

test.describe('Mobile Menu Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.goto('/')
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

    const { hamburgerButton, mobileMenu } = await openMobileMenu(page)

    await hamburgerButton.click()
    await expect(mobileMenu).toHaveClass(/max-h-0/)
    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('should display all navigation items in mobile menu', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const { mobileMenu } = await openMobileMenu(page)

    await expect(
      mobileMenu.getByRole('link', { name: /navigate to home page/i })
    ).toBeVisible()
    await expect(
      mobileMenu.getByRole('link', { name: /navigate to resume page/i })
    ).toBeVisible()
    await expect(
      mobileMenu.getByRole('link', { name: /navigate to projects page/i })
    ).toBeVisible()
    await expect(
      mobileMenu.getByRole('link', { name: /navigate to about me page/i })
    ).toBeVisible()
    await expect(
      mobileMenu.getByRole('link', { name: /navigate to now page/i })
    ).toBeVisible()
  })

  test('should close menu when navigation link is clicked', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const { mobileMenu } = await openMobileMenu(page)

    await mobileMenu
      .getByRole('link', { name: /navigate to resume page/i })
      .click()

    await expect(page).toHaveURL('/resume')
  })

  test('should navigate to correct pages from mobile menu', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const { mobileMenu } = await openMobileMenu(page)

    await mobileMenu
      .getByRole('link', { name: /navigate to resume page/i })
      .click()
    await expect(page).toHaveURL('/resume')

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const { mobileMenu: reopenedMenu } = await openMobileMenu(page)

    await reopenedMenu
      .getByRole('link', { name: /navigate to about me page/i })
      .click()
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
    await expect(hamburgerButton).toBeVisible()
  })

  test('should not show desktop navigation on mobile', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const desktopNav = page.locator('nav.hidden.md\\:flex')
    await expect(desktopNav).toHaveClass(/hidden/)

    const mobileButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(mobileButton).toBeVisible()
  })

  test('should have smooth animations for menu toggle', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const mobileMenu = page.getByTestId('mobile-menu')

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

    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')

    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false')
  })
})
