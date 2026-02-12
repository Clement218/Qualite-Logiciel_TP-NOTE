import { test } from '../fixtures/test-fixture';
import { expect } from '@playwright/test';

const { URL } = process.env;

// Je fais ça pour eviter de le remettre à chaque fois
test.beforeEach(async ({ page }) => {
  await page.goto(URL!);
});

test('Ajout au panier', async ({ page, products, productDetail }) => {
  await products.goto();
  await products.openProduct('3');
  await expect(page).toHaveURL(/product/i);
  await productDetail.addToCart();
  await expect(page.getByTestId('cart-count')).toBeVisible();
});

test('Vérification du panier', async ({ page, products, productDetail, cart }) => {
  await products.goto();
  await products.openProduct('3');
  await productDetail.addToCart();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await cart.open();
  await expect(page).toHaveURL(/cart/i);
  const cartItems = page.getByTestId('cart-item');
  await expect(page.locator('text=Sous-total (1 article)')).toBeVisible();
});
