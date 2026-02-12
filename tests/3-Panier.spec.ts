import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';

test('Ajout au panier', async ({ page, products, productDetail }) => {
  await page.goto('https://techhubecommerce.lovable.app/');

  await products.goto();
  await products.openProduct('3');
  await productDetail.addToCart();
});

test('Vérification du panier', async ({ page, products, productDetail, cart }) => {
  await page.goto('https://techhubecommerce.lovable.app/');

  await products.goto();
  await products.openProduct('3');
  await productDetail.addToCart();
  await cart.open();
});
