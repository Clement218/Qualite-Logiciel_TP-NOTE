import { test } from '../fixtures/test-fixture';

test.beforeEach(async ({ page }) => {
  await page.goto('https://techhubecommerce.lovable.app/');
});

test('Ajout au panier', async ({ page, products, productDetail }) => {
  await products.goto();
  await products.openProduct('3');
  await productDetail.addToCart();
});

test('Vérification du panier', async ({ page, products, productDetail, cart }) => {
  await products.goto();
  await products.openProduct('3');
  await productDetail.addToCart();
  await cart.open();
});
