import { test } from '../fixtures/test-fixture';
import { expect } from '@playwright/test';

const { URL } = process.env;

// Je fais ça pour eviter de le remettre à chaque fois
test.beforeEach(async ({ page }) => {
  await page.goto(URL!);
});

// Pour effectuer ces tests il est impératif de se connecter en 1er car l'authentification ne reste pas en mémoire

test('Checkout - Livraison', async ({ page, auth, products, productDetail, cart, shipping }) => {
  await auth.loginTest();
  await products.goto();
  await products.openProduct('1');
  await productDetail.addToCart();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await cart.open();
  await cart.goToCheckout();
  await expect(page).toHaveURL(/checkout/i);
  await shipping.fillShipping({
    phone: '0011223344',
    address: '22 rue des champignons',
    city: 'boeufville',
    postal: '40'
  });
 await expect(page.locator('text=Paiement sécurisé')).toBeVisible();
});



test('Checkout - Paiement', async ({ page, auth, products, productDetail, cart, shipping, payment }) => {
  await auth.loginTest();
  await products.goto();
  await products.openProduct('1');
  await productDetail.addToCart();
  await cart.open();
  await cart.goToCheckout();
  await shipping.fillShipping({
    phone: '0011223344',
    address: '22 rue des champignons',
    city: 'boeufville',
    postal: '40'
  });
  await payment.pay({
    number: '9999888877774444',
    name: 'Jean Jack',
    expiry: '02/56',
    cvv: '789'
  });
  await expect(
    page.getByRole('heading', { name: 'Commande confirmée !' })
  ).toBeVisible();
});
