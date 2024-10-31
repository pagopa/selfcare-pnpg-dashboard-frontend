import { test, expect } from '@playwright/test';

test('After logging in and selecting a business, navigate to the dashboard overview.', async ({
  page,
}) => {
  await page.goto('https://imprese.uat.notifichedigitali.it/auth/login?onSuccess=%2Fdashboard');
  await expect(page.getByRole('heading', { name: 'Come vuoi accedere?' })).toBeVisible();
  await page.getByText('Entra con SPIDEntra con CIE').click();
  await page.getByRole('button', { name: 'Entra con SPID' }).click();
  await page.getByLabel('test').click();
  await page.getByLabel('Username').press('CapsLock');
  await page.getByLabel('Username').fill('M');
  await page.getByLabel('Username').press('CapsLock');
  await page.getByLabel('Username').fill('Mr');
  await page.getByLabel('Username').press('CapsLock');
  await page.getByLabel('Username').fill('MrL');
  await page.getByLabel('Username').press('CapsLock');
  await page.getByLabel('Username').fill('MrLegale');
  await page.getByLabel('Username').press('CapsLock');
  await page.getByLabel('Username').fill('MrLegaleR');
  await page.getByLabel('Username').press('CapsLock');
  await page.getByLabel('Username').fill('MrLegaleRappresentante2');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Invia' }).click();
  await page.getByRole('button', { name: 'Invia' }).click();
  await expect(page.getByRole('heading', { name: 'Seleziona la tua impresa' })).toBeVisible();
  await expect(page.getByText('Se leggi le notifiche di più')).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^Accedi$/ })
    .click();
  await page.getByRole('button', { name: 'DDV PARTECIPAZIONI S.R.L.' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await expect(page.getByRole('heading', { name: 'Panoramica' })).toBeVisible();
  await expect(page.getByText('Visualizza il riepilogo dei')).toBeVisible();
});
