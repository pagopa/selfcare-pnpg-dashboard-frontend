import { test, expect } from '@playwright/test';
import { login } from '../utils/login';

test('Legal representative has no businesses, by pressing start, it will proceed to onboarding.', async ({
  page,
}) => {
  await login(page, 'MrLegaleRappresentante4', 'test');

  await expect(page.getByText('La registrazione può essere')).toBeVisible();
  await page.getByRole('button', { name: 'Inizia' }).click();

  await page.waitForURL('https://imprese.uat.notifichedigitali.it/onboarding');
  await page.getByRole('heading', { name: 'Che impresa vuoi registrare?' }).click();
});
