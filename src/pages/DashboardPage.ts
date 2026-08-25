import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly path = '/admin/';
  readonly logoutPath = '/admin/authentication/logout';

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${this.path.replace('/', '\\/')}?$`));
    await expect(this.page).toHaveTitle(/Dashboard/i);
  }

  /**
   * The topbar "Logout" link is wired to an onclick="logout()" JS handler
   * rather than a plain href, so navigating straight to the logout route
   * is the reliable way to end the session from tests.
   */
  async logout(): Promise<void> {
    await this.goto(this.logoutPath);
  }
}
