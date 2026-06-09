import { test, expect } from '@playwright/test';

test('should complete the full registration flow', async ({ page }) => {
  await page.goto('/registration');

  // Step 1: Personal Profile
  await expect(page.getByText('Step 1: Personal Profile')).toBeVisible();
  await page.getByLabel('Full Name *').fill('Integration Test User');
  await page.getByLabel('Email ID *').fill('test@example.com');
  await page.getByLabel('Phone Number *').fill('07777777777');
  await page.getByLabel('Yes').check();
  await page.getByRole('button', { name: 'Next: Cricket Profile' }).click();

  // Step 2: Cricket Profile
  await expect(page.getByText('Step 2: Cricket Profile')).toBeVisible();
  await page.getByLabel('Primary Role *').selectOption('All-rounder');
  await page.getByLabel('Batting Style *').selectOption('Right hand');
  await page.getByLabel('CricHeroes Profile Link *').fill('https://cricheroes.in/profile/123');
  await page.getByRole('button', { name: 'Next: Health & Consent' }).click();

  // Step 3: Health, Media & Consent
  await expect(page.getByText('Step 3: Health, Media & Consent')).toBeVisible();
  await page.getByLabel('Any medical conditions or allergies? *').selectOption('No');
  await page.getByLabel('Any current injuries? *').selectOption('No');
  
  // File upload is tricky in some environments, but we can mock or skip if necessary.
  // For now, we'll try to provide a dummy file if needed, but Step 3 validation requires it.
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator('input[type="file"]').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: 'test.png',
    mimeType: 'image/png',
    buffer: Buffer.from('fake-image-data'),
  });

  await page.getByLabel('Would you like to enter the player auction? *').selectOption('Yes');
  await page.getByLabel('Code of conduct agreement * (I agree to follow tournament rules)').check();
  await page.getByLabel('Consent to use photos/videos *').check();
  await page.getByLabel('Data privacy consent *').check();
  await page.getByRole('button', { name: 'Next: Payment' }).click();

  // Step 4: Payment Verification
  await expect(page.getByText('Step 4: Payment Verification')).toBeVisible();
  await page.getByLabel('Transaction Reference ID *').fill('TXN123456789');
  
  // Note: Clicking submit will actually try to fetch the Apps Script URL.
  // In a real integration test environment, we might want to mock this API call.
  // However, for now, we'll just check that we are on Step 4.
  await expect(page.getByRole('button', { name: 'Submit Registration' })).toBeVisible();
});
