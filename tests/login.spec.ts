import { test, expect } from '@playwright/test';
import path from 'path';

const loginPage = 'file://' + path.resolve(__dirname, '../site/login.html');
const password = process.env.TEST_PASSWORD ?? '';

test.beforeEach(async ({ page }) => {
  await page.goto(loginPage);
});

test('valid user can log in', async ({ page }) => {
  expect(password, 'Set TEST_PASSWORD in .env or as a CI secret').not.toBe('');
  await page.getByLabel('Email').fill('shopper@example.com');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('status')).toHaveText('Welcome back!');
});

test('login button is disabled until a valid email is entered', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Login' });
  await expect(button).toBeDisabled();
  await page.getByLabel('Email').fill('shopper@example.com');
  await expect(button).toBeEnabled();
});

test('login page shows the ShopEasy heading', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'ShopEasy Login' })).toBeVisible();
});
