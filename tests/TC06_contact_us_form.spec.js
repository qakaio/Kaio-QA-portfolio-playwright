const { test, expect } = require('./fixtures');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { baseURL } = require('../utils');

test('TC06 - Submit contact form with working file upload', async ({ page }) => {
  const tempDir = os.tmpdir();
  const filePath = path.join(tempDir, 'sample.txt');
  fs.writeFileSync(filePath, 'Test file content');
  await page.goto(baseURL + '/contact_us', { waitUntil: 'domcontentloaded' });
  await page.fill('[data-qa="name"]', 'Kaio');
  await page.fill('[data-qa="email"]', 'kaioqa@test.com');
  await page.fill('[data-qa="subject"]', 'Contact');
  await page.fill('[data-qa="message"]', 'Auto message');
  await page.setInputFiles('input[name="upload_file"]', filePath);
  page.once('dialog', dialog => dialog.accept());
  await page.click('[data-qa="submit-button"]');
  await page.waitForSelector('.status.alert-success');
  const successMessage = await page.locator('.status.alert-success').innerText();
  expect(successMessage.toLowerCase()).toContain('success');
});