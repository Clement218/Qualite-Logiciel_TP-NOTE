import { test } from '../fixtures/test-fixture';


test.beforeEach(async ({ page }) => {
  await page.goto('https://techhubecommerce.lovable.app/');
});

test('Tous les boutons cliquables du header', async ({ page, products }) => {
  await products.goto();
  await page.getByTestId('nav-link-about').click();
  await page.getByTestId('nav-link-contact').click();
  await page.getByTestId('search-button').click();
  await page.getByTestId('cart-button').click();
  await page.getByTestId('login-button').click();
});

test('Sélection d un produit', async ({ page, products, productDetail }) => {
  await products.goto();
  await products.openProduct('12');
});

test('Filtrer les produits par catégorie', async ({ page, products }) => {
  await products.goto();
  await products.openFilters();
  await products.filterByCategory('Accessoires');
});

test('Accéder à une catégorie produit via la page À propos', async ({ page }) => {
  await page.getByTestId('nav-link-about').click();
  await page.getByRole('link', { name: 'Accessoires' }).click();
});
