import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('Edit business email', async ({ page }) => {
  await login(page, 'MrLegaleRappresentante2', 'test');

  await page.getByRole('button', { name: 'DDV PARTECIPAZIONI S.R.L.' }).click();
  await page.getByRole('button', { name: 'Accedi' }).click();
  await page.getByRole('heading', { name: 'Panoramica' }).click();
  await expect(
    page.getByText('Visualizza il riepilogo dei dati e leggi le notifiche di')
  ).toBeVisible();
  await expect(
    page.locator('div:nth-child(3) > div > div:nth-child(2) > .MuiPaper-root')
  ).toBeVisible();
  await expect(page.getByText('Indirizzo PEC primario')).toBeVisible();

  await page.locator('div:has-text("pec@pectest3.comModifica") >> button').nth(4).click();
  await expect(page.getByText("Modifica l'indirizzo PEC primario")).toBeVisible();
  await expect(page.getByText('Se l’indirizzo PEC non è corretto, modificalo qui.')).toBeVisible();
  await page.getByLabel('Indirizzo PEC').click();
  await page.getByLabel('Indirizzo PEC').fill('pec@pectest2.com');
  await page.getByRole('button', { name: 'Conferma' }).click();
  await expect(page.getByText('pec@pectest2.com')).toBeVisible();

  await page.locator('div:has-text("pec@pectest2.comModifica") >> button').nth(4).click();
  await page.getByLabel('Indirizzo PEC').click();
  await page.getByLabel('Indirizzo PEC').fill('pec@pectest3.com');
  await page.getByRole('button', { name: 'Conferma' }).click();
  await expect(page.getByText('pec@pectest3.com')).toBeVisible();
});
