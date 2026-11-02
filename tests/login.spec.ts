import { test, expect } from '@playwright/test';
import path from 'path';

const loginPage = 'file://' + path.resolve(__dirname, '../site/login.html');
const password = process.env.TEST_PASSWORD ?? '';

test('valid user can log in', async ({ page }) => {
  await page.goto(loginPage);
  expect(password, 'Set TEST_PASSWORD in .env or as a CI secret').not.toBe('');
  await page.getByLabel('Email').fill('shopper@example.com');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('status')).toHaveText('Welcome back!');
});
