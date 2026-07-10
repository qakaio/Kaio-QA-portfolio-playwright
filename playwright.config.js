// @ts-check
const { defineConfig } = require('@playwright/test');

const allProjects = {
  chromium: {
    name: 'chromium',
    use: {
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      executablePath: '/usr/bin/google-chrome',
      launchOptions: {
        args: [
          '--disable-blink-features=AutomationControlled',
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
        ]
      }
    }
  },
  firefox: {
    name: 'firefox',
    use: {
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
      executablePath: '/usr/bin/firefox',
      launchOptions: {
        firefoxUserPrefs: {
          'dom.webdriver.enabled': false,
          'media.navigator.enabled': false,
        }
      }
    }
  },
  webkit: {
    name: 'webkit',
    use: {
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
      executablePath: '/usr/bin/webkit2gtk-driver',
      launchOptions: {
        args: [
          '--disable-blink-features=AutomationControlled',
        ]
      }
    }
  },
};

const getProjects = () => {
  const browsers = (process.env.CI_BROWSERS || 'chromium,firefox,webkit')
    .split(',')
    .map(b => b.trim());
  return browsers.map(b => allProjects[b]).filter(Boolean);
};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 120000,
  expect: { timeout: 30000 },
  reporter: process.env.CI ? [['html', { outputFolder: 'playwright-report', open: 'never' }], ['line']] : 'html',
  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  projects: getProjects(),
});