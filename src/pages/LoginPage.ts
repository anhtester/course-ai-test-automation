import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly path = '/admin/authentication';

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.rememberMeCheckbox = page.locator('#remember');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
    this.errorAlert = page.locator('.alert-danger');
  }

  async open(): Promise<void> {
    await this.goto(this.path);
    await expect(this.emailInput).toBeVisible();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async toggleRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Fills the form and submits. Does not assert outcome so it can be
   * reused for both valid and invalid login scenarios.
   */
  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    if (rememberMe) {
      await this.toggleRememberMe();
    }
    await this.submit();
  }

  async getErrorMessage(): Promise<string> {
    await expect(this.errorAlert).toBeVisible();
    return (await this.errorAlert.textContent())?.trim() ?? '';
  }

  async isLoaded(): Promise<boolean> {
    return this.emailInput.isVisible();
  }
}
