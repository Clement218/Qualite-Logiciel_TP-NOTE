import { test } from '../fixtures/test-fixture';
import { expect } from '@playwright/test';

const { URL } = process.env;

// Je fais ça pour eviter de le remettre à chaque fois
test.beforeEach(async ({ page }) => {
  await page.goto(URL!);
});

test('Tous les boutons cliquables du header', async ({ page, products }) => {
  await products.goto();
  await page.getByTestId('nav-link-about').click();
  await expect(page).toHaveURL(/about/);
  await page.getByTestId('nav-link-contact').click();
  await expect(page).toHaveURL(/contact/);
  await page.getByTestId('cart-button').click();
  await expect(page).toHaveURL(/cart/);
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/auth/);
});

test('Sélection d un produit', async ({ page, products }) => {
  await products.goto();
  await products.openProduct('12');

  await expect(page).toHaveURL(/product/);
});

test('Filtrer les produits par catégorie', async ({ page, products }) => {
  await products.goto();
  await products.openFilters();
  await products.filterByCategory('Accessoires');
  await expect(page).toHaveURL(/category=accessories/i);
});

test('Accéder à une catégorie produit via la page À propos', async ({ page }) => {
  await page.getByTestId('nav-link-about').click();
  await expect(page).toHaveURL(/about/);
  await page.getByRole('link', { name: 'Accessoires' }).click();
  await expect(page).toHaveURL(/accessories/i);
});
