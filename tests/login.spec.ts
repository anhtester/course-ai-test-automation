import { test, expect } from '../src/fixtures/pageFixtures';
import { validUser, invalidLoginCases, EXPECTED_ERROR_MESSAGE } from '../src/data/testData';

test.describe('CRM Authentication - Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should render the login form', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should log in successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(validUser.email, validUser.password);

    await dashboardPage.expectLoaded();
  });

  test('should log in successfully with "Remember me" checked', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(validUser.email, validUser.password, true);

    await dashboardPage.expectLoaded();
  });

  for (const { name, email, password } of invalidLoginCases) {
    test(`should show an error when login fails: ${name}`, async ({ page, loginPage }) => {
      await loginPage.login(email, password);

      await expect(page).toHaveURL(/\/admin\/authentication\/?$/);
      await expect(loginPage.errorAlert).toBeVisible();
    });
  }

  test('should show the exact error message for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(validUser.email, 'a-definitely-wrong-password');

    const message = await loginPage.getErrorMessage();
    expect(message).toBe(EXPECTED_ERROR_MESSAGE);
  });

  test('should navigate to the forgot password page', async ({ page, loginPage }) => {
    await loginPage.forgotPasswordLink.click();

    await expect(page).toHaveURL(/\/admin\/authentication\/forgot_password/);
  });

  test('should allow logging out after a successful login', async ({ page, loginPage, dashboardPage }) => {
    await loginPage.login(validUser.email, validUser.password);
    await dashboardPage.expectLoaded();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/\/admin\/authentication\/?$/);
    await expect(loginPage.emailInput).toBeVisible();
  });
});
