# CRM Login Automation

Playwright + TypeScript automation framework for testing the login flow of
[Perfex CRM demo](https://crm.anhtester.com/admin/authentication), built with
the Page Object Model pattern.

## Project structure

```
├── playwright.config.ts        # Playwright configuration (projects, reporters, timeouts)
├── src/
│   ├── config/env.ts            # Loads BASE_URL / credentials from .env
│   ├── data/testData.ts         # Test data (valid user, invalid login cases)
│   ├── fixtures/pageFixtures.ts # Custom test fixtures that inject page objects
│   └── pages/
│       ├── BasePage.ts          # Shared page behavior (goto, title, url)
│       ├── LoginPage.ts         # Login form locators + actions
│       └── DashboardPage.ts     # Post-login dashboard assertions + logout
└── tests/
    └── login.spec.ts            # Login test scenarios
```

## Setup

```bash
npm install
npx playwright install --with-deps
```

Copy `.env.example` to `.env` and adjust if needed (a working `.env` with the
demo credentials is already included):

```bash
cp .env.example .env
```

## Running tests

```bash
npm test                # run all tests, all browsers, headless
npm run test:headed     # run with a visible browser
npm run test:ui         # interactive Playwright UI mode
npm run test:debug      # step-through debugger
npm run test:chrome     # Chromium only
npm run report          # open the last HTML report
```

## Test scenarios covered

- Login form renders correctly
- Successful login with valid credentials
- Successful login with "Remember me" checked
- Failed login: wrong password, unregistered email, empty password
- Exact error message assertion ("Invalid email or password")
- Navigation to "Forgot Password?"
- Logout after a successful login

## Notes

- Credentials are read from environment variables (`.env`), never hard-coded
  in the tests, so they can be swapped per environment.
- `playwright.config.ts` enables trace/video/screenshot capture only on
  failure to keep CI artifacts small.
