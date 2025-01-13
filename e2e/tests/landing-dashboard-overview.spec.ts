import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('After logging in and selecting a business, navigate to the dashboard overview.', async ({
  page,
}) => {
  await login(page, 'MrLegaleRappresentante2', 'test');

  await expect(page.getByRole('heading', { name: 'Le tue imprese su SEND' })).toBeVisible();
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
